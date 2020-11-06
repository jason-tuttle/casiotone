import React from 'react';
import { Waveform } from './casio';

interface Props {
  volume: number;
  waveform: Waveform;
  changeVolume(e: any): void;
  changeWaveform(e: any): void;
}

function Settings(props: Props) {
  return (
    <div className="settingsBar">
      <div className="left">
        <span>Volume: </span>
        <input type="range" min="0.0" max="1.0" step="0.01" value={props.volume} list="volumes" name="volume" onChange={props.changeVolume}/>
        <datalist id="volumes">
          <option value="0.0" label="Mute"/>
          <option value="1.0" label="100%"/>
        </datalist>
      </div>
      <div className="right">
        <span>Current waveform: </span>
        <select name="waveform" onChange={props.changeWaveform}>
          <option value="sine" selected={props.waveform === Waveform.Sine}>Sine</option>
          <option value="square" selected={props.waveform === Waveform.Square}>Square</option>
          <option value="sawtooth" selected={props.waveform === Waveform.Sawtooth}>Sawtooth</option>
          <option value="triangle" selected={props.waveform === Waveform.Triangle}>Triangle</option>
          <option value="custom" selected={props.waveform === Waveform.Custom}>Custom</option>
        </select>
      </div>
    </div>
  )
}

export default Settings;