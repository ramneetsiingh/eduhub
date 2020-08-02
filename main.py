from flask import Flask, request, jsonify, make_response, render_template
import json
import random
from datetime import datetime
import os
from dbConfig import client

app = Flask(__name__)

db = client['eduhub']['videos']

@app.route('/')
def index():
    videos = []
    all_videos = db.find({}, {'name': 1, 'id': 1})
    for vid in all_videos:
        videos.append({'name' : vid['name'], 'href': 'learner/'+ str(vid['id'])})

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
    vid['id'] = random.randint(100000000,999999999)
    db.insert_one(vid)
    response = make_response(jsonify({'status': 'SUCCESS'}), 200)
    return response

@app.route('/success')
def success():
    return render_template('success.html', title='Success', message='Your video is uploaded successfully.')

@app.route('/download')
def download():
    print('[DOWNLOAD]')
    id = int(request.args.get('id'))
    vid = db.find_one({'id': id})
    vid.pop('_id')
    response = make_response(json.dumps(vid), 200)
    return response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port='8000')