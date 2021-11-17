import React from 'react'

export default function Drums() {
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
   snareFilter.frequency.value = 1500;
   snareFilter.connect(primaryGainControl)
   
    const handleClickSnare = () => {
        const whiteNoiseSource = audioContext.createBufferSource();
        whiteNoiseSource.buffer = buffer;

        const whiteNoiseGain = audioContext.createGain();
        whiteNoiseGain.gain.setValueAtTime(1, audioContext.currentTime)
        whiteNoiseGain.gain.exponentialRampToValueAtTime(
            0.01, 
            audioContext.currentTime + 0.2
        );
        whiteNoiseSource.connect(whiteNoiseGain)
        whiteNoiseGain.connect(snareFilter)

        whiteNoiseSource.start();
        whiteNoiseSource.stop(audioContext.currentTime + 0.2);

        const snareOscillator = audioContext.createOscillator()
        snareOscillator.type = "triangle"
        snareOscillator.frequency.setValueAtTime(100, audioContext.currentTime)

        const oscillatorGain = audioContext.createGain()
        oscillatorGain.gain.setValueAtTime(0.7, audioContext.currentTime)
        oscillatorGain.gain.exponentialRampToValueAtTime(
            0.01, 
            audioContext.currentTime + 0.2
        );
        snareOscillator.connect(oscillatorGain)
        oscillatorGain.connect(primaryGainControl)
        snareOscillator.start()
        snareOscillator.stop(audioContext.currentTime + 0.2)
    }
    
    const handleClickKick = () => {
        const kickOscillator = audioContext.createOscillator()

        kickOscillator.frequency.setValueAtTime(150, 0)
        kickOscillator.frequency.exponentialRampToValueAtTime(
            0.001, 
            audioContext.currentTime + 0.5
        );
    

        const kickGain = audioContext.createGain();
        kickGain.gain.setValueAtTime(1, 0);
        kickGain.gain.exponentialRampToValueAtTime(
            0.001, 
            audioContext.currentTime + 0.5
        );

        kickOscillator.connect(kickGain)
        kickGain.connect(primaryGainControl)
        kickOscillator.start()
        kickOscillator.stop(audioContext.currentTime + 0.5)
    }

    const HIHAT_URL = 'https://unpkg.com/browse/@teropa/drumkit@1.1.0/src/assets/hatClosed.mp3'

    const handleClickHiHat = async () => {
        try {
            const response = await fetch(HIHAT_URL)
            const soundBuffer = await response.arrayBuffer()
            const hihatBuffer = await audioContext.decodeAudioData(soundBuffer)

            const hiHatSource = audioContext.createBufferSource()
            hiHatSource.buffer = hihatBuffer
            hiHatSource.connect(primaryGainControl)
            hiHatSource.start()
            }
        catch (err) {
            console.log(err)
        }
    }
    
    return (
        <>
         <button onClick={handleClickSnare}>
             Snare
        </button> 
        <button onClick={handleClickKick}>
             Kick
        </button> 
        <button onClick={handleClickHiHat}>
             hihat
        </button>   
        </>
    )
}
