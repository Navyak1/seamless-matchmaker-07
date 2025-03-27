
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  glowColor?: string;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, glowColor = 'rgba(59, 130, 246, 0.5)', children, ...props }, ref) => {
    return (
      <div className="relative group">
        <div
          className="absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"
          style={{ background: glowColor }}
        ></div>
        <Button
          ref={ref}
          className={cn(
            "relative transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
