# 🌐 TechSolutions Website

Este es el repositorio del sitio web de **TechSolutions**, una empresa dedicada a ofrecer soluciones tecnológicas a la medida de cada cliente.  

## 📋 Contenido del proyecto
- `index.html` → Página principal  
- `style.css` → Estilos generales  
- `script.js` → Funcionalidad con JavaScript  
- `img/` → Carpeta con los recursos gráficos  

## 🚀 Características
- Diseño responsivo con HTML5 y CSS3.  
- Estructura modular y fácil de mantener.  
- Sección de servicios con precios y descripciones.  
- Footer completo con enlaces, contacto y redes sociales.  

## 🛠️ Tecnologías utilizadas
- **HTML5**  
- **CSS3**  
- **JavaScript**  
- **Docker**
- **Nginx**

## 🐳 Ejecutar con Docker
Este proyecto queda preparado como un contenedor web independiente en el puerto `8081`.

Construir y levantar el contenedor:

```bash
docker-compose up -d --build
```

Abrir en el navegador:

```text
http://localhost:8081
```

Verificar que el contenedor esta activo:

```bash
docker ps
```

Detener el contenedor:

```bash
docker-compose down
```

## 🔗 Comunicación con el otro contenedor
El archivo `nginx.conf` deja preparado un proxy para que este frontend envie las peticiones de `/api/` al contenedor `techsolutions-api` dentro de la red `techsolutions-net`.

Cuando la otra imagen ya exista o este publicada, actualiza el servicio `techsolutions-api` en `docker-compose.yml` con el nombre correcto de la imagen y ejecuta:

```bash
docker-compose --profile api up -d
```

Si tu Docker usa el subcomando moderno, tambien puedes reemplazar `docker-compose` por `docker compose`.

Si el otro contenedor ya fue creado manualmente en Docker Desktop, conectalo a la misma red:

```bash
docker network connect --alias techsolutions-api techsolutions-net NOMBRE_DEL_CONTENEDOR
```

Para que el proxy funcione sin cambiar `nginx.conf`, ese contenedor debe llamarse `techsolutions-api` o tener ese alias dentro de la red.

## 📦 Cómo usar este proyecto
1. Clona el repositorio:
   ```bash
   git clone https://github.com/mascosharon/ProyectoFrontend2025.git
