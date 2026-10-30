# Mi invernadero

Página web para administrar un invernadero: sus cultivos, sus sensores y las lecturas de los sensores. Un administrador puede gestionar los usuarios y ver estadísticas generales.

## IP elástica

http://98.88.224.89/

## Cómo usar el proyecto

### En línea
1. Entrar a http://98.88.224.89/login.html
2. Iniciar sesión con el usuario de prueba:
   - Correo: `admin@admin.com`
   - Contraseña: `1234`

### En el computador
1. Descargar el repositorio:
   ```bash
   git clone https://github.com/jonathanvargas1-ops/invernadero1.git
   ```
2. Abrir la carpeta en VS Code.
3. Abrir `login.html` con **Live Server**.
4. Entrar con el usuario de prueba.

Los datos se guardan en el navegador (`localStorage`) y cada sección parte con datos de ejemplo.

## Mapa de dominios

Cada dominio está separado en 4 partes: la **vista** (HTML), el **controlador** (conecta la vista con Alpine), el **servicio** (las reglas) y el **repositorio** (guarda y lee los datos).

### Sensores
- Vista: `sensores.html`
- Controlador: `js/controladores/SensorController.js` y `js/controladores/FilaSensorController.js`
- Servicio: `js/servicios/SensorService.js`
- Repositorio: `js/repositorios/SensorRepository.js` y `js/repositorios/LocalStorageSensorRepository.js`

### Lecturas
- Vista: `sensores.html`
- Controlador: `js/controladores/LecturaController.js`
- Servicio: `js/servicios/LecturaService.js`
- Repositorio: `js/repositorios/LecturaRepository.js` y `js/repositorios/LocalStorageLecturaRepository.js`

### Cultivos
- Vista: `cultivos.html`
- Controlador: `js/controladores/CultivoController.js`
- Servicio: `js/servicios/CultivoService.js`
- Repositorio: `js/repositorios/CultivoRepository.js` y `js/repositorios/LocalStorageCultivoRepository.js`

### Invernadero
- Vista: `invernadero.html`
- Controlador: `js/controladores/InvernaderoController.js`
- Servicio: `js/servicios/InvernaderoService.js`
- Repositorio: `js/repositorios/invernaderoRepository.js` y `js/repositorios/LocalStorageInvernaderoRepository.js`

### Usuarios
- Vista: `login.html` y `admin_usuarios.html`
- Controlador: `js/controladores/LoginController.js`, `js/controladores/adminUsuariosController.js` y `js/controladores/FilaUsuarioController.js`
- Servicio: `js/servicios/UsuarioService.js`
- Repositorio: `js/repositorios/UsuarioRepository.js` y `js/repositorios/LocalStorageUsuarioRepository.js`

### Estadística
- Vista: `admin_estadistica.html`
- Controlador: `js/controladores/adminEstadisticaController.js`
- Servicio: `js/servicios/EstadisticaService.js`
- Repositorio: usa los de usuarios, sensores y cultivos

### Otros archivos
- `js/app.js`: el único archivo que crea los repositorios y servicios, y registra los controladores.
- `js/controladores/conexionController.js`: muestra un aviso cuando no hay internet.
- `manifest.json` y `sw.js`: permiten instalar la página como app y usarla sin conexión.
## Páginas

- `login.html`: inicio de sesión.
- `invernadero.html`: datos del invernadero y resumen.
- `cultivos.html`: agregar, editar y eliminar cultivos.
- `sensores.html`: agregar, editar y eliminar sensores, ver lecturas y gráfico.
- `admin_usuarios.html`: agregar, editar y eliminar usuarios.
- `admin_estadistica.html`: totales del sistema.