/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
});


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
        if (designacao.verificaEmparelhado()) {
            botaoNext.childNodes[1].disabled = true;
            acao = "fim";
        } else {
            acao = "menorColuna";
        }
        return;
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
        if (designacao.verificaEmparelhado()) {
            botaoNext.childNodes[1].disabled = true;
            acao = "fim";
        } else {
            acao = "riscar";
        }
        return;
    }
    if (acao === "riscar") {
        designacao.etapaRiscos();
        M.toast({
            html: 'Riscando as Linhas/Colunas'
        });
        renderRisco();
        acao = 'menor';
        return;
    }
    if (acao === "menor") {
        M.toast({
            html: 'Pegando o menor colorido não riscado'
        });
        let posicao = [];
        posicao.push(designacao.getMenorNaoColorido()[1]);
        posicao.push(designacao.getMenorNaoColorido()[2]);
        colorePosicao(posicao);
        acao = "subtracaoCor";
        return;
    }
    if (acao === "subtracaoCor") {
        designacao.subtraiSomaColoridos();
        M.toast({
            html: 'Subtrai os não coloridos pelo menor'
        });
        M.toast({
            html: 'Soma os cruzamentos pelo menor'
        });
        renderRisco();
        acao = 'atribuicaoFinal';
    }
    if (acao === "atribuicaoFinal") {
        designacao.atribuicao();
        M.toast({
            html: 'Tenta atribuir os valores'
        });
        renderMatriz();
        coloreAtribuicao();
        if (designacao.verificaEmparelhado()) {
            botaoNext.childNodes[1].disabled = true;
            acao = "fim";
        } else {
            acao = "riscar";
        }
        return;
    }
    if (acao === "fim") {
        designacao.atribuicao();
        M.toast({
            html: 'resultado encontrado'
        });
        fim();
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
            input.value = 0;
            input.required = true;
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
        input.setAttribute("id", "cima" + i);
        input.value = "cima"+i;
        input.required = true;
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
        input.setAttribute("id", "lado" + i);
        celula.appendChild(input);
        linha.appendChild(celula);
        ladoDiv.appendChild(linha);
        input.required = true;
        input.value = "lado"+i;
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
    
    let k = 0;
    
    do {
        document.getElementById("lado" + k).readOnly = true;
        k++;
    } while (document.getElementById("lado" + k) != null);
    k = 0;
    do {
        document.getElementById("cima" + k).readOnly = true;
        k++;
    } while (document.getElementById("cima" + k) != null);

}

function validar() {
    for (let i = 0; i < row; i++) {
        Validation.validate(document.getElementById("cima"+i));
        Validation.validate(document.getElementById("lado"+i));
    }
}

function renderMatriz() {
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
    while (menorLinha.firstChild) {
        menorLinha.removeChild(menorLinha.firstChild);
    }
    while (menorColuna.firstChild) {
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
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            //document.getElementById(i + "/" + j).style.backgroundColor = "gray";
            if (matriz[i][j] === -1) {
                document.getElementById(i + "/" + j).style.backgroundColor = "green";
            }
            if (matriz[i][j] === -2) {
                document.getElementById(i + "/" + j).style.backgroundColor = "red";
            }
        }
    }
}

function colorePosicao(posicao) {
    document.getElementById(posicao[0] + "/" + posicao[1]).style.backgroundColor = "green";
}

function renderRisco() {
    renderMatriz();
    let matriz = designacao.matrizCor;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            document.getElementById(i + "/" + j).style.backgroundColor = "";
            if (matriz[i][j] === 0) {
                document.getElementById(i + "/" + j).style.backgroundColor = "rgb(255,183,77)";
            }
            if (matriz[i][j] === -1) {
                document.getElementById(i + "/" + j).style.backgroundColor = "rgb(230,81,0)";
            }
        }
    }

}


function fim() {
    console.log(document.getElementById("lado" + 0));
    $('#modal').modal();
    $('#modal').modal('open');

    let inicial = document.getElementById("matrixInicial");
    let final = document.getElementById("matrixFinal");
    let custos = document.getElementById("custos");

    while (inicial.firstChild) {
        inicial.removeChild(inicial.firstChild);
    }
    while (final.firstChild) {
        final.removeChild(final.firstChild);
    }
    while (custos.firstChild) {
        custos.removeChild(custos.firstChild);
    }

    let matrizOriginal = designacao.matrizOriginal;
    for (let i = 0; i < matrizOriginal.length; i++) {
        linha = document.createElement("div");
        linha.setAttribute("id", i);
        linha.setAttribute("class", "row");

        for (let j = 0; j < matrizOriginal[i].length; j++) {
            let coluna = document.createElement("div");
            coluna.setAttribute("id", i + "/" + j);
            coluna.setAttribute("class", "col s" + 12 / row);
            let celula = document.createElement("input");
            celula.setAttribute("value", matrizOriginal[i][j]);
            celula.readOnly = true;
            coluna.appendChild(celula);
            linha.appendChild(coluna);
        }
        inicial.appendChild(linha);
    }


    let matriz = designacao.matriz;
    let desig = designacao.matrizEmparelhamento;
    for (let i = 0; i < matriz.length; i++) {
        linha = document.createElement("div");
        linha.setAttribute("id", i);
        linha.setAttribute("class", "row");
        for (let j = 0; j < matriz[i].length; j++) {
            let coluna = document.createElement("div");
            if (desig[i][j] == -1) {
                coluna.style.backgroundColor = "green";
            }
            if (desig[i][j] == -2) {
                coluna.style.backgroundColor = "red";
            }
            coluna.setAttribute("id", i + "/" + j);
            coluna.setAttribute("class", "col s" + 12 / row);
            let celula = document.createElement("input");
            celula.setAttribute("value", matriz[i][j]);
            celula.readOnly = true;
            coluna.appendChild(celula);
            linha.appendChild(coluna);
        }
        final.appendChild(linha);
    }

    let custoTotal = 0;
    for (let i = 0; i < matriz.length; i++) {
        let linha = document.createElement("div");
        linha.setAttribute("class", "row");
        for (let j = 0; j < designacao.matrizEmparelhamento.length; j++) {
            let col1 = document.createElement("div");
            col1.setAttribute("class", "col s4");
            let col2 = document.createElement("div");
            col2.setAttribute("class", "col s4");
            let col3 = document.createElement("div");
            col3.setAttribute("class", "col s4");
            if (designacao.matrizEmparelhamento[i][j] == -1) {
                col1.innerText = document.getElementById("lado" + i).value;
                col2.innerText = document.getElementById("cima" + j).value;
                let valor = designacao.matrizOriginal[i][j];
                custoTotal += valor;
                col3.innerText = valor;
                linha.appendChild(col1);
                linha.appendChild(col3);
                linha.appendChild(col2);
                custos.appendChild(linha);
                break;
            }
        }
    }
    let linhaFinal = document.createElement("div");
    linhaFinal.setAttribute("class", "row");
    let col1 = document.createElement("div");
    col1.setAttribute("class", "col s4");
    let col2 = document.createElement("div");
    col2.setAttribute("class", "col s4");
    let col3 = document.createElement("div");
    col3.setAttribute("class", "col s4");
    col1.innerText = "Valor Total";
    col2.innerText = custoTotal;
    linhaFinal.appendChild(col1);
    linhaFinal.appendChild(col2);
    linhaFinal.appendChild(col3);
    custos.appendChild(linhaFinal);

}