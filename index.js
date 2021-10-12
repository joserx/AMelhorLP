function abrirModal() {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  overlay.style.display = "block";
  modal.style.display = "block";
}
function fecharModal() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
}

const sub = document.getElementById("sub");
sub.addEventListener("click", reservar);

async function reservar() {
  const { nome, email, escritorio, data, mesas } =
    document.getElementById("form");
  if (!nome.value || !email.value || !data.value) {
    return alert("Todos os campos são obrigatórios");
  }
  const body = JSON.stringify({
    nome: nome.value,
    email: email.value,
    escritorio: escritorio.value,
    data: data.value,
    mesas: mesas.value,
  });
  const headers = new Headers();
  headers.append("Content-Type", "Application/json");

  const options = {
    method: "POST",
    mode: "cors",
    headers,
    body,
  };

  const request = new Request("http://localhost:3000", options);
  const resposta = await fetch(request);
  const dados = await resposta.json();
  if (dados.status == 200) {
    alert("Agendamento realizado com sucesso");
  }
}
async function localizarFilial() {
  const request = new Request("http://localhost:3000/filial");
  const resposta = await fetch(request);
  const dados = await resposta.json();
  escritorio(dados);
}
localizarFilial();

async function escritorio(data) {
  const escritorios = document.getElementById("btescrit");
  await data.map((e) => {
    escritorios.innerHTML += `<option>${e.nome}</option>`;
  });
}
async function localizarMesa() {
  const request = new Request("http://localhost:3000/mesa");
  const resposta = await fetch(request);
  const dados = await resposta.json();
  mesa(dados);
}
localizarMesa();

async function mesa(data) {
  const escritorios = document.getElementById("mesas");
  await data.map((e) => {
    escritorios.innerHTML += `<option>${e.nome}</option>`;
  });
}
