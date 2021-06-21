import React from 'react';
import './WeatherInfoStat.css'
function WeatherInfoStat(props) {
    return (
        <div className= "weatherInfoStat">
            <h4>
                {props.value}{props.type}
            </h4>
            <h4>
                {props.name}
            </h4>
        </div>
    );
}

export default WeatherInfoStat;