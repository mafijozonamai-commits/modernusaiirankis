import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  glow?: boolean;
  morph3d?: boolean;
  pulse?: boolean;
  shimmer?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  glow = false,
  morph3d = false,
  pulse = false,
  shimmer = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        y: morph3d ? -6 : -2,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <Button
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          {
            'button-glow': glow,
            'morph-button': morph3d,
            'pulse-glow': pulse,
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700': shimmer,
          },
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;