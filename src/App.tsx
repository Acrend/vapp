import React, { useState } from 'react';
import TextBoxSearchSub from './components/text_box_search_sub/text_box_search_sub';

function App() {
  const [animal, setAnimal] = useState('');
  const [index, setIndex] = useState(0);

  const fetchAnimal = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/animal/');
      const data = await response.json(); // Il est important de placer ceci avant de vérifier response.ok
      if (!response.ok) {
        // Crée une erreur avec le message du serveur s'il existe, sinon un message par défaut
        throw new Error(data.error || 'Server responded with an error!');
      }
      setAnimal(data.animal);
      setIndex(prevIndex => prevIndex + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Améliorer la gestion des erreurs pour différentes sources d'erreurs
      let errorMessage = 'Failed to fetch animal';
      if (error instanceof Error) {
        errorMessage += ': ' + error.message; // Pour les erreurs standard
      } else if (typeof error === 'string') {
        errorMessage += ': ' + error; // Pour les erreurs sous forme de chaîne de caractères
      } else {
        errorMessage += ': Unexpected error type'; // Pour les autres types d'erreurs
      }
      alert(errorMessage);
    }
  };

  return (
    <body>
      <div>
        <button onClick={fetchAnimal}>Get Next Animal</button>
        <p>Animal: {animal}</p>
        <p>Request Count: {index}</p> {/* Ajouté pour montrer combien de fois l'API a été appelée avec succès */}
      </div>
    </body>
  );
}

export default App;
