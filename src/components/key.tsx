import React from "react";

interface KeyProps {
  note: number;
  keysDown: Array<number>;
  playNote(note: number): void;
  stopNote(note: number): void;
}

function Key(props: KeyProps) {
  return (
    <div
      role="button"
      className={`key ${props.keysDown.includes(props.note) ? "down" : ""}`}
      onMouseDown={() => props.playNote(props.note)}
      onMouseUp={() => props.stopNote(props.note)}
    ></div>
  );
}

export default Key;
