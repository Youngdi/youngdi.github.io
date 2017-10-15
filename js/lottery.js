import Rx from 'rxjs/Rx';

function preloadImg (image) {
  var img = new Image();
  img.src = image;
}
  
// preloadImg('./images/1.jpg');
// preloadImg('./images/2.jpg');
// preloadImg('./images/3.jpg');
// preloadImg('./images/4.jpg');
// preloadImg('./images/5.jpg');
// preloadImg('./images/6.jpg');
// preloadImg('./images/7.jpg');
// preloadImg('./images/8.jpg');
// preloadImg('./images/9.jpg');
// preloadImg('./images/10.jpg');
// preloadImg('./images/question.jpg');
// preloadImg('./images/baker.jpg');

const nameList = [
    { src: './images/1.jpg', name: '史考特' },
    { src: './images/2.jpg', name: '立涵' },
    { src: './images/3.jpg', name: '先豪' },
    { src: './images/4.jpg', name: '辰豪' },
    { src: './images/5.jpg', name: '筱涵' },
    { src: './images/6.jpg', name: '士豪' },
    { src: './images/7.jpg', name: '鄭立文' },
    { src: './images/8.jpg', name: '大寶哥' },
    { src: './images/9.jpg', name: '祐誠' },
    { src: './images/10.jpg', name: '維尼' },
    { src: './images/1.jpg', name: '史考特' },
    { src: './images/2.jpg', name: '立涵' },
    { src: './images/3.jpg', name: '先豪' },
    { src: './images/4.jpg', name: '辰豪' },
    { src: './images/5.jpg', name: '筱涵' },
    { src: './images/6.jpg', name: '士豪' },
    { src: './images/7.jpg', name: '鄭立文' },
    { src: './images/8.jpg', name: '大寶哥' },
    { src: './images/9.jpg', name: '祐誠' },
    { src: './images/10.jpg', name: '維尼' },
    { src: './images/1.jpg', name: '史考特' },
    { src: './images/2.jpg', name: '立涵' },
    { src: './images/3.jpg', name: '先豪' },
    { src: './images/4.jpg', name: '辰豪' },
    { src: './images/5.jpg', name: '筱涵' },
    { src: './images/6.jpg', name: '士豪' },
    { src: './images/7.jpg', name: '鄭立文' },
    { src: './images/8.jpg', name: '大寶哥' },
    { src: './images/9.jpg', name: '祐誠' },
    { src: './images/10.jpg', name: '維尼' },
];
const start = document.getElementById('arm');
const stop = document.getElementById('stop');
const startClick = Rx.Observable.fromEvent(start, 'click');
const stopClick = Rx.Observable.fromEvent(stop, 'click');
const timer = speed => Rx.Observable.timer(speed);
const source = RandomNumbers => Rx.Observable
    .interval(100)
    .take(RandomNumbers)
    .map(e => timer(e * 10).map(() => e))
    .concatAll()
    .takeUntil(stopClick)
    .do({
      next: (e) => {
        const top = e * -300;
        const imgNumbers = $('#slotmachine img').length;
        let lastNumber = localStorage.getItem('lastNumber');
        if (imgNumbers == 1) {
          localStorage.setItem('firstTime', true);
        }
        if (localStorage.getItem('firstTime') == 'true') {
          const imgElement = document.createElement('img');
          imgElement.src = nameList[e % 30].src;
          imgElement.name = nameList[e % 30].name;
          imgElement.class = 'color';
          document.getElementById('slotmachine').appendChild(imgElement);
          localStorage.setItem("countLastNumber", e % 30);
        } else {
          if (imgNumbers < 60) {
            const imgElement = document.createElement('img');
            imgElement.src = nameList[(e + (+lastNumber) +1) % 30].src;
            imgElement.name = nameList[(e + (+lastNumber) +1) % 30].name;
            imgElement.class = 'color';
            document.getElementById('slotmachine').appendChild(imgElement);
            localStorage.setItem("countLastNumber", (e + (+lastNumber) +1) % 30);
          }
        }
        if (imgNumbers < 20) {
          TweenLite.to($('#slotmachine'), 1 , { ease: Bounce.easeOut, y: top - 300 });
        } else if (imgNumbers > 20 && imgNumbers < 30){
          TweenLite.to($('#slotmachine'), 1.5 , { ease: Bounce.easeOut, y: top - 300 });
        } else {
          TweenLite.to($('#slotmachine'), 2 , { ease: Bounce.easeOut, y: top - 300 });
        }
        $('.colorRed').removeClass('colorRed');
        $(`#circle_0${e % 30}`).addClass('colorRed');
      },
      complete: () => {
        localStorage.setItem("lastNumber", localStorage.getItem("countLastNumber"));
        localStorage.setItem("firstTime", false);
        $('#arm').removeClass('disabledButton');
        setTimeout(() => {
          $('.front').css("background", `url(${$('.colorRed')[0].src})`);
          alert($('.colorRed')[0].name);
        }, 2500);
      },
    });
startClick
  .map(() => {
    $('.front').css("background", `url(./images/question.jpg)`);
    $('#arm').addClass('clicked');
    $('#arm')[0].disabled = true;
    TweenLite.to($('#slotmachine'), 0.5, { ease: Power0.easeNone, y: 0 });
    const RandomNumbers = Math.floor(Math.random() * 10) + 40;
    return source(RandomNumbers);
  })
  .delay(1000)
  .concatAll()
  .subscribe({
    next: () => {
      $('#arm').removeClass('clicked');
      $('#arm').addClass('disabledButton');
    },
    complete: () => {
      $('#arm').removeClass('disabledButton');
    },
  })
;
