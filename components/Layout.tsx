import React, { useState } from 'react';
import { CURRICULUM } from '../constants';
import { Menu, X, Book, GraduationCap, Layers, Sun, Moon, ChevronRight } from 'lucide-react';
import { Subject, Topic } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSubject?: Subject | null;
  onSelectSubject: (s: Subject) => void;
  onSelectTopic: (s: Subject, t: Topic) => void;
  goHome: () => void;
  goToFlashcards: () => void;
  currentView: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeSubject, 
  onSelectSubject, 
  onSelectTopic,
  goHome,
  goToFlashcards,
  currentView,
  isDarkMode,
  toggleDarkMode
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
          transform transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 cursor-pointer group" onClick={goHome}>
          <div className="bg-indigo-600 dark:bg-indigo-500 rounded-lg p-1.5 mr-3 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            KPSS<span className="text-indigo-600 dark:text-indigo-400">Maraton</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <button
              onClick={() => { goHome(); setIsSidebarOpen(false); }}
              className={`
                w-full flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-all mb-1 group
                ${currentView === 'dashboard' 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400'}
              `}
          >
            <Book className={`w-5 h-5 mr-3 transition-colors ${currentView === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} />
            Ana Sayfa
          </button>

          <button
              onClick={() => { goToFlashcards(); setIsSidebarOpen(false); }}
              className={`
                w-full flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-all mb-6 group
                ${currentView === 'flashcard' 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400'}
              `}
          >
            <Layers className={`w-5 h-5 mr-3 transition-colors ${currentView === 'flashcard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} />
            Kart Modu
          </button>

          <div className="px-3 mb-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Dersler
          </div>

          <div className="space-y-1">
            {CURRICULUM.map((subject) => (
              <div key={subject.id}>
                <button
                  onClick={() => {
                      onSelectSubject(subject);
                      if(activeSubject?.id !== subject.id) setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all group
                    ${activeSubject?.id === subject.id 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'}
                  `}
                >
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-3 ${subject.color.split(' ')[0]}`}></span>
                    {subject.title}
                  </div>
                  {activeSubject?.id === subject.id && (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                
                {/* Nested Topics if Active */}
                {activeSubject?.id === subject.id && (
                  <div className="ml-5 mt-2 mb-2 border-l-2 border-slate-100 dark:border-slate-800 pl-2 space-y-1 animate-slide-up">
                    {subject.topics.map(topic => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          onSelectTopic(subject, topic);
                          setIsSidebarOpen(false);
                        }}
                        className="block w-full text-left px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                      >
                        {topic.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-4"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-sm font-medium">{isDarkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}</span>
            </button>
            <div className="text-xs text-slate-400 text-center opacity-60">
              KPSS Maratonu v2.0
              <br />
              Powered by Gemini
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20">
          <div className="flex items-center" onClick={goHome}>
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="font-bold text-slate-800 dark:text-white">KPSS Maratonu</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 p-4 lg:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};