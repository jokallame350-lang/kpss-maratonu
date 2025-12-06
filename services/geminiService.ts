import { GoogleGenAI, Type } from "@google/genai";
import { StudyContent, Flashcard, ExamQuestion } from "../types";

// API Anahtarı Yapılandırması
// Projeyi indirdiğinizde .env dosyasındaki API_KEY'i okur.
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Helper function to retry failed requests
async function generateContentGeneric(model: string, prompt: string, schema: any, retries = 3): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });
        const text = response.text;
        if (!text) throw new Error("API'den boş yanıt döndü.");
        return text;
    } catch (error: any) {
        const isRetryable = error.status >= 500 || error.message?.toLowerCase().includes('xhr');
        if (retries > 0 && isRetryable) {
            await new Promise(resolve => setTimeout(resolve, (4 - retries) * 1000));
            return generateContentGeneric(model, prompt, schema, retries - 1);
        }
        throw error;
    }
}

export async function fetchStudyContent(subjectTitle: string, topicTitle: string): Promise<StudyContent> {
  const cacheKey = `kpss_content_v3_${subjectTitle}_${topicTitle}`; // Versioned cache key
  try {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (e) {
    console.warn("Session storage access failed", e);
  }

  const model = 'gemini-2.5-flash';
  const prompt = `
    Sen uzman bir KPSS (Kamu Personeli Seçme Sınavı) eğitmenisin ve detaylı sınav analistisin.
    Ders: ${subjectTitle}
    Konu: ${topicTitle}
    
    Görevin:
    1. Bu konu için kapsamlı, HTML formatında, Tailwind CSS ile stillendirilmiş (Dark mode uyumlu) ders notu hazırla.
    2. KRİTİK GÖREV (ÇIKMIŞ SORU ENTEGRASYONU):
       - Konuyu anlatırken, 2020-2025 yılları arasında KPSS Lisans, Önlisans ve Ortaöğretim sınavlarında ÇIKMIŞ soruları tespit et.
       - Bu soruların cevabı olan veya öncülünde geçen bilgileri anlattığın paragrafların HEMEN İÇİNE veya SONUNA şu formatta bir not ekle:
       
       Kullanılacak HTML Formatı:
       <div class="my-6 p-4 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 rounded-r-lg shadow-sm">
          <div class="flex items-center mb-1 text-rose-700 dark:text-rose-300 font-bold text-sm">
             <span class="mr-2 text-lg">🔥</span> ÖSYM BUNU SORDU
          </div>
          <p class="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
             "Bu konu <strong>2022 Lisans</strong> sınavında ... şeklinde soruldu. Özellikle ... kavramına dikkat çekildi."
          </p>
       </div>

       - Eğer kesin bir yıl hatırlamıyorsan ama konunun popüler olduğunu biliyorsan: "Bu konu ÖSYM tarafından sıkça yoklanır" şeklinde genel bir uyarı ekle.
       - Analizlerin GERÇEKÇİ olsun.

    Format Kuralları:
    - HTML metinlerinde 'text-slate-800 dark:text-slate-200' gibi renkler kullan.
    - Başlıklar belirgin olsun.
  `;

  const schema = {
      type: Type.OBJECT,
      properties: {
        htmlContent: {
          type: Type.STRING,
          description: "HTML formatted lecture content with embedded OSYM notes.",
        },
        keyPoints: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "3-5 key takeaways.",
        },
        examTrends: {
          type: Type.STRING,
          description: "General frequency analysis (e.g., 'Her yıl ortalama 2 soru gelir').",
        },
        superSummary: {
          type: Type.STRING,
          description: "1-2 sentence summary.",
        },
        pastQuestionAnalysis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    year: { type: Type.STRING, description: "Yıl veya Dönem (Örn: 2022 Lisans)" },
                    insight: { type: Type.STRING, description: "O yıl sorulan sorunun analizi." }
                },
                required: ["year", "insight"]
            },
            description: "Structured list of insights (optional, main insights should be in HTML)."
        }
      },
      required: ["htmlContent", "keyPoints", "examTrends", "superSummary"],
  };

  try {
    const jsonString = await generateContentGeneric(model, prompt, schema);
    const data = JSON.parse(jsonString);
    const result: StudyContent = {
      title: topicTitle,
      htmlContent: data.htmlContent,
      keyPoints: data.keyPoints,
      examTrends: data.examTrends,
      superSummary: data.superSummary,
      pastQuestionAnalysis: data.pastQuestionAnalysis
    };
    try { sessionStorage.setItem(cacheKey, JSON.stringify(result)); } catch (e) {}
    return result;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("İçerik formatı hatalı.");
  }
}

