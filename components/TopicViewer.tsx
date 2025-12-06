import React, { useEffect, useState } from 'react';
import { Subject, Topic, StudyContent } from '../types';
import { fetchStudyContent } from '../services/geminiService';
import { ArrowLeft, Clock, Sparkles, CheckCircle2, RefreshCcw, AlertTriangle, Check, ChevronLeft, ChevronRight, Zap, TrendingUp, BookOpen, Search, GraduationCap } from 'lucide-react';

interface TopicViewerProps {
  subject: Subject;
  topic: Topic;
  onBack: () => void;
  onNavigate: (topic: Topic) => void;
}

export const TopicViewer: React.FC<TopicViewerProps> = ({ subject, topic, onBack, onNavigate }) => {
  const [content, setContent] = useState<StudyContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [readTime, setReadTime] = useState<number>(5);

  const currentIndex = subject.topics.findIndex(t => t.id === topic.id);
  const prevTopic = subject.topics[currentIndex - 1];
  const nextTopic = subject.topics[currentIndex + 1];

  useEffect(() => {
    const checkCompletion = () => {
      try {
        const stored = localStorage.getItem('kpss_progress');
        if (stored) {
          const parsed = JSON.parse(stored);
          const subjectTopics = parsed[subject.id] || [];
          setIsCompleted(subjectTopics.includes(topic.id));
        }
      } catch (e) {
        console.error("Error reading completion status", e);
      }
    };
    checkCompletion();
  }, [subject.id, topic.id]);

  useEffect(() => {
    let isMounted = true;
    const loadContent = async () => {
      const cacheKey = `kpss_content_v3_${subject.title}_${topic.title}`;
      const cached = sessionStorage.getItem(cacheKey);
      
      if (cached) {
         const parsed = JSON.parse(cached);
         setContent(parsed);
         calculateReadTime(parsed.htmlContent);
         setLoading(false);
         return;
      }

      setLoading(true);
      setError(null);
      setContent(null); 
      try {
        const data = await fetchStudyContent(subject.title, topic.title);
        if (isMounted) {
          setContent(data);
          calculateReadTime(data.htmlContent);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "İçerik yüklenirken bir hata oluştu.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadContent();
    return () => { isMounted = false; };
  }, [subject.title, topic.title, retryKey]);

  const calculateReadTime = (html: string) => {
    const text = html.replace(/<[^>]+>/g, '');
    const wordCount = text.split(/\s+/).length;
    const time = Math.max(1, Math.ceil(wordCount / 200));
    setReadTime(time);
  };

  const handleToggleComplete = () => {
    try {
      const stored = localStorage.getItem('kpss_progress');
      const parsed = stored ? JSON.parse(stored) : {};
      const currentSubjectTopics = parsed[subject.id] || [];
      let newTopics;
      if (isCompleted) {
        newTopics = currentSubjectTopics.filter((id: string) => id !== topic.id);
      } else {
        newTopics = [...currentSubjectTopics, topic.id];
      }
      parsed[subject.id] = newTopics;
      localStorage.setItem('kpss_progress', JSON.stringify(parsed));
      setIsCompleted(!isCompleted);
    } catch (e) {
      console.error("Error saving progress", e);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-pulse">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Ders Notları Hazırlanıyor...</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Yapay zeka <span className="text-indigo-600 dark:text-indigo-400">{subject.title} - {topic.title}</span> konusunu senin için özetliyor.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-md mx-auto">
        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-full mb-6">
            <AlertTriangle className="w-12 h-12 text-rose-500 dark:text-rose-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Bir Hata Oluştu</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8">{error}</p>
        <button 
          onClick={() => setRetryKey(k => k + 1)}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-500/30"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="animate-fade-in pb-20">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
        >
          <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mr-2">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Konu Listesine Dön
        </button>
        
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300`}>
            {subject.title}
          </span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <Clock className="w-3 h-3 mr-1.5" />
            {readTime} dk Okuma Süresi
          </span>
        </div>
        
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-8">
          {content.title}
        </h1>

        {/* Super Summary Card */}
        {content.superSummary && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-800 dark:to-indigo-800 p-8 text-white shadow-xl shadow-indigo-500/20 mb-10">
            <div className="relative z-10">
              <div className="flex items-center mb-3 text-indigo-100 text-sm font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4 mr-2 fill-current" /> Süper Özet
              </div>
              <p className="text-xl font-medium leading-relaxed opacity-95 text-indigo-50">
                {content.superSummary}
              </p>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
          </div>
        )}
      </div>

      {/* Main Content & Sidebar Layout */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Main Text */}
        <div className="lg:col-span-8">
          
          <article className="prose prose-lg prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-10">
             <div dangerouslySetInnerHTML={{ __html: content.htmlContent }} />
          </article>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => prevTopic && onNavigate(prevTopic)}
              disabled={!prevTopic}
              className={`
                flex flex-col md:flex-row items-start md:items-center p-6 rounded-2xl border transition-all text-left group
                ${prevTopic 
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg dark:hover:shadow-indigo-900/20 cursor-pointer' 
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-50 cursor-not-allowed'}
              `}
            >
              {prevTopic && (
                <div className="mb-3 md:mb-0 md:mr-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Önceki Konu</span>
                <span className={`block font-bold text-lg leading-tight ${prevTopic ? 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400' : 'text-slate-400'}`}>
                  {prevTopic ? prevTopic.title : 'Başlangıç'}
                </span>
              </div>
            </button>

            <button
              onClick={() => nextTopic && onNavigate(nextTopic)}
              disabled={!nextTopic}
              className={`
                flex flex-col md:flex-row-reverse items-end md:items-center p-6 rounded-2xl border transition-all text-right group
                ${nextTopic 
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg dark:hover:shadow-indigo-900/20 cursor-pointer' 
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-50 cursor-not-allowed'}
              `}
            >
              {nextTopic && (
                <div className="mb-3 md:mb-0 md:ml-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Sonraki Konu</span>
                <span className={`block font-bold text-lg leading-tight ${nextTopic ? 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400' : 'text-slate-400'}`}>
                  {nextTopic ? nextTopic.title : 'Bitiş'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 mt-10 lg:mt-0 space-y-6">
          <div className="sticky top-6 space-y-6">
            
            {/* Completion Card */}
            <div className={`
                rounded-3xl p-6 border text-center transition-all duration-300
                ${isCompleted 
                    ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}
            `}>
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">
                {isCompleted ? 'Konu Tamamlandı!' : 'Konuyu Bitirdin mi?'}
              </h3>
              <button 
                onClick={handleToggleComplete}
                className={`
                  w-full flex items-center justify-center py-4 px-6 rounded-2xl font-bold transition-all shadow-md active:scale-95
                  ${isCompleted 
                    ? 'bg-white dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30'
                  }
                `}
              >
                {isCompleted ? <Check className="w-5 h-5 mr-2" /> : <CheckCircle2 className="w-5 h-5 mr-2" />}
                {isCompleted ? 'Tamamlandı' : 'Tamamla'}
              </button>
            </div>

            {/* Exam Trends */}
            {content.examTrends && (
              <div className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-6 border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center mb-3 text-amber-700 dark:text-amber-400 font-bold">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Sınav Analizi
                </div>
                <p className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed font-medium">
                  {content.examTrends}
                </p>
              </div>
            )}

            {/* Key Points */}
            {content.keyPoints && content.keyPoints.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Anahtar Bilgiler
                </h3>
                <ul className="space-y-4">
                  {content.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                      <span className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};