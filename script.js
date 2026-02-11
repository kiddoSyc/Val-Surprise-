// Generate floating hearts
for(let i=0;i<28;i++){
  const h=document.createElement('div');
  h.className='heart';
  h.style.left=Math.random()*100+'vw';
  h.style.animationDuration=6+Math.random()*6+'s';
  document.body.appendChild(h);
}

const createBtn = document.getElementById('createBtn');
const toInput = document.getElementById('toName');
const fromInput = document.getElementById('fromName');
const inputCard = document.getElementById('inputCard');
const messageCard = document.getElementById('messageCard');
const showName = document.getElementById('showName');
const typedText = document.getElementById('typedText');
const fromText = document.getElementById('fromText');
const music = document.getElementById('music');
const copyBtn = document.getElementById('copyBtn');

// Array of dynamic romantic phrases
const phrases = [
  'Your smile lights up my darkest days 🌙✨',
  'Every moment with you is a treasure 💖',
  'Your laugh fills my heart with joy 😍',
  'I promise to love you endlessly 💌',
  'You make every day brighter and sweeter 🍬',
  'Being with you feels like a dream come true 🌸'
];

// Generate unique message
function generateMessage(toName) {
  let message = `My dearest ${toName}, from the moment you entered my life, everything changed.\n`;
  const shuffled = phrases.sort(() => 0.5 - Math.random());
  message += shuffled.slice(0,3).join('\n') + '\n';
  message += 'I can’t imagine my life without you 💖';
  return message;
}

// Typing effect
function typeEffect(text, element, speed=35) {
  element.innerHTML='';
  let i=0;
  const interval=setInterval(()=>{
    element.innerHTML+=text.charAt(i);
    i++;
    if(i>=text.length) clearInterval(interval);
  }, speed);
}

// Read URL params
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function loadMessageFromURL() {
  const toName = getQueryParam('to');
  const fromName = getQueryParam('from');
  if(toName && fromName){
    inputCard.style.display='none';
    messageCard.style.display='block';
    showName.innerText = `${toName} 💖`;
    fromText.innerText = `— With love, ${fromName} 💌`;
    typeEffect(generateMessage(toName), typedText, 35);
    music.volume = 0.5;
    music.play().catch(()=>console.log('Autoplay blocked'));
  }
}

// On click create button
createBtn.addEventListener('click', () => {
  const toName = toInput.value.trim();
  const fromName = fromInput.value.trim();
  if(!toName || !fromName) return alert('Please fill all names ❤️');

  const url = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(toName)}&from=${encodeURIComponent(fromName)}`;

  inputCard.style.display='none';
  messageCard.style.display='block';

  showName.innerText = `${toName} 💖`;
  fromText.innerText = `— With love, ${fromName} 💌`;

  typeEffect(generateMessage(toName), typedText, 35);

  music.volume = 0.5;
  music.play().catch(()=>console.log('Autoplay blocked'));

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(url).then(()=>{
      alert('Link copied! Share it with your Valentine 💌');
    });
  };
});

// Load from URL on page load
window.onload = loadMessageFromURL;
