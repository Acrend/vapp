import React, { useState } from 'react';
import './App.css';
import SubventionCardsContainer from './components/SubventionCardsContainer/SubventionCardsContainer';
import SubventionCard from './components/SubventionCard/SubventionCard';
import SearchEngineForms from './components/SearchEngineForms/SearchEngineForms';
import FetchButton from './components/fetch_search_sub_button/fetch_search_sub_button';

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
  const [subResults, setSubResults] = useState<Array<{ score: number; sub_score_ratio: number; title: string; sub_at_link: string; sub_deadline: string; sub_start: string }>>([]);
  const [showAnimalSection, setShowAnimalSection] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [highScoreCount, setHighScoreCount] = useState<number>(0);

  // Fonction de gestion des erreurs
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

  const fetchAnimal = async () => {
    try {
      const response = await fetch('/api/animal/');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server responded with an error!');
      }
      setAnimal(data.animal);
      setIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      handleError(error, 'Failed to fetch animal');
    }
  };

  const fetchInfo = async (input: string) => {
    try {
      setInputData(input);
      const response = await fetch('/api/get-info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_project_initial_description: input }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send data');
      }
      setIdList(data.sub_id_list || []);
      setSubResults([]);
      setHighScoreCount(0);
      fetchSubDetails(data.sub_id_list.slice(0, 20));
    } catch (error) {
      handleError(error, 'Error sending data');
    }
  };

  const fetchSubDetails = async (subIds: string[]) => {
    setIsLoading(true);
    setCheckedCount(0);

    try {
      for (const subId of subIds) {
        const response = await fetch('/api/sub-request/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_project_initial_description: inputData,
            sub_id: subId,
            seed_number: 3,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch sub details');
        }

        setSubResults((prevResults) => {
          const newResults = [
            ...prevResults,
            {
              score: data.subvention_score,
              sub_score_ratio: data.sub_score_ratio,
              title: data.sub_title,
              sub_at_link: data.sub_at_link,
              sub_deadline: data.sub_deadline,
              sub_start: data.sub_start,
            },
          ];

          const newHighScores = newResults.filter((result) => result.score > 10).length;
          setHighScoreCount(newHighScores);

          return newResults.sort((a, b) => b.score - a.score);
        });

        setCheckedCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      handleError(error, 'Error fetching sub details');
    } finally {
      setIsLoading(false);
    }
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

      {/* Remplacez TextBoxSearchSub et FetchButton par SearchEngineForms */}
      <SearchEngineForms onSearch={fetchInfo} />

      {isLoading && (
        <div className="loading-indicator">
          <LoadingSpinner />
          <p>Identification des aides applicables... {checkedCount} sur {idList.length} aides testées avec votre projet</p>
        </div>
      )}
      {!isLoading && (
        <div className="summary">
          <p>{highScoreCount} aide.s sont potentiellement compatibile avec votre projet</p>
        </div>
      )}

      <SubventionCardsContainer>
        {subResults.map((result, index) => (
          <SubventionCard
            key={index}
            title={result.title}
            compatibility={result.sub_score_ratio}
            provider="Banque des territoires"
            amount="200 000 €"
            details="Mes détails"
            sub_at_link={result.sub_at_link}
            sub_deadline={result.sub_deadline}
            sub_start={result.sub_start}
          />
        ))}
      </SubventionCardsContainer>
    </div>
  );
}

export default App;