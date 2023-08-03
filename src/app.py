from flask import Flask, render_template, make_response, request
import yt_dlp
from flask_cors import CORS

app = Flask(__name__)

#pt cross origin 
#intr-un CORS, doar headerul content-type este expus, celelalte trebuie expuse manual daca vrem sa le folosi
CORS(app, expose_headers=['Filename'])

@app.route("/", methods=['GET'])
def home():
    return "<h1>Creeaza cerere POST catre API-ul Flask (127.0.0.1:5000/download) cu atributul 'link' in Body ce tine url-ul clipului</h1>"

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
                filename = video_title + " " + "[" + video_id + "]"

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

if __name__ == '__main__':
    app.run(debug=True)
