const { io } = require('../server');
const { TicketControl } = require('../class/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        callback(siguiente);

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback) => {


        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // Actualizar/notificar cambios en los ultimos 4

        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimosCuatro()
        });

    })

});