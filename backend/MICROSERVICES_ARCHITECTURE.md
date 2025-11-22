# Arquitectura de Microservicios para el Módulo Persons

## Resumen
Se ha dividido el módulo monolítico `persons` en 4 microservicios independientes para lograr alta disponibilidad y tolerancia a fallos. Si un contenedor/servicio falla, los demás continúan funcionando.

## Servicios Creados

### 1. **persons-create** (Puerto 4010)
- **Responsabilidad**: Creación de nuevas personas
- **Endpoints**: 
  - `POST /persons` - Crear nueva persona
  - `GET /health` - Health check
- **Validaciones**: Todas las validaciones de campos requeridos, formatos, duplicados
- **Características**:
  - Validación completa de datos
  - Verificación de documentos duplicados
  - Logging automático de creaciones
  - Manejo robusto de errores

### 2. **persons-read** (Puerto 4011)
- **Responsabilidad**: Lectura y consulta de personas con filtros dinámicos
- **Endpoints**:
  - `GET /persons` - Obtener todas las personas
  - `GET /persons?ndocument=1234567890` - Filtrar por documento
  - `GET /persons?fname=María` - Filtrar por nombre
  - `GET /persons?email=correo@email.com` - Filtrar por email
  - `GET /persons?tdocument=C.C&gender=Masculino` - Múltiples filtros
  - `GET /persons/:id` - Obtener persona por ID específico
  - `GET /health` - Health check
- **Características**:
  - **Filtros dinámicos**: Cualquier campo puede usarse como filtro en query params
  - **Consultas flexibles**: Combinación de múltiples filtros
  - Logging de consultas para auditoría
  - Respuestas estructuradas
  - Manejo de casos no encontrados

### 3. **persons-update** (Puerto 4012)
- **Responsabilidad**: Actualización de personas existentes
- **Endpoints**:
  - `PUT /persons/:id` - Actualizar persona
  - `GET /health` - Health check
- **Características**:
  - Validación de campos actualizados
  - Verificación de existencia antes de actualizar
  - Prevención de duplicados en actualizaciones
  - Logging detallado de cambios

### 4. **persons-delete** (Puerto 4013)
- **Responsabilidad**: Eliminación de personas
- **Endpoints**:
  - `DELETE /persons/:id` - Eliminar persona
  - `GET /health` - Health check
- **Características**:
  - Verificación de existencia antes de eliminar
  - Logging completo con información de la persona eliminada
  - Respuestas confirmatorias
  - Soft delete potencial (configurable)

## Ventajas de esta Arquitectura

### Alta Disponibilidad
- Si `persons-create` falla, aún puedes consultar, actualizar y eliminar
- Si `persons-read` falla, aún puedes crear, actualizar y eliminar
- Cada operación CRUD es independiente

### Escalabilidad Granular
- Escalar solo el servicio que más se usa
- Diferentes recursos por servicio según necesidad
- Load balancing independiente

### Tolerancia a Fallos
- Falla aislada no afecta otras operaciones
- Restart independiente de servicios
- Deployment sin downtime completo

### Mantenimiento
- Actualizaciones independientes
- Testing aislado por funcionalidad
- Desarrollo en paralelo por equipos

## Estructura de Directorios
```
backend/
├── persons-create/     # Puerto 4010
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── controllers/personController.js
│       ├── routes/personRoutes.js
│       ├── middlewares/errorHandler.js
│       └── services/logService.js
│
├── persons-read/       # Puerto 4011  
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── controllers/personController.js
│       ├── routes/personRoutes.js
│       ├── middlewares/errorHandler.js
│       └── services/logService.js
│
├── persons-update/     # Puerto 4012
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── controllers/personController.js
│       ├── routes/personRoutes.js
│       ├── middlewares/errorHandler.js
│       └── services/logService.js
│
├── persons-delete/     # Puerto 4013
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── controllers/personController.js
│       ├── routes/personRoutes.js
│       ├── middlewares/errorHandler.js
│       └── services/logService.js
│
└── shared/            # Servicios compartidos
    └── roble/
        ├── robleService.js
        ├── robleAuthService.js
        ├── tokenManager.js
        └── robleConfig.js
```

## Configuración y Ejecución

### 1. Instalar dependencias para cada servicio:
```powershell
# En cada directorio de servicio
cd backend/persons-create
npm install

cd ../persons-read  
npm install

cd ../persons-update
npm install

cd ../persons-delete
npm install
```

