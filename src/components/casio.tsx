import React, { Component } from 'react';
import Key from './key';
import Settings from './settings';

export enum Waveform {
  Sine = 'sine',
  Triangle = 'triangle',
  Square = 'square',
  Sawtooth = 'sawtooth',
  Custom = 'custom',
};

interface State {
  volume: number;
  waveform: Waveform;
}
class Casio extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { volume: 0.5, waveform: Waveform.Sine };
  }

  playNote = (id: string, e: any) => {
    console.log('noted!', { id, e });
  }
  changeVolume = (e: any) => {
    const state = this.state;
    this.setState({ ...state, volume: e.target.value });
  }
  changeWaveform = (e: any) => {
    const state = this.state;
    this.setState({ ...state, waveform: e.target.value });
  }

  render() {
    const { volume, waveform } = this.state;
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
                  <Key id="G0" playNote={this.playNote}/>
                  <Key id="A0" playNote={this.playNote}/>
                  <Key id="B0" playNote={this.playNote}/>
                  <Key id="C1" playNote={this.playNote}/>
                  <Key id="D1" playNote={this.playNote}/>
                  <Key  id="E1"playNote={this.playNote}/>
                  <Key id="F1" playNote={this.playNote}/>
                  <Key id="G1" playNote={this.playNote}/>
                  <Key  id="A1" playNote={this.playNote}/>
                  <Key  id="B1" playNote={this.playNote}/>
                  <Key id="C2" playNote={this.playNote}/>
                  <Key id="D2" playNote={this.playNote}/>
                  <Key id="E2" playNote={this.playNote}/>
                  <Key id="F2" playNote={this.playNote}/>
                  <Key id="G2" playNote={this.playNote}/>
                  <Key id="A2" playNote={this.playNote}/>
                  <Key id="B2" playNote={this.playNote}/>
                </div>
                <div className="black">
                  <Key id="G#0" playNote={this.playNote}/>
                  <Key id="A#0" playNote={this.playNote}/>
                  <div className=""></div>
                  <Key id="C#1" playNote={this.playNote}/>
                  <Key id="D#1" playNote={this.playNote}/>
                  <div className=""></div>
                  <Key id="F#1" playNote={this.playNote}/>
                  <Key id="G#1" playNote={this.playNote}/>
                  <Key id="A#1" playNote={this.playNote}/>
                  <div className=""></div>
                  <Key id="C#2" playNote={this.playNote}/>
                  <Key id="D#2" playNote={this.playNote}/>
                  <div className=""></div>
                  <Key id="F#2" playNote={this.playNote}/>
                  <Key id="G#2" playNote={this.playNote}/>
                  <Key id="A#2" playNote={this.playNote}/>
                </div>
            </div>
          </div>
        </div>
        <Settings volume={volume} waveform={waveform} changeVolume={this.changeVolume} changeWaveform={this.changeWaveform}/>
      </section>
    )
  }
}

export default Casio;