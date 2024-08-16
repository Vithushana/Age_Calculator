import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import '../components/AgeCalculator.css';

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [history, setHistory] = useState([]);

  const handleInputChange = (e) => {
    setBirthdate(e.target.value);
  };

  const calculateAge = () => {
    if (birthdate) {
      const birthDate = new Date(birthdate);
      const today = new Date();
      const diff = today - birthDate;
      const ageDate = new Date(diff);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

      setAge(calculatedAge);

      // Add the new calculation to the history
      const newEntry = { birthdate, age: calculatedAge };
      setHistory([...history, newEntry]);

      // Trigger the celebration effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="age-calculator">
      <h2>Age Calculator</h2>
      <form>
        <label htmlFor="birthdate">Enter your birthdate:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={birthdate}
          onChange={handleInputChange}
        />
        <button type="button" onClick={calculateAge}>
          Calculate Age
        </button>
      </form>
      {age && <p>Your age is {age} years.</p>}

      {history.length > 0 && (
        <div className="history">
          <h3>Calculation History</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                Birthdate: {entry.birthdate} - Age: {entry.age} years
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
