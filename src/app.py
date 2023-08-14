from flask import Flask, render_template, make_response, request
import yt_dlp
from flask_cors import CORS

import ffmpeg
import io
import moviepy

import subprocess

app = Flask(__name__, static_folder='static')

#pornit aplicatia pe 127.0.0.1:5000 --- $ python -m flask --app .\src\app.py run  

#pt cross origin 
#intr-un CORS, doar headerul content-type este expus, celelalte trebuie expuse manual daca vrem sa le folosi
CORS(app, expose_headers=['Filename'])

@app.route("/", methods=['GET'])
def home():
    return render_template("index.html")


@app.route("/download/", methods=['POST'])
def download():
    if request.method == 'POST':

        url = request.form.get('link')  #ia elementul 'link' din cererea POST
        
        if not url:
            return make_response("Link not provided", 400)
        
        ydl_opts = {'format': 'best'}

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(url, download=False)#informatii despre videoclip.
                video_id = info_dict.get("id", None)
                video_title = info_dict.get('title', None)
                video_extension = info_dict.get('ext', None)
                filename = video_title + " " + "[" + video_id + "]" + "." + video_extension
                print(filename)
                video_url = info_dict['url']
                video_data = ydl.urlopen(video_url).read() #video_data va fi stocata in RAM nu pe hard drive
                headers = {
                    'Content-Type': 'video/mp4',
                    'Filename': filename 
                }
                print(headers)
                return make_response(video_data, 200, headers)
        except Exception as e:
            return render_template('index.html', error=True)

    return render_template('index.html', error=False)

@app.route("/download_cut/", methods=['POST'])
def download_cut():
    if request.method == 'POST':
        url = request.form.get('link')
        ydl_opts = {
            'format': 'best'
        }

        start = str(24.55)
        end = str(27)
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(url, download=False)
                video_url = info_dict['url']
                video_id = info_dict.get("id", None)
                video_title = info_dict.get('title', None)
                video_extension = info_dict.get('ext', None)
                filename = video_title + " " + "[" + video_id + "]" + "." + video_extension
                print(filename)

                video_data = ydl.urlopen(video_url).read()
                input_stream = io.BytesIO(video_data)

                ffmpeg_process = (
                    subprocess.Popen(
                        [
                            'ffmpeg',
                            '-i', 'pipe:0',    
                            '-ss', start,       
                            '-to', end,       
                            '-c:v', 'libx264',
                            '-c:a', 'aac',
                            '-f', 'mp4',
                            '-movflags', 'frag_keyframe+empty_moov',
                            'pipe:1'      
                        ],
                        stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE
                    )
                )    
                            
                trimmed_video_data, ffmpeg_stderr = ffmpeg_process.communicate(input=input_stream.read())
                
                headers = {
                    'Content-Type': 'video/mp4',
                    'Filename': filename 
                }

                return make_response(trimmed_video_data, 200, headers)
        except Exception as e:
            return make_response(str(e), 500)
    return make_response("Invalid request", 400)








































if __name__ == '__main__':
    #app.run(debug=True) 
    app.run(debug=False, host='0.0.0.0', port=5000) #pentru deploy
