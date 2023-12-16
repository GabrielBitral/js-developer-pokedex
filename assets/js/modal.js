const modal = {};

const modalElement = document.getElementById("modal");

const span = document.getElementsByClassName("close")[0];

const modalPokeIdentify = document.querySelector('.poke-identify');

modal.adicionarClickAosCards = () => {
  const cardsPokemon = document.getElementsByClassName("pokemon");
  const pokemonsList = Array.from(cardsPokemon);
  pokemonsList.map((cardPokemon) => {
    cardPokemon.addEventListener('click', () => {
      modalElement.style.display = 'block';
      const type = cardPokemon.classList[1];
      if (modalPokeIdentify.classList[1]) {
        modalPokeIdentify.classList.replace(modalPokeIdentify.classList[1], type);
      } else {
        modalPokeIdentify.classList.add(type);
      }

      modal.preencherDadosPokemon(cardPokemon);
      modal.colocarImagemPokemon(cardPokemon);
      modal.buscarMaisDetalhes(cardPokemon);
    })
  })
}

modal.preencherDadosPokemon = (cardPokemon) => {
  document.querySelector('.poke-name').innerHTML = cardPokemon.children[1].innerHTML;
  document.querySelector('.poke-id').innerHTML = cardPokemon.children[0].innerHTML;
  const typesHtml = Array.from(cardPokemon.children[2].children[0].children);
  const addTypes = [];
  typesHtml.forEach((typeHtml) => {
    addTypes.push(`
            <li class="type ${typeHtml.innerHTML}">${typeHtml.innerHTML}</li>
        `)
  })
  document.querySelector('.pokemon-types').innerHTML = addTypes.join('');
}

modal.colocarImagemPokemon = (cardPokemon) => {
  const urlImagePokemon = cardPokemon.children[2].children[1].getAttribute('src');
  const altImagePokemon = cardPokemon.children[2].children[1].getAttribute('alt');
  document.querySelector('.poke-img').innerHTML = `<img src="${urlImagePokemon}" alt="${altImagePokemon}" />`;
}

modal.buscarMaisDetalhes = (cardPokemon) => {
  const idPokemon = cardPokemon.children[0].innerHTML.replace('#', '');
  pokeApi.getMoreDetails(idPokemon).then((response) => {
    document.querySelector('.poke-height').innerHTML = `Height: ${response.height * 10} cm`;
    document.querySelector('.poke-weight').innerHTML = `Weight: ${response.weight / 10} kg`;
    document.querySelector('.poke-species').innerHTML = `Species: ${response.species}`;
    const abilities = response.abilities.join(', ');
    document.querySelector('.poke-abilities').innerHTML = `Abilities: ${abilities}`;
  });
}

span.onclick = function () {
  modalElement.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalElement) {
    modalElement.style.display = "none";
  }
}
