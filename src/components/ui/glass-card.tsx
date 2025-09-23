import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  interactive?: boolean;
  animation?: 'float' | 'scale' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = true,
  glow = false,
  interactive = false,
  animation = 'none',
  onClick
}) => {
  const getAnimationProps = () => {
    switch (animation) {
      case 'float':
        return {
          animate: {
            y: [0, -10, 0],
          },
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" as const
          }
        };
      case 'scale':
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn(
        'glass-card',
        {
          'hover:shadow-glow hover:scale-[1.02]': hover,
          'shadow-glow': glow,
          'interactive-card cursor-pointer': interactive,
        },
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;