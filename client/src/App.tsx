import { useState } from "react";
import SnakeGame from "./components/SnakeGame";
import "@fontsource/inter";

function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <SnakeGame />
    </div>
  );
}

export default App;
