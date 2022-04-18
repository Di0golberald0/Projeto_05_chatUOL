function perguntarNome() {
    const usuario = { name: `${prompt('Qual é o seu nome?')}`};
    console.log(usuario.name)
    entrarSala(usuario);
}

perguntarNome()

function entrarSala(elemento) {
    const participante = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', elemento);
    console.log("entrarSala= " + elemento.name)
    participante.then(entrarSucesso(elemento));
    participante.catch(entrarErro);
}

function entrarSucesso(usuario) {
	console.log("Entrou na sala com sucesso!");
    setInterval(function () {
        const repeticao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario)
        console.log("Repitiu com sucesso")
}
    , 5000);
    setInterval(displayMensagens, 3000);
}

function entrarErro(error) {
    alert("Esse nome já está em uso, por favor escolha outro");
    perguntarNome();
}

function displayMensagens() {
    console.log("displayMensagens")
    const messages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    console.log("messages=" + messages)
    messages.then(displaySucesso);
    messages.catch(displayErro);
}

function displaySucesso(elemento) {
    console.log("Mensagens adquiridas")
    const data = elemento.data;
    const mensagens = document.querySelector(".mensagens");
    mensagens.innerHTML = "";
    for(let i = 0; i < data.length; i++){
        console.log("rodandoLoop")
        if(data[i].type === "status"){
            mensagens.innerHTML += `
            <div class="mensagem ${data[i].type}">
            <span class="time">(${data[i].time})</span><span class="from"> ${data[i].from}</span><span class="text"> ${data[i].text}</span>
            </div>
            `
        }
        else if(data[i].type === "message"){
            mensagens.innerHTML += `
            <div class="mensagem ${data[i].type}">
            <span class="time">(${data[i].time}) </span> <span class="from">${data[i].from} para <span class="to">${data[i].to}</span>: </span><span class="text">${data[i].text}</span>
            </div>
            `
        }
        else{
            mensagens.innerHTML += `
            <div class="mensagem ${data[i].type}">
            <span class="time">(${data[i].time}) </span> <span class="from">${data[i].from} reservadamente para <span class="to">${data[i].to}</span>: </span><span class="text">${data[i].text}</span>
            </div>
            `
        }
    }
    mensagens.scrollIntoView();
}

function displayErro() {
    console.log("Deu xabu, mano")
    displayMensagens()
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