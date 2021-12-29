import React, { useState } from 'react';
import './App.css';

function App() {
  const apikey = 'ada39814a38b2f743eee4dc1799517bc';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState('');

  const getClimaInfo = (event)=> {
    if (event.key == 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apikey}`).then(
        response => response.json()
      ).then(
          data => {
            setWeatherData(data)
            /*let climaIcon = data.weather[0].icon;
            console.log(climaIcon);
            let urlIcon = 'http://openweathermap.org/img/wn/'+climaIcon+'@2x.png'
            console.log(urlIcon);*/
          }
        )
    }
  }

  return ( 
    <div className='container'>
      <h1>Bienvenido!</h1>
      <p className='indicacion'>Ingresa tu localidad para recibir el estado del clima</p>
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
        <div className='card-transparent'>
          <div className='card-header'>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.sys.country}</p>
          </div>
          <div className='card-body col-sm-12'>
            <p className='col-xs-5 temp'>{Math.round(weatherData.main.temp)}°C</p>
            <img className='col-xs-5' src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
            <p className='col-xs-12 climaEstado'>Estado {weatherData.weather[0].description} </p>
            <p className='col-xs-6 climaMin'>min {Math.round(weatherData.main.temp_min)}°C</p>
            <p className='col-xs-6 climaMax'>max {Math.round(weatherData.main.temp_max)}°C</p>
            <p className='col-xs-10 climaHum'>Humedad {weatherData.main.humidity}%</p>
          </div>
        </div>
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