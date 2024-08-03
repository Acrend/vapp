import React, { useState } from 'react';

function TextBoxSearchSub() {
    const [inputData, setInputData] = useState('');

    // Typage de l'événement ici
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Empêche le rechargement de la page
        try {
            const response = await fetch('http://localhost:8000/api/your-endpoint/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: inputData })
            });
            if (!response.ok) {
                throw new Error('Failed to send data');
            }
            const data = await response.json();
            alert('Data sent successfully: ' + data.message);
        } catch (error: any) { // Spécifiez également ici le type de 'error' si nécessaire
            console.error('Error:', error);
            alert('Error sending data: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputData}
                onChange={e => setInputData(e.target.value)}
                placeholder="Enter some data..."
            />
            <button type="submit">Send Data</button>
        </form>
    );
}

export default TextBoxSearchSub;