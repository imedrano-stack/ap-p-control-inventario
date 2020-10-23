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
    if (codigo.value == "" || nombre.value == "" || descripcion.value == "" || cantidad.value =="" || costo.value ==""){
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
            index = i+1;
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

//Crea una tabla vacía//
function crearTabla(){

    //Crea un div para tener un espacio para la tabla//
    div.textContent="";

    //Se inserta una plantilla de la tabla
    div.insertAdjacentHTML("beforeend",`
    <table id="tabla1" style="text-align:center">
        <thead>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Costo</th>
        <thead>
        <tbody id="tabla" style="text-align:center">
        </tbody>`
    );
}

//Invierte el vector//
function invertir(vector){

    const reversed = vector.reverse()

    return reversed;
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
                "descripcion":descripcion.value,
                "cantidad":cantidad.value,
                "costo":costo.value
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
                "descripcion":descripcion.value,
                "cantidad":cantidad.value,
                "costo":costo.value
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

btnBuscar.addEventListener("click",()=>{

    //Se declara index que usa el metóto "encontrar", usando el vector y el código"//
    index = encontrar(productos,codigo)

    //Si el método no encuentra el producto en el vector//
    if (index == 0){
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>El producto no existe</p>");
    }

    //Si el método encuentra el producto en el vector//
    else{

        //Se resta un entero para poder estar en el lugar real en el vector//
        index--;

        
        let atributos =["id","nombre","descripcion","cantidad","costo"];
        let labels = ["Código","Nombre","Descripción","Cantidad","Costo"];
        
        //Crea un div para poder insertar la lista//
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<ul id='lista'></ul>")

        //Se declara variable tabla referenciando la tabla recien insertada//
        let lista = document.querySelector("#lista");
        
        //Ciclo que corre una vez por cada atributo//
        for (let i = 0; i < 5; i++){

            //Se crea un elemento "li"//
            let item = document.createElement("li");

            //Se agrega en este elemento primero la etiqueta de la información y despues en el vector se busca el lugar
            //del producto y se imprimen los atributos por el orden del vector//
            item.textContent = labels[i] + ": " + productos[index][atributos[i]];
            
            //Se agrega a la lista el item//
            lista.appendChild(item);
        }
    }
 })

btnListar.addEventListener("click",()=>{

    //Se usa el metódo "crearTabla" para insertar una tabla//
    crearTabla();

    console.log(productos);
    
    //Se declara variable tabla referenciando la tabla recien insertada//
    let tabla = document.querySelector("#tabla");

    //Por cada elemento
    productos.forEach(p =>{
        let ren = tabla.insertRow(-1);
        let columna0 = ren.insertCell(0);
        let columna1 = ren.insertCell(1);
        let columna2 = ren.insertCell(2);
        let columna3 = ren.insertCell(3);
        let columna4 = ren.insertCell(4);
        columna0.textContent = p.id;
        columna1.textContent = p.nombre;
        columna2.textContent = p.descripcion;
        columna3.textContent = p.cantidad;
        columna4.textContent = p.costo;
    })
})

btnListarInverso.addEventListener("click",()=>{
    
    //Se usa el metódo "crearTabla" para insertar una tabla//
    crearTabla();
    
    //Se usa el metódo "invertir", para invertir el vector//
    invertir(productos);

    let tabla = document.querySelector("#tabla");
    
    //Por cada elemento del vector se inserta en la tabla//
    productos.forEach(p =>{
        let renglon = tabla.insertRow(-1);
        let columna0 = renglon.insertCell(0);
        let columna1 = renglon.insertCell(1);
        let columna2 = renglon.insertCell(2);
        let columna3 = renglon.insertCell(3);
        let columna4 = renglon.insertCell(4);
        columna0.textContent = p.id;
        columna1.textContent = p.nombre;
        columna2.textContent = p.descripcion;
        columna3.textContent = p.cantidad;
        columna4.textContent = p.costo;
    })

    //Por si queremos volver a listar otra vez normal la tabla//
    invertir(productos);
})