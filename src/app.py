from flask import Flask, render_template, make_response, request
import yt_dlp
from flask_cors import CORS

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
                info_dict = ydl.extract_info(url, download=False)#informatii despre videoclip
                
                video_id = info_dict.get("id", None)
                video_title = info_dict.get('title', None)
                video_extension = info_dict.get('ext', None)
                filename = video_title + " " + "[" + video_id + "]" + "." + video_extension

                print(filename)

                video_url = info_dict['url']
                video_data = ydl.urlopen(video_url).read()

                headers = {
                    'Content-Type': 'video/mp4',
                    'Filename': filename 
                }

                print(headers)

                return make_response(video_data, 200, headers)
        except Exception as e:
            return render_template('index.html', error=True)

    return render_template('index.html', error=False)









































#
#yt-dlp https://www.youtube.com/watch?v=_AyOSkEku8E  --download-sections "*00:00:16-00:00:22" --force-keyframes-at-cuts 
#


##Why would this command run as expected in command line, downloading only the specified part of the video, but using the python library of yt-dlp
##it would download the whole video instead?
##i'm trying to send the downloaded part of video as a response, but the whole video gets downloaded, its like the ydl_opts get totally ignored
##yt-dlp https://www.youtube.com/watch?v=MtN1YnoL46Q  --download-sections "*00:02:05-00:02:10" --force-keyframes-at-cuts

@app.route("/download_cut/", methods=['POST'])
def download_cut():
    if request.method == 'POST':
        url = request.form.get('link')  
        ydl_opts = {'format': 'best',
                    'download_sections' : "*00:00:16-00:00:22", 
                    'force_keyframes_at_cuts' : True,
                    }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(url, download=False)
                video_url = info_dict['url']
                video_data = ydl.urlopen(video_url).read()
                headers = {
                    'Content-Type': 'video/mp4',
                }
                return make_response(video_data, 200, headers)
        except Exception as e:
            return make_response(e)
    return make_response("Invalid request", 400)








































if __name__ == '__main__':
    #app.run(debug=True) 
    app.run(debug=False, host='0.0.0.0', port=5000) #pentru deploy
