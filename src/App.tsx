import React, { useState } from 'react';
import './App.css'; // Importez le fichier CSS global
import TextBoxSearchSub from './components/text_box_search_sub/text_box_search_sub';
import FetchButton from './components/fetch_search_sub_button/fetch_search_sub_button';
import SubContainer from './components/sub_container/sub_container';

function App() {
  const [animal, setAnimal] = useState('');
  const [index, setIndex] = useState(0);
  const [idList, setIdList] = useState<string[]>([]);
  const [inputData, setInputData] = useState('');
  const [subResults, setSubResults] = useState<{ score: number; title: string }[]>([]);
  const [showAnimalSection, setShowAnimalSection] = useState(false);

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
      fetchSubDetails(data.sub_id_list.slice(0, 5)); // Fetch details for the first 10 IDs
    } catch (error) {
      handleError(error, 'Error sending data');
    }
  };

  const fetchSubDetails = async (subIds: string[]) => {
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
            seed_number: 2
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch sub details');
        }
        setSubResults(prevResults => [...prevResults, { score: data.subvention_score, title: data.sub_title }]);
      }
    } catch (error) {
      handleError(error, 'Error fetching sub details');
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

      {showAnimalSection && (
        <div className="button-container">
          <p>This section is only here for debugging purpose, and check if the call API are working properly</p>
          <FetchButton onClick={fetchAnimal} label="Get Next Animal" />
          <p>Animal: {animal}</p>
          <p>Request Count: {index}</p>
        </div>
      )}

      <TextBoxSearchSub onInputChange={setInputData} />
      <FetchButton onClick={fetchInfo} label="Fetch Info" />
      <div className="results-container">
        {subResults.map((result, index) => (
          <SubContainer key={index} score={result.score} title={result.title} />
        ))}
      </div>
    </div>
  );
}

export default App;
