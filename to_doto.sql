1. Añadir el elemento que contendrá JSON en layout.html
	<div>
            <pre id="json-id">{{ json_data }}</pre>
       </div>
	--Muevas el frame scripting
2. modificar retorna  la ruta JSON --> POST
 --de esto : 
     lista_elementos = [{'comida': 'GET'}]
    error = False
    if not error:
        return json.dumps({'error': False, 'data': lista_elementos}), 200
    else:
        return json.dumps({'error': True, 'data': 1}), 400
-- a esto:
    data_elements = [{'test': 'POST'}]
    error = False
    if not error:
        json_data =  json.dumps({'error': False, 'data': data_elements})
        return render_template('layout.html', json_data=json_data), 200
    else:
        json_data = json.dumps({'error': True, 'data': 1})
        return render_template('layout.html', json_data=json_data),400
		
3. Ir al archivo donde se usa laruta:
	--comentar el -- dataType 
	-- obetener JSON de la siogiiente forma

 $.ajax({
                type : "POST",
                url  : "{{url_for('index')}}",
                //dataType: "json",
                data : {comida:'asdsaasdasdd'},
            }).done(function(response){
		
                const parser = new DOMParser();  //***********
                const doc = parser.parseFromString(response, 'text/html');//*********** 
                const jsonText = doc.querySelector('#json-id').textContent; //***********
                const jsonData = JSON.parse(jsonText); //***********
				console.log(jsonData); //***********
				
                error = jsonData['error']
				data = jsonData['data']
               


            }).fail(function(R){
                console.log(R)
                alert('Error al intentar obtener un captcha nuevo')

            })
