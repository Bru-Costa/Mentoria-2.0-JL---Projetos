## API de Gerenciamento de Estoque (Express)

**Observação**: Esta API é destinada exclusivamente para estudos de Teste de Software. Os dados são armazenados em memória.

### Funcionalidades
- **Cadastrar produtos**: `POST /api/products`
- **Remover produto**: `DELETE /api/products/{id}`
- **Alterar quantidade**: `PATCH /api/products/{id}/quantity` (com `delta` ou `set`)
- **Listar produtos**: `GET /api/products`

### Requisitos
- Node.js 18+

### Instalação
```bash
npm install
```

### Executar em desenvolvimento
```bash
npm run dev
```

### Executar em produção
```bash
npm start
```

### Healthcheck
- `GET /health`

### Swagger (Documentação)
- URL: `http://localhost:3000/api-docs`

### Exemplo de payloads
```json
// Criar produto
{
  "name": "Teclado Mecânico",
  "sku": "TEC-001",
  "quantity": 10,
  "price": 399.9
}
```

```json
// Atualizar quantidade (incrementar/decrementar)
{ "delta": -2 }

// Definir quantidade absoluta
{ "set": 25 }
```

### Notas
- Armazenamento em memória (reinicia a cada execução).
- Sem banco de dados intencionalmente, para focar em cenários de teste.


