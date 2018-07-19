const websocket = require('ws');
const wss = new websocket.Server({
    port: 80,
    backlog: 2 
});

wss.on('connection',function (ws) {
    // console.log(wss.clients);
    ws.on('message', function (message) {
        console.log('received: %s', message);
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws.OPEN) {
            client.send(message);
            }
        });
    });
    
    wss.on('close', function () {
        console.log('close connet')
    })

})
