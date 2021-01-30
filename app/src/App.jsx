import React from 'react';
import PropTypes from 'prop-types';
import { Event } from 'react-socket-io';

class App extends React.Component {
  static contextTypes = {
    socket: PropTypes.object.isRequired
  }

  state = {
    game: {},
    name: '',
    points: 0,
    words: [],
    timeLeft: 0
  }

  componentDidMount(){
    console.log("Context: ", this.context);
  }
  
  onWords = (words) => {
    if(!words || !words.length){
      alert("There are no new new words");
    }
    else{
      console.log("Words in: ", words);
      this.setState({words});
    }
  }
  
  onTime = (timeLeft) => {
    console.log("Time in: ", timeLeft);
    this.setState({timeLeft});
  }
  
  onGameChanged = (game) => {
    console.log("Game changed", game);
    this.setState({game});
  }

  render() {
    const { currentWords, timeLeft, team } = this.state;
    return (
      <div id="mainApp" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Event event='game-changed' handler={this.onGameChanged} />
        <Event event='words' handler={this.onWords} />
        <Event event='time' handler={this.onTime} />

        {/* <div id="timeLeft">
          { timeLeft }
        </div> */}

        {/* <div id="wordsList">
          { timeLeft > 0 && 
            currentWords.map(w => <h1 className={w.played ? 'played' : ''}>{w.word}</h1>)
          }
          
          { timeLeft < 1 && 
            <div id="timeUp">
              <h1>Time's Up</h1>
              <p>Waiting for next Turn</p>
            </div>
          }
        </div> */}
        
        { !team && (
          <div id="wordsList">
            <p>Select your team</p>
            <h1 onClick={() => this.setState({team: 'A'})}>Team A</h1>
            <h1 onClick={() => this.setState({team: 'B'})}>Team B</h1>
          </div>
        ) }

        { team && (
          <button id="joinerBtn" className="round-btn"
            onClick={() => this.context.socket.emit('buzz', team)}
          >
            BUZZ
          </button>
        ) }
      </div>
    );
  }
}

export default App;
