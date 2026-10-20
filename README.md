# Mi invernadero — Sistema de gestión

Sistema web para la gestión de invernaderos ,permite a cada usuario administrar su propio invernadero, cultivos y sensores, y revisar las lecturas históricas de sus sensores, un administrador supervisa las cuentas de usuario y las estadísticas globales del sistema

## IP pública

ip publica
http://18.209.20.167/

## Rutas disponibles

### Usuario

- `/login.html` → **Inicio de sesión.** Formulario con correo y contraseña para ingresar al sistema, incluye un acceso para el administrador

- `/invernadero.html` → **Vista principal del invernadero.** Muestra los datos del invernadero del usuario y un resumen de sus cultivos y sensores, con accesos a cada sección

- `/cultivos.html` → **Gestión de cultivos.** Tabla con los cultivos del invernadero y formulario para agregar uno nuevo.

- `/sensores.html` → **Gestión de sensores.** Tabla de sensores con opciones para añadir, editar y eliminar; tabla de registros históricos con filtro por período y gráfico de lecturas por tipo de sensor

### Administrador

- `/admin_usuarios.html` → **Administración de usuarios.** Lista de usuarios registrados con opciones para ver sus recursos o eliminar su cuenta

- `/admin_estadistica.html` → **Estadísticas globales.** Resumen del sistema con el total de usuarios, invernaderos activos y sensores registrados


