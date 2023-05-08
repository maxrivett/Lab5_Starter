// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById('voice-select');
  const faceImage = document.querySelector('#explore img');
  const textToSpeak = document.getElementById('text-to-speak');
  const pressToTalkButton = document.querySelector('#explore button');
  let voices = [];

  // From SpeechSynthesis
  function populateVoiceList() {
    voices = synth.getVoices();
  
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  pressToTalkButton.addEventListener('click', () => {
    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);

    const utterThis = new SpeechSynthesisUtterance(textToSpeak.value);
    utterThis.voice = selectedVoice;

    faceImage.src = 'assets/images/smiling-open.png';

    utterThis.onend = () => {
      faceImage.src = 'assets/images/smiling.png';
    };

    synth.speak(utterThis);
  });
}