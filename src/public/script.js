async function fetchItens() {
    try {
        const response = await fetch('http://localhost:3000/itens');
        const itens = await response.json();
        displayItens(itens);
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
    }
}

function displayItens(itens) {
    const itensList = document.getElementById('itens-list');
    itensList.innerHTML = '';

    itens.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <strong>${item.Produto}</strong>
            <p>Preço: R$ ${item.Preco}</p>
            <p>Unidade: ${item.Unidade}</p>
        `;
        itensList.appendChild(itemElement);
    });
}