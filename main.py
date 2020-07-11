from flask import Flask, request, jsonify, make_response, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    return "EDUHUB SERVER"

@app.route('/tutor')
def tutor():
    return render_template('tutor.html')

@app.route('/learner')
def learner():
    return render_template('learner.html')

@app.route('/send', methods=['POST'])
def send():
    print('[RECEIVING]')
    vid = json.loads(request.data)
    print(vid)
    # response = make_response(jsonify({'status': 'SUCCESS'}), 200)
    print('Sending')
    return "Hello"

if __name__ == '__main__':
    app.run(host='localhost', port='8000', debug=True)