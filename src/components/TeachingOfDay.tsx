import React, { useEffect, useState } from 'react'
import { Teaching } from '../data/teachings'

type Props = {
    teachings: Teaching[];
  };

  const TeachingOfDay: React.FC<Props> = ({ teachings }) => {
    const [todaysTeaching, setTodaysTeaching] = useState<Teaching | null>(null);
  
    // Função para gerar índice aleatório
    const getRandomIndex = (max: number): number => {
      return Math.floor(Math.random() * max)
    };

    //Função para selecionar um novo ensinamento aleatorio
    const selectRandomTeaching = () => {
      if (teachings.length > 0) {
        const randomIndex = getRandomIndex(teachings.length);
        setTodaysTeaching(teachings[randomIndex]);
      }
    };

    // Seleciona um ensinamento aleatorio inicial quando o componente carrega
    useEffect(() => {
      selectRandomTeaching();
    }, [teachings]);

    if (!todaysTeaching) return <div>Carregando...</div>

    return (
      <div className='teaching-container'>
          <h3 className="teaching-title">"{todaysTeaching.title}"</h3>
          <cite>- {todaysTeaching.author}</cite>
          {/* coloque uma linha cinza separando os conteudos aqui */}
          <hr style={{ border: '1px solid #ccc', margin: '1rem 0' }} />
          <blockquote>
              {todaysTeaching.content}
          </blockquote>
          <button 
              onClick={selectRandomTeaching}
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
  )
}


export default TeachingOfDay