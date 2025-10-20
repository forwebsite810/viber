import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = true, 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-500 backdrop-blur-sm border';
  
  const variants = {
    default: 'bg-white/10 border-white/20 shadow-lg hover:shadow-2xl',
    elevated: 'bg-white/20 border-white/30 shadow-xl hover:shadow-2xl',
    glass: 'bg-white/5 border-white/10 shadow-2xl hover:shadow-3xl',
    solid: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl'
  };
  
  const hoverEffects = hover ? 'hover:scale-105 hover:bg-white/20 dark:hover:bg-white/10' : '';
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${hoverEffects}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  return (
    <div
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
