import { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, Brain, Flame, Map, ShieldCheck, 
  Play, Lightbulb, Heart, TrendingUp, Award, Music
} from 'lucide-react';
import './App.css';

const stories = [
  {
    id: 1,
    type: 'kinetic',
    text: "2025",
    subtext: "SEU WRAPPED",
    bg: "#eab308", 
    color: "#000",
    accent: "#ec4899"
  },
  {
    id: 2,
    type: 'quarter',
    label: "JAN — MAR",
    title: "METANOIA",
    theme: "Renovação da Mente",
    icon: <Brain size={64} />,
    bg: "#000000", 
    color: "#22c55e",
    accent: "#22c55e",
    pattern: "pattern-dots"
  },
  {
    id: 2.5,
    type: 'data-burst',
    pre: "TEXTO CHAVE",
    main: "ROMANOS 12:2",
    sub: "Não vos conformeis.",
    bg: "#22c55e", 
    color: "#000000",
    accent: "#eab308"
  },
  {
    id: 3,
    type: 'quarter',
    label: "ABR — JUN",
    title: "ADORAÇÃO",
    theme: "De volta ao Altar",
    icon: <Flame size={64} />,
    bg: "#4c1d95", 
    color: "#f472b6",
    accent: "#f472b6",
    pattern: "pattern-rays"
  },
  {
    id: 3.5,
    type: 'data-burst',
    pre: "O FOCO FOI",
    main: "REVERÊNCIA",
    sub: "Estilo de vida, não evento.",
    bg: "#f472b6", 
    color: "#000000",
    accent: "#4c1d95"
  },
  {
    id: 4,
    type: 'quarter',
    label: "JUL — SET",
    title: "O ÊXODO",
    theme: "Deus em Ação",
    icon: <Map size={64} />,
    bg: "#ea580c", 
    color: "#ffffff",
    accent: "#ea580c",
    pattern: "pattern-waves"
  },
  {
    id: 4.5,
    type: 'data-burst',
    pre: "UMA JORNADA DE",
    main: "40 ANOS",
    sub: "Resumidos em 13 semanas.",
    bg: "#ffffff", 
    color: "#ea580c", 
    accent: "#000000"
  },
  {
    id: 5,
    type: 'quarter',
    label: "OUT — DEZ",
    title: "JOSUÉ",
    theme: "Fé e Liderança",
    icon: <ShieldCheck size={64} />,
    bg: "#2563eb", 
    color: "#ffffff",
    accent: "#2563eb",
    pattern: "pattern-grid"
  },
  {
    id: 5.5,
    type: 'data-burst',
    pre: "A ORDEM FINAL",
    main: "CORAGEM",
    sub: "Sê forte e corajoso.",
    bg: "#93c5fd", 
    color: "#1e3a8a",
    accent: "#2563eb"
  },
  {
    id: 7,
    type: 'summary',
    bg: "#eab308", 
    color: "#000",
    accent: "#ec4899",
    brand: "Jovens Adventistas Cidade da Esperança",
    stats: {
        minutes: "365 DIAS",
        top_genre: "Escola Sabatina"
    },
    top_themes: [
        "1. Metanoia (A Mente)",
        "2. Adoração no Altar",
        "3. O Êxodo",
        "4. Liderança de Josué"
    ],
    top_stats: [
        "52 Sábados",
        "52 Lições",
        "4 Livros Bíblicos",
        "1 Ano de Fé"
    ]
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);
  
  const story = stories[currentIndex];
  const isSummary = story.type === 'summary';

  const getDuration = (type) => {
    if (type === 'kinetic') return 5000;
    if (type === 'data-burst') return 7000;
    return 8000;
  };

  const startRecap = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(e => console.log("Erro ao tocar áudio:", e));
    }
  };

  const nextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const shadowColor = story.color === '#000000' || story.color === '#000' ? '#000' : 'rgba(0,0,0,0.5)';

  if (!hasStarted) {
    return (
      <div className="start-screen">
        <div className="deco-blobs">
           <div className="blob top-right" style={{ background: '#ec4899' }}></div>
           <div className="blob bottom-left" style={{ background: '#22c55e' }}></div>
        </div>
        <h1>Recap 2025</h1>
        <p>Escola Sabatina</p>
        <button className="start-btn" onClick={startRecap}>
          Vamos nessa
        </button>
      </div>
    );
  }

  return (
    <div 
      className="app-container" 
      style={{ backgroundColor: story.bg, color: story.color }}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <audio ref={audioRef} loop src="https://www.youtube.com/watch?v=DBKayNhi1BE&list=RDDBKayNhi1BE&start_radio=1" />

      {story.pattern && (
        <div className={`bg-pattern-container ${story.pattern}`}></div>
      )}

      <div className="deco-blobs">
         <div className="blob top-right" style={{ background: story.accent }}></div>
         <div className="blob bottom-left" style={{ background: story.accent === '#ec4899' || story.accent === '#f472b6' ? '#22c55e' : '#ec4899' }}></div>
      </div>

      <div className="brand-header">Recap 2025</div>

      {!isSummary && (
        <div className="progress-container">
          {stories.map((s, idx) => {
            if (s.type === 'summary') return null;
            return (
              <div key={s.id} className="progress-bg">
                <div 
                  className={`progress-fill ${idx === currentIndex ? 'active' : ''} ${idx < currentIndex ? 'filled' : ''}`}
                  style={{ 
                    animationDuration: `${getDuration(s.type)}ms`, 
                    backgroundColor: story.color,
                    animationPlayState: isPaused && idx === currentIndex ? 'paused' : 'running'
                  }}
                  onAnimationEnd={nextStory}
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {!isSummary && (
        <>
          <div className="touch left" onClick={(e) => { e.stopPropagation(); prevStory(); }}></div>
          <div className="touch right" onClick={(e) => { e.stopPropagation(); nextStory(); }}></div>
        </>
      )}

      <div className="content-unified" key={story.id}>
        {story.type === 'kinetic' && (
           <div className="slide-layout-center intro-anim">
              <div className="hero-box-pop" style={{ boxShadow: `10px 10px 0px ${shadowColor}`, color: '#000' }}>
                  <h1 style={{ margin: 0, fontSize: '5rem', lineHeight: 1 }}>{story.text}</h1>
              </div>
              <h2 className="typography-subtitle" style={{ marginTop: '30px' }}>{story.subtext}</h2>
           </div>
        )}

        {story.type === 'quarter' && (
           <div className="slide-layout-split quarter-anim">
              <div className="top-section">
                 <h3 className="typography-label">{story.label}</h3>
                 <div className="hero-box-pop small icon-pop" style={{ boxShadow: `8px 8px 0px ${shadowColor}`, color: story.accent }}>
                    {story.icon}
                 </div>
              </div>
              <div className="bottom-section">
                 <h1 className="typography-huge-title">{story.title}</h1>
                 <h2 className="typography-theme">{story.theme}</h2>
              </div>
           </div>
        )}

        {story.type === 'data-burst' && (
           <div className="slide-layout-center burst-anim">
              <h3 className="typography-label" style={{ opacity: 0.8 }}>{story.pre}</h3>
              <h1 className="typography-massive-stat">{story.main}</h1>
              <h2 className="typography-theme">{story.sub}</h2>
           </div>
        )}

        {story.type === 'summary' && (
           <div className="summary-layout">
              <div className="summary-hero">
                  <div className="hero-box-pop" style={{ boxShadow: `10px 10px 0px #000`, color: '#000' }}>
                     <BookOpen size={64} />
                  </div>
              </div>
              <div className="summary-grid">
                 <div className="col-left">
                    <h3>Top Temas</h3>
                    <ul>
                       {story.top_themes.map((t, i) => (
                          <li key={i} className={i === 0 ? 'bold-item' : ''}>{t}</li>
                       ))}
                    </ul>
                 </div>
                 <div className="col-right">
                    <h3>Estatísticas</h3>
                    <ul>
                       {story.top_stats.map((s, i) => (
                          <li key={i} className={i === 0 ? 'bold-item' : ''}>{s}</li>
                       ))}
                    </ul>
                 </div>
              </div>
              <div className="summary-footer">
                 <div className="big-stat">
                    <span>Tempo de Conexão</span>
                    <h1>{story.stats.minutes}</h1>
                 </div>
                 <div className="genre-stat">
                    <span>Top encontros</span>
                    <h2>{story.stats.top_genre}</h2>
                 </div>
              </div>
              <div className="summary-brand-strip">
                 <Play fill="currentColor" size={16}/> {story.brand}
              </div>
              <button className="restart-btn" onClick={(e) => {e.stopPropagation(); setCurrentIndex(0);}} style={{color: story.color, borderColor: story.color}}>Ver Novamente</button>
           </div>
        )}
      </div>
    </div>
  );
}

export default App;
