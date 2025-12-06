import React, { useState, useEffect } from 'react';
import { Subject, Topic } from '../types';
import { Search, ArrowLeft, CheckCircle2, Circle, Play, Award, BarChart3, Clock } from 'lucide-react';

interface SubjectDetailProps {
  subject: Subject;
  onSelectTopic: (subject: Subject, topic: Topic) => void;
  onBack: () => void;
}

export const SubjectDetail: React.FC<SubjectDetailProps> = ({ subject, onSelectTopic, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);

  // Load completion status from localStorage on mount
  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem('kpss_progress');
      if (storedProgress) {
        const parsed = JSON.parse(storedProgress);
        setCompletedTopicIds(parsed[subject.id] || []);
      }
    } catch (e) {
      console.error("Error loading progress", e);
    }
  }, [subject.id]);

  // Filter topics based on search
  const filteredTopics = subject.topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const progressPercentage = Math.round((completedTopicIds.length / subject.topics.length) * 100);

  // Use gradient based on subject color but modernized
  const colorMap: Record<string, string> = {
      'Tarih': 'from-amber-500 to-orange-600',
      'Coğrafya': 'from-emerald-500 to-teal-600',
      'Vatandaşlık': 'from-indigo-500 to-violet-600',
      'Türkçe': 'from-rose-500 to-pink-600',
      'Matematik': 'from-blue-500 to-cyan-600'
  };
  const gradientClass = colorMap[subject.title] || 'from-slate-700 to-slate-900';
  
  const estimatedReadTime = Math.max(8, Math.min(25, Math.round(180 / (subject.topics.length || 1))));

  return (
    <div className="animate-fade-in pb-12">
      {/* Navigation & Header */}
      <button 
        onClick={onBack} 
        className="group flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
      >
        <div className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-indigo-500 dark:group-hover:border-indigo-400 mr-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
        </div>
        Ana Sayfaya Dön
      </button>

      {/* Hero Section */}
      <div className={`relative overflow-hidden rounded-[2rem] p-8 lg:p-10 mb-8 bg-gradient-to-br ${gradientClass} text-white shadow-xl shadow-slate-200/50 dark:shadow-none`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold uppercase tracking-widest mb-4 border border-white/10">
                {subject.topics.length} Konu
            </div>
            <h1 className="text-3xl lg:text-5xl font-black mb-4 tracking-tight">{subject.title}</h1>
            <p className="opacity-90 text-lg max-w-xl font-medium text-white/80">
              Bu dersteki konuları tamamlayarak başarı oranını artır.
            </p>
          </div>
          
          {/* Progress Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 min-w-[280px]">
            <div className="flex justify-between text-sm font-bold mb-3 opacity-90">
              <span className="flex items-center"><BarChart3 className="w-4 h-4 mr-2"/> İlerleme</span>
              <span>%{progressPercentage}</span>
            </div>
            <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-white/90 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="mt-3 text-xs font-medium text-white/60 flex justify-between">
               <span>{completedTopicIds.length} tamamlandı</span>
               <span>{subject.topics.length - completedTopicIds.length} kaldı</span>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-black opacity-10 rounded-full blur-[60px] pointer-events-none"></div>
      </div>

      {/* Filter Bar - Sticky */}
      <div className="sticky top-4 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl py-4 mb-8 -mx-4 px-4 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="relative max-w-2xl mx-auto md:mx-0">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 sm:text-sm shadow-lg shadow-slate-200/20 dark:shadow-none transition-all"
            placeholder="Konu başlıklarında ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTopics.map((topic, index) => {
            const isCompleted = completedTopicIds.includes(topic.id);
            
            return (
              <div 
                key={topic.id}
                onClick={() => onSelectTopic(subject, topic)}
                className={`
                  group cursor-pointer relative p-5 rounded-2xl border transition-all duration-300
                  ${isCompleted 
                    ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    {/* Status Icon */}
                    <div className={`
                      flex-shrink-0 mr-5 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                      ${isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500'}
                    `}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold text-lg">{index + 1}</span>}
                    </div>

                    <div className="flex flex-col">
                      <h3 className={`font-bold text-lg mb-1 transition-colors ${isCompleted ? 'text-emerald-900 dark:text-emerald-400 line-through decoration-emerald-900/30 dark:decoration-emerald-400/30' : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                        {topic.title}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs font-bold uppercase tracking-wide ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                          {isCompleted ? 'Tamamlandı' : 'Başlanmadı'}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700 text-xs">•</span>
                        <span className="flex items-center text-xs font-medium text-slate-400 dark:text-slate-500">
                           <Clock className="w-3 h-3 mr-1" />
                           {estimatedReadTime} dk
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Icon */}
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300
                    ${isCompleted ? 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30' : 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'}
                  `}>
                    {isCompleted ? <Award className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <Search className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sonuç bulunamadı</h3>
          <p className="text-slate-500 dark:text-slate-400">"{searchQuery}" aramasıyla eşleşen bir konu yok.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-6 px-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-bold transition-colors"
          >
            Aramayı Temizle
          </button>
        </div>
      )}
    </div>
  );
};