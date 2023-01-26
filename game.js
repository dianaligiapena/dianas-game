const startButton = document.getElementById("start-button");


const startedGameDiv = document.getElementById("startedGame");


let string = `
Hello, dear. -
Meow you doin'?-
Let me introduce myself. I am Steve Paws, the international cat genius.-
-
I've heard that you and 4 colleagues of yours are looking for help to finish an Ironhack lab. -
-
Today I will provide you an opportunity to help your team and to bear witness to my amazing web development skills. 
--
In order to get this chance you will first have to pass a test designed by me and my associate, the charming Dancing Paws.
--
The test consists of 5 rounds. -
Each round begins when the song starts and you will see on the right side generated passcodes showing on your team’s laptops’ screens.
--
What you have to do is:-
1. chose one laptop's passcode-
2. type it until the song stops, which is less than 5 seconds.-
-
If you succeed one laptop will be unlocked.-
The test is passed after you unlock all laptops.-
-
One thing I forgot to tell you… Dancing Paws will try to draw your attention by dancing to the music around the laptops. And also by being really cute.
--
So, let's start the test. -
It's meow or never.

`;
let running;
const str = string.split("");
const el = document.getElementById('cat-words');
let i = string.length; 
let scrollY = 0;
(function animate2() {

    if ( i >= 0 ) {
        i--;

        scrollY += 50 ;

        el.scrollTo( 0 , scrollY );
    }


    if ( str.length > 0 ) {
        if (str[0] === '-') {
            el.innerHTML += "<br />" ;
            str.shift();
        }
        else {el.innerHTML += str.shift();}
    }
    else {
        startButton.style.visibility = "visible";
        clearTimeout(running);
    }
    


    running = setTimeout(animate2, 60 ); /// 60
})();

const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext("2d");

const timeDisplay = document.getElementById('time');
const wordInput = document.getElementById('word-input');

document.getElementById('start-button').onclick = () => { 
    startedGameDiv.style.visibility = "visible";
    animate();
    wordInput.focus();
};

const catImg = new Image();
catImg.src = 'images/cat5.png';

let laptopImg = new Image();
laptopImg.src = 'images/laptop.png';

//----------   variables
let level = 1;
let time = 5; 
let currWord; 
let wordsGame; 
let currentWordTyped;
let win = false;
let winLoseId;
let gameTimeout;
let levelTimeout;
let intervalId; // countdown

let laptop = {
    x: 100 ,
    y: 100 ,
    w: 70 ,
    h: 70 ,
}

let cat = {
    x: 0 , 
    y: 0 , 
    w: 60 ,
    h: 60 ,
};

let center = {
    x: 225 ,
    y: 225 ,
};

let word = {
    x: 0 ,
    y: 0 ,
}

let speed = 1 ; let speed2;
let radius = 200 ; let radius2;
let angle = 1 ; let angle2;
let newX; let newX2; 
let newY; let newY2;

let timeoutKittyCircle;

//----------  FUNCTION: LEVEL
function levelGame() {   
    
    clearTimeout(gameTimeout);
    clearTimeout(winLoseId); 
    clearTimeout(levelTimeout);

    clearInterval(timeoutKittyCircle);
    clearInterval(intervalId);

    level = 1;
    time = 5;

    animate(); 
}

