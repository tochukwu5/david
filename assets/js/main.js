




(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }



  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})();


// hero section greeting

let text; // for speech synthesis

const time = new Date().getHours();
let greeting;
if (time < 12) {
  text = " Good morning, I am david, you are welcome to my portfolio website, feel free to contact me";
  greeting = "Hi, Good morning I'm David";
} else if (time < 16) {
  text = " Good afternoon, I am david, you are welcome to my portfolio website, feel free to contact me";
  greeting = "Hi, Good afternoon I'm David";
} 
else if (time < 18) {
  text = " Good day, I am david, you are welcome to my portfolio website, feel free to contact me";
  greeting = "Hi, Good day I'm David";
} else {
  text = " Good evening, I am david, you are welcome to my portfolio website, feel free to contact me";
  greeting = "Hi, Good evening I'm David";
}
document.getElementById("demo").innerHTML = greeting;




const speakNow = () => {

// Check if Speech Synthesis supported

if ("speechSynthesis" in window) {

const msg = new SpeechSynthesisUtterance();

msg.pitch = 0.7;

msg.rate = 0.7;

msg.text = text;

window.speechSynthesis.speak(msg);

} 
};
window.onload = speakNow()



//hero section ripple button
const buttons = document.querySelectorAll("a");
buttons.forEach((button) => {
  button.onclick = function (e) {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let ripple = document.createElement("span");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    this.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };
});


//message confirmation
const form = document.querySelector('form');
const msg = document.querySelector('.contact .php-email-form .sent-message');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');




form.addEventListener('submit', onsubmit);
function onsubmit(e){
  e.preventDefault;
  msg.style.padding = '7px';
  msg.classList.add('.sent-message');
  msg.innerHTML = 'Your message has been sent. Thank you!';
  setTimeout(() => msg.remove(), 3000);
}

//for dark-theme toggle

const toggle = document.getElementById('switch')

toggle.onclick = function(){
 document.body.classList.toggle('light-theme')
 const bg = document.querySelectorAll('.section-bg');
const p = document.querySelectorAll('.test-p');
  
 if(document.body.classList.contains('light-theme')){
  bg.forEach(bg => bg.style.backgroundColor = '#f5f8fd');
p.forEach(p =>(p.style.boxShadow = '0px 2px 15px #0000001a'));

 }else{
  bg.forEach(bg => bg.style.backgroundColor = 'var(--dark)');
  document.querySelector('.dark').style.color = '#fff'
  p.forEach(p =>(p.style.boxShadow = '0px 2px 15px black'));


 }  
}

// for the sticky nav bar
const nav = document.querySelector('.nav1')
const content = document.querySelector('.content2')
content.style.display = 'none'
window.addEventListener('scroll', fixNav)
function fixNav(){
if(window.scrollY > nav.offsetHeight + 250){
  nav.classList.add('nav2')
     content.style.display = 'block'
}else if(window.scrollY < nav.offsetHeight){
  nav.classList.remove('nav2')
  content.style.display = 'none'

}
}

const myTags = [
  'JavaScript', 'CSS',
   'HTML', 'React',
    'Git', 'Boostrap',
  'Tailwindcss', 'Effective communication'
  
];

var tagCloud = TagCloud('.content-skills', myTags,{

// radius in px
radius: 165,

// animation speed
// slow, normal, fast
maxSpeed: 'fast',
initSpeed: 'fast',

// 0 = top
// 90 = left
// 135 = right-bottom
direction: 135,

// interact with cursor move on mouse out
keep: true

});
