class Processo{
    constructor(nome, tempoChegada, tempoExecucao, intervaloEs, duracaoEs, posicaoAtual){
        this.nome = nome;
        this.tempoChegada = tempoChegada;
        this.tempoExecucao = tempoExecucao;
        this.intervaloEs = intervaloEs;
        this.duracaoEs = duracaoEs;
        this.posicaoAtual = posicaoAtual;
        this.pronto = false;
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

    setTermino(valor){
        this.termino = valor;
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
}

let listaProcessos = [new Processo("p1", 0, 6, 3, 2, 0)];
listaProcessos.push(new Processo("p2", 1, 7, 4, 3, 0));
listaProcessos.push(new Processo("p3", 13, 7, 4, 3, 0));

console.log(listaProcessos);
//var clone = copiaLista(listaProcessos);
executaLista(listaProcessos, 0, 0, listaProcessos.length);
//console.log(n);

function copiaLista(src){
    let objetoListaProcessos = {};
    objetoListaProcessos.list = src;
    let clone = Object.assign({}, objetoListaProcessos);
    return clone.list;
}

function criaTabela(){
    var tabela = document.createElement("table");
    var cabecalho = document.createElement("thead");
    var corpo = document.createElement("tbody");
    var linha = document.createElement("tr");
    var coluna = document.createElement("td");
    var textTd = document.createTextNode("coluna");

    tabela.appendChild(cabecalho);
    tabela.appendChild(corpo);
    corpo.appendChild(linha);
    coluna.appendChild(textTd);
    linha.appendChild(coluna);

    document.querySelector("#demonstracao").appendChild(tabela);
}

function verificaComeco(processo, tempo){
    if (processo.getPosicaoAtual() == 0){
        processo.setComeco(tempo);
    }
}

function verificaPronto(processo, tempo){
    if (tempo >= processo.getTempoChegada() && processo.getPosicaoAtual() == 0){
        processo.setPronto(true);
        console.log("ei");
    }else{
        if ((tempo - processo.getPosicaoAtual()) > processo.getDuracaoEs() && processo.getPronto() == false){
            processo.setPronto(true)
        }
    }
}

function voltaPrimeiro(listaProcessos, tempo, n){
    var indice;
    var min = Infinity;
    var resto;
    for (var i = 0; i < n; i++){
        resto = (listaProcessos[i].getDuracaoEs() - (tempo - listaProcessos[i].getPosicaoAtual()));
        if (Math.min(min, resto) == resto){
            indice = resto;
        }
    }
    return indice; 
}

function terminaProcesso(processo, tempo, cont){
    cont = cont - (processo.getPosicaoAtual() - processo.getTempoExecucao());
    processo.setPosicaoAtual(processo.getTempoExecucao());
    processo.setTermino(tempo + cont);
}

function executaLista(listaProcessos, tempo, i, n){

    verificaPronto(listaProcessos[i], tempo);
    if (listaProcessos[i].pronto == true){
        verificaComeco(listaProcessos[i], tempo);
        var cont = listaProcessos[i].getIntervaloEs();
        listaProcessos[i].setPosicaoAtual(listaProcessos[i].getPosicaoAtual() + cont);
        if (listaProcessos[i].getPosicaoAtual() >= listaProcessos[i].getTempoExecucao()){
            cont = cont - (listaProcessos[i].getPosicaoAtual() - listaProcessos[i].getTempoExecucao());
            listaProcessos[i].setPosicaoAtual(listaProcessos[i].getTempoExecucao());
            listaProcessos[i].setTermino(tempo + cont);
            if (n > 1){
                listaProcessos.push(listaProcessos[i]);
                listaProcessos.splice(i, 1);
                n--;
                executaLista(listaProcessos, tempo + cont, 0, n);
            } else{
                tempo += cont;
                //criaColuna(cont);
                ordenaLista(listaProcessos);
                console.log(tempo);
                return false;
            }
        }else{
            listaProcessos[i].setPronto(false); 
            //criaColuna(cont);
            if ((i + 1) < n){
                //i = voltaPrimeiro(listaProcessos, tempo, n);
                executaLista(listaProcessos, tempo + cont, 0, n);
            }else{
                executaLista(listaProcessos, tempo + cont, 0, n);
            }
        }
    }else{
        if (n == 1){
            var cont = (listaProcesso[i].getDuracaoEs() - (tempo - ListaProcesso[i].getPosicaoAtual()));
            processo[i].setPronto(true);
            listaProcessos[i].setPosicaoAtual(listaProcessos[i].getPosicaoAtual() + listaProcessos[i].getDuracaoEs());
        }
        if ((i + 1) < n){
            executaLista(listaProcessos, tempo + cont, i + 1, n);
        }else{
            executaLista(listaProcessos, tempo + cont, 0, n);
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