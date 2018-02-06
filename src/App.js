import React, { Component } from 'react';
import axios from 'axios';

import Streamer from './components/Streamer/Streamer';
import Controls from './components/Controls/Controls';
import './App.css';

let streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

class App extends Component {
  state = {
    streamer:[],
    offline:[],
    showOffline: true,
    showOnline: true
  }
  
  componentDidMount(){
    let tempStreamer = [...this.state.streamer];
    let offline = [];
   streamers.map((streamer) => {
    
      axios.get(`https://wind-bow.glitch.me/twitch-api/streams/${streamer}`)
        .then(streams => {
            if(streams.data.stream){
              tempStreamer.push(streams.data.stream);
            }
            else return axios.get(`https://wind-bow.glitch.me/twitch-api/users/${streamer}`)
            .then(response =>{
              offline.push(response.data);
            }).then(response=>{
              this.setState({streamer:tempStreamer, offline:offline});
              console.log('STATE',this.state)
            });
      });
    });
  }
  
  displayAllHandler = () =>{
    this.setState({showOffline: true, showOnline: true});
  }
  
  displayOnlineHandler = () => {
    this.setState({showOffline:false, showOnline: true});
  }

  displayOfflineHandler = () => {
    this.setState({showOffline:true, showOnline: false})
  }

  
  render() {
  let online= [];
 if(this.state.showOnline){
    for(let i=0; i<this.state.streamer.length; i++){
      online.push(<Streamer name={this.state.streamer[i].channel.name} logo={this.state.streamer[i].channel.logo} status={this.state.streamer[i].channel.status} link={this.state.streamer[i].channel.url} />);
    }
  }

 let offline = [];
 if(this.state.showOffline){
    for(let i=0; i<this.state.offline.length; i++){
      offline.push(<Streamer name={this.state.offline[i].name} logo={this.state.offline[i].logo} status='Offline'/>);
    }
  }
   

    return (
      <div className="App">
      <h1>Got Streamers?</h1>
      <Controls online={this.displayOnlineHandler} offline={this.displayOfflineHandler} all={this.displayAllHandler}/>
        <div className="box">
          {online}
          {offline}
        </div>
      </div>
    );
  }
}

export default App;
