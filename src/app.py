from flask import Flask, render_template, make_response, request
from flask_cors import CORS
import io
import subprocess
import re

################################
################################
##TO DO
    #de setat limita de requesturi pe minut
    #https://jerrington.me/posts/2019-01-29-self-hosted-ngrok.html
    #https://www.youtube.com/watch?v=BpcK5jON6Cg
    #https://www.youtube.com/watch?v=KWIIPKbdxD0&t=810s
    #serveo.ne -- ca ngrok
##
################################
################################

#Din faza de development in faza de productie
#Aplicatia trebuia pusa pe un server de productie
#Gunicorn - Webserver Gateway Interface - produce interfata pentru aplicatia Flask
#Nginx - proxy server 
#Userul acceseaza serverul proxy Nginx, care apoi se foloseste de Gunicorn, care la randul lui va accesa aplicatia si va fi trimisa userului 

app = Flask(__name__, static_folder='static')
#activat venv cu $ .\venv\Scripts\activate
#pornit aplicatia pe 127.0.0.1:5000 cu $ python -m flask --app .\src\app.py run  


#pt cross origin 
#intr-un CORS, doar headerul content-type este expus, celelalte trebuie expuse manual daca vrem sa le folosi
CORS(app, expose_headers=['Filename'])


def linkuriAcceptate(link):
    pattern =   r".*facebook*.|.*tiktok*.|.*instagram*.|.*dailymotion*.|.*odysee*.|.*piped*.|.*vimeo*."
    if(re.match(pattern, link) ):
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
            #return make_response("Link not accepted", 400)
            url = 'https://youtu.be/' + url #voodoo pt a da bypass restrictiei din frontend

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

            #pt clipurile de TikTok, care au hashtaguri fara numar
            filename = re.sub(r'#\w+\s*', '', filename)
            print(filename)

            filesize_process = subprocess.run(
                ["yt-dlp", url, "-O", "%(filesize,filesize_approx)s"],
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