from flask import Flask, make_response, jsonify
import json
app = Flask(__name__)


@app.route('/listelements', methods=['POST'])
def retornaListaReportsAll():
    data_elements = [{'test': 'POST'}]
    error = False
    if not error:
        return json.dumps({'error': False, 'data': data_elements}), 200
    else:
        return json.dumps({'error': True, 'data': 1}), 400


@app.after_request
def add_security_headers(resp):
    resp.headers['X-XSS-Protection'] = '1; mode=block'
    resp.headers['X-Frame-Options'] = 'DENY'
    resp.headers['Content-Security-Policy'] = "frame-ancestors 'none'"
    return resp


if __name__ == "__main__":
    app.run(debug=False, host='127.0.0.1', port=5000)