const slider = document.querySelector('.slider');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = false;
const intervalTime = 5000;
let slideInterval;


let style = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(style);
// Generate CSS
function createClass(name,rules){
  if(!(style.sheet||{}).insertRule) 
      (style.styleSheet || style.sheet).addRule(name, rules);
  else
      style.sheet.insertRule(name+"{"+rules+"}",0);
}


for (let i = 0; i < data.length; i++) {
  const element = data[i];

  let content = document.createElement('div');
  content.className = 'content';
  let title = document.createElement('h1');
  if (element.title !== null) {
    let titleText = document.createTextNode(element.title);
    title.appendChild(titleText);
  }

  let p = document.createElement('p');
  if (element.desc !== null) {
    let descText = document.createTextNode(element.desc);
    p.appendChild(descText);
  }
  content.appendChild(title);
  content.appendChild(p);

  let slide = document.createElement('div');
  if (i == 0) {
    slide.className = 'slide load current ';
  } else if (i == 1) {
    slide.className = 'slide load';
  } else {
    slide.className = 'slide';
  }
  slide.appendChild(content);

  slider.appendChild(slide);
  createClass(`.slide:nth-child(${i+1}).load`,`background: url('./images/${element.image}') no-repeat center center/cover;`);  
}

const slides = document.querySelectorAll('.slide');

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