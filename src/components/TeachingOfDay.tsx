import React, { useEffect, useState } from 'react'
import { BiblicalTeaching } from '../data/biblicalTeachings';
import { getRandomTeaching } from '../services/geminiService';

// Componente de erro
const ErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => (
  <div className="error-container" style={{ padding: '1rem', textAlign: 'center' }}>
    <h3>Ops! Algo deu errado</h3>
    <p>Não se preocupe, você ainda pode ver outros ensinamentos.</p>
    <button 
      onClick={resetError}
      style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#000000',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Tentar Novamente
    </button>
  </div>
);

const TeachingOfDay: React.FC = () => {
  const [todaysTeaching, setTodaysTeaching] = useState<BiblicalTeaching | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNewTeaching = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const teaching = await getRandomTeaching();
      setTodaysTeaching(teaching);
    } catch (err) {
      console.error('Error fetching teaching:', err);
      setError(err instanceof Error ? err : new Error('Erro ao carregar ensinamento'));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial teaching when component mounts
  useEffect(() => {
    fetchNewTeaching();
  }, []);

  const resetError = () => {
    setError(null);
    fetchNewTeaching();
  };

  if (error) {
    return <ErrorFallback error={error} resetError={resetError} />;
  }

  if (isLoading) {
    return (
      <div className="loading-container" style={{ padding: '1rem', textAlign: 'center' }}>
        <p>Carregando ensinamento...</p>
      </div>
    );
  }

  if (!todaysTeaching) {
    return (
      <div className="no-teaching-container" style={{ padding: '1rem', textAlign: 'center' }}>
        <p>Nenhum ensinamento disponível no momento.</p>
        <button 
          onClick={fetchNewTeaching}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#000000',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className='teaching-container' style={{ padding: '1rem' }}>
      <h3 className="teaching-title">"{todaysTeaching.title}"</h3>
      <cite>- {todaysTeaching.author}</cite>
      {/* coloque uma linha cinza separando os conteudos aqui */}
      <hr style={{ border: '1px solid #ccc', margin: '1rem 0' }} />
      <blockquote>
        {todaysTeaching.content}
      </blockquote>
      <cite>{todaysTeaching.bibleReference}</cite>
      <button 
        onClick={fetchNewTeaching}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#000000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Mostrar Outro Ensinamento
      </button>
    </div>
  );
};

export default TeachingOfDay;