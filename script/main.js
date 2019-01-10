var cartoon = $('.cartoon');
var score = $('.score');
var playGround=$('.playGround');
var play = $('#play');
var replay = $('#replay');
var timer = 10000;
var timeUp = false;
//  console.log(cartoon);
// random numnber generator
var randomGen = (min, max) => Math.random() * (max - min) + min;

function randomCartoon() {
  return randomGen(0, 5).toFixed();
}

function randomTime() {
  return randomGen(500, 1000);
}

function peep(hole) {
  let cartoonIndex = randomCartoon();
  let time = randomTime();
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
   peep(randomCartoon());
   setTimeout(()=>{
    timeUp=true;
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