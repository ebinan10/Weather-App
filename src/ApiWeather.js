import React, { Component } from 'react'
import MetaTags from 'react-meta-tags';
import './App.css'


export class ApiWeather extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            info:false,
            arr:{},
            cityname:'',
            country:"",
            temp:0,
            tempCent:null,
            coordLong:0,
            coordLat:0,
            weatherInfo:'',
            description:'',
            icon:'',
            error:'',
            degree:''
        }
    }
    
    

  getCityName=(e)=>{
    this.setState({
        cityname: e.target.value,

    })
    
}
 apI=()=>{
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?'
    
    const ApiKey = 'd5f31baa758a56b76ded08d7267e3ab1'
    fetch(baseUrl + `q=${this.state.cityname}&appid=${ApiKey}`)
    .then(response=>{return response.json()})
    .then(data=>{
        this.setState({
            arr:data,
            icon:data.weather[0].icon,
            temp:data.main.temp,
            country:data.sys.country,
            description:data.weather[0].description,
            weatherInfo:data.weather[0].main,
            tempCent: Math.round(((data.main.temp-273.15) + Number.EPSILON) * 10) / 10,
            degree: <>&deg;C</>,
            error:''
             })
             console.log(this.state.arr) 
             console.log(this.state.temp)
                
  })
  .catch(error=> {
      console.error(error);
      this.setState({
        arr:{},
        icon:'',
        temp:'',
        country:"",
        description:'',
        weatherInfo:'', 
        tempCent:'',
        error:'Invalid City, Enter a Valid City Name',
        degree:''
         })
        
  });
 }

  submitCity=()=>{
      this.apI()
      setTimeout(() => {
         this.setState({
        info:true 
    }) 
      }, 1434);
    
    
}
    homeBtn=()=>{
        this.setState({
            info:false ,
            cityname:''
        })
    }

    render() {
        const {info,icon,tempCent,country,description,weatherInfo,error,degree} = this.state;
        
        const countryFlag = country.toLowerCase()
        // var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
       const iconImg =  `http://openweathermap.org/img/w/${icon}.png`
       const imgSrc = ` https://flagcdn.com/16x12/${countryFlag}.png`
        return (
            <div>
                <MetaTags>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
          </MetaTags>
                {
                info===true?
                    <div className ='weather'>
                        <h2>{this.state.arr.name} Weather Report</h2>
                <div className = 'container'>
                    <div className='location'>
                         <h3>{this.state.arr.name} </h3><br/>
                         <h1>  {country}  <img src= {imgSrc} alt=''/></h1>                   
            </div>
            <div className='location-temp'>
               <div className='degree-section'>
           <div className='temperature-degree'> <h6>{error}</h6>{tempCent}{degree}</div>
           
                   
           </div>  
                   <div className ='image'>   <img src = {iconImg} alt=''/></div>
            </div>
           <div className='temperature'>
                  <h3> {weatherInfo} </h3>     <h3> {description}</h3>
                </div></div>
                <div className ='homeButton'>
                <button  onClick={()=>{this.homeBtn()}}>Home</button>
                </div>
                </div>:
                <div className ='label'>
                    <label><h2>Get Weather Report</h2> </label><br/>
                <input type="text"
                 value={this.state.cityname}
                 placeholder='Enter City Name'
                  onChange={this.getCityName} autoFocus="autofocus">
                     </input><br/>
                     <button onClick={()=>this.submitCity()}
                        value ={this.state.cityname}
                     >Submit</button>
                </div>
                }
            </div>
        )
    }
}

export default ApiWeather
