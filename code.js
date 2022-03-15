//Definición de variables
const url = 'https://webapi.dms.ms/api/test'
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const nombre = document.getElementById('nombre')
const phone = document.getElementById('phone')
const email = document.getElementById('email')
const address = document.getElementById('address')
const postalZip = document.getElementById('postalZip')
const region = document.getElementById('region')
const country = document.getElementById('country')
const list = document.getElementById('list')
const text = document.getElementById('text')
const numberrange = document.getElementById('numberrange')
const currency = document.getElementById('currency')
const alphanumeric = document.getElementById('alphanumeric')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
    nombre.value = ''
    phone.value = ''
    email.value = ''
    address.value = ''
    postalZip.value = ''
    region.value = ''
    country.value = ''
    list.value = ''
    text.value = ''
    numberrange.value = ''
    currency.value = ''
    alphanumeric.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `<tr>
                            <td>${articulo.name}</td>
                            <td>${articulo.phone}</td>
                            <td>${articulo.email}</td>
                            <td>${articulo.address}</td>
                            <td>${articulo.postalZip}</td>
                            <td>${articulo.region}</td>
                            <td>${articulo.country}</td>
                            <td>${articulo.list}</td>
                            <td>${articulo.text}</td>
                            <td>${articulo.numberrange}</td>
                            <td>${articulo.currency}</td>
                            <td>${articulo.alphanumeric}</td>
                            <td class="text-center">
                            <a class="btnEditar btn btn-primary">Editar</a>
                            <a class="btnBorrar btn btn-danger">Borrar</a>
                            </td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.lastElementChild
    const id2 = id.previousElementSibling.innerHTML
    // console.log(id2)
    alertify.confirm("¿Estas seguro?",
    function(){
        fetch(url+"/"+id2, {
            method: 'DELETE'
            
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
// let alphanumericForm = 0
on(document, 'click', '.btnEditar', e => {   
    const fila = e.target.parentNode.parentNode
    alphanumericForm = fila.children[11].innerHTML
    const nameForm = fila.children[0].innerHTML
    const phoneForm = fila.children[1].innerHTML
    const emailForm = fila.children[2].innerHTML
    const addressForm = fila.children[3].innerHTML
    const postalZipForm = fila.children[4].innerHTML
    const regionForm = fila.children[5].innerHTML
    const countryForm = fila.children[6].innerHTML
    const listForm = fila.children[7].innerHTML
    const textForm = fila.children[8].innerHTML
    const numberrangeForm = fila.children[9].innerHTML
    const currencyForm = fila.children[10].innerHTML
    nombre.value = nameForm
    phone.value = phoneForm
    email.value = emailForm
    address.value = addressForm
    postalZip.value = postalZipForm
    region.value = regionForm
    country.value = countryForm
    list.value = listForm
    text.value = textForm
    numberrange.value = numberrangeForm
    currency.value = currencyForm
    alphanumeric.value = alphanumericForm
    opcion = 'editar'
    modalArticulo.show()
     
})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:nombre.value,
                phone:phone.value,
                email:email.value,
                address:address.value,
                postalZip:postalZip.value,
                region:region.value,
                country:country.value,
                list:list.value,
                text:text.value,
                numberrange:numberrange.value,
                currency:currency.value,
                alphanumeric:alphanumeric.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){    
        // console.log(alphanumericForm)
         fetch(url+"/"+alphanumericForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:nombre.value,
                phone:phone.value,
                email:email.value,
                address:address.value,
                postalZip:postalZip.value,
                region:region.value,
                country:country.value,
                list:list.value,
                text:text.value,
                numberrange:numberrange.value,
                currency:currency.value,
                alphanumeric:alphanumeric.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
})

