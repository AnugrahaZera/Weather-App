import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'weather-icons2/css/weather-icons.css';

import Weather from './app-components/weather-component';

import Form from './app-components/form.component';
//api call  api.openweathermap.org/data/2.5weather?q=london,uk

const API_key=
("429736441cf3572838aa10530929f7cd");


class App extends React.Component{
constructor(){
super();
this.state={
  City:undefined,
  Country:undefined,
  icon:undefined,
  main:undefined,
  celsius:undefined,
  temp_max:undefined,
  temp_min:undefined,
  description:"",
  error:false
}; 


 this.WeatherIcon={
  Thunderstorm:"wi-thunderstorm",
  Drizzle:"wi-sleet",
  Rain:"wi-storm-showers",
  Snow:"wi-snow",
  Atmosphere:"wi-fog",
  Clear:"wi-day-sunny",
  Clouds:"wi-day-fog",
};
}
calCelsius(temp){

  let cell=Math.floor(temp-273.15);
  return cell;
}
getWeatherIcons(icons,rangeId){
  switch(true){
    case rangeId>=200&&rangeId<=232:
    this.setState({icon:this.WeatherIcon.Thunderstorm});
    break;
    case rangeId>=300&&rangeId<=321:
    this.setState({icon:this.WeatherIcon.Drizzle});
    break;
    case rangeId>=500&&rangeId<=531:
    this.setState({icon:this.WeatherIcon.Rain});
    break;
    case rangeId>=600&&rangeId<=622:
    this.setState({icon:this.WeatherIcon.Snow});
    break;
    case rangeId>=701&&rangeId<=781:
    this.setState({icon:this.WeatherIcon.Atmosphere});
    break;
    case rangeId===800:
    this.setState({icon:this.WeatherIcon.Clear});
    break;
    case rangeId>=801&&rangeId<=804:
    this.setState({icon:this.WeatherIcon.Clouds});
    break;
    default:
    this.setState({icon:this.WeatherIcon.Clouds});
    
  }
}



getWeather=async(e)=>{

e.preventDefault();

const city =e.target.elements.city.value;
const country =e.target.elements.country.value;







  if(city&&country){
    const api_call=await fetch(
      'http://api.openweathermap.org/data/2.5/weather?q={city},{country}appid={API_key}'
    );
      
    const response = await api_call.json();
  
  
  
    console.log(response);
    this.setState({
      city:'{response.name},{response.sys.country}',
       celsius:this.calCelsius(response.main.temp),
       temp_max:this.calCelsius(response.main.temp_max),
       temp_min:this.calCelsius(response.main.temp_min),
       description:response.Weather[0].description,
       WeatherIcon:this.state.WeatherIcon,
      error:false,
    });
  
  this.get_WeatherIcon(this.WeatherIcon,response.Weather[0].id);
  }else{
    this.setState({error:true});
  }

};

render(){
  return (
    <div className="App">
      <Form loadweather={this.getWeather}error={this.error.state}/>
     <Weather
      city={this.state.city}
       Country={this.state.Country} 
       temp_celsius={this.state.celsius}
       temp_max={this.state.temp_max}
       temp_min={this.state.temp_min}
       description={this.state.description}
       WeatherIcon={this.state.icon}

      
       
       

      />
    </div>
  );
};
}

export default App;
