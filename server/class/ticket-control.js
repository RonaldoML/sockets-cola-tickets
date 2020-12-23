
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuarto = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuarto = data.ultimosCuarto;

        } else {

            this.reiniciarConteo();

        }

    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;


    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatro() {
        return this.ultimosCuarto;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimosCuarto.unshift(atenderTicket);

        if (this.ultimosCuarto.length > 4) {

            this.ultimosCuarto.splice(-1, 1); //borrar el último


        }
        console.log('Últimos 4');
        console.log(this.ultimosCuarto);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuarto = [];

        console.log('Se ha inicializado el sistema');

        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuarto: this.ultimosCuarto
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}

module.exports = {
    TicketControl
}