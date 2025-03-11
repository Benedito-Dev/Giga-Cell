import { useEffect, useState } from 'react';

function ItemList() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/itens?search=${search}`)
            .then(response => response.json())
            .then(data => {
                console.log('Dados recebidos:', data); // Verifique os dados no console do navegador
                setItems(data);
            })
            .catch(error => console.error('Erro ao buscar itens:', error));
    }, [search]); // Atualiza sempre que 'search' mudar

    return (
        <div>
            <h1>Lista de Itens</h1>
            <input 
                type="text" 
                placeholder="Pesquisar item..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.produto} - {item.preco} - {item.unidade}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
