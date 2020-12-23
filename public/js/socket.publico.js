


//Comando para establecer la conexión

var socket = io();

var lblTicket1 = document.querySelector("#lblTicket1");
var lblTicket2 = document.querySelector("#lblTicket2");
var lblTicket3 = document.querySelector("#lblTicket3");
var lblTicket4 = document.querySelector("#lblTicket4");

var lblEscritorio1 = document.querySelector("#lblEscritorio1");
var lblEscritorio2 = document.querySelector("#lblEscritorio2");
var lblEscritorio3 = document.querySelector("#lblEscritorio3");
var lblEscritorio4 = document.querySelector("#lblEscritorio4");

var lblTickets = [lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4];

var lblEscritorios = [lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4];

socket.on('estadoActual', function (data) {
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', function (data) {
    // actualizaHTML(data);
    var audio = new Audio('../audio/new-ticket.mp3');
    
    audio.play();

    actualizaHTML(data.ultimos4);
})

function actualizaHTML(ultimos4){

    for (let index = 0; index < ultimos4.length; index++) {
        lblTickets[index].innerText = `Ticket ${ultimos4[index].numero}`;
        lblEscritorios[index].innerText = `Escritorio ${ultimos4[index].escritorio}`;
        
    }

}