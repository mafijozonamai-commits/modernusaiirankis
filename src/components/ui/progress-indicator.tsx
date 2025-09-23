import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from './progress';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  glow?: boolean;
  animated?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  className,
  glow = false,
  animated = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <motion.div
      className={cn('space-y-2', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && (
            <motion.span 
              className="font-medium text-foreground"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {label}
            </motion.span>
          )}
          {showPercentage && (
            <motion.span 
              className="text-muted-foreground"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {Math.round(percentage)}%
            </motion.span>
          )}
        </div>
      )}
      
      <div className={cn(
        'relative overflow-hidden rounded-full',
        {
          'progress-glow': glow
        }
      )}>
        <Progress 
          value={animated ? percentage : 0} 
          className="h-2"
        />
        {animated && (
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%', width: '20%' }}
            animate={{ x: `${percentage - 10}%` }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
              delay: 0.2 
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;