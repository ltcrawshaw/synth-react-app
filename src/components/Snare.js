import React from 'react'

export default function Snare() {
    const audioContext = new AudioContext();

    const buffer = audioContext.createBuffer(
        1,
        audioContext.sampleRate * 1,
        audioContext.sampleRate
    )

    const channelData = buffer.getChannelData(0)

    for(let i=0; i < buffer.length; i++) {
        channelData[i] = Math.random() * 2 - 1;
    } 

    const primaryGainControl = audioContext.createGain()
    primaryGainControl.gain.setValueAtTime(0.5, 0);

    primaryGainControl.connect(audioContext.destination)

   const snareFilter = audioContext.createBiquadFilter();
   snareFilter.type = "highpass"
   
    const handleClick = () => {
        const whiteNoiseSource = audioContext.createBufferSource();
        whiteNoiseSource.buffer = buffer;
        whiteNoiseSource.connect(primaryGainControl)
        whiteNoiseSource.start();
    }

    return (
        <>
         <button onClick={handleClick}>
             White Noise
        </button>   
        </>
    )
}
