
const startedGameDiv = document.getElementById("startedGame");

const song = new Audio();                        // AUDIO
song.src = "audio/nyancat.mp3" ;
song.volume = 0.2 ;

const typingSound = document.createElement('audio');
typingSound.setAttribute('src', 'audio/TypingSound Effect.mp3');
typingSound.setAttribute('autoplay', 'autoplay');
typingSound.volume = 0.5 ;
typingSound.play(); 


let string;

string = `
Hello, dear. -
Meow you doin'?-
Let me introduce myself. - - 
I am Steve Paws, the international cat genius.-
-
I've heard that you are looking for help to finish an Ironhack lab. -
-
Today I will provide you an opportunity to help you and to bear witness to my amazing web development skills. 
--
In order to get this chance you will first have to pass a test designed by me and my associate, the charming Dancing Paws.
--
How it works: -
-
The test consists of 5 rounds and 5 laptops to unlock. -
-
Each round the music starts and you have 5 seconds to type ONE of the passwords generated on the laptops’ screens. -
-
If you succeed, you go to the next round and unlock one of the remaining laptops. -
You pass the test when all the laptops are unlocked.-
-
One thing I forgot to tell you… Dancing Paws will try to draw your attention by dancing to the music around the laptops. And also by being really cute.
--
So, let's start the test. -
It's meow or never.

`;


let running;                                      // RUNNING CATS WORDS
const str = string.split("");
const el = document.getElementById('cat-words');
let i = string.length; 
let scrollY = 0;
(function writing() {

    if ( i >= 0 ) {
        i--;
        scrollY += 1 ;
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
    
    running = setTimeout(writing, 23 ); 
})();




const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext("2d");

const timeDisplay = document.getElementById('time');
const wordInput = document.getElementById('word-input');
const startButton = document.getElementById('start-button');

let level = 1;

let steadyId;
let goId;
let startLevelGameId;

document.getElementById('start-button').onclick = () => {    // CLICK  START  BUTTON
    startButton.innerHTML = 'restart'
    startedGameDiv.style.visibility = "visible";
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    myCanvas.style.visibility = "visible";
    level = 1;
    wordInput.focus();
    wordInput.value = '';
    timeDisplay.innerHTML = '';

    clearTimeout( steadyId );
    clearTimeout( goId );
    clearTimeout( startLevelGameId );

    clearTimeout(gameTimeout);
    clearTimeout(winLoseId); 
    clearTimeout(levelTimeout);
    clearInterval(intervalId);
    clearInterval(timeoutKittyCircle);
    time = 5;
    win = false;

    
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);    //  PREPARE TO COUNTDOWN TO START - 3 SECONDS
    
    ctx.drawImage(catImg , 300 , 300 , cat.w * 2 , cat.h * 2 );
    
    ctx.textAlign = "center";
    ctx.fillStyle = " #8d282d " ; 

    ctx.font = ' bold 18px Verdana sans-serif '; 
    ctx.fillText(" Ready? ", myCanvas.width/2, myCanvas.height/2 - 80 );

    steadyId = setTimeout( () => {
        ctx.font = ' bold 22px Verdana sans-serif '; 
        ctx.fillText(" Steady... ", myCanvas.width/2, myCanvas.height/2 );
    } , 1500 );

    goId = setTimeout( () => {
        ctx.font = ' bold 26px Verdana sans-serif '; 
        ctx.fillText(" Go! ", myCanvas.width/2, myCanvas.height/2 + 90 );
    } , 3000 );

    startLevelGameId = setTimeout( levelGame , 4000 ); 
};

const catImg = new Image();
catImg.src = 'images/cat5.png';

const laptopImg = new Image();
laptopImg.src = 'images/laptop.png';

//----------   variables
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
let radius = 195 ; let radius2;
let angle = 1 ; let angle2;
let newX; let newX2; 
let newY; let newY2;

let timeoutKittyCircle;

