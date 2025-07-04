# 🧪 Selaski - Prueba Técnica Backend

Se trata de una API REST construida con **NestJS**, **Prisma ORM** y **MySQL**, cumpliendo con las especificaciones técnicas, validaciones y buenas prácticas solicitadas.

---

## 📌 Tecnologías utilizadas

- [NestJS]
- [Prisma ORM]
- [MySQL 8]
- [Docker]
- [Jest]
- [class-validator]

---

## 🚀 Endpoints principales

### 👤 Usuario
- `POST /users` → Crear usuario `{ name, email }`
- `GET /users` → Listar todos los usuarios
- `GET /users/:id` → Consultar un usuario por ID
- `GET /users/:id/messages` → Listar mensajes de un usuario

### 💬 Mensajes
- `POST /messages` → Crear mensaje `{ content, userId }`
- `GET /messages` → Listar todos los mensajes (con info de usuario)

---

## 🧪 Validaciones implementadas

- El campo `email` en usuarios debe tener formato válido.
- El campo `content` en mensajes no debe estar vacío.
- Solo se permite crear mensajes si el `userId` existe.

---

## 🛠 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/JocMieles/selaski-backend.git
cd selaski-backend
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` y ajusta si es necesario:

```bash
cp .env.example .env
```

### 3. Levantar la base de datos con Docker

```bash
docker-compose up -d
```

Esto levanta MySQL en `localhost:3306`.

### 4. Instalar dependencias

```bash
npm install
```

### 5. Ejecutar migraciones y generar cliente Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Iniciar el servidor NestJS

```bash
npm run start:dev
```

Servidor corriendo en `http://localhost:3000`.

---

## ✅ Pruebas unitarias

Para ejecutar las pruebas unitarias con Jest:

```bash
npm run test
```

Incluye tests para servicios de usuario y mensaje, usando mocks de Prisma.

---

## 📂 Estructura del proyecto (resumen)

```
src/
├── user/
│   ├── dto/
│   ├── __tests__/
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user.module.ts
├── message/
│   ├── dto/
│   ├── __tests__/
│   ├── message.controller.ts
│   ├── message.service.ts
│   └── message.module.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── main.ts
```

---

## 📄 `.env.example`

```env
DATABASE_URL="mysql://root:root@localhost:3306/selaski"
```

---

## 📬 Contacto

Desarrollado por **Jose Mieles**  
<<<<<<< HEAD
💼 [LinkedIn](https://www.linkedin.com/in/josé-daniel-mieles)  
📧 josemieles16@gmail.com
<<<<<<< HEAD
=======
💼 [LinkedIn](https://www.linkedin.com/in/josemieles)  
📧 jose.mieles@example.com
>>>>>>> 8c5c1d7 (Añade tests unitarios para middleware y filtros + cobertura de dto)
=======
>>>>>>> d1abbce (cambios README)

---

> ✨ Gracias por la oportunidad de participar en este proceso.
