let listaDeNumerosSorteados =  [];
let numeroMaximo = 20;
let numeroMinimo = 1;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

 function iniciar(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto!!!');
    exibirTextoNaTela('p', `Digite um número de ${numeroMinimo} a ${numeroMaximo}`)
    exibirTextoNaTela('input', `type= "number" min="${numeroMinimo}" max="${numeroMaximo}" class="container__input"`);
    console.log(numeroSecreto);
 }

 iniciar();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        
        let palavraTentativas = tentativas == 1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `Parabéns, você acertou o número secreto com ${tentativas} ${palavraTentativas}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto){
        exibirTextoNaTela('p', 'O número secreto é menor.');
    } else {
        exibirTextoNaTela('p','O número secreto é maior.');
    }
    tentativas++
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()*numeroMaximo)+1;
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // length retorna o tamanho da lista

    if (quantidadeDeElementosNaLista == 3) { //se a quantidade de elementos na lista for igual ao número máximo, então limpamos a lista para evitar bug de travar o programa;
        listaDeNumerosSorteados = []; // limpa a lista "tome cuidado com isso, hein!"
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //.push Adiciona ao final da lista a informação.
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    iniciar();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}