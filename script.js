const filtros = document.querySelectorAll('#filtros li');
const conteiner = document.getElementById('conteiner-elementos');
let habilidades = [];

async function carregarHabilidades() {
  try {
    const resposta = await fetch('api/habilidades.json');
    habilidades = await resposta.json();
    renderizarHabilidades(habilidades);
  } catch (erro) {
    console.error("Erro ao carregar habilidades:", erro);
  }
}

function renderizarHabilidades(lista) {
  conteiner.innerHTML = '';

  lista.forEach((hab, index) => {
    const div = document.createElement('div');
    div.classList.add('elementos');
    div.setAttribute('data-category', hab.categoria);

    div.innerHTML = `
      <img src="${hab.icone}" alt="${hab.nome}">
      <p>${hab.nome}</p>
    `;

    setTimeout(() => {
      div.classList.add('slide-in');
    }, index * 150);

    conteiner.appendChild(div);
  });
}

filtros.forEach(botao => {
  botao.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const filtro = botao.getAttribute('data-filter');

    conteiner.style.opacity = 0;
    setTimeout(() => {
      if (filtro === 'tudo') {
        renderizarHabilidades(habilidades);
      } else {
        const filtradas = habilidades.filter(h => h.categoria === filtro);
        renderizarHabilidades(filtradas);
      }
      conteiner.style.opacity = 1;
    }, 200);
  });
});

carregarHabilidades();

const username = "italloferreira";
const projeto = document.getElementById("conteiner-projeto");

async function carregarRepositorio() {

  const respostaURL = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: "application/vnd.github.mercy-preview+json"
    }
  });

  const respostaJSON = await respostaURL.json();

  projeto.innerHTML = "";

  respostaJSON.forEach(repositorio => {
    if (!repositorio.topics.includes("portfolio-project")) return;

    const imagem = `https://raw.githubusercontent.com/${username}/${repositorio.name}/main/print%20projeto.png`;

    const cartao = document.createElement("div");
    cartao.classList.add("projeto");

    cartao.innerHTML = `
  <div class="conteiner-projeto-img">
    <img src="${imagem}" alt="/img/imgNaoDisponivel.png">
  </div>

  <div class="conteiner-projeto-informacao">
    <h1>${repositorio.name}</h1>

    <div class="conteiner-projeto-icones">
      <span>${repositorio.language || "N/A"}</span>
    </div>

    <p>${repositorio.description || "Sem descrição"}</p>

    <div class="conteiner-projeto-botoes">
      <a href="${repositorio.html_url}" target="_blank">
        <button class="butao"><img src="/img/icones/github.png"></button>
      </a>

      ${repositorio.homepage ? `
      <a href="${repositorio.homepage}" target="_blank">
        <button class="butao"><img src="/img/icones/external.png"></button>
      </a>` : ""}
    </div>
  </div>
`;
    projeto.appendChild(cartao);

  })
}

carregarRepositorio();


