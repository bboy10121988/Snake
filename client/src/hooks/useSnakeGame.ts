import { useState, useEffect, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type GameState = 'ready' | 'playing' | 'gameOver';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 20;
const GRID_WIDTH = CANVAS_WIDTH / GRID_SIZE;
const GRID_HEIGHT = CANVAS_HEIGHT / GRID_SIZE;

const INITIAL_SNAKE: Position[] = [
  { x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) }
];

const INITIAL_SPEED = 200; // milliseconds
const SPEED_INCREASE_RATE = 5; // decrease delay by this amount each time
const MIN_SPEED = 80; // minimum delay (maximum speed)

export const useSnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const gameLoopRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const nextDirectionRef = useRef<Direction>('RIGHT');

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
      return true;
    }
    
    // Self collision
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Move snake
  const moveSnake = useCallback(() => {
    setSnake(currentSnake => {
      const head = currentSnake[0];
      const currentDirection = nextDirectionRef.current;
      
      let newHead: Position;
      switch (currentDirection) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check collision
      if (checkCollision(newHead, currentSnake)) {
        setGameState('gameOver');
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 1);
        setFood(generateFood(newSnake));
        
        // Increase speed
        setSpeed(prevSpeed => Math.max(MIN_SPEED, prevSpeed - SPEED_INCREASE_RATE));
        
        return newSnake; // Don't remove tail (snake grows)
      } else {
        return newSnake.slice(0, -1); // Remove tail
      }
    });
  }, [food, generateFood, checkCollision]);

  // Game loop
  const gameLoop = useCallback((currentTime: number) => {
    if (gameState !== 'playing') return;

    if (currentTime - lastMoveTimeRef.current >= speed) {
      moveSnake();
      lastMoveTimeRef.current = currentTime;
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, speed, moveSnake]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);

  // Start game loop when playing
  useEffect(() => {
    if (gameState === 'playing') {
      lastMoveTimeRef.current = performance.now();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Update direction
  useEffect(() => {
    setDirection(nextDirectionRef.current);
  }, []);

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      if (gameState === 'ready') {
        startGame();
      } else if (gameState === 'gameOver') {
        restartGame();
      }
      return;
    }

    if (gameState !== 'playing') return;

    const currentDirection = nextDirectionRef.current;
    
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        event.preventDefault();
        if (currentDirection !== 'DOWN') {
          nextDirectionRef.current = 'UP';
        }
        break;
      case 'ArrowDown':
      case 'KeyS':
        event.preventDefault();
        if (currentDirection !== 'UP') {
          nextDirectionRef.current = 'DOWN';
        }
        break;
      case 'ArrowLeft':
      case 'KeyA':
        event.preventDefault();
        if (currentDirection !== 'RIGHT') {
          nextDirectionRef.current = 'LEFT';
        }
        break;
      case 'ArrowRight':
      case 'KeyD':
        event.preventDefault();
        if (currentDirection !== 'LEFT') {
          nextDirectionRef.current = 'RIGHT';
        }
        break;
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    setGameState('playing');
  }, []);

  const restartGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection('RIGHT');
    nextDirectionRef.current = 'RIGHT';
    setScore(0);
    setTimer(0);
    setSpeed(INITIAL_SPEED);
    setGameState('ready');
  }, [generateFood]);

  // Initialize food position
  useEffect(() => {
    setFood(generateFood(INITIAL_SNAKE));
  }, [generateFood]);

  return {
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
  };
};
