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
