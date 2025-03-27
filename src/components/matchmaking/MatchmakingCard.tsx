
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedButton from '../ui/AnimatedButton';

interface MatchmakingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  primary?: boolean;
  className?: string;
}

const MatchmakingCard = ({
  title,
  description,
  icon,
  to,
  primary = false,
  className,
}: MatchmakingCardProps) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6",
        primary 
          ? "border-primary/20 bg-primary/5" 
          : "border-border bg-card/50",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full"></div>
      
      <div className="relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-4",
          primary ? "bg-primary/20" : "bg-secondary"
        )}>
          {icon}
        </div>
        
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <Link to={to}>
          <AnimatedButton
            variant={primary ? "default" : "outline"}
            className={primary ? "bg-primary hover:bg-primary/90" : ""}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </AnimatedButton>
        </Link>
      </div>
    </div>
  );
};

export default MatchmakingCard;
