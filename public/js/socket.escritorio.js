

//Comando para establecer la conexión

var socket = io();

var label = document.querySelector('#escritorio');
var button = document.querySelector('#atender');
var labelTicket = document.querySelector("#ticket-atendido");

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('el escritorio es necesario');

}

var escritorio = searchParams.get('escritorio');

label.innerText = escritorio;

button.onclick = () => {

    socket.emit('atenderTicket', { escritorio: escritorio }, function (resp) {

        if (resp === 'No hay tickets') {
            
            labelTicket.innerText = resp
            alert(resp);
            return;
        }
        labelTicket.innerText = resp.numero

    })
}