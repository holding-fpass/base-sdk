# Overview da Plataforma

```mermaid
sequenceDiagram
  autonumber
  participant FLabel
  participant FManagment
  participant ContentAPI
  participant Firestore
  FLabel ->> ContentAPI: Request
  FManagment ->> ContentAPI: Request
  ContentAPI ->> Firestore: Request
```
