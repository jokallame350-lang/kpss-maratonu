import React, { useState, useEffect, useRef } from 'react';
import { ExamQuestion } from '../types';
import { fetchExamQuestions } from '../services/geminiService';
import { ArrowLeft, Clock, CheckCircle2, Play, ChevronRight, ChevronLeft, BarChart2, RotateCcw, BookOpen, Calculator, Scale, Scroll, Map, Loader2, Zap } from 'lucide-react';

interface ExamModeProps {
  onBack: () => void;
}

type ExamStep = 'intro' | 'loading' | 'active' | 'result';

const EXAM_TYPES = [
  { id: 'turkce', title: 'Türkçe Maratonu', icon: BookOpen, color: 'bg-rose-100 text-rose-700', questionCount: 120, time: 130 },
  { id: 'matematik', title: 'Matematik Maratonu', icon: Calculator, color: 'bg-blue-100 text-blue-700', questionCount: 120, time: 130 },
  { id: 'vatandaslik', title: 'Vatandaşlık Maratonu', icon: Scale, color: 'bg-indigo-100 text-indigo-700', questionCount: 120, time: 100 },
  { id: 'tarih', title: 'Tarih Maratonu', icon: Scroll, color: 'bg-amber-100 text-amber-700', questionCount: 120, time: 100 },
  { id: 'cografya', title: 'Coğrafya Maratonu', icon: Map, color: 'bg-emerald-100 text-emerald-700', questionCount: 120, time: 100 },
];

// Configuration for batch loading
const BATCH_SIZE = 20;
const TOTAL_TARGET = 120;

