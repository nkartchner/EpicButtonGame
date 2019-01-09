$(document).ready(function () {

    const socket = io();
    let localCounter;

    $('#main').click(function(){
        socket.emit('incriment', localCounter);
    });

    $('#reset').click(function(){
        socket.emit('reset', localCounter);
    });

    socket.on('welcome', function(response){
        localCounter = response; 
        $('#count').text(`${localCounter}`);
    });

    socket.on('update', function (response) {
        localCounter = response;
        $('#counter').text(`The button has been pushed ${localCounter} time(s)`);
    });

    socket.on('reset_success', function(data){
        $('#counter').text(`The counter has just been reset!`);
    });

});