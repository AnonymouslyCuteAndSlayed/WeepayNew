import React, { useState } from 'react';

function MainCalculator() {   // 🔥 Capitalized component name
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango'];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = items.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search fruits..."
      />
      
      {results.length > 0 && (
        <ul>
          {results.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MainCalculator
;   // 🔥 Export matches capitalized name
