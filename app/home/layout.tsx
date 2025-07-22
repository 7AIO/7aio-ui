import { useState } from "react";
import { Navbar } from "~/components/navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Cosmic background overlay */}
      <div className="fixed inset-0 bg-cosmic-gradient opacity-60 pointer-events-none"></div>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(2px 2px at 20px 30px, #8b5cf6, transparent), 
                         radial-gradient(2px 2px at 40px 70px, #3b82f6, transparent),
                         radial-gradient(1px 1px at 90px 40px, #06b6d4, transparent),
                         radial-gradient(1px 1px at 130px 80px, #a855f7, transparent),
                         radial-gradient(2px 2px at 160px 30px, #8b5cf6, transparent)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px',
        animation: 'float 20s linear infinite'
      }}></div>
      
      <div className="relative z-10">
        <Navbar authenticated={isLoggedIn} />
        {children}
      </div>
    </div>
  );
}
