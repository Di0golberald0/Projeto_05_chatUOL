function perguntarNome() {
    const usuario = { name: `${prompt('Qual é o seu nome?')}`};
    console.log(usuario.name)
    entrarSala(usuario);
}

perguntarNome()

function entrarSala(elemento) {
    const participante = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', elemento);
    console.log("entrarSala= " + elemento.name)
    console.log("participante= " + participante)
    participante.then(entrarSucesso(elemento));
    participante.catch(entrarErro);
}

function entrarSucesso(usuario) {
	console.log("Resposta recebida com sucesso!");
    const statusCode = usuario.status;
    console.log("statusCode= " + statusCode)
    console.log("usuario= " + usuario.name)
    //setInterval(manterConexao(usuario), 5000);
    setInterval(displayMensagens, 3000);
}

function entrarErro(error) {
    alert("Esse nome já está em uso, por favor escolha outro")
	console.log("Resposta recebida com falha!");
    const statusCode = error.response.status;
    console.log(statusCode)
    perguntarNome()
}

function manterConexao(elemento) {
    const repeticao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', elemento);
    console.log("manterConexao= "+ elemento.name)
    console.log("Requisição enviada")
}

function displayMensagens() {
    console.log("displayMensagens")
    const messages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    const mensagens = document.querySelector(".mensagens");
    console.log(messages.data)
    for(let i = 0; i < messages.lenght; i++){
        console.log("rodandoLoop")
        mensagens.innerHTML += `
        <div class="mensagem ${messages.type}">
        <spam class="time">'(${messages.time}) '</spam> <spam class="from">'${messages.from} '</spam> para <spam class="to">'${messages.to}: '</spam><spam class="text">${messages.text}</spam>
        </div>
        `
    }
}

function enviarMensagem() {
    const input = document.querySelector(".entrada")
    const object = {
        from: "nome do usuário",
        to: "Todos",
        text: `${input.text}`,
        type: 'message'
    }
    const envio = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', object);
}