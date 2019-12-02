/*jshint esversion: 6 */
var tabela = document.getElementById("tabela");
var botaoNext = document.getElementById("next");

var qtdLinhas = 0;
var qtdColunas = 0;
var matrizOriginal;

var col = 3;
var row = 3;
var row = prompt("Informe o numero de linhas");
var col = prompt("Informe o numero de linhas");



montaTabela(row, col);

function start() {
    var x = document.forms['form'];
    let criaMatriz = [];
    let criaLinha = [];
    for (i = 0, j = 1; i < x.length; i++, j++) { //itera sobre os inputs
        criaLinha.push(x.elements[i].value);
        if (j === qtdColunas) {
            criaMatriz.push(criaLinha);
            criaLinha = [];
            j = 0;
        }
    }
    designacao.criaMatriz(criaMatriz);
    matrizOriginal = designacao.matriz;
    let entrada = document.getElementById("entrada");

    renderMatriz();
    while (entrada.firstChild) {
        entrada.removeChild(entrada.firstChild);
    }

}

function montaTabela(row, col) {
    console.log("montaTabela");
    for (let i = 0; i < row; i++) {
        let linha = document.createElement("div");
        linha.setAttribute("id", i);
        linha.setAttribute("class", "row");
        for (let j = 0; j < col; j++) {
            let coluna = document.createElement("div");
            coluna.setAttribute("id", i + "/" + j);
            coluna.setAttribute("class", "col s1");
            coluna.appendChild(document.createElement("input"));
            linha.appendChild(coluna);
        }
        tabela.appendChild(linha);
    }
    botaoNext.setAttribute("onclick", "montaMatriz()");
}

function montaMatriz() {
    console.log("montaMatriz");
    let listaLinha = tabela.childNodes;
    let matrix = [];
    for (let i = 0; i < listaLinha.length; i++) {
        let listaColunas = listaLinha[i].childNodes;
        let linha = [];
        for (let j = 0; j < listaColunas.length; j++) {
            let valor = listaColunas[j].childNodes[0].value;
            console.log(valor);
            linha.push(valor);
        }
        matrix.push(linha);
    }
    designacao.criaMatriz(matrix);
}

function setIdInput() {
    let listaInputs = document.getElementsByTagName("input");

    for (let i = 0; i < listaInputs.length; i++) {
        listaInputs[i].setAttribute("id", i);
    }
    //diferenciar as coluna(?)
    console.log("setID");

}

function renderMatriz() {
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
    let matriz = designacao.matriz;
    console.log(matriz.length);
    console.log(matriz[0].length);
    
    
    for (let i = 0; i < matriz.length; i++) {
        let linha = document.createElement("div");
        linha.setAttribute("id", i);
        linha.setAttribute("class", "row");
        let size = matriz[i].lenght;
        for (let j = 0; j < size; j++) {
            let coluna = document.createElement("div");
            coluna.setAttribute("id", i + "/" + j);
            coluna.setAttribute("class", "col s1");
            coluna.appendChild(document.createElement("input"));
            linha.appendChild(coluna);
        }
        tabela.appendChild(linha);
    }
    botaoNext.setAttribute("onclick", "montaMatriz()");

}

function next() {
    designacao.subtraiCustoColuna();
    renderMatriz();
}