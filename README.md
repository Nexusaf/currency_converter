# API Reference

## Visão geral

Esta API fornece endpoints para realizar operações de conversão de moeda mediante a um id de usuário fornecido.

## Endpoints

### GET /

Obtém a página inicial da API. Retornando um objeto contendo informações básicas de uso da API.

#### Resposta

```json
{
  project: "currency_converter",
  id_format: "|#####| string with length 5. # must to be number or alphanumeric",
  register: "provide your /register/ID for save your ID.",
  your_history: "provide your /revocer/ID for catch your history.",
  convert_tool: "/convert/ID for exchange convert and record a operation"
}
```


### GET /recover/:userId

Obtém todas as conversões feitas para o ID de usuário especificado.

#### Parâmetros

- `userId` (obrigatório) - O ID do usuário a ser recuperado.

#### Resposta

- Se a recuperação foi bem-sucedida.
```json
{
  "userId": <string>,
  "nickName": <string>,
  "register_date": <string date>
}
```
- Se o usuário não foi encontrado.
```json
{
  "message": "User has registered"
}
```
- Se o id for um id inválido.
```json
{
  "message": "Invalid ID"
}
```

### POST /register/

Registra um novo usuário. A key `userId` deve ser fornecida obrigatoriamente no corpo da requisição.

`userId` - String de compriento 5, deve conter apenas letras de A-Z e números de 0-9
`nickName` - String opcional para o nome de usuário.

###### Copor da requisição
```json
{
    "userId": <string>,
    "nickName": <string>
}
```

### POST /register/:userId

Registra um usuário com base no parâmetro obrigatório fornecido na url string chamado /:userId

#### Parâmetros

- `userId` (obrigatório) - O ID do usuário a ser registrado.
- `nickName` - Parâmetro opicional fornecido no corpo da requisição.

#### Resposta

- Se o usuário for cadastrado, obedecendo todos os requisitos a resposta será um objeto contendo:
```json
{
 "userId": ":userId",
 "nickName": "body.nickName",
 "register_date": "<object date>"
}
```
- Se o ID fornecido já pertencer a algum usuário cadastrado, receberá a seguinte resposta:
```json
{
 "message": "The user already has registration"
}
```
- Se o ID fornecido não for um ID válido, receberá a seguinte resposta:
```json
{
 "message": "Invalid ID"
}
```

### POST /convert/:userId

Executa a conversão de câmbio levando em conta o argumento obrigatório `userId` fornecido na url e os atributos `base`, `amount`, `target` fornecidos no corpo da requisição.

#### Parâmetros

- `:userId` (obrigatório) - O ID do usuário para o qual a transação deverá ser feita.
-`base` (obrigatório) - Símbolo que determina a moeda de origem, uma string de 3 caracteres referente ao código internacional da moeda.
-`amount` (obrigatório) - Valor real maior que zero, que determina a quantidade em moeda `base`.
-`target` (obrigatório) - .

#### Corpo da requisição
```json
{
 "base": "USD",
 "amount": 121,
 "target": "BRL"
}
```

#### Resposta

- Se a converção for bem sucedida um objeto contendo todas as informações da converção será rertonado:
```json
{
 "userId": "ABCDE",
 "transactionId": "XT9TVMJB",
 "base": "USD",
 "target": "BRL",
 "amount": 121,
 "exchange_rate": 5.150271,
 "converted_amout": 623.182791,
 "date": "2023-02-05T03:45:32.324Z"
}
```

- Se o símbolo internacional para a moeda for inválido, o seguinte obejto é retornado, tanto para `base` quanto para `target`. Também se aplica quando um valor `amount`  não for um valor válido:
```json
{
 "message": "Invalid Fomart Currency"
}
```
- Se o ID de usuário for inválido ou não estiver registrado, o seguinte obejto é retornado:
```json
{
 "message": "Invalid ID"
}
```
## Erros

Qualquer outra falha acarretará em 404 Not Found.

