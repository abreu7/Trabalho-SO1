class Processo{
    constructor(nome, tempoChegada, tempoExecucao, intervaloEs, duracaoEs){
        this.nome = nome;
        this.tempoChegada = tempoChegada;
        this.tempoExecucao = tempoExecucao;
        this.intervaloEs = intervaloEs;
        this.duracaoEs = duracaoEs;
        this.posicaoAtual = 0;
        this.pronto = false;
        this.termino;
    }

    getName(){
        return this.nome;
    }

    getTempoChegada(){
        return this.tempoChegada;
    }

    getTempoExecucao(){
        return this.tempoExecucao;
    }

    getIntervaloEs(){
        return this.intervaloEs;
    }

    getDuracaoEs(){
        return this.duracaoEs;
    }

    getPosicaoAtual(){
        return this.posicaoAtual;
    }

    setPosicaoAtual(valor){
        this.posicaoAtual = valor;
    }

    setComeco(valor){
        this.comeco = valor;
    }

    getComeco(){
        return this.comeco;
    }

    setTermino(valor){
        this.termino = valor;
    }

    getTermino(){
        return this.termino;
    }

    getPronto(){
        return this.pronto;
    }

    setPronto(status){
        this.pronto = status;
    }

    getTurnAround(){
        return this.termino - this.chegada;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }
}

//Use para testar

/* var listaProcessos = [new Processo("p1", 0, 6, 3, 2)];
listaProcessos.push(new Processo("p2", 0, 7, 1, 3));
listaProcessos.push(new Processo("p3", 13, 7, 4, 3));
console.log(listaProcessos);
adicionaProcesso(listaProcessos); */

var listaProcessos = [];

var botaoAdicionar = document.querySelector("#adicionar-processo")
	botaoAdicionar.addEventListener("click", function(event){
    var nome = document.querySelector("#nome");
    var chegada = document.querySelector("#chegada");
    var execucao = document.querySelector("#execucao");
    var intervaloEs = document.querySelector("#intervalo-entrada-saida");
    var duracaoEs = document.querySelector("#duracao-entrada-saida");

    if (filtraDadosEntrada(nome, chegada, execucao,) != false){

        if (duracaoEs.value.length == "0"){
            intervaloEs.value = execucao.value;
        }

        listaProcessos.push(new Processo(nome.value, parseInt(chegada.value), parseInt(execucao.value), parseInt(intervaloEs.value), parseInt(duracaoEs.value)));

        var tabela = document.querySelector("#fluxograma");
        var linha = document.createElement("tr");
        var coluna = document.createElement("td");
        var textTd = document.createTextNode(listaProcessos[listaProcessos.length - 1].getName());
        linha.id = listaProcessos.length - 1;
        linha.classList.add("processo");
        tabela.appendChild(linha);
        coluna.appendChild(textTd);
        linha.appendChild(coluna);
        event.preventDefault();
        event.stopPropagation();
		
		//Urias 
		//listaProcessos.forEach(exibenaTela)
		exibenaTela(nome, chegada, execucao, intervaloEs, duracaoEs);
    }
});

//TESTE URIAS
//document.getElementById("teste").onclick = function() {adicionaProcessoUrias()};

function exibenaTela(nome, chegada, execucao,intervaloEs, duracaoEs){
	var div_pricipal = document.getElementById("row");
	var div = document.createElement("div"); //Cria a Div
	var span = document.createElement("span"); //Cria o Span
	div_pricipal.appendChild(div); // Adiciona a div criada a Div Principal
	div.classList.add("proc_estilo","col-md-2"); // Adicona a classe a Div
	div.appendChild(span);
	span.innerHTML = "Nome: "      + nome.value + "<br/>" +
					 "Chegada: "   + chegada.value + "<br/>" +
		             "Exec: "      + execucao.value + "<br/>" +
		 			 "Inico E/S: " + intervaloEs.value + "<br/>" +
		             "E/S: "       + duracaoEs.value + "<br/>";
	
	
	//console.log(Processo);
}

//FIM TESTE URIAS

var botaoExecutar = document.querySelector("#executar");
botaoExecutar.addEventListener("click", function(event){
    setIds(listaProcessos);
    ordenaLista(listaProcessos);
    executaLista(listaProcessos, 0, 0, listaProcessos.length);
    event.preventDefault();
    event.stopPropagation();
});

function filtraDadosEntrada(nome, chegada, execucao){
    if (nome.value.length == 0 || chegada.value.length == 0 || execucao.value.length == 0){
        alert("Preencha os valores obrigatórios!");
        return false;
    }
}


function adicionaProcesso(listaProcessos){  //será editado posteriormente para pegar os dados do formulário
    var tabela = document.querySelector("#fluxograma")
    for (var i = 0; i < listaProcessos.length; i++){
        var linha = document.createElement("tr");
        var coluna = document.createElement("td");
        var textTd = document.createTextNode(listaProcessos[i].getName());
        linha.id = i;
        linha.classList.add("processo");
        tabela.appendChild(linha);
        coluna.appendChild(textTd);
        linha.appendChild(coluna);
    }
    setIds(listaProcessos);
}

function setIds(listaProcessos){
    for (var i = 0; i < listaProcessos.length; i++){
        listaProcessos[i].setId(i);
    }
}

function verificaComeco(processo, tempo){
    if (processo.getPosicaoAtual() == 0){
        processo.setComeco(tempo);
    }
}

