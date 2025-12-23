
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">PromptMaster AI</h1>
              <p className="text-xs text-slate-500 font-medium tracking-tight">EXPERT PROMPT ANALYSIS STUDIO</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">v3.0 Pro Analyzer</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
