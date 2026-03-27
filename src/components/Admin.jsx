import React, { useState } from 'react';
import { Lock, Save, X } from 'lucide-react';

const Admin = ({ onClose, questionsBySDG, sdgs, onSave }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [questions, setQuestions] = useState(questionsBySDG);
  const [editingSdg, setEditingSdg] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const ADMIN_PASSWORD = 'admin123'; // Verander dit!

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Fout wachtwoord!');
      setPassword('');
    }
  };

  const updateQuestion = (sdgId, questionIndex, newText) => {
    setQuestions({
      ...questions,
      [sdgId]: questions[sdgId].map((q, idx) => idx === questionIndex ? newText : q)
    });
  };

  const saveChanges = () => {
    onSave(questions);
    alert('Vragen opgeslagen!');
    onClose();
  };

  if (!isAuthenticated) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '0.5rem', color: 'white', textAlign: 'center', border: '2px solid #06b6d4' }}>
          <Lock size={48} style={{ margin: '0 auto 1rem', color: '#06b6d4' }} />
          <h2 style={{ marginBottom: '1rem' }}>Beheer Panel</h2>
          <input 
            type="password" 
            placeholder="Voer wachtwoord in" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: 'none' }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleLogin} style={{ flex: 1, padding: '0.75rem', background: '#06b6d4', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Login
            </button>
            <button onClick={onClose} style={{ flex: 1, padding: '0.75rem', background: '#475569', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Annuleer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflow: 'auto', padding: '2rem' }}>
      <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '0.5rem', color: 'white', maxWidth: '800px', width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Beheer Vragen</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>
            <X size={24} />
          </button>
        </div>

        {sdgs.map(sdg => (
          <div key={sdg.id} style={{ marginBottom: '2rem', padding: '1rem', background: '#0f172a', borderRadius: '0.5rem', borderLeft: `4px solid ${sdg.color}` }}>
            <h3 style={{ marginBottom: '1rem', color: sdg.color }}>{sdg.icon} {sdg.name}</h3>
            
            {questions[sdg.id]?.map((q, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.875rem', color: '#cbd5e1', display: 'block', marginBottom: '0.25rem' }}>
                  Vraag {idx + 1}
                </label>
                <textarea
                  value={q}
                  onChange={(e) => updateQuestion(sdg.id, idx, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '0.25rem',
                    color: 'white',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    minHeight: '60px',
                    resize: 'vertical'
                  }}
                />
              </div>
            ))}
          </div>
        ))}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={saveChanges} style={{ flex: 1, padding: '0.75rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Save size={20} /> Opslaan
          </button>
          <button onClick={onClose} style={{ flex: 1, padding: '0.75rem', background: '#475569', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
            Annuleer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
