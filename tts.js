//__author__ = "Ahirton Lopes"
//__copyright__ = "Copyright 2017, FCamara/Duratex"
//__credits__ = ["Ahirton Lopes"]
//__license__ = "None"
//__version__ = "1.0"
//__maintainer__ = "Ahirton Lopes"
//__email__ = "ahirtonlopes@gmail.com"
//__status__ = "Beta"

//Conector Watson TTS - Orquestrador

const watson = require('watson-developer-cloud');
const config = require('./config')
const fs = require('fs');
const player = require('play-sound')(opts = {})

const text_to_speech = watson.text_to_speech({
  username: config.TTSUsername,
  password: config.TTSPassword,
  version: 'v1'
});

let text = 'Eh nois, tamo junto, vai corintia!'

const params = {
  text: text,
  voice: config.voice,
  accept: 'audio/wav'
};

text_to_speech.synthesize(params)
  .pipe(fs.createWriteStream('output.wav'))
  .on('close', () => {
    player.play('output.wav');
  });