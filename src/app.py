from flask import Flask, render_template, make_response, request
from flask_cors import CORS
import io
import subprocess
import re


app = Flask(__name__, static_folder='static')
#activat venv cu $ .\venv\Scripts\activate
#pornit aplicatia pe 127.0.0.1:5000 cu $ python -m flask --app .\src\app.py run  


#pt cross origin 
#intr-un CORS, doar headerul content-type este expus, celelalte trebuie expuse manual daca vrem sa le folosi
CORS(app, expose_headers=['Filename'])


def linkuriAcceptate(link):
    youtube_pattern =   r'^https?:\/\/(www\.)?(youtube\.com\/|youtu\.be\/)'
    tiktok_pattern =    r'^https?:\/\/(www\.)?tiktok\.com\/@[^\/]+\/video\/\d+'
    instagram_pattern = r'^https?:\/\/(www\.)?instagram\.com\/'
    piped_pattern =     r'^https?:\/\/piped\.[a-zA-Z]+\.[a-zA-Z]+\/watch\?v=[a-zA-Z0-9_-]+'
    odysee_pattern =    r'^https?:\/\/(www\.)?odysee\.com\/.*'
    if(
        re.match(youtube_pattern, link)     or
        re.match(tiktok_pattern, link)      or
        re.match(instagram_pattern, link)   or
        re.match(piped_pattern, link)       or 
        re.match(odysee_pattern, link)      
    ):
        return True
    else:
        return False
    


@app.route("/", methods=['GET'])
def home():
    return render_template("index.html")



#yt-dlp trebuie instalat in virtual environment
@app.route("/download/", methods=['POST'])
def download_cut():
    if request.method == 'POST':
        #preluare atribute din body
        url   = request.form.get('link')
        start = request.form.get('start')
        end   = request.form.get('end')

        if not linkuriAcceptate(url):
            return make_response("Link not accepted", 400)
        
        try:
            #preluare nume fisier pe care il vom manipula 
            filename_process = subprocess.run(
                f"yt-dlp {url} --print filename --skip-download", 
                check=True, 
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            ) 
            filename = filename_process.stdout.strip() #procesul va printa numele fisierului, din output il extragem
            print("Filename: " + filename)

            filesize_process = subprocess.run(
                ["yt-dlp", url, "-O", "%(requested_formats.0.filesize+requested_formats.1.filesize)d"],
                check=True, 
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            filesize = filesize_process.stdout.strip()
            print("File size: " + filesize)
            if int(filesize) > 1073741824:
                return make_response("Filesize bigger than 1GB", 400)
            
            #descarcare / descarcare si taiere clip pe server (in disk)
            #fortez yt-dlp sa descarce fisierul exact cu numele clipului, 
            #altfel daca exista caractere speciale '!, ?, $, etc' sau caractere din alte limbi
            #ar fi fost probleme la gasirea fisierului, pentru ca yt-dlp le salva doar cu alfabetul latin si fara alte caractere speciale
            if start and end:
                filename = f"CUT{start}{end}_" + filename #pus si _secundele in caz ca se taie mai multe secvente din acelas clip
                command = f"yt-dlp {url} --download-sections *{start}-{end} --force-keyframes-at-cuts --output \"{filename}\""
            else:
                command = f"yt-dlp {url} --output \"{filename}\""
            subprocess.run(command, check=True) #check=True - pt a termina comanda si a ridica exceptie daca exista

            #citire clip descarcat, stocare in video_data (in RAM) 
            with open(filename, 'rb') as video_file:
                video_data = video_file.read()

            #stergere clip de pe disk
            subprocess.run(f"rm \"{filename}\"", check=True)
                  
            headers = {
                'Content-Type': 'video/mp4',
                'Filename': filename 
            }
    
            #returneaza clipul descarcat
            return make_response(video_data, 200, headers)
        
        except Exception as e:
            print(str(e))
            return make_response(str(e), 500)
    
    return make_response("Invalid request", 400)





if __name__ == '__main__':
    #app.run(debug=True) 
    app.run(debug=False, host='0.0.0.0', port=5000) #pentru deploy