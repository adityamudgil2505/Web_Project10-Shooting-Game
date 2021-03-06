var cartoon = $('.cartoon');
var score = $('.score');
var playGround=$('.playGround');
var play = $('#play');
var replay = $('#replay');
var timer = 10000;
var timeUp = false;
var setting = $('.setting');
var level = [{min:500, max:800},{min:300, max:600}, {min:100, max:400}];
var levelVal=0;
// var hScore = {
//   0: "0",
//   1: "0",
//   2: "0"
// };
//  console.log(cartoon);
// random numnber generator
var randomGen = (min, max) => Math.random() * (max - min) + min;

function randomCartoon() {
  return randomGen(0, 5).toFixed();
}

function randomTime(a,b) {
  return randomGen(a, b);
}

function peep(hole) {
  let cartoonIndex = randomCartoon();
  let time = randomTime(level[levelVal-1].min,level[levelVal-1].max);
  if(timeUp){return}
  if(hole == cartoonIndex)  return peep(cartoonIndex);
  $(cartoon).eq(cartoonIndex).attr('class', 'cartoon_full');
  setTimeout(_ => {
      $(cartoon).eq(cartoonIndex).attr('class', 'cartoon');
      return peep(cartoonIndex);
    }, time);
}
//  start GamePlay
 //peep(randomCartoon());
function startGame()
{  timeUp=false;
   timer = $(".time").children("option:selected").val();
   levelVal = $(".levels").children("option:selected").val();
   console.log(timer);
   console.log(typeof(timer));
   peep(randomCartoon());
   setTimeout(()=>{
    timeUp=true;
    setting.fadeIn(500);
    // checking highscore
    checkHS();
   },timer);
}
// on hit
$(cartoon).on('click',(e)=>{
  let points = score.text();
  points++;
  score.text(points);
});
// on click playground
$('.playGround').on('click',(e)=>{
  console.log(e);
  let x = e.clientX;
  let y = e.clientY;
  createHole(x,y);
  e.stopPropagation();
});
// creating hole
function createHole(x,y)
{ var hole ;
  d = $("<img>", {src:"img/bullet_hole.png", class:"hole"});
  $("body").append(d);
  d.css({
    "position":"absolute",
    "left":x-20+"px",
    "top":y-18+"px",
  });
  setTimeout(()=>{
    d.fadeOut(500);
  },500);
}
// on play
play.on('click',_=>{
  setting.fadeOut(500);
  setTimeout(()=>{
    startGame()
  },2000);  
});
// on replay
replay.on('click',_=>{
  score.text(0)
  setTimeout(()=>{
    startGame()
  },2000);  
});

// changing value of Level
$(".levels").change(function () {
  updateHSBar();
  console.log("changed");
});

// storing HS in local storage
updateHSBar();
function updateHSBar()
{ let obj = JSON.parse(window.localStorage.getItem('user'));
  if(obj==null)
  { $('.highScore').text(0);
    let obj = {
      1:"0",
      2:"0",
      3:"0"
    } 
    window.localStorage.setItem('user', JSON.stringify(obj));
  }
  else
  { $('.score').text("0");
    $('.highScore').text(obj[$('.levels').val()]);
  }
}
// check highScore
function checkHS()
{ let currentScore = $('.score').text();
  let currentHighScore = $('.highScore').text();
  if(Number(currentScore)>Number(currentHighScore))
  { console.log("HS");
    $('.highScore').text(currentScore);
    let obj = JSON.parse(window.localStorage.getItem('user'));
    obj[levelVal] = currentScore;
    window.localStorage.setItem('user', JSON.stringify(obj));
    updateHSBar();
  }
}