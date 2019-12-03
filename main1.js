/*jshint esversion: 6 */
var tabela = document.getElementById("tabela");
var botaoNext = document.getElementById("next");
var menorLinha = document.getElementById("menorLinha");
var menorColuna = document.getElementById("menorColuna");
var cimaDiv = document.getElementById("cima");
var ladoDiv = document.getElementById("lado");

var qtdLinhas = 0;
var qtdColunas = 0;
var matrizOriginal;

var col = 3;
var row = 3;

//var row = prompt("Informe o numero de linhas");
//var col = prompt("Informe o numero de linhas");



montaTabela(row, col);

function action() {
    botaoNext.
}

function montaTabela(row, col) {
    montaCima(col);
    montaLado(row);
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
}

function montaCima(n) {
    let linha = document.createElement("div");
    linha.setAttribute("class", "row");
    for (let i = 0; i < n; i++) {
        let celula = document.createElement("div");
        celula.setAttribute("class", "col s1");
        celula.appendChild(document.createElement("input"));
        linha.appendChild(celula);
    }
    cimaDiv.appendChild(linha);
}

function montaLado(n) {
    for (let i = 0; i < n; i++) {
        let linha = document.createElement("div");
        linha.setAttribute("class", "row");
        let celula = document.createElement("div");
        celula.setAttribute("class", "col s12");
        celula.appendChild(document.createElement("input"));
        linha.appendChild(celula);
        ladoDiv.appendChild(linha);
    }    
    
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
    renderMatriz();
}

function renderMatriz() {
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
    let matriz = designacao.matriz;
    let linha;
    for (let i = 0; i < matriz.length; i++) {
        linha = document.createElement("div");
        linha.setAttribute("id", i);
        linha.setAttribute("class", "row");
        for (let j = 0; j < matriz[i].length; j++) {
            let coluna = document.createElement("div");
            coluna.setAttribute("id", i + "/" + j);
            coluna.setAttribute("class", "col s1");
            let celula = document.createElement("input");
            celula.setAttribute("value", matriz[i][j]);
            celula.readOnly = true;
            coluna.appendChild(celula);
            linha.appendChild(coluna);
        }
        tabela.appendChild(linha);
    }
}

function next() {
    designacao.subtraiCustoColuna();
    renderMatriz();
}

function renderMenorLinha() {
    let menorByLinha = designacao.getMenorPorLinha();
    for (let i = 0; i < menorByLinha.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class","row");
        let input = document.createElement("input");
        input.setAttribute("value", menorByLinha[i]);
        div.appendChild(input);
        menorLinha.appendChild(div);
    }
}