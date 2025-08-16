import React from 'react';

interface GameUIProps {
  score: number;
  timer: number;
  speed: number;
  gameState: 'ready' | 'playing' | 'gameOver';
  onStart: () => void;
  onRestart: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  score,
  timer,
  speed,
  gameState,
  onStart,
  onRestart
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSpeedLevel = (speed: number): number => {
    // Convert speed (lower = faster) to level (higher = faster)
    return Math.max(1, Math.ceil((300 - speed) / 20));
  };

  return (
    <div style={{
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      {/* Score */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        padding: '10px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        minWidth: '120px'
      }}>
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '2px'
        }}>
          SCORE
        </div>
        <div style={{
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {score}
        </div>
      </div>

      {/* Timer */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        padding: '10px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        minWidth: '120px'
      }}>
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '2px'
        }}>
          TIME
        </div>
        <div style={{
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold',
          fontFamily: 'monospace'
        }}>
          {formatTime(timer)}
        </div>
      </div>

      {/* Speed Level */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        padding: '10px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        minWidth: '120px'
      }}>
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '2px'
        }}>
          LEVEL
        </div>
        <div style={{
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {getSpeedLevel(speed)}
        </div>
      </div>

      {/* Control Buttons */}
      {gameState === 'ready' && (
        <button
          onClick={onStart}
          style={{
            background: 'linear-gradient(135deg, #4CAF50, #45a049)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
          }}
        >
          START GAME
        </button>
      )}

      {gameState === 'gameOver' && (
        <button
          onClick={onRestart}
          style={{
            background: 'linear-gradient(135deg, #F44336, #d32f2f)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
          }}
        >
          RESTART
        </button>
      )}
    </div>
  );
};

export default GameUI;
