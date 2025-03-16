# Banque Sahl Al-Maghrib API Sandbox

Bienvenue à l'API Sandbox de Banque Sahl Al-Maghrib! Il s'agit d'une API bancaire simulée qui reproduit les fonctionnalités d'une véritable API bancaire comme Plaid, mais adaptée au contexte marocain. Elle est conçue à des fins de test et de développement.

## Sandbox URL

The API is available at:

```
https://sahl-bank-api.onrender.com
```

## Authentication

All API endpoints require client credentials for authentication. Include the following headers in your requests:

```
X-Client-ID: client_123456
X-Client-Secret: secret_abcdef123456
```

For testing purposes, the following client credentials are available:
- Client ID: `client_123456`, Client Secret: `secret_abcdef123456`
- Client ID: `client_654321`, Client Secret: `secret_fedcba654321`

## Available Endpoints

### Bank Info

Get information about the Sahl Bank API.

```
GET /bank/info
```

Example request:
```bash
curl -X GET https://sahl-bank-api.onrender.com/bank/info \
  -H "X-Client-ID: client_123456" \
  -H "X-Client-Secret: secret_abcdef123456"
```

Example response:
```json
{
  "name": "Banque Sahl Al-Maghrib API",
  "version": "1.0.0",
  "description": "API bancaire simulée pour les tests au Maroc",
  "endpoints": [
    "/bank/link/token/create",
    "/bank/item/public_token/exchange",
    "/bank/auth/get",
    "/bank/transactions/get",
    "/bank/statements/get",
    "/bank/info"
  ],
  "documentation": "https://docs.sahlfinancial.com"
}
```

### Link Token Creation

Create a link token for client-side initialization.

```
POST /bank/link/token/create
```

Example request:
```bash
curl -X POST https://sahl-bank-api.onrender.com/bank/link/token/create \
  -H "X-Client-ID: client_123456" \
  -H "X-Client-Secret: secret_abcdef123456" \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "client_user_id": "user123"
    },
    "client_name": "Test App",
    "products": ["auth"]
  }'
```

Example response:
```json
{
  "link_token": "link-client_123456-user123-1742073600-abcdef1234567890",
  "expiration": 1742075400,
  "request_id": "req_abcdef12"
}
```

### Public Token Exchange

Exchange a public token for an access token.

```
POST /bank/item/public_token/exchange
```

Example request:
```bash
curl -X POST https://sahl-bank-api.onrender.com/bank/item/public_token/exchange \
  -H "X-Client-ID: client_123456" \
  -H "X-Client-Secret: secret_abcdef123456" \
  -H "Content-Type: application/json" \
  -d '{
    "public_token": "public-token-123"
  }'
```

Example response:
```json
{
  "access_token": "access-abcdef1234567890",
  "item_id": "item-abcdef12",
  "request_id": "req_12345678"
}
```

### Auth

Get account and routing numbers.

```
POST /bank/auth/get
```

Example request:
```bash
curl -X POST https://sahl-bank-api.onrender.com/bank/auth/get \
  -H "X-Client-ID: client_123456" \
  -H "X-Client-Secret: secret_abcdef123456" \
  -H "Content-Type: application/json" \
  -d '{
    "access_token": "access-token-1"
  }'
```

Example response:
```json
{
  "accounts": [
    {
      "account_id": "acc_1",
      "balances": {
        "available": 5000.75,
        "current": 5100.75,
        "limit": null,
        "iso_currency_code": "MAD",
        "unofficial_currency_code": null
      },
      "mask": "1234",
      "name": "Compte Courant Al Amal",
      "official_name": "Compte Courant Premium Al Amal",
      "subtype": "checking",
      "type": "depository"
    },
    {
      "account_id": "acc_2",
      "balances": {
        "available": 12500.00,
        "current": 12500.00,
        "limit": null,
        "iso_currency_code": "MAD",
        "unofficial_currency_code": null
      },
      "mask": "5678",
      "name": "Compte Épargne Al Baraka",
      "official_name": "Compte Épargne Rendement Élevé Al Baraka",
      "subtype": "savings",
      "type": "depository"
    }
  ],
  "numbers": {
    "ach": [
      {
        "account": "007780000123456789012345",
        "account_id": "acc_1",
        "routing": "007780000",
        "wire_routing": "BCMAMAMC"
      },
      {
        "account": "013450000234567890123456",
        "account_id": "acc_2",
        "routing": "013450000",
        "wire_routing": "BMCEMAMC"
      }
    ]
  },
  "request_id": "req_1742073600"
}
```

### Transactions

Get transaction data.

```
POST /bank/transactions/get
```

Example request:
```bash
curl -X POST https://sahl-bank-api.onrender.com/bank/transactions/get \
  -H "X-Client-ID: client_123456" \
  -H "X-Client-Secret: secret_abcdef123456" \
  -H "Content-Type: application/json" \
  -d '{
    "access_token": "access-token-1",
    "start_date": "2025-02-15",
    "end_date": "2025-03-15"
  }'
```

