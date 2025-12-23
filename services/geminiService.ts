
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, AnalysisResult } from "../types";

export const analyzePromptWithAI = async (input: UserInput): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Bạn là một chuyên gia Prompt Engineering cao cấp với 15 năm kinh nghiệm.
    Nhiệm vụ của bạn là thực hiện phân tích chuyên sâu về prompt được cung cấp bằng TIẾNG VIỆT dựa trên MỤC ĐÍCH SỬ DỤNG.
    
    Quy trình phân tích:
    Bước 1: NHẬN DIỆN FRAMEWORK HIỆN TẠI.
    Bước 2: ĐỐI CHIẾU MỤC ĐÍCH. Phân tích xem cấu trúc prompt hiện tại có phù hợp với mục tiêu không.
    Bước 3: ĐÁNH GIÁ THÀNH PHẦN & CHẤT LƯỢNG (Điểm 0-10).
    Bước 4: ĐỀ XUẤT CẢI TIẾN.
    Bước 5: VIẾT LẠI PROMPT TỐI ƯU. 
       - KHÔNG cố định vào RISE. 
       - Hãy chọn công thức phù hợp nhất với mục đích (ví dụ: CRISPE cho Content, CoT cho Logic/Toán học, SMART cho dự án, TRACI cho quản lý, v.v.).
       - Trả về tên framework đã chọn và danh sách các phần của framework đó.
    
    LƯU Ý: Toàn bộ nội dung trả về PHẢI BẰNG TIẾNG VIỆT.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `
      Hãy phân tích prompt sau:
      Mục đích: "${input.purpose}"
      Nội dung: "${input.prompt}"
      
      Hãy chọn framework tối ưu nhất để viết lại prompt này. Trả về kết quả hoàn toàn bằng tiếng Việt trong JSON.
    `,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          frameworkDetection: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              secondary: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["primary", "confidence", "secondary", "explanation"]
          },
          componentAnalysis: {
            type: Type.OBJECT,
            properties: {
              present: { type: Type.ARRAY, items: { type: Type.STRING } },
              vague: { type: Type.ARRAY, items: { type: Type.STRING } },
              missing: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["present", "vague", "missing"]
          },
          scores: {
            type: Type.OBJECT,
            properties: {
              specificity: { type: Type.NUMBER },
              clarity: { type: Type.NUMBER },
              format: { type: Type.NUMBER },
              context: { type: Type.NUMBER },
              guidance: { type: Type.NUMBER },
              quality: { type: Type.NUMBER },
              optimization: { type: Type.NUMBER }
            },
            required: ["specificity", "clarity", "format", "context", "guidance", "quality", "optimization"]
          },
          weaknesses: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          summary: { type: Type.STRING },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          optimizedPrompt: {
            type: Type.OBJECT,
            properties: {
              frameworkUsed: { type: Type.STRING },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    content: { type: Type.STRING }
                  },
                  required: ["label", "content"]
                }
              }
            },
            required: ["frameworkUsed", "sections"]
          }
        },
        required: ["frameworkDetection", "componentAnalysis", "scores", "weaknesses", "summary", "suggestions", "optimizedPrompt"]
      },
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Phân tích thất bại. Vui lòng kiểm tra lại nội dung.");
  }
};
