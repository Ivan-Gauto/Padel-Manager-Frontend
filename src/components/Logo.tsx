import React from 'react';
import { Trophy } from 'lucide-react';
import logoFull from '../assets/logo.png';
import logoReduced from '../assets/logo-reduced.png';

export const Logo = ({ className = "", imageClassName = "h-8", reduced = false }: { className?: string, imageClassName?: string, reduced?: boolean }) => {
  const [imgError, setImgError] = React.useState(false);

  const logoSrc = reduced ? logoReduced : logoFull;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {!imgError ? (
        <img 
          src={logoSrc} 
          alt="Versori Digital" 
          className={`${imageClassName} w-auto object-contain drop-shadow-md dark:brightness-0 dark:invert`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className={`${imageClassName === 'h-8' ? 'w-8 h-8' : 'w-12 h-12'} rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md shadow-primary/10`}>
            <Trophy size={imageClassName === 'h-8' ? 20 : 28} strokeWidth={2.5} />
          </div>
          <span className={`font-headline font-black ${imageClassName === 'h-8' ? 'text-xl' : 'text-3xl'} tracking-tight text-on-surface`}>
            Versori<span className="text-primary">Digital</span>
          </span>
        </div>
      )}
    </div>
  );
};
