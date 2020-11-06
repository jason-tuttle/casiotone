import React from 'react';

interface KeyProps {
  playNote(): void
}

function Key(props: KeyProps) {
  return (
      <div className="key" onClick={props.playNote}></div>
    );
}

export default Key;