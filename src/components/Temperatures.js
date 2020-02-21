import React from 'react';
import Axios from 'axios';

export default class Temperatures extends React.Component {
    state = {
        current: "",
        temperatures: [],
        violations: []
    };

    componentDidMount() {
        this.getTemps().then(response => {
            if (!response.data) return;
            this.setState({current: response.data[response.data.length-1].temperature});
            var list = response.data.map(x => <p>{`Temp: ${x.temperature}, Time: ${x.time}`}</p>)
            this.setState({temperatures: list})
        });
        this.getViolations().then(response => {
            if (!response.data) return;
            var list = response.data.map(x => <p>{`Temp: ${x.temperature}, Time: ${x.time}`}</p>)
            this.setState({violations: list})
        });
    }

    getTemps = () => {
        return Axios({
            url: "http://localhost:8080/sky/cloud/GrYUJScxQsrB4Ah1vLApBJ/temperature_store/temperatures",
            method: "get"
        });
    }

    getViolations = () => {
        return Axios({
            url: "http://localhost:8080/sky/cloud/GrYUJScxQsrB4Ah1vLApBJ/temperature_store/violations",
            method: "get"
        });
    }
    
    
    render() {

        return (
        <div>
            <h1>{`Current Temp: ${this.state.current}`}</h1>
            <h3>Temperatures</h3>
            {this.state.temperatures}
            <h3>Violations</h3>
            {this.state.violations}
            <a href="http://localhost:3000/profile">Profile</a>
        </div>
    )}
}