export async function fetchFlashcards(): Promise<Flashcard[]> {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Sen uzman bir KPSS eğitmenisin.
      Bana KPSS'de (Tarih, Coğrafya, Vatandaşlık, Güncel Bilgiler) çıkabilecek 10 adet YENİ ve ÖZGÜN flashcard (soru-cevap kartı) hazırla.
      
      Kurallar:
      1. Sorular kısa, net ve bilgi odaklı olsun.
      2. Cevaplar kısa ve akılda kalıcı olsun.
      3. Konular karışık olsun.
      4. HER KART İÇİN MUTLAKA DETAYLI AÇIKLAMA EKLE.
      5. Detaylı açıklama HTML formatında olsun ve Dark Mode uyumlu classlar içersin (text-slate-700 dark:text-slate-300).
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            cards: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        subject: { type: Type.STRING, description: "Ders adı" },
                        question: { type: Type.STRING, description: "Soru metni" },
                        answer: { type: Type.STRING, description: "Cevap metni" },
                        detailTitle: { type: Type.STRING, description: "Konu başlığı" },
                        detailSummary: { type: Type.STRING, description: "1-2 cümlelik özet." },
                        detailContent: { type: Type.STRING, description: "Detaylı HTML metin. Dark mode uyumlu olmalı." }
                    },
                    required: ["subject", "question", "answer", "detailTitle", "detailSummary", "detailContent"]
                }
            }
        },
        required: ["cards"]
    };

    try {
        const jsonString = await generateContentGeneric(model, prompt, schema);
        const data = JSON.parse(jsonString);
        
        // Map to Flashcard interface
        return data.cards.map((c: any, index: number) => ({
            id: `ai_${Date.now()}_${index}`,
            subject: c.subject,
            question: c.question,
            answer: c.answer,
            detailTitle: c.detailTitle,
            detailSummary: c.detailSummary,
            detailContent: c.detailContent
        }));
    } catch (error) {
        console.error("AI Flashcard generation failed", error);
        throw new Error("Yeni kartlar oluşturulurken bir hata oluştu.");
    }
}

export async function fetchExamQuestions(subject: string, count: number = 20, batchIndex: number = 0): Promise<ExamQuestion[]> {
  const model = 'gemini-2.5-flash';
  const prompt = `
    Sen uzman bir KPSS soru hazırlayıcısısın.
    Ders: ${subject}
    
    Bana KPSS formatında (5 şıklı) ${count} adet ÖZGÜN ve ZORLUK DERECESİ DENGELİ soru hazırla.
    Bu, toplam 120 soruluk bir denemenin ${batchIndex + 1}. parçasıdır.
    Daha önceki sorulardan farklı konulara değinmeye çalış.
    
    Her soru için detaylı bir açıklama (çözüm) yaz.
  `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "Soru metni" },
            options: {
              type: Type.OBJECT,
              properties: {
                A: { type: Type.STRING },
                B: { type: Type.STRING },
                C: { type: Type.STRING },
                D: { type: Type.STRING },
                E: { type: Type.STRING },
              },
              required: ["A", "B", "C", "D", "E"]
            },
            correctAnswer: { type: Type.STRING, description: "Doğru şık (Sadece harf: A, B, C, D veya E)" },
            explanation: { type: Type.STRING, description: "Sorunun çözümü ve açıklaması." },
          },
          required: ["text", "options", "correctAnswer", "explanation"]
        }
      }
    },
    required: ["questions"]
  };

  try {
    const jsonString = await generateContentGeneric(model, prompt, schema);
    const data = JSON.parse(jsonString);
    
    return data.questions.map((q: any, index: number) => ({
      id: `exam_${subject}_${batchIndex}_${index}_${Date.now()}`,
      subject: subject,
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    }));
  } catch (error) {
    console.error("Exam generation failed", error);
    throw new Error("Sınav soruları oluşturulamadı.");
  }
}