import React from 'react';
import TeachingOfTheDay from './components/TeachingOfDay';
import { teachings } from './data/teachings';

const App: React.FC = () => {
  return (
    <div className='app'>
      <TeachingOfTheDay teachings={teachings} />
    </div>
  );
};

export default App