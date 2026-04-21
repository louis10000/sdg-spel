import React, { useState, useEffect } from 'react';
import { Shuffle, Play, Pause, CheckCircle2 } from 'lucide-react';
import Welcome from './components/Welcome';
import Admin from './components/Admin';
import { sdgs } from './data/sdgData';
import { questionsBySDG } from './data/questions';

const ROTARY_LOGO = 'https://cdn.worldvectorlogo.com/logos/rotary-international.svg';

const getSDGImagePath = (id) => `/sdg-logos/E-WEB-Goal-${String(id).padStart(2, '0')}.png`;

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; }
  .sdg-container { min-height: 100vh; height: 100vh; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); color: #ffffff; padding: 1.5rem; display: flex; flex-direction: column; overflow: hidden; }
  .sdg-wrapper { display: flex; flex-direction: column; height: 100%; max-width: 1400px; margin: 0 auto; width: 100%; }
  .sdg-header-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #334155; flex-shrink: 0; }
  .sdg-logo-section { display: flex; align-items: center; gap: 1rem; }
  .sdg-rotary-logo { width: 60px; height: 60px; object-fit: contain; border-radius: 4px; }
  .sdg-header-title { font-size: 1.5rem; font-weight: bold; color: #ffffff; }
  .sdg-header-subtitle { font-size: 0.875rem; color: #cbd5e1; }
  .sdg-round-badge { background-color: #06b6d4; color: #0f172a; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: bold; font-size: 0.875rem; }
  .sdg-content { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; overflow-y: auto; }
  .sdg-content-inner { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
  .sdg-header { text-align: center; margin-bottom: 2rem; }
  .sdg-emoji { font-size: 3rem; margin-bottom: 1rem; }
  .sdg-title { font-size: 2.5rem; font-weight: bold; background: linear-gradient(90deg, #06b6d4, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.5rem; }
  .sdg-subtitle { font-size: 1.125rem; color: #cbd5e1; }
  .sdg-card { background-color: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; padding: 2rem; max-width: 600px; margin: 0 auto; width: 100%; }
  .sdg-card-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; }
  .sdg-label { display: block; font-size: 1.125rem; margin-bottom: 1rem; }
  .sdg-label-value { color: #06b6d4; font-weight: bold; }
  .sdg-slider { width: 100%; height: 0.5rem; background-color: #334155; border-radius: 0.25rem; appearance: none; cursor: pointer; }
  .sdg-slider::-webkit-slider-thumb { appearance: none; width: 1.25rem; height: 1.25rem; border-radius: 50%; background-color: #06b6d4; cursor: pointer; }
  .sdg-slider::-moz-range-thumb { width: 1.25rem; height: 1.25rem; border-radius: 50%; background-color: #06b6d4; cursor: pointer; border: none; }
  .sdg-slider-labels { display: flex; justify-content: space-between; font-size: 0.875rem; color: #64748b; margin-top: 0.5rem; }
  .sdg-button { width: 100%; background: linear-gradient(90deg, #06b6d4, #10b981); color: white; font-weight: bold; padding: 1rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; font-size: 1.125rem; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
  .sdg-button:hover { filter: brightness(1.1); transform: translateY(-2px); }
  .sdg-button:disabled { background: #475569; color: #94a3b8; cursor: not-allowed; filter: none; }
  .sdg-welcome-content { background-color: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; padding: 2.5rem; max-width: 700px; margin: 0 auto; width: 100%; max-height: 70vh; overflow-y: auto; }
  .sdg-welcome-title { font-size: 1.75rem; font-weight: bold; margin-bottom: 1.5rem; background: linear-gradient(90deg, #06b6d4, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .sdg-welcome-text { font-size: 0.95rem; line-height: 1.8; color: #cbd5e1; margin-bottom: 1.25rem; }
  .sdg-input-field { width: 100%; padding: 0.75rem; margin-bottom: 0.75rem; background-color: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; color: #ffffff; font-size: 1rem; font-family: inherit; }
  .sdg-input-field:focus { outline: none; border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1); }
  .sdg-names-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
  .sdg-name-input-group { display: flex; flex-direction: column; }
  .sdg-name-label { font-size: 0.875rem; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600; }
  .sdg-player-selector { background-color: #1e293b; border: 2px solid #06b6d4; border-radius: 0.5rem; padding: 2rem; text-align: center; min-height: 150px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
  .sdg-player-display { font-size: 4rem; font-weight: bold; background: linear-gradient(90deg, #06b6d4, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; min-height: 60px; display: flex; align-items: center; justify-content: center; }
  .sdg-player-label { font-size: 1rem; color: #cbd5e1; margin-bottom: 1.5rem; }
  .sdg-select-button { background: linear-gradient(90deg, #f59e0b, #ef4444) !important; padding: 0.75rem 2rem; }
  .sdg-select-button:hover { filter: brightness(1.1) !important; }
  .sdg-footer { flex-shrink: 0; padding-top: 1rem; border-top: 1px solid #334155; display: flex; align-items: center; justify-content: center; gap: 1rem; }
  .sdg-footer-brand { color: #06b6d4; font-weight: 600; font-size: 0.875rem; }
  .sdg-card-selection { display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem; height: 100%; align-items: center; }
  .sdg-round-info { background-color: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; padding: 1.5rem; }
  .sdg-sdg-card { border-radius: 0.75rem; padding: 2rem; text-align: center; border: 2px solid; }
  .sdg-sdg-icon { width: 120px; height: 120px; object-fit: contain; margin: 0 auto 1rem; }
  .sdg-sdg-name { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
  .sdg-sdg-id { color: #94a3b8; font-size: 0.875rem; }
  .sdg-card-right { display: flex; flex-direction: column; gap: 1rem; max-height: 600px; overflow-y: auto; }
  .sdg-questions-group { display: flex; flex-direction: column; gap: 1rem; }
  .sdg-question-button { text-align: left; padding: 1.25rem; background-color: #1e293b; border: 2px solid #334155; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s ease; color: white; font-size: 0.95rem; min-height: 100px; display: flex; flex-direction: column; justify-content: center; }
  .sdg-question-button:hover { background-color: #334155; border-color: #06b6d4; transform: translateY(-2px); box-shadow: 0 0 15px rgba(6, 182, 212, 0.3); }
  .sdg-question-label { font-size: 0.875rem; font-weight: 600; color: #06b6d4; margin-bottom: 0.25rem; }
  .sdg-question-text { color: #cbd5e1; font-size: 0.95rem; }
  .sdg-skip-button { margin-top: auto; }
  .sdg-discussion-layout { display: flex; flex-direction: column; height: 100%; gap: 1.5rem; }
  .sdg-discussion-top { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; flex-shrink: 0; }
  .sdg-discussion-card { border-radius: 0.75rem; padding: 1.5rem; border: 2px solid; }
  .sdg-discussion-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .sdg-discussion-icon { width: 80px; height: 80px; object-fit: contain; }
  .sdg-discussion-info h2 { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.25rem; }
  .sdg-discussion-info p { color: #94a3b8; font-size: 0.875rem; }
  .sdg-question-box { background-color: rgba(0, 0, 0, 0.3); border-radius: 0.5rem; padding: 1rem; }
  .sdg-question-box-label { font-size: 0.875rem; font-weight: 600; color: #06b6d4; margin-bottom: 0.25rem; }
  .sdg-question-box-text { font-size: 0.95rem; color: white; }
  .sdg-timer-card { border-radius: 0.5rem; padding: 1.5rem; text-align: center; border: 2px solid; }
  .sdg-timer-card-player { background: linear-gradient(135deg, #7c2d12, #7f1d1d); border-color: #ea580c; }
  .sdg-timer-card-group { background: linear-gradient(135deg, #164e63, #134e4a); border-color: #06b6d4; }
  .sdg-timer-card-setup { background-color: #1e293b; border-color: #334155; }
  .sdg-timer-label { color: #cbd5e1; margin-bottom: 0.5rem; font-size: 0.875rem; }
  .sdg-timer-display { font-size: 3rem; font-weight: bold; margin-bottom: 1rem; font-family: 'Courier New', monospace; }
  .sdg-timer-button { background-color: #ffffff; color: #1e293b; font-weight: bold; padding: 0.5rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
  .sdg-timer-button:hover { filter: brightness(0.95); }
  .sdg-discussion-bottom { flex-grow: 1; display: flex; gap: 1.5rem; min-height: 0; }
  .sdg-participants { background-color: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
  .sdg-participants-title { font-size: 1rem; font-weight: bold; margin-bottom: 1rem; }
  .sdg-participants-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.75rem; overflow-y: auto; }
  .sdg-participant-item { padding: 0.75rem; border-radius: 0.5rem; text-align: center; font-weight: 600; font-size: 0.875rem; transition: all 0.3s ease; }
  .sdg-participant-done { background-color: #064e3b; color: #d1fae5; }
  .sdg-participant-current { background-color: #155e75; color: #cffafe; border: 2px solid #06b6d4; }
  .sdg-participant-waiting { background-color: #334155; color: #cbd5e1; }
  .sdg-carousel-container { position: relative; width: 100%; height: 180px; margin: -0.5rem 0; overflow: hidden; border-radius: 1rem; }
  .sdg-carousel { display: flex; animation: scroll-carousel 40s linear infinite; gap: 1rem; padding: 1rem; }
  @keyframes scroll-carousel { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
  .sdg-carousel-item { flex-shrink: 0; width: 100px; height: 100px; border-radius: 0.75rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; border: 2px solid; padding: 0.5rem; text-align: center; font-weight: 600; font-size: 0.65rem; line-height: 1.1; }
  .sdg-carousel-icon { width: 60px; height: 60px; object-fit: contain; }
  .sdg-carousel-number { color: #cbd5e1; font-size: 0.75rem; font-weight: bold; }
  .sdg-carousel-name { color: #ffffff; font-size: 0.6rem; line-height: 1.2; }
`;

export default function SDGGame() {
  const [gameState, setGameState] = useState('welcome');
  const [players, setPlayers] = useState(6);
  const [playerList, setPlayerList] = useState([]);
  const [playerNames, setPlayerNames] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [cardSkips, setCardSkips] = useState(0);
  const [playersCompleted, setPlayersCompleted] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [round, setRound] = useState(1);
  const [animatingPlayer, setAnimatingPlayer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [gameQuestions, setGameQuestions] = useState(questionsBySDG);

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const startGame = () => {
    const names = Array.from({ length: players }, (_, i) => `Speler ${i + 1}`);
    setPlayerList(names);
    const defaultNames = {};
    names.forEach((name, idx) => {
      defaultNames[idx] = name;
    });
    setPlayerNames(defaultNames);
    setGameState('enter-names');
  };

  const startWithNames = () => {
    const namesArray = Object.values(playerNames).map((name, idx) => 
      (name && name.trim()) ? name.trim() : `Speler ${idx + 1}`
    );
    setPlayerList(namesArray);
    setCurrentPlayerIndex(0);
    setPlayersCompleted([]);
    setCurrentCard(sdgs[Math.floor(Math.random() * sdgs.length)]);
    setGameState('player-select');
  };

  const animatePlayerSelection = () => {
    setIsAnimating(true);
    const availablePlayers = playerList.filter((p, idx) => !playersCompleted.includes(p));
    const randomIndex = Math.floor(Math.random() * availablePlayers.length);
    const randomFinalIndex = playerList.indexOf(availablePlayers[randomIndex]);
    let speed = 50;
    let currentIndex = 0;
    let displayIndex = 0;

    const animate = () => {
      setAnimatingPlayer(displayIndex);
      displayIndex = (displayIndex + 1) % playerList.length;
      currentIndex++;

      if (currentIndex < 15) {
        speed = 50 + currentIndex * 10;
      } else if (currentIndex < 25) {
        speed = 200 + (currentIndex - 15) * 30;
      } else {
        speed = 1000;
      }

      if (currentIndex < 25) {
        setTimeout(animate, speed);
      } else {
        setCurrentPlayerIndex(randomFinalIndex);
        setAnimatingPlayer(null);
        setTimeout(() => {
          setIsAnimating(false);
          setGameState('card-selection');
        }, 2000);
      }
    };

    animate();
  };

  const drawNewCard = () => {
    const randomCard = sdgs[Math.floor(Math.random() * sdgs.length)];
    setCurrentCard(randomCard);
    setCurrentQuestion(null);
    setCardSkips(0);
  };

  const skipCard = () => {
    if (cardSkips < 2) {
      setCardSkips(cardSkips + 1);
      drawNewCard();
    }
  };

  const selectQuestion = (question) => {
    setCurrentQuestion(question);
    setGameState('discussion');
    startPlayerTimer();
  };

  const startPlayerTimer = () => {
    setTimeLeft(180);
    setTimerMode('player');
    setTimerActive(true);
  };

  const resumeTimer = () => {
    setTimerActive(true);
  };

  const transitionToGroupDiscussion = () => {
    setTimeLeft(prev => prev + 360);
    setTimerMode('group');
    setTimerActive(true);
  };

  const finishTurn = () => {
    const newCompleted = [...playersCompleted, playerList[currentPlayerIndex]];
    setPlayersCompleted(newCompleted);
    setTimerActive(false);

    if (newCompleted.length === playerList.length) {
      setGameState('welcome');
      setRound(round + 1);
    } else {
      setCurrentCard(sdgs[Math.floor(Math.random() * sdgs.length)]);
      setGameState('player-select');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // WELCOME SCREEN
  if (gameState === 'welcome') {
    return (
      <>
        <Welcome 
          onStart={() => setGameState('setup')} 
          styles={styles} 
          sdgs={sdgs}
          onAdmin={() => setShowAdmin(true)}
          getSDGImagePath={getSDGImagePath}
        />
        {showAdmin && (
          <Admin 
            onClose={() => setShowAdmin(false)}
            questionsBySDG={gameQuestions}
            sdgs={sdgs}
            onSave={(newQuestions) => setGameQuestions(newQuestions)}
          />
        )}
      </>
    );
  }

  // SETUP SCREEN
  if (gameState === 'setup') {
    return (
      <div className="sdg-container">
        <style>{styles}</style>
        <div className="sdg-wrapper">
          <div className="sdg-header-bar">
            <div className="sdg-logo-section">
              <img src={ROTARY_LOGO} alt="Rotary Logo" className="sdg-rotary-logo" />
              <div>
                <div className="sdg-header-title">RC Leefklimaat</div>
                <div className="sdg-header-subtitle">Rotary Club</div>
              </div>
            </div>
            <div className="sdg-round-badge">Ronde {round}</div>
          </div>

          <div className="sdg-content">
            <div className="sdg-content-inner">
              <div className="sdg-header">
                <div className="sdg-emoji">👥</div>
                <h1 className="sdg-title">Hoeveel spelers?</h1>
                <p className="sdg-subtitle">Bepaal het aantal deelnemers</p>
              </div>

              <div className="sdg-card">
                <h2 className="sdg-card-title">Setup</h2>
                <div style={{ marginBottom: '2rem' }}>
                  <label className="sdg-label">Aantal deelnemers: <span className="sdg-label-value">{players}</span></label>
                  <input type="range" min="2" max="12" value={players} onChange={(e) => setPlayers(parseInt(e.target.value))} className="sdg-slider" />
                  <div className="sdg-slider-labels"><span>2</span><span>12</span></div>
                </div>
                <button onClick={startGame} className="sdg-button">
                  <Play size={24} /> Volgende
                </button>
              </div>
            </div>
          </div>

          <div className="sdg-footer">
            <span className="sdg-footer-brand">RC Leefklimaat</span>
          </div>
        </div>
      </div>
    );
  }

  // ENTER NAMES SCREEN
  if (gameState === 'enter-names') {
    return (
      <div className="sdg-container">
        <style>{styles}</style>
        <div className="sdg-wrapper">
          <div className="sdg-header-bar">
            <div className="sdg-logo-section">
              <img src={ROTARY_LOGO} alt="Rotary Logo" className="sdg-rotary-logo" />
              <div>
                <div className="sdg-header-title">RC Leefklimaat</div>
                <div className="sdg-header-subtitle">Rotary Club</div>
              </div>
            </div>
            <div className="sdg-round-badge">Ronde {round}</div>
          </div>

          <div className="sdg-content">
            <div className="sdg-content-inner">
              <div className="sdg-header">
                <div className="sdg-emoji">👥</div>
                <h1 className="sdg-title">Speler Namen</h1>
                <p className="sdg-subtitle">Voer de namen in</p>
              </div>

              <div className="sdg-card">
                <h2 className="sdg-card-title">Namen invoeren</h2>
                <div className="sdg-names-grid">
                  {playerList.map((_, idx) => (
                    <div key={idx} className="sdg-name-input-group">
                      <label className="sdg-name-label">Speler {idx + 1}</label>
<input type="text" className="sdg-input-field" value={playerNames[idx] || `Speler ${idx + 1}`} onChange={(e) => setPlayerNames({ ...playerNames, [idx]: e.target.value })} onFocus={(e) => { if (e.target.value === `Speler ${idx + 1}`) e.target.value = ''; }} placeholder={`Speler ${idx + 1}`} maxLength="20" />                    </div>
                  ))}
                </div>
                <button onClick={startWithNames} className="sdg-button">
                  <Play size={24} /> Start Spel
                </button>
              </div>
            </div>
          </div>

          <div className="sdg-footer">
            <span className="sdg-footer-brand">RC Leefklimaat</span>
          </div>
        </div>
      </div>
    );
  }

  // PLAYER SELECT SCREEN
  if (gameState === 'player-select') {
    return (
      <div className="sdg-container">
        <style>{styles}</style>
        <div className="sdg-wrapper">
          <div className="sdg-header-bar">
            <div className="sdg-logo-section">
              <img src={ROTARY_LOGO} alt="Rotary Logo" className="sdg-rotary-logo" />
              <div>
                <div className="sdg-header-title">RC Leefklimaat</div>
                <div className="sdg-header-subtitle">SDG Kennis Spel</div>
              </div>
            </div>
            <div className="sdg-round-badge">Ronde {round} - {playersCompleted.length}/{playerList.length}</div>
          </div>

          <div className="sdg-content">
            <div className="sdg-content-inner">
              <div className="sdg-player-selector">
                <div className="sdg-player-label">Volgende speler:</div>
                <div className="sdg-player-display">{animatingPlayer !== null ? playerList[animatingPlayer] : playerList[currentPlayerIndex]}</div>
                <button onClick={animatePlayerSelection} disabled={isAnimating} className="sdg-button sdg-select-button" style={{ opacity: isAnimating ? 0.6 : 1 }}>
                  {isAnimating ? '⏳ Selecteren...' : '🎲 Willekeurig selecteren'}
                </button>
                {isAnimating && <p style={{ marginTop: '1rem', color: '#cbd5e1', fontSize: '0.9rem' }}>Even geduld...</p>}
              </div>
            </div>
          </div>

          <div className="sdg-footer">
            <span className="sdg-footer-brand">RC Leefklimaat</span>
          </div>
        </div>
      </div>
    );
  }

  // CARD SELECTION SCREEN
  if (gameState === 'card-selection' && currentCard) {
    return (
      <div className="sdg-container">
        <style>{styles}</style>
        <div className="sdg-wrapper">
          <div className="sdg-header-bar">
            <div className="sdg-logo-section">
              <img src={ROTARY_LOGO} alt="Rotary Logo" className="sdg-rotary-logo" />
              <div>
                <div className="sdg-header-title">RC Leefklimaat</div>
                <div className="sdg-header-subtitle">SDG Kennis Spel</div>
              </div>
            </div>
            <div className="sdg-round-badge">Ronde {round} - {playersCompleted.length}/{playerList.length}</div>
          </div>

          <div className="sdg-content">
            <div className="sdg-content-inner">
              <div className="sdg-card-selection">
                <div className="sdg-card-left">
                  <div className="sdg-round-info">
                    <div style={{ marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Beurt</h3>
                      <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem' }}>{playerList[currentPlayerIndex]}</p>
                    </div>
                  </div>

                  <div className="sdg-sdg-card" style={{ backgroundColor: currentCard.color + '20', borderColor: currentCard.color }}>
                    <img src={getSDGImagePath(currentCard.id)} alt={currentCard.name} className="sdg-sdg-icon" />
                    <h2 className="sdg-sdg-name">{currentCard.name}</h2>
                    <p className="sdg-sdg-id">Doel #{currentCard.id}</p>
                  </div>
                </div>

                <div className="sdg-card-right">
                  <div className="sdg-questions-group">
                    {gameQuestions[currentCard.id].map((q, idx) => (
                      <button key={idx} onClick={() => selectQuestion(q)} className="sdg-question-button">
                        <p className="sdg-question-label">Vraag {idx + 1}</p>
                        <p className="sdg-question-text">{q}</p>
                      </button>
                    ))}
                  </div>

                  <button onClick={skipCard} disabled={cardSkips >= 2} className="sdg-button sdg-skip-button" style={{ background: cardSkips >= 2 ? '#475569' : 'linear-gradient(90deg, #06b6d4, #10b981)', cursor: cardSkips >= 2 ? 'not-allowed' : 'pointer', opacity: cardSkips >= 2 ? 0.5 : 1 }}>
                    <Shuffle size={20} /> Andere kaart ({2 - cardSkips})
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="sdg-footer">
            <span className="sdg-footer-brand">RC Leefklimaat</span>
          </div>
        </div>
      </div>
    );
  }

  // DISCUSSION SCREEN
  if (gameState === 'discussion' && currentCard) {
    return (
      <div className="sdg-container">
        <style>{styles}</style>
        <div className="sdg-wrapper">
          <div className="sdg-header-bar">
            <div className="sdg-logo-section">
              <img src={ROTARY_LOGO} alt="Rotary Logo" className="sdg-rotary-logo" />
              <div>
                <div className="sdg-header-title">RC Leefklimaat</div>
                <div className="sdg-header-subtitle">SDG Kennis Spel</div>
              </div>
            </div>
            <div className="sdg-round-badge">Ronde {round} - {playersCompleted.length}/{playerList.length}</div>
          </div>

          <div className="sdg-content">
            <div className="sdg-discussion-layout">
              <div className="sdg-discussion-top">
                <div className="sdg-discussion-card" style={{ backgroundColor: currentCard.color + '20', borderColor: currentCard.color }}>
                  <div className="sdg-discussion-header">
                    <img src={getSDGImagePath(currentCard.id)} alt={currentCard.name} className="sdg-discussion-icon" />
                    <div className="sdg-discussion-info">
                      <h2>{currentCard.name}</h2>
                      <p>Doel #{currentCard.id}</p>
                    </div>
                  </div>
                  <div className="sdg-question-box">
                    <p className="sdg-question-box-label">Gekozen vraag:</p>
                    <p className="sdg-question-box-text">{currentQuestion}</p>
                  </div>
                </div>

                <div className="sdg-timer-section">
                  {!timerActive && timerMode === null && (
                    <div className="sdg-timer-card sdg-timer-card-setup">
                      <p className="sdg-timer-label">{playerList[currentPlayerIndex]} gaat spreken</p>
                      <button onClick={startPlayerTimer} className="sdg-button" style={{ marginTop: '1rem' }}>
                        <Play size={20} /> Start (3 min)
                      </button>
                    </div>
                  )}

                  {timerMode === 'player' && (
                    <div className="sdg-timer-card sdg-timer-card-player">
                      <p className="sdg-timer-label">Spreker</p>
                      <div className="sdg-timer-display">{formatTime(timeLeft)}</div>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {timerActive && (
                          <button onClick={() => setTimerActive(false)} className="sdg-timer-button">
                            <Pause size={18} /> Pauze
                          </button>
                        )}
                        {!timerActive && (
                          <button onClick={resumeTimer} className="sdg-button" style={{ marginTop: '0.5rem', flex: '1', minWidth: '120px' }}>
                            <Play size={18} /> Hervatten
                          </button>
                        )}
                        <button onClick={transitionToGroupDiscussion} className="sdg-button" style={{ marginTop: '0.5rem', flex: '1', minWidth: '120px', background: '#10b981' }}>
                          <CheckCircle2 size={18} /> Doorgaan (6 min)
                        </button>
                        <button onClick={finishTurn} className="sdg-button" style={{ marginTop: '0.5rem', flex: '1', minWidth: '120px', background: '#e74c3c' }}>
                          <CheckCircle2 size={18} /> Klaar!
                        </button>
                      </div>
                    </div>
                  )}

                  {timerMode === 'group' && (
                    <div className="sdg-timer-card sdg-timer-card-group">
                      <p className="sdg-timer-label">Groepsdiscussie</p>
                      <div className="sdg-timer-display">{formatTime(timeLeft)}</div>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {timerActive && (
                          <button onClick={() => setTimerActive(false)} className="sdg-timer-button">
                            <Pause size={18} /> Pauze
                          </button>
                        )}
                        {!timerActive && (
                          <button onClick={resumeTimer} className="sdg-button" style={{ marginTop: '0.5rem', flex: '1', minWidth: '120px' }}>
                            <Play size={18} /> Hervatten
                          </button>
                        )}
                        <button onClick={finishTurn} className="sdg-button" style={{ marginTop: '0.5rem', flex: '1', minWidth: '120px', background: '#10b981' }}>
                          <CheckCircle2 size={18} /> Volgende
                        </button>
                        <button onClick={finishTurn} className="sdg-button" style={{ marginTop: '0.5rem', flex: '1', minWidth: '120px', background: '#e74c3c' }}>
                          <CheckCircle2 size={18} /> Klaar!
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="sdg-discussion-bottom">
                <div className="sdg-participants">
                  <h3 className="sdg-participants-title">Deelnemers ({playerList.length})</h3>
                  <div className="sdg-participants-grid">
                    {playerList.map((p, idx) => (
                      <div key={idx} className={`sdg-participant-item ${playersCompleted.includes(p) ? 'sdg-participant-done' : idx === currentPlayerIndex ? 'sdg-participant-current' : 'sdg-participant-waiting'}`}>
                        {playersCompleted.includes(p) && '✓ '}{p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sdg-footer">
            <span className="sdg-footer-brand">RC Leefklimaat</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
