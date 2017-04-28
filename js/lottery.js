import Rx from 'rxjs/Rx';

const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const name = ['blue', 'red', 'yellow', 'green', 'black', 'white', 'gray', 'pink', '#3D262A', '#127C56'];
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
];
const start = document.getElementById('arm');
const stop = document.getElementById('stop');
const startClick = Rx.Observable.fromEvent(start, 'click');
const stopClick = Rx.Observable.fromEvent(stop, 'click');
const timer = speed => Rx.Observable.timer(100 + speed);
const source = RandomNumbers => Rx.Observable
    .interval(100)
    .take(RandomNumbers)
    .map(e => timer(e * 10).map(() => e))
    .concatAll()
    .takeUntil(stopClick)
    .do({
      next: (e) => {
        // const slot = Math.floor(Math.random() * 20);
        // const top = -slot * 300;
        const top = e * -300;
        if ($('#slotmachine img').length < 50) {
          const imgElement = document.createElement('img');
          imgElement.src = nameList[e % 20].src;
          imgElement.name = nameList[e % 20].name;
          imgElement.class = 'color';
          document.getElementById('slotmachine').appendChild(imgElement);
        }
        TweenLite.to($('#slotmachine'), 2.5, { ease: Bounce.easeOut, y: top - 300 });
        $('.colorRed').removeClass('colorRed');
        // const maxNum = e;
        // const minNum = 0;
        // const index = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        // $('#reel')[0].src = nameList[index % nameList.length].src;

        // $(`#circle_0${colors[index]}`).addClass('colorRed');
        $(`#circle_0${e % 20}`).addClass('colorRed');
      },
      complete: () => {
        $('#arm').removeClass('disabledButton');
        // TweenLite.to($('#slotmachine'), 2.5, { ease: Bounce.easeOut, y: top });
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
    //setTimeout(() => { arm.removeClass; }, 500);
    TweenLite.to($('#slotmachine'), 0.5, { ease: Power0.easeNone, y: 0 });
    const RandomNumbers = Math.floor(Math.random() * 10) + 30;
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
