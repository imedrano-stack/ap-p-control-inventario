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

//Valida si todos los campos estan llenos//
function validar(){
    if (codigo.value == "" || nombre.value == "" || desc.value == "" || cantidad.value =="" || costo.value ==""){
        return 0;
    }
    else{
        return 1;
    }
}

//Encuentra un producto por medio de codigo//
function encontrar(vector,codigo){
    
    let index = 0;
    
    //Se busca en cada elemento del vector hasta encontrar un elemento con el mismo codigo//
    vector.forEach((p,i) =>{
        if (p.id == codigo.value){
            index = i++;
        }
    })
    
    //Regresa la posición donde se encuentra el elemento//
    return index;
}

//Borra un producto por medio de su id//
function borrar(vector,id){

    //Borra el elemento en la posición del "id"//
    delete vector[id]

    //Recorre el vector a la izquierda//
    for(let i = id;i<vector.length;i++){
        vector[i] = vector[i+1];
    }

    //Borra el elemento repetido al final del vector//
    vector.length--;

    //Regreso el vector final//
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

btnBorrar.addEventListener("click",()=>{

    //Se delcara index y se le asigna el metodo "encontrar"//
    index = encontrar(productos,codigo);
    
    //Si el metódo de busqueda no encontro el elemento en el vector//
    if (index == 0){

        //Se ingresa texto avisando de que no existe el producto//
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>El producto no existe</p>");
    }

    //Si el metódo de busqueda encontro el elemento en el vector
    else{

        //Se resta una unidad para que coincida con la posición real del vector//
        index--

        //Se usa el metódo de barrado usando el vector y la posición del elemento a borrar//
        borrar(productos,index);

        //Se ingresa un mensaje de confirmación que se elimino el elemento//
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>Producto eliminado.</p>");
    }
})