### 2. Configurar variables de entorno:
Copiar `.env.example` a `.env` en cada servicio y configurar:
- Puerto específico del servicio
- URL del servicio de logs
- Credenciales de Roble API

### 3. Ejecutar servicios:
```powershell
# Terminal 1 - persons-create
cd backend/persons-create
npm run dev

# Terminal 2 - persons-read
cd backend/persons-read  
npm run dev

# Terminal 3 - persons-update
cd backend/persons-update
npm run dev

# Terminal 4 - persons-delete
cd backend/persons-delete
npm run dev

# Terminal 5 - logs service (si no está corriendo)
cd backend/logs
npm run dev
```

## Health Checks
Cada servicio tiene un endpoint de health check:
- `GET http://localhost:4010/health` - persons-create
- `GET http://localhost:4011/health` - persons-read
- `GET http://localhost:4012/health` - persons-update  
- `GET http://localhost:4013/health` - persons-delete

## Ejemplos de Uso

### Crear Persona
```javascript
POST http://localhost:4010/persons
Content-Type: application/json

{
  "tdocument": "C.C",
  "ndocument": "1234567890",
  "fname": "Juan",
  "sname": "Carlos",
  "lname": "Pérez García",
  "bday": "1990-05-15",
  "gender": "Masculino",
  "email": "juan.perez@email.com",
  "cel": "3001234567"
}
```

### Consultar Persona por Documento
```javascript
GET http://localhost:4011/persons?ndocument=1234567890
```

### Consultar por Nombre
```javascript
GET http://localhost:4011/persons?fname=María
```

### Consultar con Múltiples Filtros
```javascript
GET http://localhost:4011/persons?tdocument=C.C&gender=Femenino
```

### Consultar por Email
```javascript
GET http://localhost:4011/persons?email=maria.garcia@email.com
```

### Actualizar Persona
```javascript
PUT http://localhost:4012/persons/[ID]
Content-Type: application/json

{
  "email": "nuevo.email@email.com",
  "cel": "3009876543"
}
```

### Eliminar Persona
```javascript
DELETE http://localhost:4013/persons/[ID]
```

## Migración desde el Servicio Monolítico

### Opción 1: Gateway/Load Balancer
Implementar un API Gateway que route las peticiones:
```javascript
// Ejemplo de routing
app.post('/persons', proxy('http://localhost:4010'));
app.get('/persons*', proxy('http://localhost:4011'));  
app.put('/persons*', proxy('http://localhost:4012'));
app.delete('/persons*', proxy('http://localhost:4013'));
```

### Opción 2: Client-Side Routing
Actualizar el frontend para llamar directamente a cada servicio según la operación.

### Opción 3: Gradual Migration
Mantener el servicio monolítico como fallback y migrar progresivamente.

## Consideraciones para Producción

### Contenedores Docker
Cada servicio puede ser containerizado independientemente:
```dockerfile
# Ejemplo Dockerfile para cada servicio
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src/ ./src/
EXPOSE 4010
CMD ["npm", "start"]
```

### Orchestración con Docker Compose
```yaml
version: '3.8'
services:
  persons-create:
    build: ./persons-create
    ports:
      - "4010:4010"
    environment:
      - PORT=4010
      - LOG_SERVICE_URL=http://logs:4003
      
  persons-read:
    build: ./persons-read
    ports:
      - "4011:4011"
    environment:
      - PORT=4011
      - LOG_SERVICE_URL=http://logs:4003
      
  # ... otros servicios
```

### Monitoring y Logging
- Implementar health checks en Kubernetes/Docker Swarm
- Centralizar logs con ELK Stack o similar
- Métricas con Prometheus + Grafana
- Alertas automáticas por caídas de servicios

## Próximos Pasos

1. **Testing**: Crear tests unitarios e integración para cada servicio
2. **API Gateway**: Implementar gateway para routing centralizado
3. **Service Discovery**: Para ambientes dinámicos con Consul/Eureka
4. **Circuit Breakers**: Implementar con librerías como opossum
5. **Caching**: Redis para consultas frecuentes en persons-read
6. **Rate Limiting**: Protección contra abuso por servicio

Esta arquitectura te proporciona la base para un sistema altamente disponible y escalable donde cada operación CRUD puede funcionar independientemente.