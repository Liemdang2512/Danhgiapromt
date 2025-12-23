
import React from 'react';
import { UserInput } from '../types';

interface PromptFormProps {
  input: UserInput;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: () => void;
  loading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ input, onChange, onSubmit, loading }) => {
  const isFormValid = input.prompt.trim().length > 10 && input.purpose.trim().length > 2;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
      <div className="space-y-6">
        {/* Ô nhập mục đích sử dụng */}
        <div>
          <label className="block text-sm font-black text-slate-800 uppercase tracking-widest mb-3">
            Mục đích sử dụng
          </label>
          <input
            type="text"
            name="purpose"
            value={input.purpose}
            onChange={onChange}
            placeholder="Ví dụ: Viết chatbot hỗ trợ khách hàng, Tạo kịch bản video TikTok..."
            className="w-full px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none text-sm bg-slate-50 font-medium"
          />
          <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase italic">
            * Giúp AI hiểu rõ ngữ cảnh để đưa ra điểm số khách quan nhất.
          </p>
        </div>

        {/* Ô nhập nội dung Prompt */}
        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-sm font-black text-slate-800 uppercase tracking-widest">
              Nội dung Prompt
            </label>
            <span className={`text-[10px] font-black uppercase ${input.prompt.length < 10 ? 'text-orange-500' : 'text-slate-400'}`}>
              {input.prompt.length} KÝ TỰ
            </span>
          </div>
          <textarea
            name="prompt"
            value={input.prompt}
            onChange={onChange}
            placeholder="Dán prompt của bạn vào đây (dạng công thức hoặc ngôn ngữ tự nhiên)..."
            className="w-full h-64 px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none font-mono text-sm resize-none bg-slate-50 shadow-inner"
          />
        </div>

        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-2">
           <div className="flex gap-3">
             <div className="shrink-0 text-indigo-500 mt-0.5">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
               </svg>
             </div>
             <p className="text-[11px] font-bold text-indigo-700 leading-normal uppercase">
               Chuyên gia AI sẽ đối chiếu Prompt với Mục đích sử dụng để kiểm định chất lượng đầu ra thực tế.
             </p>
           </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={loading || !isFormValid}
          className={`w-full py-4 px-8 rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-white transition-all shadow-xl flex items-center justify-center gap-3 ${
            loading || !isFormValid ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 hover:shadow-indigo-200'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang kiểm định...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.487l1.3 2.2a1 1 0 01-.166 1.183l-1.3 1.3a1 1 0 01-1.414 0l-1.3-1.3a1 1 0 01-.166-1.183l1.3-2.2a1 1 0 01.85-.487zM5.3 5.047a1 1 0 01.897.487l1.3 2.2a1 1 0 01-.166 1.183l-1.3 1.3a1 1 0 01-1.414 0l-1.3-1.3a1 1 0 01-.166-1.183l1.3-2.2a1 1 0 01.85-.487z" clipRule="evenodd" />
                <path d="M5 11a1 1 0 11-2 0 1 1 0 012 0zM11 11a1 1 0 11-2 0 1 1 0 012 0zM17 11a1 1 0 11-2 0 1 1 0 012 0zM13 14H7a1 1 0 100 2h6a1 1 0 100-2z" />
              </svg>
              <span>CHẠY KIỂM ĐỊNH CHUYÊN GIA</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptForm;
