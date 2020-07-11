from flask import Flask, request, jsonify, make_response, render_template
import json
import random
from datetime import datetime
import os

app = Flask(__name__)

@app.route('/')
def index():
    videos = []
    for vidID in os.listdir('videos'):
        with open('videos/' + vidID, 'rb') as f:
            name = json.loads(f.read()).get('name')
        videos.append({'name' : name, 'href': 'learner/'+vidID})

    return render_template('index.html',videos = videos)

@app.route('/tutor')
def tutor():
    return render_template('tutor.html', canvas=True)

@app.route('/learner/<int:vidID>')
def learner(vidID):
    return render_template('learner.html', canvas=True)

@app.route('/upload', methods=['POST'])
def upload():
    print('[UPLOAD]')
    vid = json.loads(request.data)
    random.seed(datetime.now())
    videoID = random.randint(100000000,999999999)
    with open('videos/' + str(videoID), 'wb') as f:
        f.write(request.data)
    response = make_response(jsonify({'status': 'SUCCESS'}), 200)
    return response

@app.route('/success')
def success():
    return render_template('success.html', title='Success', message='Your video is uploaded successfully.')

@app.route('/download')
def download():
    print('[DOWNLOAD]')
    id = request.args.get('id')
    with open('videos/' + id, 'rb') as f:
        vid = f.read()
    response = make_response(vid, 200)
    return response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port='8000')