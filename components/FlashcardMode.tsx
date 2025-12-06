import React, { useState, useEffect } from 'react';
import { Flashcard } from '../types';
import { FLASHCARDS } from '../constants';
import { fetchFlashcards } from '../services/geminiService';
import { ArrowLeft, Check, X, RotateCw, Layers, Sparkles, Loader2, Info, BookOpen, ArrowRight } from 'lucide-react';

interface FlashcardModeProps {
  onBack: () => void;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({ onBack }) => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [isLoadingNew, setIsLoadingNew] = useState(false);
  const [waitingForNext, setWaitingForNext] = useState(false);

  const [infoToast, setInfoToast] = useState<{show: boolean, card: Flashcard | null}>({show: false, card: null});
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const shuffled = [...FLASHCARDS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const currentCard = cards[currentIndex];

  const handleKnown = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setKnownCount(prev => prev + 1);
        if (currentIndex + 1 < cards.length) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setFinished(true);
        }
        setInfoToast({show: false, card: null});
    }, 300);
  };

  const handleUnknown = () => {
    setIsFlipped(true);
    const current = cards[currentIndex];
    if (current.detailSummary || current.detailContent) {
        setInfoToast({ show: true, card: current });
    } else {
        setInfoToast({show: false, card: null});
    }
    setWaitingForNext(true);
  };

  const handleContinue = () => {
    const current = cards[currentIndex];
    const newCards = [...cards, { ...current, id: current.id + '_retry_' + Date.now() }];
    setCards(newCards);
    setWaitingForNext(false);
    setInfoToast({show: false, card: null});
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleRestart = () => {
    const shuffled = [...FLASHCARDS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setKnownCount(0);
    setFinished(false);
    setIsFlipped(false);
    setWaitingForNext(false);
    setInfoToast({show: false, card: null});
  };

  const handleLoadAI = async () => {
    setIsLoadingNew(true);
    try {
        const newCards = await fetchFlashcards();
        if (newCards && newCards.length > 0) {
            setCards(newCards);
            setCurrentIndex(0);
            setKnownCount(0);
            setFinished(false);
            setIsFlipped(false);
            setWaitingForNext(false);
            setInfoToast({show: false, card: null});
        }
    } catch (error) {
        alert("Yeni sorular oluşturulurken bir hata oluştu. Lütfen tekrar dene.");
    } finally {
        setIsLoadingNew(false);
    }
  };

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center p-6">
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
          <Check className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Tebrikler!</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-md font-medium">
          Bu seriyi başarıyla tamamladın. Toplam <strong>{knownCount}</strong> kartı ilk seferde bildin.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
           <button 
            onClick={handleLoadAI}
            disabled={isLoadingNew}
            className="flex items-center justify-center px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-700 dark:to-indigo-700 text-white font-bold hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoadingNew ? (
                <>
                   <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                   Sorular Hazırlanıyor...
                </>
            ) : (
                <>
                   <Sparkles className="w-5 h-5 mr-2" />
                   Yeni Sorular Üret (AI)
                </>
            )}
          </button>
          
          <button 
            onClick={handleRestart}
            className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Mevcut Kartları Karıştır
          </button>
          
          <button 
            onClick={onBack}
            className="px-6 py-4 rounded-2xl text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Ana Menüye Dön
          </button>
        </div>
      </div>
    );
  }

  if (!currentCard) return null;

  const progress = Math.round(((currentIndex) / cards.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in flex flex-col items-center relative min-h-[85vh]">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-bold"
        >
          <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 mr-2">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Çıkış
        </button>
        <div className="flex items-center text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
           <Layers className="w-4 h-4 mr-2 text-indigo-500" />
           <span className="font-bold mr-1">{currentIndex + 1}</span> <span className="text-slate-400">/ {cards.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md h-2 bg-slate-200 dark:bg-slate-800 rounded-full mb-12 overflow-hidden">
        <div 
          className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 3D CARD CONTAINER */}
      <div 
        className="relative group w-full max-w-xl h-96 perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* INNER WRAPPER */}
        <div className={`
          relative w-full h-full duration-500 transition-transform 
          [transform-style:preserve-3d] 
          ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
        `}>
          
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
            <div className="w-full h-full bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl shadow-indigo-500/10 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
              <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                {currentCard.subject}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                {currentCard.question}
              </h3>
              <div className="mt-auto text-slate-400 dark:text-slate-500 text-sm font-medium flex items-center animate-pulse">
                <RotateCw className="w-4 h-4 mr-2" />
                Cevabı görmek için tıkla
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-800 dark:to-violet-900 rounded-[2rem] shadow-2xl shadow-indigo-500/20 flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-white/10">
                Cevap
              </span>
              <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                {currentCard.answer}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Controls */}
      <div className="mt-12 flex gap-4 w-full max-w-md justify-center">
        {!waitingForNext ? (
            <>
                <button
                onClick={(e) => { e.stopPropagation(); handleUnknown(); }}
                className="flex-1 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border-2 border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl transition-all hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200 hover:-translate-y-1 group shadow-lg shadow-rose-500/5"
                >
                <X className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold">Bilmiyorum</span>
                </button>

                <button
                onClick={(e) => { e.stopPropagation(); handleKnown(); }}
                className="flex-1 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border-2 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl transition-all hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 hover:-translate-y-1 group shadow-lg shadow-emerald-500/5"
                >
                <Check className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold">Biliyorum</span>
                </button>
            </>
        ) : (
            <button
            onClick={(e) => { e.stopPropagation(); handleContinue(); }}
            className="w-full flex items-center justify-center p-5 bg-slate-800 dark:bg-indigo-600 text-white rounded-2xl hover:bg-slate-700 dark:hover:bg-indigo-700 transition-all shadow-xl hover:-translate-y-1 font-bold text-lg"
            >
                <span>Sıradaki Karta Geç</span>
                <ArrowRight className="w-5 h-5 ml-2" />
            </button>
        )}
      </div>

      {/* INFO TOAST */}
      {infoToast.show && infoToast.card && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-5 flex items-start relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                <div className="p-2.5 bg-rose-50 dark:bg-rose-900/20 rounded-xl mr-4 text-rose-600 dark:text-rose-400 flex-shrink-0">
                    <Info className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1.5">
                        {infoToast.card.detailTitle || infoToast.card.question.substring(0, 30) + '...'}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-medium">
                        {infoToast.card.detailSummary || "Bu konu hakkında eksiklerin olabilir."}
                    </p>
                    <button 
                        onClick={openModal}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg transition-colors w-fit"
                    >
                        <BookOpen className="w-3.5 h-3.5 mr-2" />
                        Detaylı İncele
                    </button>
                </div>
                <button 
                    onClick={() => setInfoToast({show: false, card: null})}
                    className="ml-3 text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {showModal && infoToast.card && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
              <div 
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                onClick={closeModal}
              ></div>
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-[2rem] shadow-2xl relative flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
                  {/* Modal Header */}
                  <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
                      <div>
                          <span className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 block">
                            Bilgi Kartı
                          </span>
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                              {infoToast.card.detailTitle || "Konu Detayı"}
                          </h2>
                      </div>
                      <button 
                        onClick={closeModal}
                        className="p-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                      >
                          <X className="w-6 h-6" />
                      </button>
                  </div>

                  {/* Modal Content - Scrollable */}
                  <div className="p-6 md:p-8 overflow-y-auto prose prose-slate dark:prose-invert max-w-none">
                      {infoToast.card.detailContent ? (
                          <div dangerouslySetInnerHTML={{ __html: infoToast.card.detailContent }} />
                      ) : (
                          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                              <Info className="w-16 h-16 mx-auto mb-4 opacity-20" />
                              <p>Bu kart için henüz detaylı içerik eklenmemiştir.</p>
                          </div>
                      )}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
                      <button 
                        onClick={closeModal}
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                      >
                        Anladım, Karta Dön
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};