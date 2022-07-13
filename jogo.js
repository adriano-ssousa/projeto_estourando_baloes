var timerId = null;     //variavel que armazena a chamada da função timeout

function iniciaJogo(){

    var url = window.location.search; //recuperando apenas a parte da query string, que esta a partir do sinal de ?, a escolha do nivel
    /* alert(url); */
    
    var nivel_jogo = url.replace("?", ""); //essa função procura o caractere "?" e substitui por nada "", isolando uma única variavel que é a numeração do nivel do jogo
   /*  alert(nivel_jogo); */

    var tempo_segundos = 0;

    if(nivel_jogo == 1) { //1 fácil -> 120 seg
        tempo_segundos = 120;
    }

    if(nivel_jogo == 2){ //2 normal -> 60 seg
        tempo_segundos = 60;
    }

    if(nivel_jogo == 3){ //3 dificil -> 30 seg
        tempo_segundos = 30;
    }

    //inserir segundos no span
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //quantidade de baloes
    var qtde_baloes = 80;

    cria_baloes(qtde_baloes);

    //imprime qtde de baloes inteiros
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

    //imprime qtde de baloes estourados
    document.getElementById('baloes_estourados').innerHTML = 0; //começando com zero

    contagem_tempo(tempo_segundos + 1);
     /* contagem_tempo(6) escolhendo a quantidade de segundos do cronometro*/

}

function contagem_tempo(segundos){

    segundos = segundos - 1;

    if(segundos == -1){
        clearTimeout(timerId); //para a execução da funcao setTimeout
        gamer_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    //   setTimeout("funcao",1000);
    timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

function gamer_over(){
        remove_eventos_baloes();
        alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo!');
}

function cria_baloes(qtde_baloes){

    for(var i = 1; i <= qtde_baloes; i++){

        var balao = document.createElement("img");
        balao.src = '/projeto_estourando_baloes/imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b' +i;
        balao.onclick = function(){estourar(this)}

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){  // "e" é uma variavel qualquer atribuida a função estourar

    var id_balao = e.id;     

    document.getElementById(id_balao).setAttribute("onclick", ""); //substitui o onclick por "", fazendo com que o balão seja estourado uma unica vez
    document.getElementById(id_balao).src = '/projeto_estourando_baloes/imagens/balao_azul_pequeno_estourado.png';
    /* alert(id_balao); */
    pontuacao(-1);
    
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
    
    situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert('Parabéns, você conseguiu estourar todos os balões a tempo!');
        parar_jogo();
    }

}

function parar_jogo(){
    clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}