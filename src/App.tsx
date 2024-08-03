import React, { useState } from 'react';
import TextBoxSearchSub from './components/text_box_search_sub/text_box_search_sub';

function App() {
  const [animal, setAnimal] = useState('');
  const [index, setIndex] = useState(0);
  const [idList, setIdList] = useState<string[]>([]);

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

  const fetchInfo = async (inputData: string) => {
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
      setIdList(data.sub_id_list || []);  // Modification ici pour utiliser "sub_id_list"
    } catch (error) {
      handleError(error, 'Error sending data');
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
    <div>
      <TextBoxSearchSub onSearchSubmit={fetchInfo} onInfoSubmit={fetchInfo} />
      <button onClick={fetchAnimal}>Get Next Animal</button>
      <p>Animal: {animal}</p>
      <p>Request Count: {index}</p>
      <p>ID List: {JSON.stringify(idList)}</p>
    </div>
  );
}

export default App;