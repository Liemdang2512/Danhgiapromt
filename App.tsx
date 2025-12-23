
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import AnalysisResult from './components/AnalysisResult';
import { UserInput, AnalysisResult as AnalysisResultType } from './types';
import { DEFAULT_INPUT } from './constants';
import { analyzePromptWithAI } from './services/geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState<UserInput>({
    prompt: '',
    purpose: '', // Khởi tạo giá trị rỗng cho mục đích
    framework: DEFAULT_INPUT.framework,
    goal: DEFAULT_INPUT.goal
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = async () => {
    if (!input.prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzePromptWithAI(input);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi không xác định. Vui lòng kiểm tra kết nối của bạn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-20">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl mb-4">
            Kiểm tra Prompt AI của bạn
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Phân tích chuyên sâu dựa trên ngữ cảnh thực tế. Hãy mô tả mục đích và dán prompt để nhận đánh giá chi tiết nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDE: Inputs */}
          <div className="xl:col-span-5 lg:sticky lg:top-24">
             <PromptForm 
                input={input} 
                onChange={handleInputChange} 
                onSubmit={handleAnalyze} 
                loading={loading}
             />
             
             {error && (
               <div className="mt-6 p-5 bg-red-50 border border-red-200 rounded-2xl flex gap-4 items-center animate-in fade-in slide-in-from-top-4">
                  <div className="p-2 bg-red-100 rounded-lg shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-700 font-bold leading-tight">{error}</p>
               </div>
             )}
          </div>

          {/* RIGHT SIDE: Results */}
          <div className="xl:col-span-7">
            {result ? (
              <AnalysisResult result={result} />
            ) : !loading ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">Hệ thống Sẵn sàng</h3>
                <p className="text-sm text-slate-500 max-w-sm mt-3 font-medium leading-relaxed">
                  Cung cấp "Mục đích sử dụng" và nội dung prompt để bắt đầu quy trình kiểm định chuyên gia.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                 {/* Skeleton Loader */}
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-6"></div>
                    <div className="h-12 bg-slate-100 rounded mb-4"></div>
                    <div className="h-32 bg-slate-50 rounded"></div>
                 </div>
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="h-24 bg-slate-100 rounded-xl"></div>
                       <div className="h-24 bg-slate-100 rounded-xl"></div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-4 px-8 hidden sm:block z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
           <div className="flex items-center gap-4">
             <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> ĐANG HOẠT ĐỘNG</span>
             <span>MODEL: GEMINI-3-PRO-PREVIEW</span>
           </div>
           <span>PROMPT MASTER AI v3.5 • 2024</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
