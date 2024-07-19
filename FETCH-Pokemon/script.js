document.getElementById('searchButton').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            const results = document.getElementById('results');
            results.innerHTML = '';
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'col-md-4 pokemon-card';
            pokemonCard.innerHTML = `
                <img src="${data.sprites.front_default}" class="pokemon-image" alt="${data.name}">
                <h2 class="pokemon-name">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <p class="pokemon-details"><strong>Altura:</strong> ${data.height / 10} m</p>
                <p class="pokemon-details"><strong>Peso:</strong> ${data.weight / 10} kg</p>
                <p class="pokemon-details"><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
                <a href="https://www.pokemon.com/us/pokedex/${data.name}" class="btn btn-info" target="_blank">Ver más detalles</a>
            `;
            results.appendChild(pokemonCard);
        })
        .catch(error => {
            const results = document.getElementById('results');
            results.innerHTML = `<p class="text-center text-danger">${error.message}</p>`;
        });
});
