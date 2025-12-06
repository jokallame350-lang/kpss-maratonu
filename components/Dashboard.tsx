import React from 'react';
import { CURRICULUM } from '../constants';
import { Subject } from '../types';
import { BookOpen, Map, Calculator, Scale, Scroll, ChevronRight, Sparkles, Target, Zap } from 'lucide-react';

interface DashboardProps {
  onSelectSubject: (s: Subject) => void;
}

const iconMap: Record<string, any> = {
  BookOpen, Map, Calculator, Scale, Scroll
};

export const Dashboard: React.FC<DashboardProps> = ({ onSelectSubject }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header className="text-center py-12 lg:py-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <h1 className="relative text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
          KPSS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Çalışma Maratonu</span>
        </h1>
        <p className="relative text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Yapay zeka destekli konu anlatımları, akıllı kartlar ve kişiselleştirilmiş çalışma planıyla hedefine adım adım ilerle.
        </p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURRICULUM.map((subject) => {
          const Icon = iconMap[subject.icon] || BookOpen;
          
          return (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className="group relative flex flex-col items-start p-6 lg:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-slate-950/40 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`relative p-3.5 rounded-2xl mb-6 shadow-sm ${subject.color} bg-opacity-10 dark:bg-opacity-20`}>
                <Icon className="w-8 h-8" />
              </div>
              
              <h3 className="relative text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {subject.title}
              </h3>
              <p className="relative text-slate-500 dark:text-slate-400 font-medium mb-8">
                {subject.topics.length} Ana Konu Başlığı
              </p>
              
              <div className="relative w-full mt-auto flex items-center justify-between">
                <span className="text-sm font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  İncele
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-white dark:group-hover:text-white" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feature Banner */}
      <div className="mt-16 relative overflow-hidden rounded-[2.5rem] bg-slate-900 dark:bg-black p-8 md:p-12 text-white shadow-2xl shadow-indigo-900/20">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-600 rounded-full opacity-30 blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-violet-600 rounded-full opacity-30 blur-[80px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <Sparkles className="w-3 h-3 mr-2" /> Motivasyon
            </div>
            <h2 className="text-3xl font-bold mb-3">Maratonu Başlat!</h2>
            <p className="text-indigo-200/80 max-w-md text-lg">
              Bugün çalışmak için harika bir gün. Bir konu seç ve hedefine bir adım daha yaklaş.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center min-w-[120px]">
                <Target className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                <div className="font-bold text-2xl">Hedef</div>
                <div className="text-xs text-white/50">Yüksek Puan</div>
             </div>
             <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center min-w-[120px]">
                <Zap className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                <div className="font-bold text-2xl">Hız</div>
                <div className="text-xs text-white/50">Verimli Çalış</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};