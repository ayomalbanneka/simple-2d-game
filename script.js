var runImage = 1;
var runWorker = 0;

var backgroundX = 0;

var score = 0;

var jumpImage = 1;
var jumpWorker = 0;

var jumpHeight = 380;

var locations = [900,2000,3000,4000,5000];
var gameStart = true;

var deadImage = 1;
var deadWorker = 0;

var gameOver = false;

var jumpSound = new Audio("jump.mp3");

var deadSound = new Audio("dead.mp3");

var runSound = new Audio("run.mp3");

function controller(event){
    
    

    if(event.which==13){
        if(gameStart){
            locations.forEach(createFlame);
            gameStart=false;
        }
        runAnimation();
        runSound.play();
    }

    

    if(event.which==32){
        if(gameStart){
            locations.forEach(createFlame);
            gameStart=false;
        }
        clearInterval(runWorker);
        jumpAnimation();
        runSound.pause();
        runSound.currentTime = 0;
        jumpSound.play();
        
    }
}

function run(){
    runImage=runImage+1;

    if(runImage==9){
        runImage=1;
    }

    document.getElementById("boy").src="Run ("+runImage+").png";
    moveBackground();
    updateScore();

}

function runAnimation(){

    if(runWorker == 0){
        runWorker = setInterval(run,100);
    }
    
    
}

function moveBackground(){
    backgroundX = backgroundX - 15;
    document.getElementById("b1").style.backgroundPositionX=backgroundX+"px";
    
}

function updateScore(){
    score = score+10;
    document.getElementById("score").innerHTML=score;

}


function jump(){
    jumpImage = jumpImage + 1;

    if(jumpImage<8){
        jumpUp();
    }

    if(jumpImage>7){
        jumpDown();
    }

    if(jumpImage==13){
        jumpImage=1;
        clearInterval(jumpWorker);
        jumpWorker=0;
        runWorker = setInterval(run,100);
        runSound.play();
    }

    document.getElementById("boy").src="Jump ("+jumpImage+").png";
    moveBackground();
    updateScore();

}

function jumpAnimation(){
    if(jumpWorker==0){
        jumpWorker = setInterval(jump,100);

    }
}



function jumpUp(){
    jumpHeight = jumpHeight - 20;
    document.getElementById("boy").style.marginTop=jumpHeight+"px";
}

function jumpDown(){
    jumpHeight = jumpHeight + 20;
    document.getElementById("boy").style.marginTop=jumpHeight+"px";
}


function createFlame(x,i){
    var flame = document.createElement("img");
    flame.src="flame.gif";
    flame.className="flame";
    flame.style.marginLeft=x+"px";
    document.body.appendChild(flame);


    var flameWorker = setInterval(() => {
        x = x - 100;
        if(x==100){
            if(jumpHeight==380){
                gameOver = true;
                clearInterval(runWorker);
                clearInterval(jumpWorker);
                deadWorker=setInterval(dead,100);
                
                runSound.pause();
                runSound.currentTime = 0;

            
                deadSound.play();

            }
        
        }
        if(gameOver){
            clearInterval(flameWorker);
        }
        if(x==-300){
            if(i==4){
                alert("You Won! Your Score : "+score+" Press ok to Restart");
                runSound.pause();
                runSound.currentTime = 0;
                location.reload();
            }
        }
        flame.style.marginLeft = x+"px";

    },200);

}

function dead(){

    deadImage=deadImage+1;
    if(deadImage==11){
        deadImage=10;
        clearInterval(deadWorker);

        alert("Game Over! Your Score :"+score+" Press Ok to Restart");
        location.reload();
    }

    document.getElementById("boy").src="Dead ("+deadImage+").png";

}
