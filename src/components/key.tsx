import React from 'react';

interface KeyProps {
  id: string;
  playNote(id: string, e: any): void
}

function Key(props: KeyProps) {
  return (
      <div role="button" className="key" onClick={(e) => props.playNote(props.id, e)}></div>
    );
}

export default Key;