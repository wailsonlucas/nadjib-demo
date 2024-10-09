import s from "./index.module.css";
import { useEffect, useState, useRef } from 'react'


export default function Home() {
let localVideoRef = useRef(null)
let audioRef = useRef(null)


async function requestPermissions() {
  try {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    localVideoRef.current.srcObject = stream
  } catch (err) {
    console.error('Error accessing media devices: ', err);
  }
}

async function getAudio(){
	try {
    let stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    audioRef.current.srcObject = stream
  } catch (err) {
    console.error('Error accessing media devices: ', err);
  }
}

  return (
  	<>
  	<div className={s.root}>
	    <div className={s.div1}>
	    	<video ref={localVideoRef} autoPlay playsInline></video>
	    </div>
	    <div className={s.div2}>
	    	<video ref={audioRef} autoPlay playsInline></video>
	    </div>
    </div>
    <button onClick={requestPermissions} className={s.startlive}>start camera</button>
    <button onClick={getAudio} style={{background:'red'}} className={s.startlive}>start audio</button>
    </>
  );
}
