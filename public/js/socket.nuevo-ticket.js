

//Comando para establecer la conexión

var socket = io();

var label = document.querySelector("#lblNuevoTicket");

socket.on('connect', function () {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function (resp) {
    console.log(resp);
    label.innerText = resp.actual;
});

document.querySelector("#new-ticket").onclick = () => {
    console.log('object');
    socket.emit('siguienteTicket', null, function (siguienteTicket) {

        label.innerText = siguienteTicket;

    });

}
