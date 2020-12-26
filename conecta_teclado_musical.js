// ==> Simula o apertar de teclas de um teclado de computador
function simulateKey(keyCode, type, modifiers) {
    var evtName = (typeof (type) === "string") ? "key" + type : "keydown";
    var modifier = (typeof (modifiers) === "object") ? modifier : {};

    var event = document.createEvent("HTMLEvents");
    event.initEvent(evtName, true, false);
    event.keyCode = keyCode;

    for (var i in modifiers) {
        event[i] = modifiers[i];
    }

    document.dispatchEvent(event);
}

// Setup some tests
var onKeyEvent = function (event) {
    var state = "pressed";

    if (event.type !== "keypress") {
        state = event.type.replace("key", "");
    }

    //console.log("Key with keyCode " + event.keyCode + " is " + state);
};

document.addEventListener("keypress", onKeyEvent, false);
document.addEventListener("keydown", onKeyEvent, false);
document.addEventListener("keyup", onKeyEvent, false);

// Using the function
// simulateKey(81); // simula apertar a tecla Q
// simulateKey(81, "up"); // simula soltar a tecla Q
// simulateKey(81, "press");
// <===

// ===> Conecta o instrumento musical ao navegador e ao script de que simula um teclado de computador
function requestMIDIAccessSuccess(midi) {
    var inputs = midi.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = midiOnMIDImessage;
    }
    midi.onstatechange = midiOnStateChange;
}

function midiOnStateChange(event) {
    console.log(event.port.manufacturer + ' ' + event.port.name + ' ' + event.port.state);
    // ===> Exibe mensagem de se o instrumento está conectado ou não
    let kbmsg = document.getElementById('kbmsg')
    kbmsg.innerHTML = event.port.manufacturer + ' ' + event.port.name + ' ' + event.port.state
    teclado()
    // <===
}

function requestMIDIAccessFailure(e) {
    console.log('requestMIDIAccessFailure', e);
}

function midiOnMIDImessage(event) {
    var data = event.data;
    var type = data[0]; // Código do Instrumento
    var pitch = data[1]; // Código da Nota Musical
    var velocity = data[2]; // Intensidade e Soltura
    const teclasKeyCodes = {
        60: 81,
        61: 50,
        62: 87,
        63: 51,
        64: 69,
        65: 82,
        66: 53,
        67: 84,
        68: 54,
        69: 89,
        70: 55,
        71: 85,
        72: 73,
        73: 57,
        74: 79,
        75: 48,
        76: 80,
        77: 219,
        78: 187,
        79: 221,
        80: 65,
        81: 90,
        82: 83,
        83: 88,
        84: 67,
        85: 70,
        86: 86,
        87: 71,
        88: 66,
        89: 78,
        90: 74,
        91: 77,
        92: 75,
        93: 188,
        94: 76,
        95: 190
    }

    let novoPitch = teclasKeyCodes[pitch]
    if (type == 144) {
        if (novoPitch == undefined) {
            desfazerAcorde()
        } else {
            if (velocity > 0) {
                //console.log("Tocou")
                simulateKey(novoPitch)
            } else {
                //console.log("Soltou")
                simulateKey(novoPitch, "up")
            }
        }
    }

}

if (navigator.requestMIDIAccess) {
    console.log('navigator.requestMIDIAccess ok');
    navigator.requestMIDIAccess().then(requestMIDIAccessSuccess, requestMIDIAccessFailure);
} else {
    console.log('navigator.requestMIDIAccess undefined');
}
// <===