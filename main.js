///////////////////////////////Variables de las cajas de input///////////////////////////////////////////////////

var codigo = document.querySelector('#codigo')
var nombre = document.querySelector('#nombre')
var descripcion = document.querySelector('#descripcion')
var cantidad =document.querySelector('#cantidad')
var costo = document.querySelector('#costo')
var posicion = document.querySelector('#posicion')

///////////////////////////////Variables de los botones///////////////////////////////////////////////////////////

var btnAgregar = document.querySelector('#agregar')
var btnBorrar = document.querySelector('#borrar')
var btnBuscar = document.querySelector('#buscar')
var btnListar = document.querySelector('#listar')
var btnListarInverso = document.querySelector('#listarInverso')

///////////////////////////////Variable del div de resultados//////////////////////////////////////////////////////

var div = document.querySelector('#resultado')

//////////////////////////////Variables para el guardado de datos//////////////////////////////////////////////////

var productos = []
var contador = 0
let cond = 0
let index = 0

/////////////////////////////Funciones/////////////////////////////////////////////////////////////////////////////

function encontrar(vector,codigo){
    
    let index = 0;
    
    vector.forEach((p,i) =>{
        if (p.id == codigo.value){
            index = i++;
        }
    })
    
    return index;
}

function crearTabla(){

    div.textContent="";
    div.insertAdjacentHTML("beforeend",`<table id="t1" style="text-align:center">
    <thead>
    <th>Código</th>
    <th>Nombre</th>
    <th>Descripción</th>
    <th>Cantidad</th>
    <th>Costo</th>
    <thead>
    <tbody id="tabla" style="text-align:center"></tbody>`);
}

function invertir(vector){

    let temp;
    let n = vector.length
    for (let i = 0; i < n/2; i++){
        temp = vector[i];
        vector[i] = vector[n-i-1];
        vector[n-i-1] = temp;
    }

    for(let j = 0;j<n;j++){
        if (productos[j] == undefined){
            delete productos[j]
        }
    }

    return vector;
}

function validar(){
    if (codigo.value == "" || nombre.value == "" || desc.value == "" || cantidad.value =="" || costo.value ==""){
        return 0;
    }
    else{
        return 1;
    }
}

function borrar(vector,id){
    delete vector[id]
    for(let j = id;j<vector.length;j++){
        vector[j] = vector[j+1];
    }
    vector.length--;
    return vector;
}

/////////////////////////////Usabilidad de los botones//////////////////////////////////////////////////////////////

btnAgregar.addEventListener("click",()=>{

    //Si el campo de posicion esta vacío//
    
    if(posicion.value == ""){

        cond = 0;

        //Se usa la variable validacion con el metodo validar para saber si todos los campos estan llenos//
        let validacion = validar();

        //La variable "contador" se le da el valor de la longitud del vector de productos//
        contador = productos.length;
        
        //Si el metodo de validación resulta positivo//
        if (validacion == 1){

            //Se crea la variable "objeto" que tendra los valores ingresados en los campos//
            var objeto = {
                "id":codigo.value,
                "nombre":nombre.value,
                "desc":desc.value,
                "cant":cantidad.value,
                "cost":costo.value
            }

            //Si la variable "contador" es menor a 20//
            if (contador < 20){

                //Se revisa el vector de "productos" uno por uno//
                productos.forEach(p =>{

                    //Si la variable "objeto" declarada atras su id es igual a un id dentro del vector, "cond" sera 1//
                    if (objeto.id == p.id){
                        cond = 1;
                    }
                })

                //En caso de que no se haya encontrado la id en el vector "productos"//
                if(cond == 0){

                    //El vector "productos" en la ultima posicion que tiene de sus productos se le agrega los valores ingresados en "objeto"//
                    productos[contador] = objeto;
                    
                    //Se crea un div vacio y despues se inserta un texto antes del final del elemento//
                    div.textContent="";
                    div.insertAdjacentHTML("beforeend","<p>Producto agregado.</p>");
                }

                //En caso de que se haya encontrado la id en el vector, se inserta un texto avisando que ya existe//
                else{
                    div.textContent="";
                    div.insertAdjacentHTML("beforeend","<p>Producto ya agregado.</p>");
                }
            }

            //Si el vector tiene 20 productos//
            else{

                //Se ingresa un texto avisando que ya esta lleno el vector//
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>Máximo de productos</p>");
            }
        }

        //Si el metódo de validación detecta algun campo vacío//
        else{

            //Se ingresa un texto avisandonos que un campo esta vacío//
            div.textContent="";
            div.insertAdjacentHTML("beforeend","<p>Algún campo esta vacío.</p>");
        }
    }

    //Si se agrego un numero en el campo de posición//
    else{

        cond = 0;

        //Se usa la variable validacion con el metodo validar para saber si todos los campos estan llenos//
        let validacion = validar();

        //La variable "contador" se le da el valor de la longitud del vector de productos//
        contador = productos.length;

        //Si el metódo de validación resulta positivo y el valor ingresado en "posición" resulta ser menor a la longitud del vector actual//
        if (validacion == 1 && (posicion.value-1) < contador){
            
            //Se crea la variable "objeto" que tendra los valores ingresados en los campos//
            var objeto = {
                "id":codigo.value,
                "nombre":nombre.value,
                "desc":desc.value,
                "cant":cantidad.value,
                "cost":costo.value
            }

            //Si la variable "contador" es menor a 20//
            if (contador < 20){

                //Se revisa el vector de "productos" uno por uno//
                productos.forEach(p =>{

                    //Si la variable "objeto" declarada atras su id es igual a un id dentro del vector, "cond" sera 1//
                    if (objeto.id == p.id){
                        cond = 1;
                    }
                })

                //En caso de que no se haya encontrado la id en el vector "productos"//
                if(cond == 0){
                    
                    //Variable "a" con valor del número ingresado en posición//
                    let a = posicion.value - 1;

                    //Ciclo que empieza desde el final del vector hasta la posición ingresada//
                    for (let i = productos.length; i > a;i--){

                        //Se recorre el vector a la derecha//
                        productos[i] = productos[i-1];
                    }

                    //Se ingresan los valores en el espacio ahora libre//
                    productos[a] = objeto;

                    //Se envia un mensaje de confirmación de ingreso del producto//
                    div.textContent="";
                    div.insertAdjacentHTML("beforeend","<p>Producto agregado.</p>");
                }

                //En caso de que se haya encontrado la id en el vector, se inserta un texto avisando que ya existe//
                else{
                    div.textContent="";
                    div.insertAdjacentHTML("beforeend","<p>Producto ya agregado.</p>");
                }
            }

            //Si el vector tiene 20 productos//
            else{

                //Se ingresa un texto avisando que ya esta lleno el vector//
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>Máximo de productos</p>");
            }
        }

        //Si el metódo de validación detecta algun campo vacío//
        else{

            //Se ingresa un texto avisando que ya esta lleno el vector//
            div.textContent="";
            div.insertAdjacentHTML("beforeend","<p>Algún campo esta vacío o no se puede insertar en el espacio indicado.</p>");
        }
    }
})