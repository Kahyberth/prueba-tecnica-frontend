export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Hola 👋</h1>
      <p>
        Prueba tecnica para <strong>OL Software</strong>
      </p>
      <p>
        <strong>Desarrollado por:</strong>
        <a
          href="https://github.com/Kahyberth"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kahyberth Gonzalez
        </a>
      </p>
      <div className="flex flex-col items-center">
        <p>Repositorios:</p>
        <a
          href="https://github.com/Kahyberth/prueba-tecnica-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Frontend
        </a>
        <a
          href="https://github.com/Kahyberth/prueba-tecnica-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Backend
        </a>
      </div>
      <p>
        <strong>última actualización:</strong>
        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}
