from flask import Flask, make_response,jsonify, render_template, request
import json
app = Flask(__name__)


@app.route('/', methods=['POST'])
def index():
    usuario = request.form['comida']
    data = {'name': 'John', 'age': 30, 'city': 'New York', 'response': usuario}
    json_data = json.dumps(data)
    return render_template('layout.html', json_data=json_data), 200

@app.route('/prueba')
def prueba():
    data = {'name': 'John', 'age': 30, 'city': 'New York'}
    json_data = jsonify(data)
    return render_template('prueba.html'), 200


@app.route('/listarreportes', methods=['POST'])
def retornaListaReportsAll():
    data_elements = [{'test': 'POST'}]
    error = False
    if not error:
        json_data =  json.dumps({'error': False, 'data': data_elements})
        return render_template('layout.html', json_data=json_data), 200
    else:
        json_data = json.dumps({'error': True, 'data': 1})
        return render_template('layout.html', json_data=json_data),400


@app.route('/listar', methods=['GET'])
def retornaListaReportsAll2():
    lista_elementos = [{'comida': 'GET'}]
    error = False
    if not error:
        return json.dumps({'error': False, 'data': lista_elementos,
                           "frame_busting_code": "(function(){if(top!=self){top.location.href=self.location.href;}})();"
        }), 200
    else:
        return json.dumps({'error': True, 'data': 1}), 400




@app.after_request
def add_security_headers(resp):
    # resp.headers['Content-Security-Policy']="default-src 'self' style-src 'self' 'unsafe-inline'; img-src 'self' data:;"     #OLD
    # resp.headers['Content-Security-Policy']="default-src https:; object-src 'none'"
    #resp.headers['Content-Security-Policy'] = "frame-ancestors 'none'"
    # resp.headers['X-Content-Type-Options'] = 'nosniff' #Habilitar para servidor
    # resp.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';#OJO
    # resp.headers['X-XSS-Protection'] = '1; mode=block'
    #resp.headers['X-Frame-Options'] = 'DENY';
    resp.headers.add('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0')
    return resp

if  __name__ == "__main__":
    # app.run(debug=True, port=5000, host='0.0.0.0')
    app.run(debug=True, host='0.0.0.0', port=5000)