const key = "566821b76989e19db4864623a14dce07"; // chave da API OpenWeatherMap

// Função para atualizar o background com base nas condições climáticas
function atualizarBackground(condicoesClimaticas) {
    const body = document.body;

    if (condicoesClimaticas.includes("céu limpo")) {
        // Defina o background para uma imagem de sol
        body.style.backgroundImage = "url('media/sol.jpg')";
    } else if (condicoesClimaticas.includes("chuva")) {
        // Defina o background para uma imagem de chuva
        body.style.backgroundImage = "url('media/chuva.jpg')";
    } else if (condicoesClimaticas.includes("nublado")) {
        // Defina o background para uma imagem de nublado
        body.style.backgroundImage = "url('media/nuvens.jpg')";
    } else {
        // Defina um background padrão para outras condições
        body.style.backgroundImage = "url('media/natureza.jpeg')";
    }
}

// Função para colocar os dados da API na tela
function colocarDadosNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "ºC";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;

    // Chame a função atualizarBackground com base nas condições climáticas da API
    atualizarBackground(dados.weather[0].description.toLowerCase());
}

// Função para buscar a cidade na API OpenWeatherMap
async function buscarCidade(cidade) {
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());
        colocarDadosNaTela(dados);
    } catch (error) {
        console.error("Erro ao buscar dados da API: " + error);
    }
}

// Função chamada quando o botão é clicado
function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;

    buscarCidade(cidade);

    console.log(cidade);
}
