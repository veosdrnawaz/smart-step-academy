import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation: React.FC = () => {
  // Array of educational symbols
  const symbols = ['+', '÷', '×', '−', '√', 'π', '∑', 'Aa', 'Bc', '123', '?', '∫', 'α', 'β'];

  // Generate random positions and animations for symbols
  const floatingSymbols = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    symbol: symbols[i % symbols.length],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 15 + Math.random() * 20, // Random duration between 15s and 35s
    delay: Math.random() * 5,
    size: 20 + Math.random() * 40, // Random size between 20px and 60px
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle Pattern Overlay for Educational Vibe (Graph Paper style) */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {floatingSymbols.map((item) => (
        <motion.div
          key={item.id}
          initial={{ 
            opacity: 0, 
            y: 100, 
            rotate: 0 
          }}
          animate={{ 
            opacity: [0, 0.1, 0], 
            y: -100, 
            rotate: 360 
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
            repeatType: "loop"
          }}
          style={{
            position: 'absolute',
            left: item.left,
            top: item.top,
            fontSize: `${item.size}px`,
            color: 'rgba(255, 255, 255, 0.5)', // Increased opacity slightly for visibility
            fontFamily: 'serif', // Serif font looks more "academic" for symbols
            fontWeight: 'bold',
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;