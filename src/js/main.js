function require_once(src) {
    const script = document.createElement('script');
    script.src = `src/js/${src}`;
    document.body.appendChild(script);
}

function CreateRoom(array) {
    array.forEach((number, index) => {
        const middle = Math.floor(Math.floor(array.length) / 2) - 1;
        const floor = document.createElement('div');
        if (index === middle) {
            floor.setAttribute('data-door', true);
        }
        floor.classList.add('row');
        floor.setAttribute('data-amount', number);
        $('#room').append(floor);
    });
}

require_once('room.js');
require_once('player.js');