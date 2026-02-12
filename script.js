// ================= HEART ANIMATION =================
for (let i = 0; i < 28; i++) {
  const h = document.createElement('div');
  h.className = 'heart';
  h.style.left = Math.random() * 100 + 'vw';
  h.style.animationDuration = 6 + Math.random() * 6 + 's';
  document.body.appendChild(h);
}

// ================= ELEMENTS =================
const createBtn = document.getElementById('createBtn');
const toInput = document.getElementById('toName');
const fromInput = document.getElementById('fromName');
const messageInput = document.getElementById('customMessage');

const inputCard = document.getElementById('inputCard');
const messageCard = document.getElementById('messageCard');

const showName = document.getElementById('showName');
const typedText = document.getElementById('typedText');
const fromText = document.getElementById('fromText');

const music = document.getElementById('music');
const copyBtn = document.getElementById('copyBtn');

// ================= PLAY MUSIC BUTTON =================
const playBtn = document.createElement('button');
playBtn.innerText = '🎵 Play Music';
playBtn.style.marginTop = '15px';
playBtn.style.display = 'none';
messageCard.appendChild(playBtn);

// ================= TYPING EFFECT =================
function typeEffect(text, element, speed = 35) {
  element.innerHTML = '';
  let i = 0;

  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// ================= URL PARAM =================
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ================= LOAD FROM LINK =================
function loadMessageFromURL() {
  const toName = getQueryParam('to');
  const fromName = getQueryParam('from');
  const msg = getQueryParam('msg');

  if (toName && fromName && msg) {
    inputCard.style.display = 'none';
    messageCard.style.display = 'block';

    showName.innerText = `${toName} 💖`;
    fromText.innerText = `— With love, ${fromName} 💌`;

    typeEffect(decodeURIComponent(msg), typedText, 35);
    playBtn.style.display = 'inline-block';
  }
}

// ================= CREATE BUTTON =================
createBtn.addEventListener('click', () => {
  const toName = toInput.value.trim();
  const fromName = fromInput.value.trim();
  const message = messageInput.value.trim();

  if (!toName || !fromName || !message) {
    alert('Please fill everything ❤️');
    return;
  }

  const url =
    `${window.location.origin}${window.location.pathname}` +
    `?to=${encodeURIComponent(toName)}` +
    `&from=${encodeURIComponent(fromName)}` +
    `&msg=${encodeURIComponent(message)}`;

  inputCard.style.display = 'none';
  messageCard.style.display = 'block';

  showName.innerText = `${toName} 💖`;
  fromText.innerText = `— With love, ${fromName} 💌`;

  typeEffect(message, typedText, 35);
  playBtn.style.display = 'inline-block';

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied! Share it with your Valentine 💌');
    });
  };
});

// ================= PLAY MUSIC =================
playBtn.addEventListener('click', () => {
  music.volume = 0.5;
  music.play();
  playBtn.style.display = 'none';
});

// ================= INIT =================
window.onload = loadMessageFromURL;