function verificaPronto(processo, tempo){
    if (tempo >= processo.getTempoChegada() && processo.getPosicaoAtual() == 0){    //se o processo já chegou e ainda não iniciou
        processo.setPronto(true);
    }else{
        if ((processo.getTermino() + processo.getDuracaoEs()) <= tempo){
            processo.setPronto(true);
        }
    }
}

function voltaPrimeiro(listaProcessos, tempo, n){
    var indice;
    var min = Infinity;
    var resto;
    for (var i = 0; i < n; i++){
        if (listaProcessos[i].getComeco() != undefined){    //se o processo já iniciou
            resto = (listaProcessos[i].getDuracaoEs() - (tempo - listaProcessos[i].getTermino()));  //resto é o tempo que falta para terminar E/S
        }else{  //se o processo ainda não iniciou
            resto = listaProcessos[i].getTempoChegada() - tempo;  //resto é o tempo que falta para a chegada do processo
        }
        if (min > resto){
            min = resto;
            indice = i;
        }
    }
    return indice; 
}

function terminaProcesso(processo, tempo, cont){
    processo.setPosicaoAtual(processo.getTempoExecucao());
    processo.setTermino(tempo + cont);
}

function ajustaLista(listaProcessos, i){
    listaProcessos.push(listaProcessos[i]);
    listaProcessos.splice(i, 1);
}

function executaEs(listaProcessos, tempo, i, n){

    var cont = (listaProcessos[i].getDuracaoEs() - (tempo - listaProcessos[i].getTermino()));
    listaProcessos[i].setPronto(true);
    desenhaFluxograma(listaProcessos[i], tempo, cont, "es");
    executaLista(listaProcessos, tempo + cont, i, n);
}

function desenhaFluxograma(processo, tempo, cont, status){
    var tabela = document.querySelector("#fluxograma");
    var numLinhas = tabela.rows.length;
    var linha;
    var coluna;
    for (var i = 0; i < numLinhas; i++){
        for (var j = (tempo + 1); j < (tempo + 1 + cont); j++){
            linha = tabela.rows[i];
            coluna = linha.insertCell(j);
            if (linha.id == processo.getId()){
                coluna.classList.add("coluna", status);
            }else{
                coluna.classList.add("coluna");
            }
        }
    }
    
}

function executaInicio(listaProcessos, tempo, i, n){
    cont = listaProcessos[i].getTempoChegada() - tempo;
    listaProcessos[i].setPronto(true);
    desenhaFluxograma(listaProcessos[i], tempo, cont, "es");
    executaLista(listaProcessos, tempo + cont, 0, n);
}

function executaLista(listaProcessos, tempo, i, n){

    verificaPronto(listaProcessos[i], tempo);
    if (listaProcessos[i].pronto == true){  //se o processo está pronto
        //executa até a proxima E/S
        verificaComeco(listaProcessos[i], tempo);
        var cont = listaProcessos[i].getIntervaloEs();
        listaProcessos[i].setPosicaoAtual(listaProcessos[i].getPosicaoAtual() + cont);
        listaProcessos[i].setTermino(tempo + cont);
        if (listaProcessos[i].getPosicaoAtual() >= listaProcessos[i].getTempoExecucao()){   //se o processo chegou ao fim
            cont = cont - (listaProcessos[i].getPosicaoAtual() - listaProcessos[i].getTempoExecucao());
            terminaProcesso(listaProcessos[i], tempo, cont);
            if (n > 1){ //se não for o ultimo processo
                desenhaFluxograma(listaProcessos[i], tempo, cont, "executado");
                ajustaLista(listaProcessos, i);
                n--;
                executaLista(listaProcessos, tempo + cont, 0, n);
            } else{ //se for o ultimo processo
                desenhaFluxograma(listaProcessos[i], tempo, cont, "executado");
                tempo += cont;
                ordenaLista(listaProcessos);
                console.log(tempo);
                return false;
            }
        }else{  //se o processo não chegou ao fim
            listaProcessos[i].setPronto(false); 
            desenhaFluxograma(listaProcessos[i], tempo, cont, "executado");
            executaLista(listaProcessos, tempo + cont, 0, n);
        }
    }else{  //se o processo não está pronto
        if ((i + 1) < n){ //se o processo não for o ultimo da lista
            //passa para o proximo
            executaLista(listaProcessos, tempo, i + 1, n);
        }else if (n == 1){    //se a lista contém apenas esse processo
            if(listaProcessos[i].getComeco() != undefined){ //se o processo já foi iniciado
                executaEs(listaProcessos, tempo, i, n);
            }else{  //se o processo ainda não foi iniciado
                executaInicio(listaProcessos, tempo, i, n);
            }
        }else if((i+1) == n && n != 1){ //se nenhum processo está pronto
            i = voltaPrimeiro(listaProcessos, tempo, n);
            if (listaProcessos[i].getComeco() != undefined){
                executaEs(listaProcessos, tempo, i, n);
            }else{
                executaInicio(listaProcessos, tempo, i, n);
            }
        }
    }
}

function comparar(a,b){
    if (a.tempoExecucao < b.tempoExecucao){
        return -1;
    }
    if (a.tempoExecucao < b.tempoExecucao){
        return 1;
    }
    return 0;
}

function ordenaLista(listaProcessos){
    listaProcessos.sort(comparar)
}