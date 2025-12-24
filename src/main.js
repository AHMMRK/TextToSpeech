//Init SpeechSynth API
const synth = window.speechSynthesis;

//Dom Element
const body = document.body;
const form = document.querySelector('form');
const input = document.querySelector('#text-input');
const rateInput = document.querySelector('#rate-range');
const pitchInput = document.querySelector('#pitch-range');
const rateValue = document.querySelector('#rate-value');
const pitchValue = document.querySelector('#pitch-value');
const selectVoice = document.querySelector('#select-container');

//Get Voices
let voices = [];

const getVoice = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {
    //create option
    const option = document.createElement('option');

    //Fill option with names
    option.textContent = voice.name + '(' + voice.lang + ')';

    //Add attributes to option
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);

    //Append Child
    selectVoice.appendChild(option);
  });
}

getVoice();
if(synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoice;
}

const speak = () => {
  //If speaking
  if(synth.speaking) {
    console.error('Already Speaking...');
    return;
  }

  //If input value isn't empty
  if(input.value !== '') {
    //Get new text
    const speakText = new SpeechSynthesisUtterance(input.value);

    //Set background wave
    body.style.background = "#141414 url('./public/wave.gif')";
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundRepeat = 'repeat-x';

    //Speak end
    speakText.onend = e => {
      console.log('Done Speaking....');
      body.style.background = '#141414';
    }

    //Speak Error
    speakText.onerror = e => {
      console.log('Something went wrong');
    }

    //Get Voice
    const selectedVoice = selectVoice.selectedOptions[0].getAttribute('data-name');
    
    //Loop through the voices
    voices.forEach(voice => {
      if(voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    })

    //Set rate and pitch
    speakText.rate = rateInput.value;
    speakText.pitch = pitchInput.value;

    //Speak
    synth.speak(speakText);
  }
}

//Event Listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  speak();
  input.blur();
})

//Rate value changed
rateInput.addEventListener('change', e => rateValue.textContent = rateInput.value);

//Pitch value changed
pitchInput.addEventListener('change', e => pitchValue.textContent = pitchInput.value);