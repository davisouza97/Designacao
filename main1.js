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

var row = prompt("Informe o tamanho da tabela");

var col = row;
var acao = "montar";

montaTabela(row, col);

function action() {
    if (acao === "montar") {
        montaMatriz();
        M.toast({
            html: 'Montando a tebela'
        });
        acao = "menorLinha";
        return;
    }
    if (acao === "menorLinha") {
        M.toast({
            html: 'Pega o menor de cada linha'
        });
        renderMenorLinha();
        acao = "subtraiLinha";
        return;
    }
    if (acao === "subtraiLinha") {
        designacao.subtraiCustoLinha();
        renderMatriz();
        M.toast({
            html: 'Subtraido cada item da linha pelo menor'
        });
        acao = "atribuicaoLinha";
        return;
    }
    if (acao === "atribuicaoLinha") {
        designacao.atribuicao();
        M.toast({
            html: 'tenta atribuir um pra um'
        });
        coloreAtribuicao();
        acao = "menorColuna";
        if (designacao.verificaEmparelhado()) {
            botaoNext.childNodes[1].disabled = true;
        }
    }
    if (acao === "menorColuna") {
        M.toast({
            html: 'Pega o menor de cada coluna'
        });
        renderMenorColuna();
        acao = "subtraiColuna";
        return;
    }
    if (acao === "subtraiColuna") {
        M.toast({
            html: 'Subtraido cada item da coluna pelo menor'
        });
        designacao.subtraiCustoColunas();
        renderMatriz();
        acao = "atribuicaoColuna";
        return;
    }
    if (acao === "atribuicaoColuna") {
        designacao.atribuicao();
        M.toast({
            html: 'tenta atribuir um pra um'
        });
        coloreAtribuicao();
        acao = "atribuicaoColuna";
        if (designacao.verificaEmparelhado()) {
            botaoNext.childNodes[1].disabled = true;
        }
        return;
    }

}

function montaTabela(row, col) {
    console.log("Funcao montaTabela");

    montaCima(col); //monta a coluna de nomes em cima
    montaLado(row); //monta a coluna de nomes ao lado

    for (let i = 0; i < row; i++) {
        let linha = document.createElement("div");
        linha.setAttribute("id", i);
        linha.setAttribute("class", "row");
        for (let j = 0; j < col; j++) {
            let coluna = document.createElement("div");
            coluna.setAttribute("id", i + "/" + j);
            coluna.setAttribute("class", "col s" + 12 / row);
            let input = document.createElement("input");
            input.setAttribute("placeholder", "valor");
            input.setAttribute("type", "number");
            input.setAttribute("min", "0");
            coluna.appendChild(input);
            linha.appendChild(coluna);
        }
        tabela.appendChild(linha);
    }
    acao = "montar";
}

function montaCima(n) {
    let linha = document.createElement("div");
    linha.setAttribute("class", "row");
    for (let i = 0; i < n; i++) {
        let celula = document.createElement("div");
        celula.setAttribute("class", "col s" + 12 / row);
        let input = document.createElement("input");
        input.setAttribute("placeholder", "descrição");
        celula.appendChild(input);
        linha.appendChild(celula);
    }
    cimaDiv.appendChild(linha);
}

function montaLado(n) {
    for (let i = 0; i < n; i++) {
        let linha = document.createElement("div");
        linha.setAttribute("class", "row");
        let celula = document.createElement("div");
        celula.setAttribute("class", "col s9");
        let input = document.createElement("input");
        input.setAttribute("placeholder", "descrição");
        celula.appendChild(input);
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
    }while (menorLinha.firstChild) {
        menorLinha.removeChild(menorLinha.firstChild);
    }while (menorColuna.firstChild) {
        menorColuna.removeChild(menorColuna.firstChild);
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
            coluna.setAttribute("class", "col s" + 12 / row);
            let celula = document.createElement("input");
            celula.setAttribute("value", matriz[i][j]);
            celula.readOnly = true;
            coluna.appendChild(celula);
            linha.appendChild(coluna);
        }
        tabela.appendChild(linha);
    }
}

function renderMenorLinha() {
    let menorByLinha = designacao.getMenorLinhas();
    for (let i = 0; i < menorByLinha.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "row");
        let input = document.createElement("input");
        input.setAttribute("value", menorByLinha[i]);
        div.appendChild(input);
        menorLinha.appendChild(div);
    }
}

function renderMenorColuna() {
    let menorByColuna = designacao.getMenorColunas();
    for (let i = 0; i < menorByColuna.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "col s" + 12 / row);
        let input = document.createElement("input");
        input.setAttribute("value", menorByColuna[i]);
        div.appendChild(input);
        menorColuna.appendChild(div);
    }

}

function coloreAtribuicao() {
    let matriz = designacao.matrizEmparelhamento;
    let linha;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            document.getElementById(i + "/" + j).style.backgroundColor = "gray";
            if (matriz[i][j] === -1) {
                document.getElementById(i + "/" + j).style.backgroundColor = "green";
            }
            if (matriz[i][j] === -2) {
                document.getElementById(i + "/" + j).style.backgroundColor = "red";
            }
        }
    }
}