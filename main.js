var tabela = document.getElementById("tabela");
var tbody = document.getElementById("tbody");
var linhas = 0;
var colunas = 0;

function addLinha() {
    var numeroLinhas = tabela.rows.length;
    var linha = tabela.insertRow(numeroLinhas);
    linhas++;
    for (let i = 0; i < colunas; i++) {
        let celula = linha.insertCell(i);
        let botao = document.createElement("INPUT");
        celula.appendChild(botao);
    }
    if (numeroLinhas === 0) {
        addColuna();
    }
}

function addColuna() {
    var linhas = (tabela.rows.length === 0) ? 1 : tabela.rows.length;
    colunas++;
    for (var i = 0; i < linhas; i++) {
        var numeroColunas = tabela.rows[i];
        console.log(numeroColunas);
        var celula = numeroColunas.insertCell(numeroColunas.length);
        console.log(celula);

        let botao = document.createElement("INPUT");
        celula.appendChild(botao);
        console.log(botao);
    }
}

function setIdInput() {
    let listaInputs = document.getElementsByTagName("input");
    
    for (let i = 0; i < listaInputs.length; i++) {
        listaInputs[i].setAttribute("id",i);
    }
    //diferenciar as coluna(?)
    console.log("setID");
    
}