import React, { useState } from 'react';
import './App.css';

function App() {
  const apikey = 'ada39814a38b2f743eee4dc1799517bc';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState('');

  const getClimaInfo = (event)=> {
    if (event.key == 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`).then(
        response => response.json()
      ).then(
          data => {
            setWeatherData(data)
          }
        )
    }
  }

  return ( 
    <div className='container'>
      <h1>Bienvenido!</h1>
      <p>Ingresa tu localidad para recibir el estado del clima.</p>
      <input 
        className='input form-group' 
        placeholder='Ingrese localidad'
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getClimaInfo}
      />

      {typeof weatherData.main == 'undefined' ? (
        <div>
        </div>
      ) : (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.sys.country}</p>
          <p>{Math.round(weatherData.main.temp)}°C</p>
          <p>Estado {weatherData.weather[0].main}</p>
          <p>min {Math.round(weatherData.main.temp_min)}°C</p>
          <p>max {Math.round(weatherData.main.temp_max)}°C</p>
          <p>Humedad {weatherData.main.humidity}%</p>
        </div>
      )
      }
      {weatherData.cod === '404' ? (
        <p>Lo siento, no disponemos de la información para esta localidad.</p>
      ) : (
        <>
        </>
      )}

    </div>
   );
}

export default App;