import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation: React.FC = () => {
  // Enhanced array of educational symbols and emojis
  const symbols = [
    // Math & Science
    '+', '÷', '×', '−', '√', 'π', '∑', '∫', 'α', 'β', 'H₂O', 'E=mc²',
    // General Education
    'A', 'B', 'C', '1', '2', '3', '?', '!', 
    // Emojis for friendly vibe
    '🎓', '✏️', '📚', '🧠', '🔬', '🎨', '📝', '🏫'
  ];

  // Generate random positions and animations for symbols
  const floatingSymbols = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    symbol: symbols[i % symbols.length],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 20 + Math.random() * 30, // Slower, more calming duration
    delay: Math.random() * 10,
    size: 16 + Math.random() * 30, // Random size
    opacity: 0.1 + Math.random() * 0.2, // Random opacity
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Pattern Overlay for "Graph Paper" feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      ></div>

      {floatingSymbols.map((item) => (
        <motion.div
          key={item.id}
          initial={{ 
            opacity: 0, 
            y: 120, 
            rotate: -20 
          }}
          animate={{ 
            opacity: [0, item.opacity, 0], 
            y: -120, 
            rotate: 20 
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
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: item.symbol.length > 2 ? 'sans-serif' : 'serif', // Switch font for emojis vs symbols
            fontWeight: 'bold',
            userSelect: 'none'
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;