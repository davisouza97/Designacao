/*jshint esversion: 6 */
const designacao = {
    matriz: [],
    matrizCor: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    matrizEmparelhamento: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    criaMatriz: function (matrizEntrada) {
        this.matriz = matrizEntrada;
    },
    
    imprimeMatriz: function () {
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[0].length; j++) {
                console.log(this.matriz[i][j]);
            }
            console.log("");
        }
    },
    subtraiCustoLinha: function () {
        console.log("identifique o menor custo de cada linha e o subtraia de cada um dos custos da linha " + this.matriz.length);
        for (let i = 0; i < this.matriz.length; i++) {
            var min = Math.min(...this.matriz[i]);
            this.matriz[i] = this.matriz[i].map(item => item - min);
        }
    },
    atribuicao: function () {
        console.log("Tente fazer a atribuição dos custos iguais a zero.");
        var numeroZerosLinha = Array(this.matriz.length);
        //encontra e conta numero de zeros por linha
        for (let i = 0; i < this.matriz.length; i++) {
            numeroZerosLinha[i] = 0;
            for (let j = 0; j < this.matriz[i].length; j++) {
                if (this.matriz[i][j] === 0) {
                    this.matrizEmparelhamento[i][j] = 0;
                    numeroZerosLinha[i]++;
                }
            }
        }
        for (let index = 0; index < this.matriz.length; index++) {
            let indexMenor = numeroZerosLinha.indexOf(Math.min(...numeroZerosLinha));
            numeroZerosLinha[indexMenor] = 99999;
            for (let i = 0; i < this.matriz[indexMenor].length; i++) {
                if (this.matriz[indexMenor][i] === 0) {
                    this.setLinhaDesignacao(indexMenor, i);
                    this.setColunaDesignacao(indexMenor, i);
                }
            }
        }
        console.log(numeroZerosLinha);
    },
    subtraiCustoColuna: function () {
        console.log("Subtraia o menor custo de cada coluna de cada custo da coluna");
        for (let i = 0; i < this.matriz[0].length; i++) {
            let menorValorColuna = this.getMenorValorColuna(i);
            this.subtraiColuna(i, menorValorColuna);
        }
    },
    setLinhaDesignacao: function (linha, coluna) {
        for (let index = 0; index < this.matriz[linha].length; index++) { //tamanho da linha
            if (coluna !== index && this.matrizEmparelhamento[linha][index] === 0) {
                this.matrizEmparelhamento[linha][index] = -2;
            } else {
                if (coluna === index && this.matrizEmparelhamento[linha][index] > -1) {
                    this.matrizEmparelhamento[linha][index] = -1;
                }
            }
        }
    },
    setColunaDesignacao: function (linha, coluna) {
        for (let index = 0; index < this.matriz.length; index++) { //tamanho da coluna
            if (linha !== index && this.matrizEmparelhamento[index][coluna] === 0) {
                this.matrizEmparelhamento[index][coluna] = -2;
            }
        }
    },
    getMenorValorColuna: function (coluna) {
        let numColunas = this.matriz[0].length;
        let listaColuna = [];
        for (let j = 0; j < numColunas; j++) {
            listaColuna.push(this.matriz[j][coluna]);
        }
        let menor = Math.min(...listaColuna);
        console.log("O menor valor da coluna " + coluna + " é " + menor);
        return menor;

    },
    subtraiColuna: function (coluna, valor) {
        let numColunas = this.matriz[0].length;
        for (let j = 0; j < numColunas; j++) {
            this.matriz[j][coluna] = this.matriz[j][coluna] - valor;
        }
    },
    isEmparelhado: function () {
        for (let i = 0; i < this.matrizEmparelhamento.length; i++) {
            if (!this.matrizEmparelhamento[i].includes(-1)) {
                return false;
            }
        }
        return true;
    },
    teste: function () {
        this.subtraiCustoLinha();
        this.atribuicao();
        this.subtraiCustoColuna();
    }
};