function animate() {   
    clearTimeout(gameTimeout);
    clearTimeout(winLoseId); 
    clearTimeout(levelTimeout);

    wordInput.value = '';
    ctx.clearRect(0,0,500,500);
    ctx.font = ' bold 18px Verdana sans-serif '; 
    time = 5;
    win = false;

    wordsGame = getWords(words); // GET WORDS

    if (level === 1) { // DRAWING 
        let speed = 1 ;
        let radius = 190 ;
        let angle = 1 ;

        function animateKittyCircle() {

            ctx.clearRect( 0 , 0 , myCanvas.width , myCanvas.height );

            newX = radius * Math.cos(angle * (Math.PI/180)) ;
            newY = radius * Math.sin(angle * (Math.PI/180)) ;
    
            cat.x = newX + center.x ;
            cat.y = newY + center.y ;
    
            ctx.drawImage(catImg , cat.x , cat.y , cat.w , cat.h );
    
            angle += speed;
    
            let laptop = {
                x: 0 ,
                y: 0 ,
                w: 100 ,
                h: 100 ,
            }
    
            radius2 = 100 ;
            angle2 = 0 ;
    
            for (let i = 0; i < wordsGame.length; i++) {
               
                newX2 = radius2 * Math.cos(angle2 * (Math.PI/180)) ;
                newY2 = radius2 * Math.sin(angle2 * (Math.PI/180)) ;
    
                laptop.x = newX2 + center.x - 20 ;
                laptop.y = newY2 + center.y - 20 ;
    
                ctx.drawImage( laptopImg, laptop.x  , laptop.y , laptop.w, laptop.h );
    
                ctx.font = ' bold 14px Verdana sans-serif '; 
    
                word.x = laptop.x + laptop.w / 4 + 5 ;
                word.y = laptop.y + laptop.h / 3 + 5 ;
    
                let textWidth = ctx.measureText(wordsGame[i]).width;
                if (textWidth > laptop.w - 45 ) {
                   ctx.font = " bold 9px  Verdana";
                   word.x -= 10 ;
                   word.y -= 2 ;
                }
    
                ctx.fillText( wordsGame[i] , word.x  , word.y );
                ctx.textAlign = "start";      
                
                angle2 += 72 ;
            
            }

            
        };
    
        timeoutKittyCircle = setInterval( animateKittyCircle , 10 );
    };

    // if (level === 2) {
    //     ctx.drawImage(boxImg, xBox + 30 , yBox , wBox, hBox);
    //     ctx.drawImage(boxImg, xBox + 200 , yBox , wBox, hBox);
    //     ctx.drawImage(boxImg, xBox + 30  , yBox + 150 , wBox, hBox);
    //     ctx.drawImage(boxImg, xBox + 200 , yBox + 150, wBox, hBox);

    //     ctx.fillText(currentWordsArray[0],xBox + 50, yBox); 
    //     ctx.fillText(currentWordsArray[1],xBox + 220 , yBox); 
    //     ctx.fillText(currentWordsArray[3],xBox + 50  , yBox + 150 ); 
    //     ctx.fillText(currentWordsArray[4],xBox + 220 , yBox + 150); 

    //     wCat = 70; hCat = 70; 
    //     xCat = myCanvas.width/5 - 50;
    //     yCat = myCanvas.height * (8/10);

    //     function drawKittens() {
    //         ctx.drawImage(catImg, xCat + 30 , yCat, wCat , hCat );
    //         ctx.drawImage(catImg, xCat + 80 , yCat, wCat  , hCat );
    //         ctx.drawImage(catImg, xCat + 130 , yCat, wCat  , hCat );
    //         ctx.drawImage(catImg, xCat + 180 , yCat, wCat  , hCat );
    //         ctx.drawImage(catImg, xCat + 230 , yCat, wCat  , hCat );
    //     }

    //     function moveMyKittens() {
    //         ctx.clearRect(0, 400, 500, 400);

    //         drawKittens();

    //         if (moveCatLeft) {
    //             if ( xCat > 5 ) { xCat -= 5 ; }
    //             else { moveCatLeft = false; moveCatRight = true;  }
    //         }

    //         if (moveCatRight) {
    //             if (  xCat + 330 < myCanvas.width ) { xCat += 5 ; }
    //             else {  moveCatLeft = true; moveCatRight = false; }
    //         }          
    //     }

    //     moveCatLeft = true;
    //     moveCatRight = false;

    //     catMoveId = setInterval(moveMyKittens, 70);

  
    // };

    // if (level === 3) {
    //     ctx.drawImage(boxImg, xBox + 20 , yBox + 80 , wBox, hBox);
    //     ctx.drawImage(boxImg, xBox + 110 , yBox + 80 , wBox, hBox);
    //     ctx.drawImage(boxImg, xBox + 300  , yBox + 80 , wBox, hBox);

    //     ctx.fillText(currentWordsArray[0],xBox + 20 , yBox + 80 ); 
    //     ctx.fillText(currentWordsArray[1],xBox + 110 , yBox + 80 ); 
    //     ctx.fillText(currentWordsArray[3],xBox + 300 , yBox + 80 ); 

    //     wCat = 80; hCat = 80; 
    //     xCat = myCanvas.width/5 - 50;
    //     yCat = myCanvas.height * (8/10);

    //     function drawKittens() {
    //         ctx.drawImage(catImg, xCat + 80 , yCat, wCat , hCat );
    //         ctx.drawImage(catImg, xCat + 130 , yCat, wCat , hCat );
    //         ctx.drawImage(catImg, xCat + 180 , yCat, wCat  , hCat );
    //         ctx.drawImage(catImg, xCat + 230 , yCat, wCat  , hCat );
    //     }

    //     function moveMyKittens() {
    //         ctx.clearRect(0, 400, 500, 400);

    //         drawKittens();

    //         if (moveCatLeft) {
    //             if ( xCat > 5 ) { xCat -= 5 ; }
    //             else { moveCatLeft = false; moveCatRight = true;  }
    //         }

    //         if (moveCatRight) {
    //             if (  xCat + 350 < myCanvas.width ) { xCat += 5 ; }
    //             else {  moveCatLeft = true; moveCatRight = false; }
    //         }          
    //     }

    //     moveCatLeft = true;
    //     moveCatRight = false;

    //     catMoveId = setInterval(moveMyKittens, 70);
    // };

    // if (level === 4) {
    //     ctx.drawImage(boxImg, xBox + 50 , yBox + 80 , wBox, hBox);
    //     ctx.drawImage(boxImg, xBox + 200 , yBox + 80 , wBox, hBox);

    //     ctx.fillText(currentWordsArray[0],xBox + 50, yBox + 80 ); 
    //     ctx.fillText(currentWordsArray[1],xBox + 200 , yBox + 80 ); 

    //     wCat = 90; hCat = 90; 
    //     xCat = myCanvas.width/5 - 50;
    //     yCat = myCanvas.height * (8/10);

    //     function drawKittens() {
    //         ctx.drawImage(catImg, xCat + 60 , yCat, wCat , hCat );
    //         ctx.drawImage(catImg, xCat + 160 , yCat, wCat , hCat );
    //         ctx.drawImage(catImg, xCat + 260 , yCat, wCat  , hCat );
    //     }

    //     function moveMyKittens() {
    //         ctx.clearRect(0, 400, 500, 400);

    //         drawKittens();

    //         if (moveCatLeft) {
    //             if ( xCat > 5 ) { xCat -= 5 ; }
    //             else { moveCatLeft = false; moveCatRight = true;  }
    //         }

    //         if (moveCatRight) {
    //             if (  xCat + 350 < myCanvas.width ) { xCat += 5 ; }
    //             else {  moveCatLeft = true; moveCatRight = false; }
    //         }          
    //     }

    //     moveCatLeft = true;
    //     moveCatRight = false;

    //     catMoveId = setInterval(moveMyKittens, 70);
    // };

    timeDisplay.innerHTML = time;
    let intervalId = setInterval( function () { // COUNTDOWN
        time--;
        timeDisplay.innerHTML = time;
        if (time <= 0) {
            clearInterval(timeoutKittyCircle);
            clearInterval(intervalId); }
    }, 1000 );

    winLoseId = setTimeout( function() { // TIMEOUT THE MATCHING
        currentWordTyped = wordInput.value;
        win = matchWords(wordsGame,currentWordTyped);
    }, 5000 ); 

    levelTimeout = setTimeout( function() { // TIMEOUT THE PLAYING / WIN / LOSE
        clearTimeout(winLoseId); 
        clearInterval(timeoutKittyCircle);

        if (win) {
            if (level < 4) { // IF PLAYING
                level++; 
                
                ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
                ctx.textAlign = "center";
                ctx.fillText("Going fuuur-ther!", myCanvas.width/2, myCanvas.height/2);
                gameTimeout = setTimeout(animate, 1500);
            }
            else { // IF WON
                ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
                ctx.textAlign = "center";
                ctx.fillText("Kitty won the first place!", myCanvas.width/2, myCanvas.height/2);
            };
        }
        else { // IF GAMEOVER
            
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
            ctx.textAlign = "center";
            ctx.fillText("Kitty lost the game...", myCanvas.width/2, myCanvas.height/2);
            level = 1;
        }
    }, 5250 );
    
};






    //----------  FUNCTION: GET WORDS
    function getWords(words) {
        let arrayWords = [];
    
        for (let i = 0; i < (6-level); i++) {
            const randIndex = Math.floor(Math.random() * words.length);
            currWord = words[randIndex];
            arrayWords.push(currWord);
        };
    
        return arrayWords;
    };
    
    //----------  FUNCTION: MATCH WORDS
    function matchWords(array, word) {
        let matchW = false;
        for (i = 0; i < array.length; i++) {
            if (word == array[i]) {
                matchW = true;
            }
        };
        return matchW;
    }
    

const words = ["chrome","firefox", "codepen", "javascript", 
"jquery", "twitter", "github", "wordpress", "opera", 
"sass", "layout", "standards", "semantic", "designer", 
"developer", "module", "component", "website", 
"creative", "banner", "browser", "screen", 
"mobile", "footer", "header", "typography", 
"responsive", "programmer", "css", "border", 
"compass", "grunt", "pixel", "document", "object", 
"ruby", "modernizr", "bootstrap", "python", "php", 
"pattern", "ajax", "node", "element", "android", 
"application", "adobe", "apple", "google", "microsoft", 
"bookmark", "internet", "icon", "svg", "background", 
"property", "syntax", "flash", "html", "font", "blog", 
"network", "server", "content", "database", "socket", 
"function", "variable", "link", "apache", "query", 
"proxy", "backbone", "angular", "email", "underscore", 
"cloud"];
