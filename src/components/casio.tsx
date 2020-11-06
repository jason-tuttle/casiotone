import React, { Component } from 'react';
import Key from './key';

class Casio extends Component {

  playNote() {
    console.log('noted!');
  }

  render() {
    return (
      <section>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet" />

        <div className="wrapper" aria-label="Casio PT-1 Keyboard illustration made with HTML and CSS">
          <div className="casio" aria-hidden="true">
              <div className="speaker"></div>
              <div className="logo">
                <h1><span>Casio</span> <span>PT-1</span></h1>
              </div>
              <div className="controls">
                <div className="controls-labels">
                    <p>mode</p>
                    <p>volume</p>
                    <p>tone</p>
                    <p>tempo</p>
                    <p>one key play</p>
                </div>
                <div className="controls-bar">
                  <div className="mode-container">
                    <div className="mode-bar"></div>
                    <div className="mode-handle"></div>
                  </div>
                  <div className="volume-container">
                    <div className="volume-bar"></div>
                    <div className="volume-handle"></div>
                  </div>
                  <div className="tone-container">
                    <div className="tone-bar"></div>
                    <div className="tone-handle"></div>
                  </div>
                  <div className="clear btn"></div>
                  <div className="del btn"></div>
                  <div className="down btn"></div>
                  <div className="up btn"></div>
                  <div className="select btn"></div>
                  <div className="reset btn"></div>
                  <div className="demo btn"></div>
                  <div className="memory btn"></div>
                  <div className="onekey-1 bigbtn"></div>
                  <div className="onekey-2 bigbtn"></div>
                </div>
              </div>
              <div className="keys-container">
                <div className="white">
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                </div>
                <div className="black">
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <div className=""></div>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <div className=""></div>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <div className=""></div>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <div className=""></div>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                  <Key playNote={this.playNote}/>
                </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Casio;