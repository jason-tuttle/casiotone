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
        <select name="waveform" onChange={props.changeWaveform} value={props.waveform}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle" >Triangle</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  )
}

export default Settings;