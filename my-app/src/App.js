import React, { Component } from 'react';
import './App.css';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';


const api_key="25e02a106da51ada06459489ec6e0279";

class App extends React.Component {

    state = {

        
        temperature : undefined ,
        city : undefined,
        country : undefined,

        humidity : undefined,
        description : undefined,

        error : undefined


    }

      getWeather = async (e) => {
        e.preventDefault();
          const city = e.target.elements.city.value;
          const country = e.target.elements.country.value;
          const apicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}&units=metric`);
          const data = await apicall.json();

          if (city && country) {
                  
                this.setState({

                  temperature : data.main.temp,
                  city : data.name,
                  country : data.sys.country,
                  humidity : data.main.humidity ,
                  description : data.weather[0].description,
                  error : data.error

                   });
          }else {
               this.setState({

                  temperature : undefined,
                  city : undefined,
                  country : undefined,
                  humidity : undefined,
                  description : undefined,
                  error : "Please enter a correct city and country name"

                   });
          }
  


      }
  render() {
    return (
      <div >

          <div className = "wrraper">

              <div className = "main">

                  <div className = "container">

                      <div className = "row">

                          <div className = "col-xs-5 title-container">

                             <Titles />

                          </div>
                           <div className = "col-xs-7 form-container">


                             <Form getWeather = {this.getWeather}/>
                             <Weather 
                                temperature={this.state.temperature}
                                city={this.state.city}
                                country={this.state.country}
                                humidity={this.state.humidity}
                                description={this.state.description}
                                error={this.state.error}

                            />

                          </div>



                       </div>


                   </div>

              </div>

          </div>

   
      </div>
    );
  }
}

export default App;