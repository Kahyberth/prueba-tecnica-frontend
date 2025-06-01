
import "./LoadingScreen.css";

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

export default function LoadingScreen({ 
  message = "Cargando...", 
  showLogo = true 
}: LoadingScreenProps) {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        {showLogo && (
          <div className="loading-logo">
            <div className="logo-skeleton"></div>
          </div>
        )}
        
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        
        <p className="loading-message">{message}</p>
        
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
} 