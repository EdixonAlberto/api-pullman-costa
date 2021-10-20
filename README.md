# API Pullman Costa

[![](https://img.shields.io/badge/types-TypeScript-blue?style=for-the-badge)](https://github.com/microsoft/TypeScript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

Api REST que traduce la api SOAP de Sibus destinada a Pullman Costa Central

### Endpoints: API SOAP (SIBUS)

**URL_BASE:**
https://pullman-ws-web-costacentral.azurewebsites.net/ws/ws_pbus/pbus_ws_pcosta

| Endpoint                      | Metodo | Descripción                                                                              |
| ----------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| /sb_ciudades.php?wsdl         | POST   | Obtener la información de los códigos de ciudades y nombres para futuras actualizaciones |
| /sb_tramos.php?wsdl           | POST   | Obtener la información de los tramos disponibles                                         |
| /sb_search_schedules.php?wsdl | POST   | Buscar los horarios de la empresa                                                        |
| /sb_available_seats.php?wsdl  | POST   | Obtener la disponibilidad de un servicio según un tipo de asiento                        |

### Endpoints: API REST (WIT)

| Endpoint         | Metodo | Descripción                                 |
| ---------------- | ------ | ------------------------------------------- |
| /api             | GET    | Obtener el estatus de la api rest           |
| /cities          | GET    | dasdsd                                      |
| /routes          | GET    | asdasd                                      |
| /services        | GET    | Obtener los servicios disponibles           |
| /seats_available | GET    | Obtener la cantidad de asientos disponibles |

### Commands

```sh
npm install # Instalar todas las dependencias

npm run dev # Iniciar api en modo desarrollo

npm run build # Compilar api

npm start # Iniciar api en modo producción
```
