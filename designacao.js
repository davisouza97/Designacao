/*jshint esversion: 6 */

/**
 * Controle do das atribuicoes/emparelhamnato e dado pela matriz auxiliar: matrizEmparelhamento
 * onde:
 * 1 = valor qualquer
 * 0 = zero nao tratado
 * -1 = zero atribuido
 * -2 = zero que não pode ser atribuido
 */
const designacao = {
    matriz: [],
    matrizEmparelhamento: [],
    matrizEmparelhamentoTransposta: [],
    matrizCor: [],
    matrizOriginal: [],
    itensLinha: [],
    itensColuna: [],
    criaMatriz: function (matrizEntrada) {
        this.matriz = matrizEntrada;
        this.matrizEmparelhamento = new Array(this.matriz.length);
        this.matrizEmparelhamentoTransposta = new Array(this.matriz.length);
        this.matrizCor = new Array(this.matriz.length);
        for (let i = 0; i < this.matriz.length; i++) {
            this.matrizOriginal[i] = this.matriz[i].map(item => (parseInt(item, 10) * 1));
        }
        for (let i = 0; i < this.matriz.length; i++) {
            this.matrizEmparelhamento[i] = this.matriz[i].map(item => (parseInt(item, 10) * 0) + 1);
        }
        for (let i = 0; i < this.matriz.length; i++) {
            this.matrizEmparelhamentoTransposta[i] = this.matriz[i].map(item => (parseInt(item, 10) * 0) + 1);
        }
        for (let i = 0; i < this.matriz.length; i++) {
            this.matrizCor[i] = this.matriz[i].map(item => (parseInt(item, 10) * 0) + 1);
        }

    },
    getMenorLinhas: function () {
        let menorByLinha = [];
        for (let i = 0; i < this.matriz.length; i++) {
            menorByLinha.push(Math.min(...this.matriz[i]));
        }
        return menorByLinha;
    },

    getMenorColunas: function () {
        let menorByColuna = [];
        for (let i = 0; i < this.matriz.length; i++) {
            menorByColuna.push(designacao.getMenorValorColuna(i));
        }
        return menorByColuna;
    },

    subtraiCustoLinha: function () {
        console.log("identifique o menor custo de cada linha e o subtraia de cada um dos custos da linha " + this.matriz.length);
        for (let i = 0; i < this.matriz.length; i++) {
            var min = Math.min(...this.matriz[i]);
            this.matriz[i] = this.matriz[i].map(item => item - min);
        }
    },

    atribuicao: function () {
        this.setZeros();
        this.transporMatriz();


        for (let iteracao = 0; iteracao < this.matrizEmparelhamento.length; iteracao++) {
            let numeroZeroLinha = new Array(this.matriz.length).fill(0);
            let numeroZeroColuna = new Array(this.matriz.length).fill(0);
            for (let i = 0; i < this.matrizEmparelhamento.length; i++) { //calcula os pesos linha e coluna
                for (let j = 0; j < this.matrizEmparelhamento[i].length; j++) {
                    if (this.matrizEmparelhamento[i][j] == 0) {
                        numeroZeroLinha[i]++;
                        numeroZeroColuna[j]++;
                    }
                }
            }
            for (let i = 0; i < numeroZeroLinha.length; i++) { //pra controlar a ocorrencia de nenhum zero na linha
                if (numeroZeroLinha[i] == 0) {
                    numeroZeroLinha[i] = 999;
                }
                if (numeroZeroColuna[i] == 0) {
                    numeroZeroColuna[i] = 999;
                }
            }
            let indexMenorLinha = numeroZeroLinha.indexOf(Math.min(...numeroZeroLinha)); //pega a linha com o menor numero de zeros
            let indexMenorColuna = numeroZeroColuna.indexOf(Math.min(...numeroZeroColuna)); //pega a coluna com o menor numero de zeros
            if (numeroZeroLinha[indexMenorLinha] <= numeroZeroColuna[indexMenorColuna]) { //escolhe a linha
                for (let i = 0; i < this.matriz.length; i++) {
                    if (this.matrizEmparelhamento[indexMenorLinha][i] == 0) {
                        this.setValidosInvalidos(indexMenorLinha, i);
                    }
                }
            } else {
                for (let i = 0; i < this.matriz.length; i++) { //escolhe a coluna
                    if (this.matrizEmparelhamento[i][indexMenorColuna] == 0) {
                        this.setValidosInvalidos(i, indexMenorColuna);
                    }
                }
            }
        }
        return this.verificaEmparelhado();

    },

    setValidosInvalidos: function (linha, coluna) {
        this.matrizEmparelhamento[linha][coluna] = -1;
        for (let i = 0; i < this.matrizEmparelhamento.length; i++) {
            if (this.matrizEmparelhamento[linha][i] == 0) {
                this.matrizEmparelhamento[linha][i] = -2;
            }
            if (this.matrizEmparelhamento[i][coluna] == 0) {
                this.matrizEmparelhamento[i][coluna] = -2;
            }

        }
    },
    setZeros: function () {
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                if (this.matriz[i][j] == 0) {
                    this.matrizEmparelhamento[i][j] = 0;
                }
            }
        }
    },

    transporMatriz: function () {
        for (let i = 0; i < this.matrizEmparelhamento.length; i++) {
            for (let j = 0; j < this.matrizEmparelhamento[i].length; j++) {
                this.matrizEmparelhamentoTransposta[j][i] = this.matrizEmparelhamento[i][j];
            }
        }
    },

    etapaRiscos: function () {
        let numeroDesignacao = this.getNumeroDesignacao();
        this.setZeros();
        this.transporMatriz();


        for (let iteracao = 0; iteracao < numeroDesignacao; iteracao++) {
            this.transporMatriz();
            let numeroZeroLinha = new Array(this.matriz.length).fill(0);
            let numeroZeroColuna = new Array(this.matriz.length).fill(0);
            for (let i = 0; i < this.matrizEmparelhamento.length; i++) { //calcula os pesos linha e coluna
                for (let j = 0; j < this.matrizEmparelhamento[i].length; j++) {
                    if (this.matrizEmparelhamento[i][j] == 0) {
                        numeroZeroLinha[i]++;
                        numeroZeroColuna[j]++;
                    }
                }
            }
            let indexMenorLinha = numeroZeroLinha.indexOf(Math.max(...numeroZeroLinha)); //pega a linha com o maior numero de zeros
            let indexMenorColuna = numeroZeroColuna.indexOf(Math.max(...numeroZeroColuna)); //pega a coluna com o maior numero de zeros
            if (numeroZeroLinha[indexMenorLinha] >= numeroZeroColuna[indexMenorColuna]) { //escolhe a linha
                for (let i = 0; i < this.matriz.length; i++) {
                    this.matrizCor[indexMenorLinha][i]--;
                    this.matrizEmparelhamento[indexMenorLinha][i] = 1;
                }
            } else {
                for (let i = 0; i < this.matriz.length; i++) { //escolhe a coluna
                    this.matrizCor[i][indexMenorColuna]--;
                    this.matrizEmparelhamento[i][indexMenorColuna] = 1;
                }
            }
        }
        //ate aqui ok
    },
    /**
     * Controle dos riscos
     * onde:
     * 1 = valor não riscado
     * 0 = valor riscado
     * -1 = valor riscado (cruzamento)
     */

    getMenorNaoColorido: function () {
        let positionLinha;
        let positionColuna;
        let menor = 999999;
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                if (this.matrizCor[i][j] == 1) {
                    if (this.matriz[i][j] < menor) {
                        menor = this.matriz[i][j];
                        positionLinha = i;
                        positionColuna = j;
                    }
                }
            }
        }
        console.log("o menor valor não colorido foi: " + menor);

        return [menor, positionLinha, positionColuna];
    },

    subtraiSomaColoridos: function () {
        let resultadoMenor = this.getMenorNaoColorido();
        let menor = resultadoMenor[0];
        //let linha = resultadoMenor[1];
        //let coluna = resultadoMenor[2];
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                if (this.matrizCor[i][j] == 1) {
                    this.matriz[i][j] = this.matriz[i][j] - menor;
                }
                if (this.matrizCor[i][j] == -1) {
                    this.matriz[i][j] = this.matriz[i][j] + menor;
                }

            }
        }
    },

    getNumeroDesignacao: function () {
        let numeroDesignacao = 0;
        for (let index = 0; index < this.matrizEmparelhamento.length; index++) {
            if (this.matrizEmparelhamento[index].includes(-1)) {
                numeroDesignacao++;
            }
        }
        return numeroDesignacao;
    },

    subtraiCustoColunas: function () {
        console.log("Subtraia o menor custo de cada coluna de cada custo da coluna");
        for (let i = 0; i < this.matriz[0].length; i++) {
            let menorValorColuna = this.getMenorValorColuna(i);
            this.subtraiColunaIndividual(i, menorValorColuna);
        }
    },

    subtraiColunaIndividual: function (coluna, valor) {
        let numColunas = this.matriz[0].length;
        for (let j = 0; j < numColunas; j++) {
            this.matriz[j][coluna] = this.matriz[j][coluna] - valor;
        }
    },

    getMenorValorColuna: function (coluna) {
        let numColunas = this.matriz[0].length;
        let listaColuna = [];
        for (let j = 0; j < numColunas; j++) {
            listaColuna.push(this.matriz[j][coluna]);
        }
        let menor = Math.min(...listaColuna);
        return menor;
    },

    verificaEmparelhado: function () {
        for (let i = 0; i < this.matrizEmparelhamento.length; i++) {
            if (!this.matrizEmparelhamento[i].includes(-1)) {
                return false;
            }
        }
        return true;
    },

    verificaRodadaAtribuicao: function () {
        for (let i = 0; i < this.matrizEmparelhamento.length; i++) {
            if (this.matrizEmparelhamento.includes(0)) {
                return false;
            }
        }
        return true;
    }
};