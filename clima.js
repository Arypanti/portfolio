const apiKey = "9087d0d94de9c8c307dbd35adb172b5c";

function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatarData(dataString) {
  const data = new Date(dataString);
  const opcoes = { weekday: 'long', day: 'numeric', month: 'long' };
  return data.toLocaleDateString('pt-BR', opcoes);
}

function agruparPorDia(lista) {
  const dias = {};
  lista.forEach(item => {
    const dia = item.dt_txt.split(" ")[0];
    if (!dias[dia]) dias[dia] = [];
    dias[dia].push(item);
  });
  return dias;
}

function buscarClima() {
  const cidadeInput = document.getElementById("cidade").value;
  const cidade = removerAcentos(cidadeInput);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade},BR&appid=${apiKey}&units=metric&lang=pt`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const nomeCidade = data.city.name;
      const pais = data.city.country;
      const lat = data.city.coord.lat;
      const lon = data.city.coord.lon;

      document.getElementById("resultado").innerHTML = `<h2>${nomeCidade}, ${pais}</h2>`;

      const dias = agruparPorDia(data.list);
      exibirPrevisao(dias);

      // Mapa
      const mapa = L.map('mapa').setView([lat, lon], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapa);

      L.marker([lat, lon]).addTo(mapa)
        .bindPopup(`📍 ${nomeCidade}`)
        .openPopup();
    })
    .catch(() => {
      document.getElementById("resultado").innerHTML = "Cidade não encontrada.";
      document.getElementById("mapa").innerHTML = "";
    });
}

function exibirPrevisao(dias) {
  const container = document.getElementById("resultado");

  Object.keys(dias).slice(0, 5).forEach(dia => {
    const temp = dias[dia][0].main.temp;
    const desc = dias[dia][0].weather[0].description;
    const dataFormatada = formatarData(dias[dia][0].dt_txt);
    container.innerHTML += `<div><strong>${dataFormatada}</strong>: ${temp}°C - ${desc}</div>`;
  });
}
