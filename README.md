# API Pullman Costa

[![](https://img.shields.io/badge/types-TypeScript-blue?style=for-the-badge)](https://github.com/microsoft/TypeScript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

Api REST que traduce la api SOAP de Sibus destinada a Pullman Costa Central

### Endpoints: API REST

| Metodo | Endpoint         | Query Params                 | Body | Descripción                                          |
| ------ | ---------------- | ---------------------------- | ---- | ---------------------------------------------------- |
| GET    | /api             |                              |      | Obtener el estatus de la api                         |
| GET    | /cities          |                              |      | Obtener todas las ciudades disponibles               |
| GET    | /routes          |                              |      | Obtener todas las rutas disponibles                  |
| GET    | /services        | originID, destinyID, dateISO |      | Obtener todos los servicios disponibles              |
| GET    | /seats_available | serviceID, seatType          |      | Obtener todos los asientos disponibles según el tipo |
| GET    | /bus_structure   | serviceID                    |      | Obtener la estructura de asientos del bus            |

### Commands

```sh
npm install # Instalar todas las dependencias

npm run dev # Iniciar api en modo desarrollo

npm run build # Compilar api

npm start # Iniciar api en modo producción
```
