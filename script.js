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

// Long Romantic + Sweet message
const messageText = (toName) => 
`My dearest ${toName}, from the moment you entered my life, everything changed. 
Your smile lights up my darkest days, your laugh fills my heart with joy, 
and your love gives me a strength I never knew I had. 
I promise to cherish every moment with you, to love you endlessly, 
and to make your heart feel as safe and cherished as you make mine. 
You make every day brighter, every moment sweeter, and I can't imagine my life without you.`;

function typeEffect(text, element, speed=30) {
  element.innerHTML='';
  let i=0;
  const interval=setInterval(()=>{
    element.innerHTML+=text.charAt(i);
    i++;
    if(i>=text.length) clearInterval(interval);
  }, speed);
}

createBtn.addEventListener('click', () => {
  const toName = toInput.value.trim();
  const fromName = fromInput.value.trim();
  if(!toName || !fromName) return alert('Please fill all names ❤️');

  inputCard.style.display='none';
  messageCard.style.display='block';

  showName.innerText = `${toName} 💖`;
  fromText.innerText = `— With love, ${fromName} 💌`;

  typeEffect(messageText(toName), typedText, 35);

  // Play music after first click
  music.volume = 0.5;
  music.play().catch(()=>console.log('Autoplay blocked, user interaction required.'));
});
