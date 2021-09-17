import axios from 'axios';
import React from 'react';
import './App.css';
import Loading from './images/loadingGif.gif';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            city: '',
            coordlat: null,
            coordlon: null,
            temp: null,
            weather: '',
            loading: false,
            bgImage: '',
            loadingGif: false
        };
    }
    onChange = (ev) => {
        this.setState({
            city: ev.target.value,
        })
    }
    onSubmit = async (ev) => {
        ev.preventDefault();
        this.setState({loadingGif: true});
        try{
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=0c3d98a5b19c136c67a54da99016b3df`);
        const k = res.data.main.temp;
        const c = Math.round(k - 273.15);
        const lat = Math.round(res.data.coord.lat);
        const lon = Math.round(res.data.coord.lon);
        this.setState({
            coordlat: lat,
            coordlon: lon,
            temp: c,
            weather: res.data.weather[0].main,
            loading: true,
            loadingGif: false,
        })
        if (this.state.weather === 'Sunny') {
            //this.setState({ bgImage: `url('https://www.taylorsgardenbuildings.co.uk/blog/wp-content/uploads/2015/06/bg_weather_sunny_day.jpg')` });
            this.setState({bgImage:`url(day.jpg)`});
        }
        else if (this.state.weather === 'Haze') {
            this.setState({ bgImage: `url('https://images.unsplash.com/photo-1487188274754-65d7aaa5b938?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGZvZ2d5JTIwd2VhdGhlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')` });
        }
        else if (this.state.weather === 'Clouds') {
            this.setState({ bgImage: `url('https://wallpaperbat.com/img/346351-download-free-rain-wallpaper-weather-wallpaper-clouds-rain.jpg')` });
        }
        else if (this.state.weather === 'Rain') {
            this.setState({ bgImage: `url('https://wallpapercave.com/wp/wp2733241.png')` });
        }
        else if (this.state.weather === 'Snow') {
            this.setState({ bgImage: `url('https://www.wallpaperup.com/uploads/wallpapers/2015/11/18/838628/9f0cebac8d6230e6396a14b860a70eca.jpg')` });
        }
        else{
            this.setState({ bgImage: `url('../src/images/bg.jpg')` });
        }
    }catch{
        alert('Something Went Wrong :(');
    }
    }
    render() {
        return (
            <>
                <div className="outerDiv" style={{ backgroundImage: this.state.bgImage }}>
                    <div className="modal-container" id="modal-container" >
                        <div className="modal " id="nameIntro " style={{ color: 'aliceblue' }}>
                            <form onSubmit={this.onSubmit}>
                                <label htmlFor="fname" id="label">Enter The City Name</label><br />
                                <input
                                    type="text"
                                    id="fname"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.onChange}
                                    placeholder="Enter The City Name"
                                    required
                                /><br />
                                <input type="submit" value="Submit" id="submit" />
                            </form>
                        </div>
                    </div>
                    {this.state.loading && (
                    <div className="widget " style={{ textAlign: 'center' }}>
                        <div className="panel ">
                            <div className="city " id="city">
                                    {this.state.city}
                             </div>
                             <div className="weather">
                                    {this.state.weather}
                             </div>
                            <div className="temp ">
                                    {this.state.temp}&deg; C
                            </div>
                            <div className="coord">
                                    Latitude  : {this.state.coordlat}&deg;
                            </div>
                             <div className="coord">
                                    Longitude  : {this.state.coordlon}&deg;
                            </div>
                        </div>
                    </div>
                    )
                    }
                     {this.state.loadingGif && (
                    <img className="loadingImage" src={Loading} alt="Loading" />
                    )}
                </div>
            </>
        )
    }
}
export default App;