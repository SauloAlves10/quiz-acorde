function AudioSynthView() {

	// ===> Seta as variáveis
	let acordeQuiz, ativarQuiz, setimaOpcoes, qualidade
	let notasAcordeQuiz = []
	let acordeFeito = []
	let codigosTeclas = []
	let pontos = 0
	
	let sorteio = new Sorteio
	let painel = new Painel
	
	const $ = document.querySelector.bind(document)
	
	const htmlAcordeQuiz = $('#acorde-quiz')
	const htmlAcordeFeito = $('#acorde-feito')
	const htmlPontuacao = $('#pontuacao')

	const acordeMaior = $('#acorde-maior')
	const acordeMenor = $('#acorde-menor')
	const acordeDiminuto = $('#acorde-diminuto')
	const acordeAumentado = $('#acorde-aumentado')
	const setimaNA = $('#NA')
	const setimaMaior = $('#setima-maior')
	const setima = $('#setima')

	let opcoesAcoSet = [acordeMaior, acordeMenor, acordeDiminuto, acordeAumentado, setimaNA, setimaMaior, setima]
	for (element of opcoesAcoSet) {
		element.addEventListener('click', () => listagemDeAcordes())
	}
	// <===

	// ===> Lista o Acorde para o Quiz baseado nas opções selecionadas na página
	(function listagemDeAcordes() {

		for (element of document.getElementsByName('tipos-acordes')) {
			if (element.checked) qualidade = element.value
		}
		for (element of document.getElementsByName('setimas')) {
			if (element.checked) setimaOpcoes = element.value
		}

		// Só permite a 7 ou 7M se o acorde for maior ou menor
		if (qualidade === 'diminuto' || qualidade === 'aumentado') {
			setimaMaior.disabled = true
			setima.disabled = true
			setimaNA.checked = true
		} else {
			setimaMaior.disabled = false
			setima.disabled = false
		}

		quiz()
	})()
	// <===

	// ===> Sorteia um acorde da lista para o Quiz após tratá-lo
	function quiz() {

		// Sorteio a tônica
		acordeQuiz = sorteio.acordeQuiz()
		//console.log(acordeQuiz)

		// Constrói as notas do acorde a partir da tônica
		notasAcordeQuiz = sorteio.notasAcordeQuiz(qualidade, setimaOpcoes)
		//console.log(notasAcordeQuiz)

		// ===> Trata o acorde solicitado para exibição na página
		acordeQuiz = painel.acordeQuizTxt(acordeQuiz, qualidade, setimaOpcoes)

		ativarQuiz = true

		htmlAcordeQuiz.innerText = `Acorde Solicitado: ${acordeQuiz}`

		htmlAcordeQuiz.style.color = "black"
		htmlAcordeFeito.style.color = "black"
		htmlPontuacao.style.color = "black"
	}
	// <===

	// ===> Seta as funções dos botões da página
	desfazerAcorde = () => {
		acordeFeito = []

		htmlAcordeFeito.innerText = "Notas: "

		restaurarTeclas()
	}

	restaurarTeclas = () => {
		for (element of codigosTeclas) {
			visualKeyboard[keyboard[element]].style.backgroundColor = ""
		}
		codigosTeclas = []
	}

	let travar = false
	travarPagina = () => {
		if (!travar) {
			document.body.style.overflow = "hidden"
			document.body.style.touchAction = "none"
			document.getElementById('travar-tela').innerHTML = `\u{1f512}`
			document.getElementById('travar-tela').style.backgroundColor = "yellow"
		} else {
			document.body.style.overflow = "auto"
			document.body.style.touchAction = "auto"
			// Implementar posteriormente trava de orientação de tela para aparelhos mobile
			//screen.orientation.unlock()
			document.getElementById('travar-tela').innerHTML = `\u{1f513}`
			document.getElementById('travar-tela').style.backgroundColor = ""
		}
		travar = !travar
	}

	let tecladoMusical = false
	teclado = () => {
		if (!tecladoMusical) {
			document.getElementById('teclado').style.backgroundColor = "yellow"
		} else {
			document.getElementById('teclado').style.backgroundColor = ""
		}
		tecladoMusical = !tecladoMusical
		desfazerAcorde()
	}
	// <===

	var isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	if (isMobile) { var evtListener = ['touchstart', 'touchend']; } else { var evtListener = ['mousedown', 'mouseup']; }

	var __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.5);
	var __octave = 4;

	// Change octave
	var fnChangeOctave = function (x) {

		x |= 0;

		__octave += x;

		__octave = Math.min(5, Math.max(3, __octave));

		var octaveName = document.getElementsByName('OCTAVE_LABEL');
		var i = octaveName.length;
		while (i--) {
			var val = parseInt(octaveName[i].getAttribute('value'));
			octaveName[i].innerHTML = (val + __octave);
		}

		document.getElementById('OCTAVE_LOWER').innerHTML = __octave - 1;
		document.getElementById('OCTAVE_UPPER').innerHTML = __octave + 1;

	};

	// Key bindings, notes to keyCodes.
	var keyboard = {

		/* 2 */
		50: 'C#,-1',

		/* 3 */
		51: 'D#,-1',

		/* 5 */
		53: 'F#,-1',

		/* 6 */
		54: 'G#,-1',

		/* 7 */
		55: 'A#,-1',

		/* 9 */
		57: 'C#,0',

		/* 0 */
		48: 'D#,0',

		/* + */
		187: 'F#,0',
		61: 'F#,0',

		/* Q */
		81: 'C,-1',

		/* W */
		87: 'D,-1',

		/* E */
		69: 'E,-1',

		/* R */
		82: 'F,-1',

		/* T */
		84: 'G,-1',

		/* Y */
		89: 'A,-1',

		/* U */
		85: 'B,-1',

		/* I */
		73: 'C,0',

		/* O */
		79: 'D,0',

		/* P */
		80: 'E,0',

		/* [ */
		219: 'F,0',

		/* ] */
		221: 'G,0',

		/* A */
		65: 'G#,0',

		/* S */
		83: 'A#,0',

		/* F */
		70: 'C#,1',

		/* G */
		71: 'D#,1',

		/* J */
		74: 'F#,1',

		/* K */
		75: 'G#,1',

		/* L */
		76: 'A#,1',

		/* Z */
		90: 'A,0',

		/* X */
		88: 'B,0',

		/* C */
		67: 'C,1',

		/* V */
		86: 'D,1',

		/* B */
		66: 'E,1',

		/* N */
		78: 'F,1',

		/* M */
		77: 'G,1',

		/* , */
		188: 'A,1',

		/* . */
		190: 'B,1'

	};

	var reverseLookupText = {};
	var reverseLookup = {};

	// Create a reverse lookup table.
	for (var i in keyboard) {

		var val;

		switch (i | 0) {

			case 187:
				val = 61;
				break;

			case 219:
				val = 91;
				break;

			case 221:
				val = 93;
				break;

			case 188:
				val = 44;
				break;

			case 190:
				val = 46;
				break;

			default:
				val = i;
				break;

		}

		reverseLookupText[keyboard[i]] = val;
		reverseLookup[keyboard[i]] = i;

	}

	// Keys you have pressed down.
	var keysPressed = [];
	var visualKeyboard = null;
	var selectSound = null;

	var fnCreateKeyboard = function (keyboardElement) {
		// Generate keyboard
		// This is our main keyboard element! It's populated dynamically based on what you've set above.
		visualKeyboard = document.getElementById('keyboard');
		selectSound = document.getElementById('sound');

		var iKeys = 0;
		var iWhite = 0;
		var notes = __audioSynth._notes;

		for (var i = -1; i <= 1; i++) {
			for (var n in notes) {
				if (n[2] != 'b') {
					var thisKey = document.createElement('div');
					if (n.length > 1) {
						thisKey.className = 'black key';
						thisKey.style.width = '30px';
						thisKey.style.height = '120px';
						thisKey.style.left = (40 * (iWhite - 1)) + 25 + 'px';
					} else {
						thisKey.className = 'white key';
						thisKey.style.width = '40px';
						thisKey.style.height = '200px';
						thisKey.style.left = 40 * iWhite + 'px';
						iWhite++;
					}
					var label = document.createElement('div');
					label.className = 'label';
					label.innerHTML = '<b>' + String.fromCharCode(reverseLookupText[n + ',' + i]) + '</b>' + '<br /><br />' + n.substr(0, 1) +
						'<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)) + '</span>' + (n.substr(1, 1) ? n.substr(1, 1) : '');
					thisKey.appendChild(label);
					thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
					thisKey.addEventListener(evtListener[0], (function (_temp) { return function () { fnPlayKeyboard({ keyCode: _temp }); } })(reverseLookup[n + ',' + i]));
					visualKeyboard[n + ',' + i] = thisKey;
					visualKeyboard.appendChild(thisKey);
					iKeys++;
				}
			}
		}

		visualKeyboard.style.width = iWhite * 40 + 'px';

		window.addEventListener(evtListener[1], function () { n = keysPressed.length; while (n--) { fnRemoveKeyBinding({ keyCode: keysPressed[n] }); } });

	};

	// Creates our audio player
	var fnPlayNote = function (note, octave) {

		src = __audioSynth.generate(selectSound.value, note, octave, 2);
		container = new Audio(src);
		container.addEventListener('ended', function () { container = null; });
		container.addEventListener('loadeddata', function (e) { e.target.play(); });
		container.autoplay = false;
		container.setAttribute('type', 'audio/wav');
		/*document.body.appendChild(container);*/
		container.load();
		return container;

	};

	// Detect keypresses, play notes.

	var fnPlayKeyboard = function (e) {

		var i = keysPressed.length;
		while (i--) {
			if (keysPressed[i] == e.keyCode) {
				return false;
			}
		}
		keysPressed.push(e.keyCode);

		switch (e.keyCode) {

			// left
			case 37:
				fnChangeOctave(-1);
				break;

			// right
			case 39:
				fnChangeOctave(1);
				break;

			// space
			case 16:
				break;
				fnPlaySong([
					['E,0', 8],
					['D,0', 8],
					['C,0', 2],
					['C,0', 8],
					['D,0', 8],
					['C,0', 8],
					['E,0', 8],
					['D,0', 1],
					['C,0', 8],
					['D,0', 8],
					['E,0', 2],
					['A,0', 8],
					['G,0', 8],
					['E,0', 8],
					['C,0', 8],
					['D,0', 1],
					['A,0', 8],
					['B,0', 8],
					['C,1', 2],
					['B,0', 8],
					['C,1', 8],
					['D,1', 8],
					['C,1', 8],
					['A,0', 1],
					['G,0', 8],
					['A,0', 8],
					['B,0', 2],
					['C,1', 8],
					['B,0', 8],
					['A,0', 8],
					['G,0', 8],
					['A,0', 1]
				]);
				break;

		}

		if (keyboard[e.keyCode]) {
			if (visualKeyboard[keyboard[e.keyCode]]) {
				visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = '#ff0000';
				visualKeyboard[keyboard[e.keyCode]].style.marginTop = '5px';
				visualKeyboard[keyboard[e.keyCode]].style.boxShadow = 'none';
			}
			var arrPlayNote = keyboard[e.keyCode].split(',');
			var note = arrPlayNote[0];
			var octaveModifier = arrPlayNote[1] | 0;
			fnPlayNote(note, __octave + octaveModifier);
		} else {
			return false;
		}

		// ===> Adiciona o objeto tecla ao array acorde se a tecla não existir
		const teclaArr = keyboard[e.keyCode].split(',')
		const teclaObj = {
			nota: teclaArr[0],
			oitava: teclaArr[1]
		}

		if (acordeFeito.length == 0) {
			acordeFeito.push(teclaObj)
		} else {
			const teclaBool = acordeFeito.some(element => element.nota === teclaObj.nota && element.oitava === teclaObj.oitava)
			if (!teclaBool) acordeFeito.push(teclaObj)
		}
		// <===

		// ===> Trata o acorde feito para exibir no html
		let acordeFeitoArr

		acordeFeitoArr = acordeFeito.reduce((array, element) => {
			array.push(element.nota)
			return array
		}, [])

		// Elimina notas duplicadas
		acordeFeitoArr = acordeFeitoArr.filter((element, i) => acordeFeitoArr.indexOf(element) === i)

		// Se o acorde solicitado for bemol ou diminuto as notas com sustenidos mudarão para notas com bemóis
		let txtAcordeFeitoArr = painel.txtAcordeFeitoArr(acordeQuiz, acordeFeitoArr)

		htmlAcordeFeito.innerText = `Notas: ${txtAcordeFeitoArr.toString().replace(/,/g, " ").replace(/#/g, "♯")}`
		// <===

		// ===> Compara o acorde feito com o acorde solicitado do quiz
		codigosTeclas.push(e.keyCode)

		if (ativarQuiz == true) {
			if (notasAcordeQuiz.sort().toString() === acordeFeitoArr.sort().toString()) {
				ativarQuiz = false

				htmlPontuacao.innerText = `Pontuação: ${++pontos}`

				htmlAcordeQuiz.style.color = "green"
				htmlAcordeFeito.style.color = "green"
				htmlPontuacao.style.color = "green"

				for (element of codigosTeclas) {
					visualKeyboard[keyboard[element]].style.backgroundColor = "green"
				}

				setTimeout(() => {
					desfazerAcorde()
					quiz()
				}, 1500)
			}

		}
		// <===

	}

	// Remove key bindings once note is done.

	var fnRemoveKeyBinding = function (e) {

		var i = keysPressed.length;
		while (i--) {
			if (keysPressed[i] == e.keyCode) {
				if (visualKeyboard[keyboard[e.keyCode]]) {
					visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = '#1e90ff'; // Alterado para de sem cor para cor azul
					visualKeyboard[keyboard[e.keyCode]].style.marginTop = '';
					visualKeyboard[keyboard[e.keyCode]].style.boxShadow = '';
				}
				keysPressed.splice(i, 1);
			}
		}

		// Após soltar a tecla do acorde certo ela ficará com a cor verde ao invés de azul até o momento de um novo quiz
		if (!ativarQuiz) visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = "green"

		// ===> Função para teclado musical ativado e remover o objeto tecla do array acorde
		if (tecladoMusical) {
			visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = ""
			codigosTeclas.splice(codigosTeclas.indexOf(e.keyCode), 1)

			const teclaArr = keyboard[e.keyCode].split(',')
			const teclaObj = {
				nota: teclaArr[0],
				oitava: teclaArr[1]
			}

			acordeFeito = acordeFeito.filter(element => element.nota !== teclaObj.nota && element.nota !== teclaObj.oitava)

			// ===> Trata o acorde feito para exibir no html
			acordeFeitoArr = acordeFeito.reduce((array, element) => {
				array.push(element.nota)
				return array
			}, [])

			// Elimina notas duplicadas
			acordeFeitoArr = acordeFeitoArr.filter((element, i) => acordeFeitoArr.indexOf(element) === i)

			// Se o acorde solicitado for bemol ou diminuto as notas com sustenidos mudarão para notas com bemóis
			let txtAcordeFeitoArr = painel.txtAcordeFeitoArr(acordeQuiz, acordeFeitoArr)

			htmlAcordeFeito.innerText = `Notas: ${txtAcordeFeitoArr.toString().replace(/,/g, " ").replace(/#/g, "♯")}`
			// <===
		}
		// <===	

	}

	var fnPlaySong = function (arr) {

		if (arr.length > 0) {

			var noteLen = 1000 * (1 / parseInt(arr[0][1]));
			if (!(arr[0][0] instanceof Array)) {
				arr[0][0] = [arr[0][0]];
			}
			var i = arr[0][0].length;
			var keys = [];
			while (i--) {
				keys.unshift(reverseLookup[arr[0][0][i]]);
				fnPlayKeyboard({ keyCode: keys[0] });
			}
			arr.shift();
			setTimeout(function (array, val) { return function () { var i = val.length; while (i--) { fnRemoveKeyBinding({ keyCode: val[i] }); } fnPlaySong(array); } }(arr, keys), noteLen);

		}

	};

	// Set up global event listeners

	window.addEventListener('keydown', fnPlayKeyboard);
	window.addEventListener('keyup', fnRemoveKeyBinding);
	document.getElementById('-_OCTAVE').addEventListener('click', function () { fnChangeOctave(-1); });
	document.getElementById('+_OCTAVE').addEventListener('click', function () { fnChangeOctave(1); });

	Object.defineProperty(this, 'draw', {
		value: fnCreateKeyboard
	});

}
