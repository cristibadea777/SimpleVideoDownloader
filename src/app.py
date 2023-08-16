from flask import Flask, render_template, make_response, request
import yt_dlp
from flask_cors import CORS

import io
import subprocess
app = Flask(__name__, static_folder='static')

#pornit aplicatia pe 127.0.0.1:5000 --- $ python -m flask --app .\src\app.py run  

#pt cross origin 
#intr-un CORS, doar headerul content-type este expus, celelalte trebuie expuse manual daca vrem sa le folosi
CORS(app, expose_headers=['Filename'])

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

            #descarcare / descarcare si taiere clip pe server (in disk)
            if start and end:
                command = f"yt-dlp {url} --download-sections *{start}-{end} --force-keyframes-at-cuts"
            else:
                command = f"yt-dlp {url}"
            subprocess.run(command, check=True) #check=True - pt a termina comanda si a ridica exceptie daca exista

            #citire clip descarcat, stocare in video_data (in RAM) 
            with open(filename, 'rb') as video_file:
                video_data = video_file.read()

            #stergere clip de pe disk
            subprocess.run(f"rm '{filename}'", check=True)
                  
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
