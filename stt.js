//__author__ = "Ahirton Lopes"
//__copyright__ = "Copyright 2017, FCamara/Duratex"
//__credits__ = ["Ahirton Lopes"]
//__license__ = "None"
//__version__ = "1.0"
//__maintainer__ = "Ahirton Lopes"
//__email__ = "ahirtonlopes@gmail.com"
//__status__ = "Beta"

//Conector Watson STT - Orquestrador

const watson = require('watson-developer-cloud');
const mic = require('mic');
const config = require('../config.js');

const micParams = {
  rate: 44100,
  channels: 2,
  debug: false,
  exitOnSilence: 6
}
const micInstance = mic(micParams);
const micInputStream = micInstance.getAudioStream();
micInstance.start();

console.log('Durabot está escutando, você pode falar agora.');

const speechToText = watson.speech_to_text({
  username: config.STTUsername,
  password: config.STTPassword,
  version: 'v1'
});

const textStream = micInputStream.pipe(
  speechToText.createRecognizeStream({
    content_type: 'audio/l16; rate=44100; channels=2'
  })).setEncoding('utf8');

textStream.on('data', (user_speech_text) => {
  console.log('Durabot escuta:', user_speech_text);
});