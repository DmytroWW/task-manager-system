import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-main flex items-center justify-center p-6 transition-colors">
      <div className="max-w-md w-full bg-card rounded-[2rem] shadow-xl p-10 border border-border">
        <div className="text-center mb-10">
          <div className="inline-block w-12 h-12 bg-accent rounded-xl mb-4 shadow-lg flex items-center justify-center text-white font-bold text-xl">
            WS
          </div>
          <h2 className="text-2xl font-bold text-text-base">{title}</h2>
          <p className="text-text-muted mt-2">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;