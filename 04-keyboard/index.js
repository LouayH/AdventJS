let jiggledKey;
const keys = document.querySelectorAll("button[data-key]");

const jiggleRandomKey = () => {
  const randomIndex = Math.floor(Math.random() * keys.length);

  keys.forEach((key, index) => {
    key.classList.remove('pressed');

    if(randomIndex === index) {
      jiggledKey = key.getAttribute('data-key');
      key.classList.add('jiggle');
    } else {
      key.classList.remove('jiggle');
    }
  })
};

const checkJiggledKey = (e) => {
  if(jiggledKey === e.code) {
    jiggleRandomKey();
  } else {
    keys.forEach((key) => {
      if(key.getAttribute('data-key') === e.code) {
        key.classList.add('pressed');
      } else {
        key.classList.remove('pressed');
      }
    });
  }
}

onload = () => {
  jiggleRandomKey();
  document.addEventListener('keydown', checkJiggledKey)
}