Example response:
```json
{
  "accounts": [
    {
      "account_id": "acc_1",
      "balances": {
        "available": 5000.75,
        "current": 5100.75,
        "limit": null,
        "iso_currency_code": "MAD",
        "unofficial_currency_code": null
      },
      "mask": "1234",
      "name": "Compte Courant Al Amal",
      "official_name": "Compte Courant Premium Al Amal",
      "subtype": "checking",
      "type": "depository"
    },
    {
      "account_id": "acc_2",
      "balances": {
        "available": 12500.00,
        "current": 12500.00,
        "limit": null,
        "iso_currency_code": "MAD",
        "unofficial_currency_code": null
      },
      "mask": "5678",
      "name": "Compte Épargne Al Baraka",
      "official_name": "Compte Épargne Rendement Élevé Al Baraka",
      "subtype": "savings",
      "type": "depository"
    }
  ],
  "transactions": [
    {
      "transaction_id": "tx_acc_1_0",
      "account_id": "acc_1",
      "amount": -45.67,
      "date": "2025-03-10",
      "datetime": "2025-03-10T12:00:00Z",
      "name": "Café Maure",
      "merchant_name": "Café Maure",
      "pending": false,
      "category": ["Food and Drink", "Cafés"],
      "location": {
        "address": "Avenue Mohammed V, 123",
        "city": "Casablanca",
        "region": "Casablanca-Settat",
        "postal_code": "20000",
        "country": "MA"
      }
    },
    {
      "transaction_id": "tx_acc_1_1",
      "account_id": "acc_1",
      "amount": -120.50,
      "date": "2025-03-05",
      "datetime": "2025-03-05T15:30:00Z",
      "name": "Marjane",
      "merchant_name": "Marjane",
      "pending": false,
      "category": ["Shops", "Épicerie"],
      "location": {
        "address": "Boulevard Zerktouni, 90",
        "city": "Rabat",
        "region": "Rabat-Salé-Kénitra",
        "postal_code": "10000",
        "country": "MA"
      }
    }
    // More transactions...
  ],
  "total_transactions": 40,
  "request_id": "req_1742073600"
}
```

### Statements

Get statement data.

```
POST /bank/statements/get
```

Example request:
```bash
curl -X POST https://sahl-bank-api.onrender.com/bank/statements/get \
  -H "X-Client-ID: client_123456" \
  -H "X-Client-Secret: secret_abcdef123456" \
  -H "Content-Type: application/json" \
  -d '{
    "access_token": "access-token-1"
  }'
```

Example response:
```json
{
  "accounts": [
    {
      "account_id": "acc_1",
      "balances": {
        "available": 5000.75,
        "current": 5100.75,
        "limit": null,
        "iso_currency_code": "MAD",
        "unofficial_currency_code": null
      },
      "mask": "1234",
      "name": "Compte Courant Al Amal",
      "official_name": "Compte Courant Premium Al Amal",
      "subtype": "checking",
      "type": "depository"
    },
    {
      "account_id": "acc_2",
      "balances": {
        "available": 12500.00,
        "current": 12500.00,
        "limit": null,
        "iso_currency_code": "MAD",
        "unofficial_currency_code": null
      },
      "mask": "5678",
      "name": "Compte Épargne Al Baraka",
      "official_name": "Compte Épargne Rendement Élevé Al Baraka",
      "subtype": "savings",
      "type": "depository"
    }
  ],
  "statements": [
    {
      "statement_id": "stmt_acc_1_0",
      "account_id": "acc_1",
      "start_date": "2025-03-01",
      "end_date": "2025-03-31",
      "starting_balance": 4800.25,
      "ending_balance": 5100.75,
      "total_deposits": 1500.00,
      "total_withdrawals": 1200.50,
      "pdf_url": "https://api.sahlfinancial.com/statements/acc_1/2025-03.pdf"
    },
    {
      "statement_id": "stmt_acc_1_1",
      "account_id": "acc_1",
      "start_date": "2025-02-01",
      "end_date": "2025-02-28",
      "starting_balance": 4500.00,
      "ending_balance": 4800.25,
      "total_deposits": 1200.00,
      "total_withdrawals": 900.75,
      "pdf_url": "https://api.sahlfinancial.com/statements/acc_1/2025-02.pdf"
    }
    // More statements...
  ],
  "total_statements": 12,
  "request_id": "req_1742073600"
}
```

## Integration Examples

### JavaScript/TypeScript

```javascript
// Example using fetch API
async function getBanqueSahlInfo() {
  const response = await fetch('https://sahl-bank-api.onrender.com/bank/info', {
    method: 'GET',
    headers: {
      'X-Client-ID': 'client_123456',
      'X-Client-Secret': 'secret_abcdef123456'
    }
  });
  
  return await response.json();
}

// Example using axios
import axios from 'axios';

async function getAuthData(accessToken) {
  const response = await axios.post('https://sahl-bank-api.onrender.com/bank/auth/get', 
    { access_token: accessToken },
    {
      headers: {
        'X-Client-ID': 'client_123456',
        'X-Client-Secret': 'secret_abcdef123456',
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response.data;
}
```

### Python

```python
import requests

def get_transactions(access_token, start_date, end_date):
    url = "https://sahl-bank-api.onrender.com/bank/transactions/get"
    headers = {
        "X-Client-ID": "client_123456",
        "X-Client-Secret": "secret_abcdef123456",
        "Content-Type": "application/json"
    }
    data = {
        "access_token": access_token,
        "start_date": start_date,
        "end_date": end_date
    }
    
    response = requests.post(url, headers=headers, json=data)
    return response.json()
```

## Error Handling

The API returns standard HTTP status codes and JSON error responses:

- 400 Bad Request: Missing or invalid parameters
- 401 Unauthorized: Invalid client credentials
- 404 Not Found: Endpoint not found
- 500 Internal Server Error: Server-side error

Example error response:
```json
{
  "error": "Missing access_token"
}
```

## Rate Limits

For the sandbox environment, there are no strict rate limits, but please be considerate and avoid making excessive requests.

## Support

For any questions or issues with the Banque Sahl Al-Maghrib API Sandbox, please contact support@sahlfinancial.com.