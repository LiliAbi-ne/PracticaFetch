document.getElementById('searchButton').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value;
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('results');
            results.innerHTML = '';
            data.results.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-4 product-card';
                productCard.innerHTML = `
                    <img src="${product.thumbnail}" class="product-image" alt="${product.title}">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${product.price}</p>
                    <a href="${product.permalink}" class="btn btn-info" target="_blank">Ver Producto</a>
                `;
                results.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error:', error));
});
