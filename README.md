<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://static-00.iconduck.com/assets.00/nextjs-icon-2048x1234-pqycciiu.png" width="120" alt="Nest Logo" /></a>
</p>


<h1 align="center">Prueba Técnica - Frontend</h1>


## 📜 Descripción

Este proyecto es el **frontend** de la Prueba Técnica, desarrollado con **Next.js** y **React**. El objetivo principal es consumir los endpoints del backend NestJS para:

- Mostrar la lista de comerciantes.
- Editar y crear comerciantes.
- Generar y descargar reportes en formato CSV (delimitado por `|`), con todos los comerciantes activos y sus totales de establecimientos, ingresos y empleados.
- Autenticación y autorización de usuarios (Admins y Administrador Auxiliar).

---



## 🚀 Tecnologías y Librerías

- **Next.js**
- **React** 
- **TypeScript** 
- **Zod** 
- **Axios**
- **lucide-react**



## 📋 Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes software:

- **Node.js**

- **npm o bun**

- **Es necesario clonar tambien el backend -> git@github.com:Kahyberth/prueba-tecnica-backend.git**


## 🔧 Instalación y Configuración

1. Clona el repositorio:

   ```bash
   git clone git@github.com:Kahyberth/prueba-tecnica-frontend.git
   cd prueba-tecnica-frontend
   ```

2. Ejecuta el siguiente comando para instalar las dependencias

```
npm install
o
bun install
```

3. Reenombrar .env.template a .env

```
.env.template  ---> .env
```

4. Ejecutar la aplicación

```
bun dev o npm run dev
```
