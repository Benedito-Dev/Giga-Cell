export default function handler(req, res) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category } = req.query;
  
  const mockData = [
    {
      "id": "7a1b3c9d-42f6-4e87-a91e-3c24efb03e65",
      "nome": "Tablet Galaxy Tab S9",
      "imagemUrl": "https://images.samsung.com/is/image/samsung/p6pim/br/sm-x510nzadzto/gallery/br-galaxy-tab-s9-fe-sm-x510-sm-x510nzadzto-538708899?$684_547_PNG$",
      "preco": "4299.90",
      "categoria": "tablet",
      "descricao": "Tablet Samsung Galaxy Tab S9 com tela AMOLED de 11 polegadas, 8GB RAM e 256GB de armazenamento.",
      "estoque": 12,
      "marca": "Samsung",
      "cor": "Preto",
      "armazenamento": "128GB"
    }
  ];
  
  const filteredData = category ? mockData.filter(p => p.categoria === category) : mockData;
  res.json(filteredData);
}