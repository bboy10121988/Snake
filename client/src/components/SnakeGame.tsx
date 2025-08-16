import React, { useRef, useEffect } from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import GameUI from './GameUI';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 20;

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    snake,
    food,
    direction,
    gameState,
    score,
    timer,
    speed,
    startGame,
    restartGame,
    handleKeyPress
  } = useSnakeGame();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  // Draw game on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    // Draw snake
    ctx.fillStyle = '#4CAF50';
    snake.forEach((segment, index) => {
      // Head is slightly different color
      if (index === 0) {
        ctx.fillStyle = '#66BB6A';
      } else {
        ctx.fillStyle = '#4CAF50';
      }
      ctx.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 1,
        GRID_SIZE - 1
      );
    });

    // Draw food
    ctx.fillStyle = '#F44336';
    ctx.fillRect(
      food.x * GRID_SIZE,
      food.y * GRID_SIZE,
      GRID_SIZE - 1,
      GRID_SIZE - 1
    );

    // Draw game over overlay
    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      ctx.fillStyle = '#fff';
      ctx.font = '48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
      
      ctx.font = '24px Inter, sans-serif';
      ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
      ctx.fillText('Press SPACE to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
    }

    // Draw start screen
    if (gameState === 'ready') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      ctx.fillStyle = '#fff';
      ctx.font = '48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SNAKE GAME', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);
      
      ctx.font = '20px Inter, sans-serif';
      ctx.fillText('Use arrow keys to move', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);
      ctx.fillText('Eat the red food to grow', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
      ctx.fillText('Avoid hitting walls and yourself', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
      ctx.fillText('Press SPACE to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 90);
    }
  }, [snake, food, gameState, score]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h1 style={{
        color: 'white',
        margin: 0,
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        Snake Game
      </h1>
      
      <GameUI 
        score={score}
        timer={timer}
        speed={speed}
        gameState={gameState}
        onStart={startGame}
        onRestart={restartGame}
      />
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: '3px solid #fff',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
      />
      
      <div style={{
        color: 'white',
        textAlign: 'center',
        fontSize: '14px',
        opacity: 0.8
      }}>
        <p>Use ↑ ↓ ← → arrow keys to control the snake</p>
        <p>Press SPACE to start/restart the game</p>
      </div>
    </div>
  );
};

export default SnakeGame;
