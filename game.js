function randomiser(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const gameBody = document.getElementById("game-body");
const timer = document.getElementById('timer')
const maxlives = document.getElementById('max-lives')
let lives = 4
let time =60

const shotgun = new Audio('./assets/shotgun.wav')
const bgm = new Audio('./assets/bgm.mp3')

gameBody.onclick=()=>{
    shotgun.pause();
    shotgun.currentTime = 0;
    shotgun.play();
}

bgm.play();
bgm.loop = true;

function zombieGenerator(){
    let zombieImgNumber = randomiser(1,6)
    var zombie = document.createElement('img')
    let viewwidth = randomiser(20,80)
    zombie.setAttribute('src', `./assets/zombie-${zombieImgNumber}.png`);
    zombie.setAttribute('id', `zombie`);
    zombie.classList.add('zombie-image');

    zombie.onclick = () =>{
      shotgun.pause();
      shotgun.currentTime = 0;
      shotgun.play();
    }

    const zomContainer = document.getElementById('zombie-container')

    zomContainer.append(zombie)

    var zombieID = document.getElementById('zombie') 

    zombieID.style.transform = `translateX(${randomiser(20, 80)}vw)`;
    zombieID.style.animationDuration = `${randomiser(2, 6)}s`;
}

setInterval(() => {
    let zombie = document.getElementById("zombie");
    killcheck(zombie);
  },50)


function killcheck(zombieImg) {
  if (zombieImg.getBoundingClientRect().top <= 0) {
    lives-=1
    maxlives.style.width = `${lives*25}%`
    console.log(lives);
    kill(zombieImg);
  }
}

document.addEventListener('click',(e)=>{
  if(e.target.classList.contains('zombie-image')){
    kill(e.target);
  }
})

function kill(zombieImg) {
    zombieImg.remove();
    zombieGenerator();
  }

var timeInterval = setInterval(function () {
  time--;
  timer.innerHTML = time;
    if (lives === 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }

  if (time == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);

zombieGenerator()