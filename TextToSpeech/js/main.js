// init speach api
const  synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// init voices array
let voices = [];

const getVoices = () => {
	console.log(synth);
	voices = synth.getVoices();
	console.log(voices);

	voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if(synth.onvoiceschanged !== undefined)
{
	synth.onvoiceschanged = getVoices;
}

const speak = () =>{
	// check if speaking
	if (synth.speaking) 
	{
		console.error('Already speaking kurwa');
		return;
	}
	if(textInput.value != '')
	{
		const speakText = new SpeechSynthesisUtterance(textInput.value);
		// speak end
		speakText.onend = d =>
		{
			console.log('Done speaking');
		}
		speakText.onend = d =>
		{
			console.error('kur');
		}

		const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      	'data-name'
    	);

		voices.forEach(voice => {
      		if (voice.name === selectedVoice) {
        	speakText.voice = voice;
      		}
    	});

    	speakText.rate = rate.value;
    	speakText.pitch = pitch.value;

    	synth.speak(speakText);
	}
}

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());