from flask import Flask, request, jsonify, make_response, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    return "EDUHUB SERVER"

@app.route('/tutor')
def tutor():
    return render_template('tutor.html', canvas=True)

@app.route('/learner')
def learner():
    return render_template('learner.html', canvas=True)

@app.route('/upload', methods=['POST'])
def upload():
    print('[UPLOAD]')
    with open('videos/1', 'wb') as f:
        f.write(request.data)
    response = make_response(jsonify({'status': 'SUCCESS'}), 200)
    return response

@app.route('/success')
def success():
    return render_template('success.html', title='Success', message='Your video is uploaded successfully.')

@app.route('/download')
def download():
    print('[DOWNLOAD]')
    # id = request.args.get('')
    with open('videos/1', 'rb') as f:
        vid = f.read()
    response = make_response(vid, 200)
    return response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port='8000', debug=True)