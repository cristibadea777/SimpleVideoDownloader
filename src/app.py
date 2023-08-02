from flask import Flask, render_template, make_response, request
import yt_dlp

app = Flask(__name__)

@app.route("/", methods=['GET'])
def home():
    return render_template('index.html', error=False)

@app.route("/download", methods=['POST'])
def download():
    if request.method == 'POST':
        url = 'https://www.youtube.com/watch?v=MtN1YnoL46Q'
        ydl_opts = {'format': 'best'}

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(url, download=False)
                video_url = info_dict['url']
                response = make_response(ydl.urlopen(video_url).read())
                response.headers['Content-Type'] = 'video/mp4'
                response.headers['Content-Disposition'] = 'attachment; filename=video.mp4'
                return response
        except Exception as e:
            return render_template('index.html', error=True)

    return render_template('index.html', error=False)

if __name__ == '__main__':
    app.run(debug=True)
