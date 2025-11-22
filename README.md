# trabajo_final_dise_II

## Configuración del Proyecto

### 1. Variables de Entorno

Este proyecto requiere archivos `.env` para cada microservicio. **NUNCA subas archivos `.env` a Git**.

#### Configuración inicial:

```bash
# En cada servicio (auth, persons, logs), copia el archivo example:
cp backend/auth/.env.example backend/auth/.env
cp backend/persons/.env.example backend/persons/.env
cp backend/logs/.env.example backend/logs/.env
```

#### Luego edita cada `.env` con tus credenciales reales:

- `ROBLE_DB_NAME`: Nombre de tu base de datos en Roble
- `ROBLE_USER_EMAIL`: Tu email de usuario Roble  
- `ROBLE_USER_PASS`: Tu contraseña de usuario Roble
- `ROBLE_BASE_URL`: URL base de la API Roble

### 2. Instalación

```bash
# Instalar dependencias en cada servicio
cd backend/auth && npm install
cd ../persons && npm install  
cd ../logs && npm install
cd ../shared && npm install
```

### 3. Ejecución

```bash
# Iniciar cada servicio en terminales separadas
cd backend/auth && npm run dev     # Puerto 4001
cd backend/persons && npm run dev  # Puerto 4002  
cd backend/logs && npm run dev     # Puerto 4003
```

## Microservicios

- **Auth Service** (4001): Autenticación de usuarios
- **Persons Service** (4002): Gestión de personas
- **Logs Service** (4003): Sistema de logging

## Seguridad

- ✅ Archivos `.env` están en `.gitignore`
- ✅ Credenciales no se suben a Git
- ✅ Validaciones de datos implementadas