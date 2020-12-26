class Painel {
    acordeQuizTxt(acordeQuiz, qualidade, setimaOpcoes) {
        acordeQuiz = acordeQuiz.replace('#', "♯")

        if (qualidade === 'menor') {
            acordeQuiz += "m"
        } else if (qualidade === 'diminuto') {
            acordeQuiz += "°"
        } else if (qualidade === 'aumentado') acordeQuiz += "+"

        // Adiciona 7M ou 7 na nomenclatura do acorde somente se o acorde for maior ou menor 
        if (qualidade === 'maior' || qualidade === 'menor') {
            if (setimaOpcoes === 'setima') {
                acordeQuiz += "7"
            } else if (setimaOpcoes == 'setima-maior') acordeQuiz += "7M"
        }
        // <===

        return acordeQuiz
    }

    // Se o acorde solicitado for bemol ou diminuto as notas com sustenidos mudarão para notas com bemóis
    txtAcordeFeitoArr(acordeQuiz, acordeFeitoArr) {
        let txtAcordeFeitoArr
        if (acordeQuiz.substring(2, 1) === '♭' || acordeQuiz.substring(2, 1) === '°') {
            txtAcordeFeitoArr = acordeFeitoArr.reduce((array, element) => {
                switch (element) {
                    case 'C#':
                        element = "D♭"
                        break
                    case 'D#':
                        element = "E♭"
                        break
                    case 'F#':
                        element = "G♭"
                        break
                    case 'G#':
                        element = "A♭"
                        break
                    case 'A#':
                        element = "B♭"
                }
                array.push(element)
                return array
            }, [])
        } else {
            txtAcordeFeitoArr = acordeFeitoArr
        }
        return txtAcordeFeitoArr
    }
}