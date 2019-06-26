import React, { Component } from 'react';
import Form from './Form';
import Result from './Result';
import './App.css';

const APIKey= '5c8a76c926e9e2292ad8cebd5d525cc1';

class App extends Component {


  state={
    value:'',
    date:'',
    city:'',
    sunrise:'',
    sunset:'',
    temp:'',
    pressure:'',
    wind:'',
    err: false,
  }
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

   handleCitySubmit=(e)=>{
     e.preventDefault()
     const API=`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

     fetch(API)
     .then(res=>{
       if(res.ok){
         return res
       }
       throw Error(res.status)
     })
     .then(res => res.json())
     .then(data => {
       const time= new Date().toLocaleString()
       this.setState(state=>({
         err:false,
         date:time,
         sunrise: data.sys.sunrise,
         sunset:data.sys.sunset,
         temp:data.main.temp,
         pressure:data.main.pressure,
         wind:data.wind.speed,
         city:state.value,
       }))
     })
     .catch(err =>{ console.log(err);
      this.setState(prevState=>({

       err:true,
       city: prevState.value
      }))
    })

  }

// componentDidUpdate(prevProps,prevState){

//   if(this.state.value.length===0) return

//   if(prevState.value !== this.state.value){
//     const API=`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

//     fetch(API)
//      .then(res=>{
//        if(res.ok){
//          return res
//        }
//        throw Error(res.status)
//      })
//      .then(res => res.json())
//      .then(data => {
//        const time= new Date().toLocaleString()
//        this.setState(state=>({
//          err:false,
//          date:time,
//          sunrise: data.sys.sunrise,
//          sunset:data.sys.sunset,
//          temp:data.main.temp,
//          pressure:data.main.pressure,
//          wind:data.wind.speed,
//          city:state.value,
//        }))
//      })
//      .catch(err =>{ console.log(err);
//       this.setState(prevState=>({

//        err:true,
//        city: prevState.value
//       }))
//     })

//   }
// }

  render() {
    return (
      <div className="App">
      <Form value={this.state.value}
       change={this.handleInputChange}
        submit={this.handleCitySubmit}/>
      <Result weather={this.state}/>
      </div>
    );
  }
}


export default App;
