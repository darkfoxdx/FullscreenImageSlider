const slider = document.querySelector('.slider');
const intro = document.querySelector('.intro');
const main = document.querySelector('.main');
const start = document.querySelector('#start');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = false;
const intervalTime = 5000;
let json;
let slideInterval;

if (typeof data !== 'undefined' && data !== null) {
  json = data;
} else if  (typeof sample !== 'undefined' && sample !== null) {
  json = sample;
} 

let style = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(style);
// Generate CSS
function createClass(name,rules){
  if(!(style.sheet||{}).insertRule) 
      (style.styleSheet || style.sheet).addRule(name, rules);
  else
      style.sheet.insertRule(name+"{"+rules+"}",0);
}

let introText = document.createTextNode(json.intro);
intro.appendChild(introText);

for (let i = 0; i < json.content.length; i++) {
  const element = json.content[i];

  let content = document.createElement('div');
  content.className = 'content';
  let title = document.createElement('h1');
  if (element.title !== null) {
    let titleText = document.createTextNode(element.title);
    title.appendChild(titleText);
  }

  let p = document.createElement('p');
  if (element.desc !== null) {
    p.innerHTML = linkify(element.desc);
  }
  content.appendChild(title);
  content.appendChild(p);

  let slide = document.createElement('div');
  if (i === 0) {
    slide.className = 'slide load';
  } else if (i === 1) {
    slide.className = 'slide load';
  } else {
    slide.className = 'slide';
  }
  slide.appendChild(content);

  slider.appendChild(slide);
  createClass(`.slide:nth-child(${i+1}).load`,`background: url('${element.image}') no-repeat center center/contain;`);  
}

const slides = document.querySelectorAll('.slide');

const startSlide = () => {
  slides[0].classList.add('current');
  main.style.visibility = 'hidden'
  prev.style.visibility = 'visible';
  next.style.visibility = 'visible';
}

const nextSlide = () => {
  // Get current class
  const current = document.querySelector('.current');
  // remove current class
  current.classList.remove('current');
  // Check for next slide
  if(current.nextElementSibling) {
    // Add current to next sibling
    current.nextElementSibling.classList.add('current');
    if (current.nextElementSibling.nextElementSibling) {
      current.nextElementSibling.nextElementSibling.classList.add('load');
    }
  } else {
    // Add current to start
    slides[0].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
  // Get current class
  const current = document.querySelector('.current');
  // remove current class
  current.classList.remove('current');
  // Check for prev slide
  if(current.previousElementSibling) {
    // Add current to next sibling
    current.previousElementSibling.classList.add('current');
  } else {
    // Add current to last
    slides[slides.length - 1].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

// Button events
start.addEventListener('click', e => {
  startSlide();
});

next.addEventListener('click', e => {
  nextSlide();
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);

  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);

  }

});

// Auto slide
if(auto) {
  // Run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}

function linkify(inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
}