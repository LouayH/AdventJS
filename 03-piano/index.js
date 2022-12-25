const soundEffects = [
  './audio/w-key-01.mp3',
  './audio/w-key-02.mp3',
  './audio/w-key-03.mp3',
  './audio/w-key-04.mp3',
  './audio/w-key-05.mp3',
  './audio/w-key-06.mp3',
  './audio/w-key-07.mp3',
  './audio/w-key-08.mp3',
  './audio/w-key-09.mp3',
  './audio/w-key-10.mp3',
  './audio/w-key-11.mp3',
  './audio/w-key-12.mp3',
  './audio/w-key-13.mp3',
  './audio/b-key-01.mp3',
  './audio/b-key-02.mp3',
  './audio/b-key-03.mp3',
  './audio/b-key-04.mp3',
  './audio/b-key-05.mp3',
  './audio/b-key-06.mp3',
  './audio/b-key-07.mp3',
  './audio/b-key-08.mp3',
  './audio/b-key-09.mp3',
  './audio/b-key-10.mp3',
];

const whiteKeys = document.querySelectorAll(".white-keys");
const blackKeys = document.querySelectorAll(".black-keys");
const playButton = document.querySelector(".play");

const play = (e, soundEffect) => {
  e.preventDefault();
  
  if(!soundEffect.paused) {
    soundEffect.pause();
    soundEffect.currentTime = 0;
  }
  
  soundEffect.play();
}

function sleep(milisec) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, milisec);
  })
}

async function playHappyBirthday() {
  this.setAttribute("hidden", true);

  const notes = [
    {
      key: whiteKeys[4],
      length: 200,
    },
    {
      key: whiteKeys[4],
      length: 200,
    },
    {
      key: whiteKeys[5],
      length: 500,
    },
    {
      key: whiteKeys[4],
      length: 500,
    },
    {
      key: whiteKeys[7],
      length: 500,
    },
    {
      key: whiteKeys[6],
      length: 1500,
    },
    {
      key: whiteKeys[4],
      length: 200,
    },
    {
      key: whiteKeys[4],
      length: 200,
    },
    {
      key: whiteKeys[5],
      length: 500,
    },
    {
      key: whiteKeys[4],
      length: 500,
    },
    {
      key: whiteKeys[8],
      length: 500,
    },
    {
      key: whiteKeys[7],
      length: 1500,
    },
    {
      key: whiteKeys[4],
      length: 200,
    },
    {
      key: whiteKeys[4],
      length: 200,
    },
    {
      key: whiteKeys[11],
      length: 500,
    },
    {
      key: whiteKeys[9],
      length: 500,
    },
    {
      key: whiteKeys[7],
      length: 500,
    },
    {
      key: whiteKeys[6],
      length: 500,
    },
    {
      key: whiteKeys[5],
      length: 1000,
    },
    {
      key: whiteKeys[10],
      length: 200,
    },
    {
      key: whiteKeys[10],
      length: 200,
    },
    {
      key: whiteKeys[9],
      length: 500,
    },
    {
      key: whiteKeys[7],
      length: 500,
    },
    {
      key: whiteKeys[8],
      length: 500,
    },
    {
      key: whiteKeys[7],
      length: 1500,
    },
  ];

  for (let i = 0; i < notes.length; i++) {
    await sleep(50);
    notes[i].key.dispatchEvent(new CustomEvent("click"));
    notes[i].key.classList.add('clicked');
    
    await sleep(notes[i].length);
    notes[i].key.classList.remove('clicked');
  }

  this.removeAttribute("hidden");
}

onload = () => {
  whiteKeys.forEach((whiteKey, wIndex) => {
    const soundEffect = new Audio(soundEffects[wIndex]);
    whiteKey.addEventListener('click', (e) => play(e, soundEffect));
  });

  blackKeys.forEach((blackKey, index) => {
    const bIndex = index + whiteKeys.length;
    const soundEffect = new Audio(soundEffects[bIndex]);
    blackKey.addEventListener('click', (e) => play(e, soundEffect));
  });

  playButton.addEventListener('click', playHappyBirthday);
}