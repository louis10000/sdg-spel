	import React from 'react';
import { Play } from 'lucide-react';

const Welcome = ({ onStart, styles, sdgs, onAdmin }) => {
  return (
    <div className="sdg-container">
      <style>{styles}</style>
      <div className="sdg-wrapper">
        <div className="sdg-header-bar">
          <div className="sdg-logo-section">
            <img src="https://cdn.worldvectorlogo.com/logos/rotary-international.svg" alt="Rotary Logo" className="sdg-rotary-logo" />
            <div>
              <div className="sdg-header-title">RC Leefklimaat</div>
              <div className="sdg-header-subtitle">Rotary Club</div>
            </div>
          </div>
        </div>

        <div className="sdg-content">
          <div className="sdg-content-inner">
            <div className="sdg-welcome-content">
              <h1 className="sdg-welcome-title">SDG Kennis Spel</h1>
              
              <p className="sdg-welcome-text">
                Dit spel heeft als doel om aan de hand van de Sustainable Development Goals (Duurzame Ontwikkelingsdoelstellingen) van de Verenigde Naties, een gesprek met elkaar aan te gaan over duurzaamheid, bewustwording daarvan en een startpunt te bieden om in de eigen omgeving duurzaamheidsactiviteiten van de grond te krijgen.
              </p>

              <p className="sdg-welcome-text">
                Dit spel gaat niet om punten te scoren, niet in letterlijke zin en ook niet door elkaar af te troeven. Het gaat erom dat je van elkaar begrijpt hoe je over deze doelstellingen denkt en eventueel na afloop van het spel verder met elkaar in discussie en hopelijk tot samenwerking te komen.
              </p>

              <div className="sdg-carousel-container">
                <div className="sdg-carousel">
                  {sdgs.concat(sdgs).map((sdg, idx) => (
                    <div key={idx} className="sdg-carousel-item" style={{ backgroundColor: sdg.color + '30', borderColor: sdg.color }}>
                      <img src={`/sdg-logos/E-WEB-Goal-${String(sdg.id).padStart(2, '0')}.png`} alt={sdg.name} className="sdg-carousel-icon" />
                      <div className="sdg-carousel-number">#{sdg.id}</div>
                      <div className="sdg-carousel-name">{sdg.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button onClick={onStart} className="sdg-button" style={{ flex: 1 }}>
                  <Play size={24} /> Start Spel
                </button>
                <button onClick={onAdmin} className="sdg-button" style={{ flex: 1, background: '#475569' }}>
                  ⚙️ Beheer
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
};

export default Welcome;
