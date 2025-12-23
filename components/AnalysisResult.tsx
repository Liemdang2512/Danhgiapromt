
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { AnalysisResult as AnalysisResultType } from '../types';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const radarData = [
    { subject: 'Độ cụ thể', A: result.scores.specificity, fullMark: 10 },
    { subject: 'Độ rõ ràng', A: result.scores.clarity, fullMark: 10 },
    { subject: 'Định dạng', A: result.scores.format, fullMark: 10 },
    { subject: 'Ngữ cảnh', A: result.scores.context, fullMark: 10 },
    { subject: 'Hướng dẫn', A: result.scores.guidance, fullMark: 10 },
  ];

  const copyOptimizedPrompt = () => {
    const fullText = result.optimizedPrompt.sections
      .map(s => `${s.label.toUpperCase()}:\n${s.content}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    alert(`Đã sao chép Prompt tối ưu theo framework ${result.optimizedPrompt.frameworkUsed}!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
      
      {/* 1. Framework Detection */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <span className="text-xl">🔍</span> Nhận diện Framework
          </h3>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-black rounded tracking-tighter">
              DẠNG: {result.frameworkDetection.primary} ({result.frameworkDetection.confidence}%)
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-sm text-slate-600 italic leading-relaxed">
                "{result.frameworkDetection.explanation}"
              </p>
            </div>
            {result.frameworkDetection.secondary && (
              <div className="md:w-1/3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Cấu trúc kết hợp</p>
                <p className="text-sm font-bold text-indigo-700">{result.frameworkDetection.secondary}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Component Analysis & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-6">
            <span className="text-xl">📊</span> Phân tích Thành phần
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Đã có
              </p>
              <div className="flex flex-wrap gap-2">
                {result.componentAnalysis.present.map((c, i) => (
                  <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-100">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-amber-500 uppercase mb-2 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Mơ hồ
              </p>
              <div className="flex flex-wrap gap-2">
                {result.componentAnalysis.vague.map((c, i) => (
                  <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-md border border-amber-100">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-300" /> Cần bổ sung
              </p>
              <div className="flex flex-wrap gap-2">
                {result.componentAnalysis.missing.map((c, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-semibold rounded-md border border-slate-200">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
            <span className="text-xl">⭐</span> Ma trận Chất lượng
          </h3>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontStyle: 'bold', fill: '#64748b' }} />
                <Radar name="Chất lượng" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2 bg-slate-50 rounded text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase">Chất lượng</p>
              <p className="text-lg font-black text-slate-800">{result.scores.quality}/10</p>
            </div>
            <div className="p-2 bg-indigo-50 rounded text-center">
              <p className="text-[9px] font-black text-indigo-400 uppercase">Khả thi</p>
              <p className="text-lg font-black text-indigo-600">{result.scores.optimization}/10</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Weaknesses & Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-black text-red-600 uppercase tracking-widest flex items-center gap-2 mb-4">
            <span className="text-xl">⚠️</span> Điểm yếu
          </h3>
          <ul className="space-y-3">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 items-start">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-200 p-6 border-l-4 border-l-indigo-600">
          <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 mb-4">
            <span className="text-xl">💡</span> Giải pháp Tối ưu
          </h3>
          <ul className="space-y-3">
            {result.suggestions.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 items-start font-medium">
                <span className="mt-1 flex items-center justify-center h-4 w-4 rounded bg-indigo-600 text-[10px] font-black text-white shrink-0">{i+1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Optimized Prompt Version (Flexible) */}
      <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="px-6 py-5 bg-slate-800/50 flex justify-between items-center border-b border-slate-700/50">
          <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="p-1 bg-indigo-500/10 rounded">✨</span> Phiên bản Tối ưu: {result.optimizedPrompt.frameworkUsed}
          </h3>
          <button
            onClick={copyOptimizedPrompt}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-black transition-all flex items-center gap-2 shadow-lg active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            SAO CHÉP PROMPT
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 gap-4">
          <div className="space-y-4">
            {result.optimizedPrompt.sections.map((section, idx) => (
              <div key={idx} className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <p className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">{section.label}</p>
                <p className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
        <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm text-emerald-900 leading-relaxed">
          <span className="font-black uppercase text-[10px] tracking-widest block mb-1">Kết luận của Chuyên gia</span>
          {result.summary}
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;
