# Proyecto MERN — Cómo correrlo localmente

Breve guía para levantar el backend (Express + MySQL) y el frontend (React + Vite) de forma sencilla.

**Requisitos**
- Node.js v16+ y `npm`
- MySQL (local) o un contenedor con acceso desde `127.0.0.1`

**Archivos clave**
- Conexión DB: [server/db.js](server/db.js#L1-L20)
- Esquema SQL: [databases/db.sql](databases/db.sql#L1-L20)

## 1) Instalar dependencias
Desde la raíz del proyecto:

```bash
npm install
```

Instalar dependencias del frontend:

```bash
cd client
npm install
```

## 2) Crear la base de datos y un usuario (recomendado)
Conéctate al servidor MySQL como administrador y ejecuta (ajusta puerto si usas `3306` en lugar de `3307`):

```sql
CREATE DATABASE IF NOT EXISTS tasksdb;
CREATE USER 'tasks_user'@'127.0.0.1' IDENTIFIED BY 'tasks123';
GRANT ALL PRIVILEGES ON tasksdb.* TO 'tasks_user'@'127.0.0.1';
FLUSH PRIVILEGES;
```

Si prefieres usar `root`, asegúrate de conocer la contraseña y que el host coincida (ver nota sobre `localhost` vs `127.0.0.1`).

## 3) Importar esquema (tabla `tasks`)
Desde la raíz del proyecto:

```bash
# usa el puerto que corresponda (3307 en este repo)
mysql -u tasks_user -p -P 3307 -h 127.0.0.1 tasksdb < databases/db.sql
```

## 4) Configurar la conexión en el backend
Se actualizó `server/db.js` para apuntar por defecto a:

- host: `127.0.0.1`
- port: `3307`
- user: `tasks_user`
- password: `tasks123`
- database: `tasksdb`

Si tu entorno usa otras credenciales o puerto, edita [server/db.js](server/db.js#L1-L20) y modifica `host`, `port`, `user` y `password`.

## 5) Iniciar la aplicación

Arrancar backend (desde la raíz):

```bash
npm run dev
```

Arrancar frontend (en otra terminal):

```bash
cd client
npm run dev
```

Vite suele servir el frontend en `http://localhost:5173`. El backend corre en `http://localhost:4000`.

## 6) Probar endpoints rápidamente

```bash
curl http://localhost:4000/ping
curl http://localhost:4000/tasks
```

## Troubleshooting rápido
- `ER_ACCESS_DENIED_ERROR`: credenciales o `host` incorrectos. Prueba conectar con el cliente `mysql` usando `-h 127.0.0.1` y el mismo `-P` que tienes en `server/db.js`.
- Diferencia entre `localhost` y `127.0.0.1`: MySQL puede autenticar distinto según el host; si una conexión funciona con `127.0.0.1` pero no con `localhost`, usa `127.0.0.1` en `server/db.js`.

## Seguridad
- Esto es para desarrollo local: no dejes usuarios sin contraseña ni uses `root` en entornos compartidos.

---

Si quieres, puedo:

- Generar automáticamente un script SQL para crear/importar la BD.
- Cambiar `server/db.js` para leer credenciales desde variables de entorno.
