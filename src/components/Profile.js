import React from 'react';
import Axios from 'axios';

export default class Temperatures extends React.Component {
    state = {
        temp: {
            name: "",
            location: "",
            threshold: "",
            contactNumber: ""
        }, 
        Tname: "",
        Tlocation: "",
        Tthreshold: "",
        TcontactNumber: "", 
    };
    

    componentDidMount() {
        this.getProfile().then(response => {
            if (!response.data) return;
            this.setState({
                Tname: response.data.name,
                Tlocation: response.data.location,
                Tthreshold: response.data.threshold,
                TcontactNumber: response.data.contactNumber,
            });
        });
    }

    getProfile = () => {
        return Axios({
            url: "http://localhost:8080/sky/cloud/GrYUJScxQsrB4Ah1vLApBJ/sensor_profile/profile",
            method: "get"
        });
    }

    onChange = (evt) => {
        evt.preventDefault();
        var changed = Object.assign({}, this.state.temp);
        changed[evt.target.id] = evt.target.value;
        this.setState({temp: changed})
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        Axios({
            url: "http://localhost:8080/sky/event/GrYUJScxQsrB4Ah1vLApBJ/5/sensor/profile_updated",
            method: "post",
            data: this.state.temp
        }).then( data => {
            console.log(data)
            this.componentDidMount()

        });
    }

    render() {

        return (
        <div>
            <h1>Profile</h1>
            <h3>{`Name: ${this.state.Tname}`}</h3>
            <h3>{`Location: ${this.state.Tlocation}`}</h3>
            <h3>{`Threshold: ${this.state.Tthreshold}`}</h3>
            <h3>{`Contact Number: ${this.state.TcontactNumber}`}</h3>
            <h1>Update Values</h1>
            <form onSubmit={this.onSubmit}>
                <label>Name:</label>
                <input type="text" id="name" onChange={this.onChange}></input><br/>
                <label>Location:</label>
                <input type="text" id="location" onChange={this.onChange}></input><br/>
                <label>Threshold:</label>
                <input type="number" id="threshold" onChange={this.onChange}></input><br/>
                <label>Contact Number:</label>
                <input type="text" id="contactNumber" onChange={this.onChange}></input><br/><br/>

                <input type="submit" value="Submit"></input>
            </form> 
            <br/>
            <br/>
            <a href="http://localhost:3000/temperatures">Temperature</a>
        </div>
    )}
}


