# TechSolutions Website

Sitio web de TechSolutions preparado para ejecutarse con dos contenedores Docker:

- `techsolutions-web`: frontend estatico servido con Nginx.
- `techsolutions-api`: API en Python que responde datos JSON.

Ambos contenedores se comunican por la red interna `techsolutions-net`. El navegador entra al frontend por `http://localhost:8081` y el frontend consulta la API usando `/api/health`.

## Contenido del proyecto

- `index.html`: pagina principal.
- `style.css`: estilos generales.
- `script.js`: funcionalidad del frontend.
- `img/`: imagenes del sitio.
- `Dockerfile`: imagen del frontend con Nginx.
- `nginx.conf`: configuracion del frontend y proxy hacia la API.
- `docker-compose.yml`: levanta los dos contenedores.
- `api/Dockerfile`: imagen del segundo contenedor.
- `api/server.py`: API del segundo contenedor.

## Requisitos

Antes de ejecutar el proyecto necesitas:

- Docker Desktop abierto.
- Docker Engine en estado `Engine running`.
- PowerShell o CMD ubicado en la carpeta del proyecto.

Entrar a la carpeta:

```powershell
cd C:\proyectos\docker_CI\ProyectoFrontend2025
```

## Levantar los dos contenedores

Ejecuta:

```powershell
docker-compose up -d --build
```

Este comando construye y levanta:

- `techsolutions-web` en el puerto `8081`.
- `techsolutions-api` en el puerto `5000`.
- La red interna `techsolutions-net`.

Si tu Docker usa el subcomando moderno, tambien puedes usar:

```powershell
docker compose up -d --build
```

## Abrir la aplicacion

Abre en el navegador:

```text
http://localhost:8081
```

Para ver el indicador de comunicacion con la API:

1. Entra al sitio.
2. Ve al login.
3. Usa:

```text
Usuario: admin
Clave: admin
```

4. En el dashboard debe aparecer `Estado API: techsolutions-api conectado correctamente`.

## Probar la API directamente

Desde el navegador puedes abrir:

```text
http://localhost:5000/health
```

Tambien puedes probar el proxy del frontend:

```text
http://localhost:8081/api/health
```

Si ambos responden JSON, la comunicacion esta funcionando.

## Verificar desde consola

Ver contenedores activos:

```powershell
docker ps
```

Ver logs del frontend:

```powershell
docker logs techsolutions-web
```

Ver logs de la API:

```powershell
docker logs techsolutions-api
```

Ver la red compartida:

```powershell
docker network inspect techsolutions-net
```

## Detener todo

```powershell
docker-compose down
```

## Reconstruir despues de cambios

Si cambias archivos del frontend, la API o la configuracion Docker:

```powershell
docker-compose up -d --build
```

Si algo queda raro por cache, reconstruye sin cache:

```powershell
docker-compose build --no-cache
docker-compose up -d
```

## Subir a GitHub

Sube todo el proyecto, incluyendo estos archivos:

```text
Dockerfile
docker-compose.yml
nginx.conf
.dockerignore
api/Dockerfile
api/server.py
index.html
style.css
script.js
img/
README.md
```

Despues, en el mismo equipo o en otro equipo con Docker Desktop, bastaria con:

```powershell
git clone URL_DEL_REPOSITORIO
cd ProyectoFrontend2025
docker-compose up -d --build
```
