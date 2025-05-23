import * as mod from "./mml.js";
export * as mod from "./mml.js";
export let rhysmLiteralSet/*: RhysmLiteralSet|undefined*/;
//let mod;
export let playStatement;
export let audioCtx;
export default function getUserActivatedAudioContext() {
    return new Promise((resolve, reject) => {
      // Create the button
      const button = document.createElement('button');
      button.textContent = 'Play Start!';
      button.style.fontSize = '1.2rem';
      button.style.padding = '10px 20px';
      button.style.position = 'absolute';
      button.style.left = '0';
      button.style.top = '0';
      button.style["z-index"] = '300000';
      
      document.body.appendChild(button);
      // Click handler

      const start=() => {
        try {
          // Create AudioContext
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
          // Create a dummy oscillator node
          const oscillator = audioContext.createOscillator();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(44, audioContext.currentTime); // A4
          oscillator.connect(audioContext.destination);
          oscillator.start();
  
          // Stop after short time
          setTimeout(() => oscillator.stop(), 200); // Play a short beep
  
          // Remove the button from DOM
          button.remove();
          document.body.removeEventListener("keydown", start);
          
          // Resolve the promise
          resolve(audioContext);
        } catch (err) {
          reject(err);
        }
      };
      button.addEventListener('click', start);
      document.body.addEventListener("keydown", start);
    });
  }
globalThis.getUserActivatedAudioContext=getUserActivatedAudioContext;
export async function initMML() {
    if (playStatement) return;
    //audioCtx = new AudioContext();
    //const url=BitArrow.runtimePath+"lib/mml.js"
    //const getUserActivatedAudioContext=await import(BitArrow.runtimePath+"lib/audioCtx.js");
    audioCtx=await getUserActivatedAudioContext();
    //mod=await import(url);
    playStatement=await initPlayStatement();
    return mod;
}
export async function initPlayStatement() {
    if (playStatement)return playStatement;
    const rl=await loadRhysmLiteralSet();
    const waves=await loadWaves();
    playStatement = new mod.PlayStatement(audioCtx, mod.standardLiteralSet, rl, waves);
    return playStatement;
}
let playback;
export async function play(...mmls/*:string[]*/) {
  playback=await playStatement.play(...mmls);
  console.log("playStatement", playStatement, playback);
}
export function playTime() {
  return playStatement?.remainTime || 0;
}
export function playStop() {
  return playStatement?.stop();
}
export async function loadRhysmLiteralSet() {
    if (rhysmLiteralSet)return rhysmLiteralSet;
    const files=`maou_se_inst_bass02.wav
maou_se_inst_bass02_cut.wav
maou_se_inst_drum1_cymbal.wav
maou_se_inst_drum1_hat.wav
maou_se_inst_drum2_kick.wav
maou_se_inst_drum2_snare.wav
maou_se_inst_drum2_tom1.wav
maou_se_inst_guitar09.wav
maou_se_inst_guitar13.wav
maou_se_inst_piano2_6ra.wav`.split(/\r?\n/);
    const wavs=new Map();
    for (let file of files) {
        const a/*:ArrayBuffer*/=await fetch(`${BitArrow.runtimePath}/sounds/${file}`).then(r=>r.arrayBuffer());
        const buf=await mod.oscillator.bufferedWaveformOfFile(audioCtx, a, 440);
        wavs.set(file, buf);
    }
    const set=new Map/*<string, Waveform>*/();
    set.set("b",wavs.get("maou_se_inst_drum2_kick.wav"));
    set.set("s",wavs.get("maou_se_inst_drum2_snare.wav"));
    set.set("m",wavs.get("maou_se_inst_drum2_tom1.wav"));
    set.set("c",wavs.get("maou_se_inst_drum1_cymbal.wav"));
    set.set("h",wavs.get("maou_se_inst_drum1_hat.wav"));
    rhysmLiteralSet=mod.createRhysmLiteralSet(mod.standardRhysmLiteralSetBase, set);
    return rhysmLiteralSet;
    /*
    play("@drum B バスドラム
                S スネアドラム
                M タムタム
                C シンバル
                H ハイハット")
    */
}
export async function loadWaves() {
    const files=["maou_se_inst_piano2_6ra.wav",
        "maou_se_inst_guitar09.wav",
        "maou_se_inst_guitar13.wav",
        "beep-rotmcits-com.wav",
        "bell-rotmcits-com.wav",
        "cowbell-rotmcits-com.wav",
        "harp-vsq-cojp.wav",
        "okehi-rotmcits-com.wav",];
    const wavs=[];
    for (let file of files) {
        const a=await fetch(`${BitArrow.runtimePath}/sounds/${file}`).then(r=>r.arrayBuffer());
        const buf=await mod.oscillator.bufferedWaveformOfFile(audioCtx, a, 440);
        wavs.push(buf);
    }
    return wavs;
}