//----------   FUNCTION : START GAME LEVEL ---------------//
function levelGame() {   
    
    clearTimeout( steadyId );
    clearTimeout( goId );
    clearTimeout( startLevelGameId );

    clearTimeout(gameTimeout);
    clearTimeout(winLoseId); 
    clearTimeout(levelTimeout);
    clearInterval(intervalId);
    clearInterval(timeoutKittyCircle);
    time = 5;
    win = false;
    ctx.clearRect(0,0,500,500);
    animate(); 
}

function animate() {    
    song.play();

    clearInterval(timeoutKittyCircle); 
    wordInput.value = '';
    ctx.clearRect(0,0,500,500);
    ctx.font = ' bold 18px Verdana sans-serif '; 
    ctx.fillStyle = " #0a2c2f " ; //  #441121    
    win = false;
    wordsGame = getWords(words); // GET WORDS

    if (level === 1) { // LEVEL 1 
        speed = 1 ;
        radius = 195 ;
        angle = 1 ;
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
                if (textWidth > laptop.w - 35 ) {
                    ctx.font = " bold 9px  Verdana ";
                    word.x -= 10 ;
                    word.y -= 2 ;
                 }
                 else if ( textWidth > laptop.w - 44   ) {
                     ctx.font = " bold 11px  Verdana";
                     word.x -= 8 ;
                     word.y -= 2 ;
                  }
                ctx.textAlign = "start";   
                ctx.fillText( wordsGame[i] , word.x  , word.y );
                
                angle2 += 72 ;            
            }          
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    if (level === 2) { // LEVEL 2
        speed = 1 ;
        radius = 195 ;
        angle = 1 ;
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
            word = {
                x: 0 ,
                y: 0 ,
            }
    
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
                if (textWidth > laptop.w - 35 ) {
                    ctx.font = " bold 9px  Verdana ";
                    word.x -= 10 ;
                    word.y -= 2 ;
                 }
                 else if ( textWidth > laptop.w - 44   ) {
                     ctx.font = " bold 11px  Verdana";
                     word.x -= 8 ;
                     word.y -= 2 ;
                  } 
                ctx.textAlign = "start";   
                ctx.fillText( wordsGame[i] , word.x  , word.y );
                   
                
                angle2 += 90 ;            
            }          
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    if (level === 3) { // LEVEL 3
        speed = 1 ;
        radius = 195 ;
        angle = 1 ;
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
                if (textWidth > laptop.w - 35 ) {
                    ctx.font = " bold 9px  Verdana ";
                    word.x -= 10 ;
                    word.y -= 2 ;
                 }
                 else if ( textWidth > laptop.w - 44   ) {
                     ctx.font = " bold 11px  Verdana";
                     word.x -= 8 ;
                     word.y -= 1 ;
                  }
                ctx.textAlign = "start";   
                ctx.fillText( wordsGame[i] , word.x  , word.y );    
                
                angle2 += 120 ;            
            }          
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    if (level === 4) { // LEVEL 4
        speed = 1 ;
        radius = 195 ;
        angle = 1 ;
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
                if (textWidth > laptop.w - 35 ) {
                    ctx.font = " bold 9px  Verdana ";
                    word.x -= 10 ;
                    word.y -= 2 ;
                 }
                 else if ( textWidth > laptop.w - 44   ) {
                     ctx.font = " bold 11px  Verdana";
                     word.x -= 8 ;
                     word.y -= 1 ;
                  } 
                ctx.textAlign = "start";   
                ctx.fillText( wordsGame[i] , word.x  , word.y );    
                
                angle2 += 180 ;            
            }          
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    if (level === 5) { // LEVEL 5
        speed = 1 ;
        radius = 195 ;
        angle = 1 ;
        function animateKittyCircle() {
            ctx.clearRect( 0 , 0 , myCanvas.width , myCanvas.height );
            newX = radius * Math.cos(angle * (Math.PI/180)) ;
            newY = radius * Math.sin(angle * (Math.PI/180)) ;    
            cat.x = newX + center.x ;
            cat.y = newY + center.y ;    
            ctx.drawImage(catImg , cat.x , cat.y , cat.w , cat.h );
    
            angle += speed;
    
            let laptop = {
                x: center.x - 20 ,
                y: center.y - 20 ,
                w: 100 ,
                h: 100 ,
            }    
            ctx.drawImage( laptopImg, laptop.x  , laptop.y , laptop.w, laptop.h );
    
            ctx.font = ' bold 14px Verdana sans-serif ';     
            word.x = laptop.x + laptop.w / 4 + 5 ;
            word.y = laptop.y + laptop.h / 3 + 5 ;    
            let textWidth = ctx.measureText(wordsGame[0]).width;
            if (textWidth > laptop.w - 35 ) {
                ctx.font = " bold 9px  Verdana ";
                word.x -= 10 ;
                word.y -= 2 ;
             }
             else if ( textWidth > laptop.w - 44   ) {
                 ctx.font = " bold 11px  Verdana";
                 word.x -= 8 ;
                 word.y -= 1 ;
              }
            ctx.textAlign = "start";   
            ctx.fillText( wordsGame[0] , word.x  , word.y );              
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    timeDisplay.innerHTML = time;
    intervalId = setInterval( function () { // -------- COUNTDOWN
        time--;
        timeDisplay.innerHTML = time;
        if (time <= 0) {
            clearInterval(timeoutKittyCircle);
            clearInterval(intervalId); }
    }, 1000 );

    winLoseId = setTimeout( function() { //  ----------- TIMEOUT THE MATCHING VERIFICATION
        currentWordTyped = wordInput.value;
        win = matchWords(wordsGame,currentWordTyped);
    }, 5000 ); 

    levelTimeout = setTimeout( function() { // --------- TIMEOUT THE PLAYING / WIN / LOSE VERIFICATION
        clearTimeout(winLoseId); 
        clearInterval(timeoutKittyCircle);

        clearTimeout( steadyId );
        clearTimeout( goId );
        clearTimeout( startLevelGameId );

        if (win) {
            if (level < 5) { //  -------------------- IF CONTINUE PLAYING
                level++; 
                
                timeDisplay.innerHTML = '';
                ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
                ctx.textAlign = "center";
                ctx.font = ' bold 18px Verdana sans-serif '; 
                ctx.fillStyle = "beige" ; 
                ctx.fillText("Going fuuur-ther!", myCanvas.width/2, myCanvas.height/2);
                ctx.drawImage(catImg , 300 , 300 , cat.w * 2 , cat.h * 2 );
                gameTimeout = setTimeout(levelGame, 1500);
            }
            else { //  --------------------------- IF WON
                timeDisplay.innerHTML = '';

                ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
                ctx.textAlign = "center";
                ctx.font = ' bold 22px Verdana sans-serif '; 
                ctx.fillStyle = " #051517 " ; 
                ctx.fillText("You passed! Congrats!", myCanvas.width/2, myCanvas.height/2);
                ctx.drawImage(catImg , 300 , 300 , cat.w * 2 , cat.h * 2 );
                startedGameDiv.style.visibility = "hidden";
            };
        }
        else { // -------------------------------- IF GAMEOVER
            timeDisplay.innerHTML = '';

            clearTimeout(gameTimeout);
            clearTimeout(winLoseId); 
            clearTimeout(levelTimeout);
            clearInterval(intervalId);
            clearInterval(timeoutKittyCircle);
            
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
            ctx.textAlign = "center";
            ctx.font = ' bold 20px Verdana sans-serif '; 
            ctx.fillStyle = " #8d282d " ; 
            ctx.fillText(" Didn't pass the test... ", myCanvas.width/2, myCanvas.height/2 - 50 );

            ctx.font = ' bold 18px Verdana sans-serif '; 
            ctx.fillText(" Dancing Paws is too irresistible! ", myCanvas.width/2, myCanvas.height/2 + 10 );
           
            ctx.drawImage(catImg , 300 , 300 , cat.w * 2 , cat.h * 2 );

            startedGameDiv.style.visibility = "hidden";
        
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
