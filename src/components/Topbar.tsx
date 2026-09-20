import React from 'react';

export const Topbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary-dark border-b border-white/10 flex items-center justify-center h-10 shadow-md">
      <div className="container mx-auto px-4 text-center">
        <span className="font-heading font-black text-xs sm:text-sm text-white tracking-widest uppercase">
          CANELA - CANDIDATO A DEPUTADO ESTADUAL - <span className="text-secondary">55888</span>
        </span>
      </div>
    </div>
  );
};
