import React, { Component } from "react";
import Key from "./key";
import Settings from "./settings";

export enum Waveform {
  Sine = "sine",
  Triangle = "triangle",
  Square = "square",
  Sawtooth = "sawtooth",
  Custom = "custom",
}
const Keys = new Map([
  ["a", 5],
  ["w", 6],
  ["s", 7],
  ["e", 8],
  ["d", 9],
  ["f", 10],
  ["t", 11],
  ["g", 12],
  ["y", 13],
  ["h", 14],
  ["u", 15],
  ["j", 16],
  ["k", 17],
  ["o", 18],
  ["l", 19],
  ["p", 20],
  [";", 21],
  ["'", 22],
]);
let KeysDown = new Set();

const freqFactor = 1.059463094359295;

function calculateFrequency(noteNum: number): number {
  return 8.18 * Math.pow(freqFactor, noteNum);
}
function setNoteTable(): Array<number> {
  let notes = [];
  for (let i = 0; i <= 127; i++) {
    notes[i] = calculateFrequency(i);
  }
  return notes;
}

interface State {
  volume: number;
  waveform: Waveform;
  octave: number;
}
class Casio extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { volume: 0.5, waveform: Waveform.Sine, octave: 4 };
    this.audioContext = new window.AudioContext();
    this.oscList = [];
    this.noteTable = setNoteTable();
    this.sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    this.cosineTerms = new Float32Array(this.sineTerms.length);
    this.customWaveform = this.audioContext.createPeriodicWave(
      this.cosineTerms,
      this.sineTerms
    );
    this.setupAudio();
  }

  setupAudio() {
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
    this.masterGainNode.gain.value = this.state.volume;
  }

  audioContext: AudioContext;
  oscList: Array<OscillatorNode | undefined>;
  masterGainNode?: GainNode;
  noteTable: Array<number>;
  sineTerms: Float32Array;
  cosineTerms: Float32Array;
  customWaveform: PeriodicWave;

  transposeNote(note: number): number {
    // MIDI notes go 0-127, piano starts at 22
    return 20 + note + this.state.octave * 12;
  }

  keyDown = (e: any) => {
    const note = Keys.get(e.key);
    if (!note || KeysDown.has(e.key)) return;
    KeysDown.add(e.key);
    this.playNote(note);
  };
  keyUp = (e: any) => {
    const note = Keys.get(e.key);
    if (note) {
      this.stopNote(note);
      KeysDown.delete(e.key);
    }
  };

  playNote = (note: number) => {
    const playNote = this.transposeNote(note);
    this.oscList[note] = this.startKey(this.noteTable[playNote]);
  };
  stopNote = (note: number) => {
    this.stopKey(note);
  };
  changeVolume = (e: any) => {
    const state = this.state;
    this.setState({ ...state, volume: e.target.value });
  };
  changeWaveform = (e: any) => {
    const state = this.state;
    this.setState({ ...state, waveform: e.target.value });
  };
  startKey = (freq: number): OscillatorNode | undefined => {
    let { audioContext, masterGainNode } = this;
    if (!masterGainNode || !audioContext) return;
    masterGainNode.gain.value = this.state.volume;
    let osc = audioContext.createOscillator();
    osc.connect(masterGainNode);

    let type = this.state.waveform;

    if (type === Waveform.Custom) {
      osc.setPeriodicWave(this.customWaveform);
    } else {
      osc.type = type;
    }

    osc.frequency.value = freq;
    osc.start();

    return osc;
  };
  stopKey = (note: number): void => {
    this.oscList[note]?.stop();
    this.oscList[note] = undefined;
  };
  panic = (): void => {
    this.oscList.forEach((osc: OscillatorNode | undefined) => {
      if (osc) {
        osc.stop();
      }
    });
  };

  render() {
    const { volume, waveform } = this.state;
    return (
      <section>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
          rel="stylesheet"
        />

        <div
          className="wrapper"
          aria-label="Casio PT-1 Keyboard illustration made with HTML and CSS"
        >
          <div className="casio" aria-hidden="true" onKeyDown={this.keyDown}>
            <div className="speaker"></div>
            <div className="logo">
              <h1>
                <span>Casio</span> <span>PT-1</span>
              </h1>
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
                <Key
                  data-note-name="G0"
                  note={0}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="A0"
                  note={2}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="B0"
                  note={4}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="C1"
                  note={5}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="D1"
                  note={7}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="E1"
                  note={9}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="F1"
                  note={10}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="G1"
                  note={12}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="A1"
                  note={14}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="B1"
                  note={16}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="C2"
                  note={17}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="D2"
                  note={19}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="E2"
                  note={21}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="F2"
                  note={22}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="G2"
                  note={24}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="A2"
                  note={26}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="B2"
                  note={28}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
              </div>
              <div className="black">
                <Key
                  data-note-name="G#0"
                  note={1}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="A#0"
                  note={3}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <div className=""></div>
                <Key
                  data-note-name="C#1"
                  note={6}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="D#1"
                  note={8}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <div className=""></div>
                <Key
                  data-note-name="F#1"
                  note={11}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="G#1"
                  note={13}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="A#1"
                  note={15}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <div className=""></div>
                <Key
                  data-note-name="C#2"
                  note={18}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="D#2"
                  note={20}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <div className=""></div>
                <Key
                  data-note-name="F#2"
                  note={23}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="G#2"
                  note={25}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
                <Key
                  data-note-name="A#2"
                  note={27}
                  playNote={this.playNote}
                  stopNote={this.stopNote}
                />
              </div>
            </div>
          </div>
        </div>
        <Settings
          volume={volume}
          waveform={waveform}
          changeVolume={this.changeVolume}
          changeWaveform={this.changeWaveform}
          panic={this.panic}
        />
      </section>
    );
  }

  componentDidMount() {
    console.log("mounting");
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  }
}

export default Casio;
