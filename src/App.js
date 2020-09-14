import React, { useState } from 'react';
const api = {
  key: 'f22aac83565464e9b11d1d30de3a86cf',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = d => {
    let date = String(new window.Date());
    date = date.slice(3, 15);

    return date;
  };

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 60
            ? 'app warm'
            : 'app'
          : 'app'
      }>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div className='location-box'>
            <div className='location'>
              {weather.name}, {weather.sys.country}
            </div>
            <div className='date'>{dateBuilder(new Date())}</div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}° F</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
