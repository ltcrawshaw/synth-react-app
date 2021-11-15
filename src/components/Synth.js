import React from 'react'

export default function Synth() {
    var AudioContext = window.AudioContext ||
        window.webkitAudioContext;
    
    const context = new AudioContext();

    const masterVolume = context.createGain();
    masterVolume.connect(context.destination);

    const oscillator = context.createOscillator();
    oscillator.frequency.setValueAtTime(220, 0);
    oscillator.connect(masterVolume);


    
    return (
        <>
            
        </>
    )
}
