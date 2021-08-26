# Event Provider SDK
Package de definições para integração de/com um partner orientado a eventos gerados e recebidos de sistemas da plataforma Fpass.

## Responsability
Gerar eventos para parceiros (Partners) e receber/processar eventos de provenientes de parceiros (Partners) ou provedores (Providers) com destina a plataforma (Fpass).

## Overview
![Overview](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Holding-Fpass/iam-provider-sdk/main/uml/event-overview-v1.0.0.iuml)

### Event Delivery
A execução de uma ação na plataforma Fpass resulta na geração de um evento que pode ser encaminhado ao _Partner_ em por meio de envio de requisição no modelo de entrega de Webhook: URL disponível para que seja invocada e acionada pela plataforma Fpass.
- Autorization header: JWT gerado pela _Fpass_ a ser verificado pelo _Partner_.
- Payload da requisição:
  - eventId: Identificação única do evento
  - eventType: Enumeração de possíveis eventos gerados pela plataforma
  - eventDate: Data de geração do evento
  - resourceId: Identificação única do recurso ao qual o evento se refere
  - resourceType: Enumeração de possíveis entidades da plataforma
  - data (Opicional): Dados extras de um evento particular. Varia de acordo com o _eventType_ e _resourceType_. 

#### Request (POST)
```sh
curl --location -g --request POST 'https://api.{partner}.com.br/webhook/fpass' \
--header 'Autorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjoie3V1aWR2NH0ifQ.TLbn1su7hWUVHADW3Qe1e6KvTAx0ravL3wuE5TIxvUE' \
--header 'Content-Type: application/json' \
--data-raw '{
  "eventId": "{uuidv4}",
  "eventType": "user.created",
  "eventDate": "2011-10-05T14:48:00.000Z",
  "resourceId": "{uuidv4}",
  "resourceType": "user",
  "data": {
    "externalId": "{partnerHash}"
  }
}'
```

#### Expected Response
A resposta esperada quanto ao envio do evento informa a plataforma o correto recebimento e será capturada como confirmação do envio.
- Http Status Code
  - Sucesso: 200 ou 201 serão interpretados com sucesso no envio.
  - Qualquer outro status code será interpretado como falha no envio
- Body response
  - Qualquer conteúdo enviado será armazenado como evidencia do sucesso ou falha do envio
##### Sample
```json
{
  "id": "{uuid}",
  "received_at": "2021-07-15T12:32Z"
}
```

### Event Reception
Por interação na plataforma do _Partner_ um usuário pode gerar eventos que requeiram uma ação em contra partida na plataforma Fpass. Tais eventos deve ser encaminhados para um ponto de recepção determinado no modelo de Webhook.
- Autorization header: JWT gerado pelo _Partner_ a ser verificado pelo _Fpass_.
- Body
  - Campos chaves:
    - Identificador único do evento (ex.: _id_): com objetivo de evitar o duplo processamento do evento
    - Tipo do evento (Ex.: _event_): Enumeração distintiva de possíveis eventos com o objetivo de ter uma estratégia a ser executada
    - Identificador único do recurso (Ex.: _userHash_): com o objetivo de encontrar o referido recurso a ser considerado para execução da ação
  - Informação adcional
    - Qualquer informação adcional enviada no payload pode ser encaminhada e será armazenada
#### Request (POST)
```sh
curl --location -g --request POST 'https://api.fpass.com.br/webhook/{partnerCode}' \
--header 'Autorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjoie3V1aWR2NH0ifQ.TLbn1su7hWUVHADW3Qe1e6KvTAx0ravL3wuE5TIxvUE' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": "{id}",
  "event": "maillist.agreement.granted",
  "userHash": "123456",
  "userAgent": "{User Agent}",
  "userIp": "{ip}"
}'
```
##### Response (201)
```json
{
  "id": "{uuid}",
  "received_at": "2021-07-15T12:32Z"
}
```

### Autorization Header Verification / JWT Verification
Verificação do _header_ _Autorization_ da _Request_ onde o _Bearer_ contêm um JWT.
- Signing default: RS256