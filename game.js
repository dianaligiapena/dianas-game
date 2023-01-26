const startButton = document.getElementById("start-button");
const startedGameDiv = document.getElementById("startedGame");

let string;

string = "abc"; // ----------------------- put string !!!!!!!

let running;
const str = string.split("");
const el = document.getElementById('cat-words');
let i = string.length; 
let scrollY = 0;
(function writing() {
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
    
    running = setTimeout(writing, 60 ); /// 60
})();

const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext("2d");

const timeDisplay = document.getElementById('time');
const wordInput = document.getElementById('word-input');

let level = 1;

document.getElementById('start-button').onclick = () => { 
    startedGameDiv.style.visibility = "visible";
    level = 1;
    levelGame();
    wordInput.focus();
};

const catImg = new Image();
catImg.src = 'images/cat5.png';

let laptopImg = new Image();
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

//----------  FUNCTION: LEVEL
function levelGame() {   
    
    clearTimeout(gameTimeout);
    clearTimeout(winLoseId); 
    clearTimeout(levelTimeout);
    clearInterval(intervalId);
    clearInterval(timeoutKittyCircle);
    
    time = 5;
    win = false;

    animate(); 
}

function animate() {   
    // clearTimeout(gameTimeout);
    // clearTimeout(winLoseId); 
    // clearTimeout(levelTimeout);
    // clearInterval(intervalId);

    clearInterval(timeoutKittyCircle);

    
    

    wordInput.value = '';
    ctx.clearRect(0,0,500,500);
    ctx.font = ' bold 18px Verdana sans-serif '; 
    ctx.fillStyle = " #0a2c2f " ; //  #441121
    
    win = false;

    wordsGame = getWords(words); // GET WORDS

    if (level === 1) { // DRAWING 
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
                if (textWidth > laptop.w - 45 ) {
                   ctx.font = " bold 9px  Verdana";
                   word.x -= 10 ;
                   word.y -= 2 ;
                }    
                ctx.textAlign = "start";   
                ctx.fillText( wordsGame[i] , word.x  , word.y );
                
                angle2 += 72 ;            
            }          
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    if (level === 2) {
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
                if (textWidth > laptop.w - 45 ) {
                   ctx.font = " bold 9px  Verdana";
                   word.x -= 10 ;
                   word.y -= 2 ;
                }    
                ctx.textAlign = "start";   
                ctx.fillText( wordsGame[i] , word.x  , word.y );
                   
                
                angle2 += 90 ;            
            }          
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    if (level === 3) {
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
                if (textWidth > laptop.w - 45 ) {
                   ctx.font = " bold 9px  Verdana";
                   word.x -= 10 ;
                   word.y -= 2 ;
                }    
                ctx.textAlign = "start";   
                ctx.fillText( wordsGame[i] , word.x  , word.y );    
                
                angle2 += 120 ;            
            }          
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    if (level === 4) {
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
                if (textWidth > laptop.w - 45 ) {
                   ctx.font = " bold 9px  Verdana";
                   word.x -= 10 ;
                   word.y -= 2 ;
                }    
                ctx.textAlign = "start";   
                ctx.fillText( wordsGame[i] , word.x  , word.y );    
                
                angle2 += 180 ;            
            }          
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    if (level === 5) {
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
            if (textWidth > laptop.w - 45 ) {
                ctx.font = " bold 9px  Verdana";
                word.x -= 10 ;
                word.y -= 2 ;
            }    
            ctx.textAlign = "start";   
            ctx.fillText( wordsGame[0] , word.x  , word.y );              
        };    
        timeoutKittyCircle = setInterval( animateKittyCircle , 15 );
    };

    timeDisplay.innerHTML = time;
    intervalId = setInterval( function () { // COUNTDOWN
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
            if (level < 5) { // IF PLAYING
                level++; 
                
                ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
                ctx.textAlign = "center";
                ctx.font = ' bold 18px Verdana sans-serif '; 
                ctx.fillStyle = "beige" ; 
                ctx.fillText("Going fuuur-ther!", myCanvas.width/2, myCanvas.height/2);
                gameTimeout = setTimeout(levelGame, 1500);
            }
            else { // IF WON
                ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
                ctx.textAlign = "center";
                ctx.font = ' bold 18px Verdana sans-serif '; 
                ctx.fillStyle = "green" ; 
                ctx.fillText("You passed the test! Congrats!", myCanvas.width/2, myCanvas.height/2);
            };
        }
        else { // IF GAMEOVER
            clearTimeout(gameTimeout);
            clearTimeout(winLoseId); 
            clearTimeout(levelTimeout);
            clearInterval(intervalId);
            clearInterval(timeoutKittyCircle);
            
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
            ctx.textAlign = "center";
            ctx.font = ' bold 18px Verdana sans-serif '; 
            ctx.fillStyle = " #8d282d " ; 
            ctx.fillText("Didn't pass the test...", myCanvas.width/2, myCanvas.height/2);
        
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
