/*jshint esversion: 6 */
var tabela = document.getElementById("tabela");
var tbody = document.getElementById("tbody");
var render = document.getElementById("render");
var qtdLinhas = 0;
var qtdColunas = 0;
var matrizOriginal;

var col = 3;
var row = 3;
var row = prompt("Informe o numero de linhas");
var col = prompt("Informe o numero de colunas");



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
    for (let i = 0; i < row; i++) {
        addLinha();
    }
    for (let i = 0; i < col - 1; i++) {
        addColuna();
    }
    setIdInput();
}

function addLinha() {
    var numeroLinhas = tabela.rows.length;
    var linha = tabela.insertRow(numeroLinhas);
    qtdLinhas++;
    for (let i = 0; i < qtdColunas; i++) {
        let celula = linha.insertCell(i);
        let botao = document.createElement("INPUT");
        botao.setAttribute("min", 0);
        botao.setAttribute("type", "number");
        botao.setAttribute("value", 0);
        celula.appendChild(botao);
    }
    if (numeroLinhas === 0) {
        addColuna();
    }
}

function addColuna() {
    var linhas = (tabela.rows.length === 0) ? 1 : tabela.rows.length;
    qtdColunas++;
    for (var i = 0; i < linhas; i++) {
        var numeroColunas = tabela.rows[i];
        var celula = numeroColunas.insertCell(numeroColunas.length);
        let botao = document.createElement("INPUT");
        botao.setAttribute("min", 0);
        botao.setAttribute("value", 0);
        botao.setAttribute("type", "number");
        celula.appendChild(botao);
    }
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
    while (render.firstChild) {
        render.removeChild(render.firstChild);
    }
    let matriz = designacao.matriz;
    let tabela = document.createElement("div");
    tabela.setAttribute("id", "tabela");
    tabela.setAttribute("class", "div-table");
    for (let i = 0; i < matriz.length; i++) {
        let linha = document.createElement("div");
        tabela.appendChild(linha);
        linha.setAttribute("id", i);
        linha.setAttribute("class", "div-table-row");
        for (let j = 0; j < matriz[i].length; j++) {
            let celula = document.createElement("div");
            linha.appendChild(celula);
            celula.setAttribute("id", i + "-" + j);
            let valor = document.createElement("input");
            valor.setAttribute("value", matriz[i][j]);
            celula.appendChild(valor);
            celula.setAttribute("class", "div-table-col");
        }
    }
    render.appendChild(tabela);
    let botao = document.createElement("button");
    let textoBotao = document.createTextNode("Proxima Etapa");
    botao.appendChild(textoBotao);
    botao.setAttribute("onclick", next);
    render.appendChild(botao);
}

function next() {
    designacao.subtraiCustoColuna();
    renderMatriz();
}