export const ExamMode: React.FC<ExamModeProps> = ({ onBack }) => {
  const [step, setStep] = useState<ExamStep>('intro');
  const [activeExamId, setActiveExamId] = useState<string>('');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0); 
  const [loadingMessage, setLoadingMessage] = useState("Sınav Hazırlanıyor...");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Ref to track if we should continue fetching in background
  const abortFetching = useRef(false);

  // Initialize Exam
  const startExam = async (examId: string) => {
    setActiveExamId(examId);
    setStep('loading');
    setQuestions([]);
    setAnswers({});
    setCurrentIndex(0);
    abortFetching.current = false;
    
    const examConfig = EXAM_TYPES.find(e => e.id === examId);
    if (!examConfig) return;

    const subjectTitleMap: Record<string, string> = {
      'turkce': 'Türkçe',
      'matematik': 'Matematik',
      'vatandaslik': 'Vatandaşlık',
      'tarih': 'Tarih',
      'cografya': 'Coğrafya'
    };
    
    const subjectTitle = subjectTitleMap[examId];
    
    try {
      setLoadingMessage("İlk sorular hazırlanıyor... (1/6)");
      
      // Fetch FIRST batch immediately to start the exam
      const firstBatch = await fetchExamQuestions(subjectTitle, BATCH_SIZE, 0);
      
      if (firstBatch.length === 0) {
        throw new Error("Soru oluşturulamadı.");
      }

      setQuestions(firstBatch);
      setTimeLeft(examConfig.time * 60);
      setStep('active');

      // Start fetching the rest in background
      fetchRemainingBatches(subjectTitle);

    } catch (error) {
      console.error(error);
      alert("Sınav başlatılırken bir sorun oluştu. Lütfen tekrar deneyin.");
      setStep('intro');
    }
  };

  const fetchRemainingBatches = async (subjectTitle: string) => {
    setIsLoadingMore(true);
    const batchesNeeded = Math.ceil((TOTAL_TARGET - BATCH_SIZE) / BATCH_SIZE); // approx 5 more batches

    for (let i = 1; i <= batchesNeeded; i++) {
        if (abortFetching.current) break;
        
        try {
            // Add a small delay to be nice to the API and let UI breathe
            await new Promise(r => setTimeout(r, 1000));
            
            const newQuestions = await fetchExamQuestions(subjectTitle, BATCH_SIZE, i);
            
            if (abortFetching.current) break;

            setQuestions(prev => {
                // Filter out any potential duplicates based on ID or Text, just in case
                const existingIds = new Set(prev.map(p => p.id));
                const uniqueNew = newQuestions.filter(q => !existingIds.has(q.id));
                return [...prev, ...uniqueNew];
            });

        } catch (e) {
            console.error(`Batch ${i} failed`, e);
            // Continue to next batch even if one fails
        }
    }
    setIsLoadingMore(false);
  };

  // Cleanup on unmount or finish
  useEffect(() => {
    return () => {
        abortFetching.current = true;
    };
  }, []);

  // Timer Effect
  useEffect(() => {
    if (step !== 'active') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const finishExam = () => {
    abortFetching.current = true; // Stop fetching more questions
    setStep('result');
  };

  const handleOptionSelect = (optionKey: string) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionKey
    }));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Result Calculation
  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let empty = 0;

    questions.forEach(q => {
      const userAnswer = answers[q.id];
      if (!userAnswer) {
        empty++;
      } else if (userAnswer === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const net = correct - (incorrect * 0.25); // 4 yanlış 1 doğruyu götürür

    return { correct, incorrect, empty, net };
  };

  // --- VIEWS ---

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center p-6">
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{loadingMessage}</h2>
        <p className="text-slate-500 max-w-md">
          Yapay zeka 120 soruluk sınav maratonunu oluşturuyor...
        </p>
      </div>
    );
  }

  if (step === 'intro') {
    return (
      <div className="animate-fade-in max-w-6xl mx-auto py-8 px-4">
        <button 
          onClick={onBack} 
          className="flex items-center text-slate-500 hover:text-slate-900 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Ana Menüye Dön
        </button>

        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
            <BarChart2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">KPSS Sınav Maratonu</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
             Tamamı yapay zeka tarafından o an oluşturulan, her biri 120 sorudan oluşan kapsamlı deneme sınavları.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAM_TYPES.map((exam) => (
            <div 
              key={exam.id}
              onClick={() => startExam(exam.id)}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer group flex flex-col"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${exam.color}`}>
                 <exam.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {exam.title}
              </h3>
              
              <div className="space-y-2 mb-6 flex-1">
                 <div className="flex items-center text-slate-500 text-sm">
                   <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
                   120 Özgün Soru (Hedef)
                 </div>
                 <div className="flex items-center text-slate-500 text-sm">
                   <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                   {exam.time} Dakika Süre
                 </div>
                 <div className="flex items-center text-slate-500 text-sm">
                   <Zap className="w-4 h-4 mr-2 text-amber-500" />
                   Anlık AI Üretimi
                 </div>
              </div>

              <button className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors flex items-center justify-center">
                Sınavı Başlat <Play className="w-4 h-4 ml-2 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'active') {
    const currentQ = questions[currentIndex];
    
    // Safety check if current index is out of bounds (waiting for batch)
    if (!currentQ) {
       return (
         <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 animate-pulse">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Sıradaki sorular yükleniyor...</p>
            <p className="text-xs text-slate-400 mt-2">Soru {currentIndex + 1} / {TOTAL_TARGET}</p>
         </div>
       );
    }

    const isAnswered = !!answers[currentQ.id];
    const progressPercent = ((currentIndex + 1) / TOTAL_TARGET) * 100;

    return (
      <div className="animate-fade-in max-w-4xl mx-auto py-6 px-4 flex flex-col min-h-screen">
        {/* Header: Timer & Progress */}
        <div className="bg-white sticky top-0 z-20 shadow-sm border-b border-slate-100 -mx-4 px-4 py-4 mb-6">
           <div className="flex items-center justify-between max-w-4xl mx-auto mb-3">
              <div className="flex items-center text-slate-700 font-mono font-bold text-lg bg-slate-100 px-3 py-1 rounded-lg">
                 <Clock className={`w-5 h-5 mr-2 ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`} />
                 {formatTime(timeLeft)}
              </div>
              <div className="flex items-center gap-3">
                 {isLoadingMore && (
                     <div className="flex items-center text-xs text-indigo-500 font-medium animate-pulse">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Sorular Ekleniyor... ({questions.length}/{TOTAL_TARGET})
                     </div>
                 )}
                 <div className="text-sm font-semibold text-slate-500">
                   Soru {currentIndex + 1} / {TOTAL_TARGET}
                 </div>
              </div>
           </div>
           <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
           </div>
        </div>

        {/* Question Area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm mb-6">
             <div className="flex items-center mb-6 justify-between">
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {currentQ.subject}
                </span>
                <span className="text-xs text-slate-300">ID: {currentQ.id.split('_').pop()}</span>
             </div>
             <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed mb-8">
               {currentQ.text}
             </h2>

             {/* Options */}
             <div className="space-y-3">
               {Object.entries(currentQ.options).map(([key, value]) => {
                 const isSelected = answers[currentQ.id] === key;
                 return (
                   <div 
                    key={key}
                    onClick={() => handleOptionSelect(key)}
                    className={`
                      flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${isSelected 
                        ? 'border-indigo-600 bg-indigo-50' 
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}
                    `}
                   >
                     <div className={`
                       w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0 transition-colors
                       ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}
                     `}>
                       {key}
                     </div>
                     <span className={`font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                       {value}
                     </span>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Footer: Controls */}
        <div className="flex items-center justify-between py-6 border-t border-slate-200 mt-auto bg-slate-50 -mx-4 px-4 sticky bottom-0">
           <button 
             onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
             disabled={currentIndex === 0}
             className="flex items-center px-4 py-2 text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:text-indigo-600"
           >
             <ChevronLeft className="w-5 h-5 mr-1" /> Önceki
           </button>

           <div className="flex gap-2">
             <button
               onClick={() => {
                 // Try to find an empty question within currently loaded questions
                 const nextUnanswered = questions.findIndex((q, i) => i > currentIndex && !answers[q.id]);
                 if (nextUnanswered !== -1) setCurrentIndex(nextUnanswered);
                 else {
                     // If all loaded are answered, try to go to last loaded
                     if (currentIndex < questions.length - 1) setCurrentIndex(questions.length - 1);
                 }
               }}
               className="hidden md:flex items-center px-4 py-2 text-slate-500 text-sm hover:text-indigo-600"
             >
               Boş Soruya Git
             </button>
             
             {/* Show Finish if at absolute end OR if at end of currently loaded questions and user wants to stop */}
             {(currentIndex === TOTAL_TARGET - 1) ? (
               <button 
                 onClick={finishExam}
                 className="flex items-center px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all hover:-translate-y-1"
               >
                 Sınavı Bitir <CheckCircle2 className="w-5 h-5 ml-2" />
               </button>
             ) : (
                // Only allow next if we have a next question loaded
               <button 
                 onClick={() => {
                    if (currentIndex < questions.length - 1) {
                        setCurrentIndex(prev => prev + 1);
                    }
                 }}
                 disabled={currentIndex >= questions.length - 1}
                 className="flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-wait"
               >
                 {currentIndex >= questions.length - 1 && isLoadingMore ? 'Yükleniyor...' : 'Sonraki'} 
                 <ChevronRight className="w-5 h-5 ml-2" />
               </button>
             )}
           </div>
        </div>
      </div>
    );
  }

  // Result View
  const results = calculateResults();
  
  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-8 border-b border-slate-200">
         <div>
           <h1 className="text-3xl font-bold text-slate-900 mb-2">Sınav Sonucun</h1>
           <p className="text-slate-600">
             {EXAM_TYPES.find(e => e.id === activeExamId)?.title} - Performans Analizi
           </p>
         </div>
         <div className="flex gap-3 mt-4 md:mt-0">
            <button onClick={() => setStep('intro')} className="flex items-center px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">
               Çıkış
            </button>
            <button onClick={() => startExam(activeExamId)} className="flex items-center px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md">
               <RotateCcw className="w-4 h-4 mr-2" /> Tekrar Çöz
            </button>
         </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
           <div className="text-3xl font-extrabold text-emerald-600 mb-1">{results.correct}</div>
           <div className="text-sm font-semibold text-emerald-800 uppercase tracking-wide">Doğru</div>
        </div>
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 text-center">
           <div className="text-3xl font-extrabold text-rose-600 mb-1">{results.incorrect}</div>
           <div className="text-sm font-semibold text-rose-800 uppercase tracking-wide">Yanlış</div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
           <div className="text-3xl font-extrabold text-slate-600 mb-1">{results.empty}</div>
           <div className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Boş</div>
        </div>
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-indigo-100 opacity-20 transform rotate-12 scale-150"></div>
           <div className="relative z-10">
             <div className="text-3xl font-extrabold text-indigo-700 mb-1">{results.net}</div>
             <div className="text-sm font-semibold text-indigo-900 uppercase tracking-wide">Net</div>
           </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="space-y-6">
         <h2 className="text-xl font-bold text-slate-800 flex items-center">
            <Play className="w-5 h-5 mr-2 text-indigo-600" /> Soru & Cevap İncelemesi
         </h2>
         <p className="text-sm text-slate-500 mb-4">
            Toplam {questions.length} soru yüklendi ve değerlendirildi.
         </p>
         
         <div className="space-y-4">
            {questions.map((q, idx) => {
               const userAnswer = answers[q.id];
               const isCorrect = userAnswer === q.correctAnswer;
               const isEmpty = !userAnswer;
               
               // Only show questions that were either answered OR empty (basically all loaded questions)
               return (
                 <div key={q.id} className={`bg-white rounded-xl border-l-4 p-6 shadow-sm ${isCorrect ? 'border-emerald-500' : isEmpty ? 'border-slate-300' : 'border-rose-500'}`}>
                    <div className="flex items-start justify-between mb-4">
                       <span className="font-bold text-slate-400 mr-4">Soru {idx + 1}</span>
                       {isCorrect && <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase">Doğru</span>}
                       {!isCorrect && !isEmpty && <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded uppercase">Yanlış</span>}
                       {isEmpty && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase">Boş</span>}
                    </div>
                    
                    <p className="text-lg font-medium text-slate-800 mb-4">{q.text}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                       {/* User Answer */}
                       <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="text-xs text-slate-500 font-bold uppercase block mb-1">Senin Cevabın</span>
                          <span className={`font-bold ${isCorrect ? 'text-emerald-600' : isEmpty ? 'text-slate-400' : 'text-rose-600'}`}>
                             {isEmpty ? 'Boş Bırakıldı' : `${userAnswer}) ${q.options[userAnswer as keyof typeof q.options]}`}
                          </span>
                       </div>
                       {/* Correct Answer */}
                       <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                          <span className="text-xs text-emerald-600 font-bold uppercase block mb-1">Doğru Cevap</span>
                          <span className="font-bold text-emerald-800">
                             {q.correctAnswer}) {q.options[q.correctAnswer]}
                          </span>
                       </div>
                    </div>
                    
                    <div className="bg-indigo-50/50 p-4 rounded-lg text-sm text-slate-700">
                       <strong className="text-indigo-700 block mb-1">Açıklama:</strong>
                       {q.explanation}
                    </div>
                 </div>
               );
            })}
         </div>
      </div>
    </div>
  );
};