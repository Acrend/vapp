import React, { useState } from 'react';
import './App.css';
import TextBoxSearchSub from './components/text_box_search_sub/text_box_search_sub';
import FetchButton from './components/fetch_search_sub_button/fetch_search_sub_button';
import SubContainer from './components/sub_container/sub_container';
import SubContainerDev from './components/sub_container_dev/sub_container_dev';
import SubventionCardsContainer from './components/SubventionCardsContainer/SubventionCardsContainer';
import SubventionCard from './components/SubventionCard/SubventionCard';

function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
}

function App() {
  const [animal, setAnimal] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [idList, setIdList] = useState<string[]>([]);
  const [inputData, setInputData] = useState<string>('');
  const [subResults, setSubResults] = useState<Array<{ score: number; sub_score_ratio:number, title: string; sub_at_link: string; sub_deadline: string; sub_start: string }>>([]);
  const [showAnimalSection, setShowAnimalSection] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [highScoreCount, setHighScoreCount] = useState<number>(0);

  const fetchAnimal = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/animal/');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server responded with an error!');
      }
      setAnimal(data.animal);
      setIndex(prevIndex => prevIndex + 1);
    } catch (error) {
      handleError(error, 'Failed to fetch animal');
    }
  };

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/get-info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_project_initial_description: inputData })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send data');
      }
      setIdList(data.sub_id_list || []);
      setSubResults([]); // Effacez les résultats précédents avant de charger de nouveaux détails
      setHighScoreCount(0); // Réinitialiser le compteur des scores élevés
      fetchSubDetails(data.sub_id_list.slice(0, 4)); // Fetch details for the first 4 IDs
    } catch (error) {
      handleError(error, 'Error sending data');
    }
  };

  const fetchSubDetails = async (subIds: string[]) => {
    setIsLoading(true);
    setCheckedCount(0); // Réinitialiser le compteur de vérification

    try {
      for (const subId of subIds) {
        const response = await fetch('http://127.0.0.1:8000/api/sub-request/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_project_initial_description: inputData,
            sub_id: subId,
            seed_number: 3
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch sub details');
        }

        setSubResults(prevResults => {
          const newResults = [...prevResults, {
            score: data.subvention_score,
            sub_score_ratio: data.sub_score_ratio,
            title: data.sub_title,
            sub_at_link: data.sub_at_link,
            sub_deadline: data.sub_deadline,
            sub_start: data.sub_start
          }];

          // Compter les scores supérieurs à 10
          const newHighScores = newResults.filter(result => result.score > 10).length;
          setHighScoreCount(newHighScores);

          return newResults.sort((a, b) => b.score - a.score); // Trier par score
        });

        setCheckedCount(prevCount => prevCount + 1); // Mettre à jour le compteur de vérification
      }
    } catch (error) {
      handleError(error, 'Error fetching sub details');
    } finally {
      setIsLoading(false); // Réinitialiser l'état de chargement
    }
  };

  const handleError = (error: any, defaultMessage: string): void => {
    let errorMessage = defaultMessage;
    if (error instanceof Error) {
      errorMessage += ': ' + error.message;
    } else if (typeof error === 'string') {
      errorMessage += ': ' + error;
    } else {
      errorMessage += ': Unexpected error type';
    }
    console.error(errorMessage);
    alert(errorMessage);
  };

  return (
    <div className="app-container">
      <button onClick={() => setShowAnimalSection(!showAnimalSection)} className="button-container">
        {showAnimalSection ? 'Hide debugging Section' : 'Show debugging Section'}
      </button>

      <div className={`button-container ${showAnimalSection ? 'debug-section show' : 'debug-section'}`}>
        <p>This section is only here for debugging purposes and to check if the API calls are working properly</p>
        <FetchButton onClick={fetchAnimal} label="Get Next Animal" />
        <p>Animal: {animal}</p>
        <p>Request Count: {index}</p>
      </div>

      <TextBoxSearchSub onInputChange={setInputData} />
      <FetchButton onClick={fetchInfo} label="Rechercher des aides" />

      {isLoading && (
        <div className="loading-indicator">
          <LoadingSpinner />
          <p>Loading... {checkedCount}/{idList.length} checked</p>
        </div>
      )}

      <div className="results-container">
        {subResults.map((result, index) => (
          <SubContainer
            key={index}
            score={result.score}
            sub_score_ratio={result.sub_score_ratio}
            title={result.title}
            sub_at_link={result.sub_at_link}
            sub_deadline={result.sub_deadline}
            sub_start={result.sub_start}
          />
        ))}
      </div>

      <div className="results-container">
        <SubContainerDev
          score={0}
          sub_score_ratio={0.75} // Or any default ratio you'd like to test with
          title="Protéger et restaurer les milieux aquatiques ou humides et leurs milieux connectés"
          sub_at_link="https://aides-territoires.beta.gouv.fr/aides/37fb-proteger-et-restaurer-les-milieux-aquatiques-/"
          sub_deadline="2024-12-08"
          sub_start="2024-08-08"
        />
        <SubContainerDev
          score={0}
          sub_score_ratio={0.75} // Or any default ratio you'd like to test with
          title="Protéger et restaurer les milieux aquatiques ou humides et leurs milieux connectés"
          sub_at_link="https://aides-territoires.beta.gouv.fr/aides/37fb-proteger-et-restaurer-les-milieux-aquatiques-/"
          sub_deadline="2024-12-08"
          sub_start="2024-08-08"
        />
      </div>

      <SubventionCardsContainer>
        <SubventionCard
          title="Protéger et restaurer les milieux aquatiques ou humides et leurs milieux connectés"
          compatibility="70%"
          provider="Banque des territoires"
          amount="200 000 €"
          details="Mes détails"
        />
        <SubventionCard
          title="Protéger et restaurer"
          compatibility="70%"
          provider="Banque des territoires"
          amount="200 000 €"
          details="Mes détails"
        />
      </SubventionCardsContainer>

      {!isLoading && (
        <div className="summary">
          <p>{highScoreCount} aides ont un score supérieur à 10.</p>
        </div>
      )}
    </div>
  );
}

export default App;
