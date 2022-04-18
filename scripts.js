let nomeUsuario;

function perguntarNome() {
    nomeUsuario = { name: `${prompt('Qual é o seu nome?')}`};
    entrarSala(nomeUsuario);
}

perguntarNome()

function entrarSala(elemento) {
    const participante = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', elemento);
    participante.then(entrarSucesso);
    participante.catch(entrarErro);
}

function entrarSucesso() {
    setInterval(function () {
        const repeticao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario)
}
    , 5000);
    setInterval(displayMensagens, 3000);
}

function entrarErro() {
    alert("Esse nome já está em uso, por favor escolha outro");
    perguntarNome();
}

function displayMensagens() {
    const messages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    messages.then(displaySucesso);
    messages.catch(displayErro);
}

function displaySucesso(elemento) {
    const data = elemento.data;
    const mensagens = document.querySelector(".mensagens");
    mensagens.innerHTML = "";

    for(let i = 0; i < data.length; i++){
        if(data[i].type === "status"){
            mensagens.innerHTML += `
            <div class="mensagem ${data[i].type}">
            <span class="time">(${data[i].time})</span>&nbsp;
            <span class="from">${data[i].from}</span>&nbsp;
            <span class="text">${data[i].text}</span>
            </div>
            `
        }
        else if(data[i].type === "message"){
            mensagens.innerHTML += `
            <div class="mensagem ${data[i].type}">
            <span class="time">(${data[i].time})</span> &nbsp;
            <span class="from"> ${data[i].from}</span> &nbsp;
            para &nbsp;
            <span class="to">${data[i].to}</span>: &nbsp;
            <span class="text">${data[i].text}</span>
            </div>
            `
        }
        else {
            if(data[i].from === nomeUsuario || data[i].to === nomeUsuario) {
                mensagens.innerHTML += `
                <div class="mensagem ${data[i].type}">
                <span class="time">(${data[i].time})</span> &nbsp;
                <span class="from">${data[i].from}</span>&nbsp;
                reservadamente &nbsp; para &nbsp;
                <span class="to">${data[i].to}</span>: &nbsp;
                <span class="text">${data[i].text}</span>
                </div>
                `
            }
        }
    }
    mensagens.scrollIntoView();
}

function displayErro() {
    displayMensagens()
}

function enviarMensagem() {
    const input = document.querySelector(".entrada");
    const object = {
        from: `${nomeUsuario.name}`,
        to: "Todos",
        text: `${input.value}`,
        type: 'message'
    };
    if(input.value !== ""){
        const envio = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', object);
        envio.then(function () {
            input.value = '';
            atualizarPagina()
        })
        envio.catch(function (error) {console.log(error.response)})
    }
}

function atualizarPagina() {
    const messages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    messages.then(displaySucesso);
    messages.catch(displayErro);
}