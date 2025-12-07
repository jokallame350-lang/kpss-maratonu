import { Analytics } from "@vercel/analytics/react"
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TopicViewer } from './components/TopicViewer';
import { SubjectDetail } from './components/SubjectDetail';
import { FlashcardMode } from './components/FlashcardMode';
import { Subject, Topic } from './types';

// Simple "Hash Router" implementation using state
type View = 'dashboard' | 'subject' | 'topic' | 'flashcard';

export default function App() {
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [view, setView] = useState<View>('dashboard');
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kpss_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kpss_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kpss_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSelectSubject = (subject: Subject) => {
    setActiveSubject(subject);
    setView('subject');
  };

  const handleSelectTopic = (subject: Subject, topic: Topic) => {
    setActiveSubject(subject);
    setActiveTopic(topic);
    setView('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setActiveSubject(null);
    setActiveTopic(null);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToFlashcards = () => {
    setActiveSubject(null);
    setActiveTopic(null);
    setView('flashcard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout
      activeSubject={activeSubject}
      onSelectSubject={handleSelectSubject}
      onSelectTopic={handleSelectTopic}
      goHome={goHome}
      goToFlashcards={goToFlashcards}
      currentView={view}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
    >
      {view === 'dashboard' && (
        <Dashboard onSelectSubject={handleSelectSubject} />
      )}
      
      {view === 'subject' && activeSubject && (
        <SubjectDetail 
          subject={activeSubject} 
          onSelectTopic={handleSelectTopic}
          onBack={goHome}
        />
      )}

      {view === 'topic' && activeSubject && activeTopic && (
        <TopicViewer 
          subject={activeSubject} 
          topic={activeTopic} 
          onBack={() => {
            // Go back to subject view
            setView('subject');
          }} 
          onNavigate={(topic) => handleSelectTopic(activeSubject, topic)}
        />
      )}

      {view === 'flashcard' && (
        <FlashcardMode onBack={goHome} />
      )}

      {/* Analytics bileşenini buraya ekledim */}
      <Analytics />
    </Layout>
  );
}