class Sorteio {

    constructor() {
        this.notasTeclado = [
            { not: "C", range: 0, trans: "" },
            { not: "C#", range: 0, trans: "D♭" },
            { not: "D", range: 0, trans: "" },
            { not: "D#", range: 0, trans: "E♭" },
            { not: "E", range: 0, trans: "" },
            { not: "F", range: 0, trans: "" },
            { not: "F#", range: 0, trans: "G♭" },
            { not: "G", range: 0, trans: "" },
            { not: "G#", range: 0, trans: "A♭" },
            { not: "A", range: 0, trans: "" },
            { not: "A#", range: 0, trans: "B♭" },
            { not: "B", range: 0, trans: "C♭" }
        ]
    }

    acordeQuiz() {
        this.ton = Math.floor(Math.random() * this.notasTeclado.length)
        let notObj =  this.notasTeclado[this.ton]
        if (notObj.trans != '') {
             if ((Math.floor(Math.random() * 2))) {
                return notObj.trans
            } else {
                return notObj.not
            } 
        } else {
            return notObj.not
        }
    }
    notasAcordeQuiz(qualidade, setimaOpcoes) {
        // ==> Seta os graus da tonalidade das notas do acorde
        let ter, qui, set 
		switch (qualidade) {
			case 'maior':
				ter = 4
				qui = 7
				break
			case 'menor':
				ter = 3
				qui = 7
				break
			case 'diminuto':
				ter = 3
				qui = 6
				break
			case 'aumentado':
				ter = 4
				qui = 8
		}
		if (qualidade != 'diminuto' && qualidade != 'aumentado') {
			if (setimaOpcoes === 'setima') set = 10
			if (setimaOpcoes === 'setima-maior') set = 11
		}
		
		// ===> Construção do acorde a partir da nota tônica sorteada
		let notasAcordeQuiz = []
		notasAcordeQuiz.push(this.notasTeclado[this.ton].not)

		if (this.ton + ter > 11) {
			ter -= 12
			++this.notasTeclado[this.ton + ter].range
		}
		notasAcordeQuiz.push(this.notasTeclado[this.ton + ter].not)

		if (this.ton + qui > 11) {
			qui -= 12
			++this.notasTeclado[this.ton + qui].range
		}
		notasAcordeQuiz.push(this.notasTeclado[this.ton + qui].not)

		if (qualidade != 'diminuto' && qualidade != 'aumentado') {
			if (setimaOpcoes == 'setima' || setimaOpcoes == 'setima-maior') {

				if (this.ton + set > 11) {
					set -= 12
					++this.notasTeclado[this.ton + set].range
				}

				notasAcordeQuiz.push(this.notasTeclado[this.ton + set].not)
			}
        }
        return notasAcordeQuiz
    }

}