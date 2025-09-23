import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AITypingIndicatorProps {
  isVisible?: boolean;
  className?: string;
  message?: string;
}

export const AITypingIndicator: React.FC<AITypingIndicatorProps> = ({ 
  isVisible = true, 
  className,
  message = "AI rašo..." 
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex items-center gap-3 p-4 glass-morphism rounded-xl border-primary/20",
        className
      )}
    >
      <div className="ai-typing">
        <motion.div 
          className="dot"
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: 0
          }}
        />
        <motion.div 
          className="dot"
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: 0.2
          }}
        />
        <motion.div 
          className="dot"
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: 0.4
          }}
        />
      </div>
      
      <motion.span 
        className="text-sm font-medium text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.span>

      <motion.div
        className="ml-auto w-2 h-2 bg-primary/60 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 1,
          repeat: Infinity
        }}
      />
    </motion.div>
  );
};

export default AITypingIndicator;