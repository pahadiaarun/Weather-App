import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';


const AutoComplete = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (inputValue) => {
    const apiKey = 'c66bca1bcfmshbb8cd14694a635dp117c23jsn40c167599521'; // Replace with your actual API key
    const apiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      });

      const { data } = response;
      const suggestions = data.data.map((city) => city.city);
      return suggestions;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await fetchSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setValue(suggestion);
  };

  const inputProps = {
    placeholder: 'Enter a city',
    value,
    onChange: (_, { newValue }) => {
      setValue(newValue);
    }
  };

  
  return (
    <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
    />
  );
};

export default AutoComplete;
