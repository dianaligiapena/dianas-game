let string = "Hello dear ";
let running;
const str = string.split("");
const el = document.getElementById('cat-words');
// (function animate2() {
// str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running); 
//  running = setTimeout(animate2, 60);
// })();

const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext("2d");

const timeDisplay = document.getElementById('time');
const wordInput = document.getElementById('word-input');

document.getElementById('start-button').onclick = () => { 
    animate();
    wordInput.focus();
};

const boxImg = new Image();
boxImg.src = 'images/box.png';
const catImg = new Image();
catImg.src = 'images/cat.webp';

//----------   variables
let level = 1;
let time = 5; 
let currWord; 
let currentWordsArray; 
let currentWordTyped;
let win = false;
let winLoseId;
let gameTimeout;
let catDrawId;
let catMoveId;
let levelTimeout;
let moveCatLeft;
let moveCatRight;

let xBox; let yBox; let wBox; let hBox;
wBox = 100 ; // height of the box
hBox = 100 ; // weight of the box
xBox = myCanvas.width/3 - 70; //  left/right
yBox = myCanvas.height/5; // up/down

let wCat = 60; //80
let hCat = 60; //80
let xCat = myCanvas.width/5 - 50;
let yCat = myCanvas.height * (8/10);

//----------  FUNCTION: LEVEL
function levelGame() {   
    
    clearTimeout(gameTimeout);
    clearTimeout(winLoseId); 
    clearTimeout(levelTimeout);

    clearInterval(catMoveId);
    clearInterval(intervalId);
    
    level = 1;
    time = 5;

    animate(); 
}

function animate() {   
    clearTimeout(gameTimeout);
    clearTimeout(winLoseId); 
    clearTimeout(levelTimeout);
    clearInterval(catMoveId);


    wordInput.value = '';
    ctx.clearRect(0,0,500,500);
    ctx.font = ' bold 18px Verdana sans-serif'; 
    time = 5;
    win = false;

    currentWordsArray = getWords(words); // GET WORDS

    if (level === 1) { // DRAWING 
        ctx.drawImage(boxImg, xBox, yBox, wBox, hBox);
        ctx.drawImage(boxImg, xBox + 110 , yBox , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 220 , yBox , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 50  , yBox + 150 , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 160 , yBox + 150, wBox, hBox);

        ctx.fillText(currentWordsArray[0],xBox + 20, yBox); 
        ctx.fillText(currentWordsArray[1],xBox + 130 , yBox); 
        ctx.fillText(currentWordsArray[2],xBox + 250 , yBox ); 
        ctx.fillText(currentWordsArray[3],xBox + 70  , yBox + 150 ); 
        ctx.fillText(currentWordsArray[4],xBox + 190 , yBox + 150); 

        wCat = 60; hCat = 60; 
        xCat = myCanvas.width/5 - 50;
        yCat = myCanvas.height * (8/10);

        function drawKittens() {
            ctx.drawImage(catImg, xCat, yCat, wCat, hCat);
            ctx.drawImage(catImg, xCat + 70 , yCat, wCat, hCat);
            ctx.drawImage(catImg, xCat + 140 , yCat, wCat, hCat);
            ctx.drawImage(catImg, xCat + 200 , yCat, wCat, hCat);
            ctx.drawImage(catImg, xCat + 270 , yCat, wCat, hCat);
            ctx.drawImage(catImg, xCat + 330 , yCat, wCat, hCat);
        }

        function moveMyKittens() {
            ctx.clearRect(0, 400, 500, 400);

            drawKittens();

            if (moveCatLeft) {
                if ( xCat > 5 ) { xCat -= 5 ; }
                else { moveCatLeft = false; moveCatRight = true;  }
            }

            if (moveCatRight) {
                if (  xCat + 400 < myCanvas.width ) { xCat += 5 ; }
                else {  moveCatLeft = true; moveCatRight = false; }
            }          
        }

        moveCatLeft = true;
        moveCatRight = false;

        catMoveId = setInterval(moveMyKittens, 70);
    };

    if (level === 2) {
        ctx.drawImage(boxImg, xBox + 30 , yBox , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 200 , yBox , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 30  , yBox + 150 , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 200 , yBox + 150, wBox, hBox);

        ctx.fillText(currentWordsArray[0],xBox + 50, yBox); 
        ctx.fillText(currentWordsArray[1],xBox + 220 , yBox); 
        ctx.fillText(currentWordsArray[3],xBox + 50  , yBox + 150 ); 
        ctx.fillText(currentWordsArray[4],xBox + 220 , yBox + 150); 

        wCat = 70; hCat = 70; 
        xCat = myCanvas.width/5 - 50;
        yCat = myCanvas.height * (8/10);

        function drawKittens() {
            ctx.drawImage(catImg, xCat + 30 , yCat, wCat , hCat );
            ctx.drawImage(catImg, xCat + 80 , yCat, wCat  , hCat );
            ctx.drawImage(catImg, xCat + 130 , yCat, wCat  , hCat );
            ctx.drawImage(catImg, xCat + 180 , yCat, wCat  , hCat );
            ctx.drawImage(catImg, xCat + 230 , yCat, wCat  , hCat );
        }

        function moveMyKittens() {
            ctx.clearRect(0, 400, 500, 400);

            drawKittens();

            if (moveCatLeft) {
                if ( xCat > 5 ) { xCat -= 5 ; }
                else { moveCatLeft = false; moveCatRight = true;  }
            }

            if (moveCatRight) {
                if (  xCat + 330 < myCanvas.width ) { xCat += 5 ; }
                else {  moveCatLeft = true; moveCatRight = false; }
            }          
        }

        moveCatLeft = true;
        moveCatRight = false;

        catMoveId = setInterval(moveMyKittens, 70);

  
    };

    if (level === 3) {
        ctx.drawImage(boxImg, xBox + 20 , yBox + 80 , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 110 , yBox + 80 , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 300  , yBox + 80 , wBox, hBox);

        ctx.fillText(currentWordsArray[0],xBox + 20 , yBox + 80 ); 
        ctx.fillText(currentWordsArray[1],xBox + 110 , yBox + 80 ); 
        ctx.fillText(currentWordsArray[3],xBox + 300 , yBox + 80 ); 

        wCat = 80; hCat = 80; 
        xCat = myCanvas.width/5 - 50;
        yCat = myCanvas.height * (8/10);

        function drawKittens() {
            ctx.drawImage(catImg, xCat + 80 , yCat, wCat , hCat );
            ctx.drawImage(catImg, xCat + 130 , yCat, wCat , hCat );
            ctx.drawImage(catImg, xCat + 180 , yCat, wCat  , hCat );
            ctx.drawImage(catImg, xCat + 230 , yCat, wCat  , hCat );
        }

        function moveMyKittens() {
            ctx.clearRect(0, 400, 500, 400);

            drawKittens();

            if (moveCatLeft) {
                if ( xCat > 5 ) { xCat -= 5 ; }
                else { moveCatLeft = false; moveCatRight = true;  }
            }

            if (moveCatRight) {
                if (  xCat + 350 < myCanvas.width ) { xCat += 5 ; }
                else {  moveCatLeft = true; moveCatRight = false; }
            }          
        }

        moveCatLeft = true;
        moveCatRight = false;

        catMoveId = setInterval(moveMyKittens, 70);
    };

    if (level === 4) {
        ctx.drawImage(boxImg, xBox + 50 , yBox + 80 , wBox, hBox);
        ctx.drawImage(boxImg, xBox + 200 , yBox + 80 , wBox, hBox);

        ctx.fillText(currentWordsArray[0],xBox + 50, yBox + 80 ); 
        ctx.fillText(currentWordsArray[1],xBox + 200 , yBox + 80 ); 

        wCat = 90; hCat = 90; 
        xCat = myCanvas.width/5 - 50;
        yCat = myCanvas.height * (8/10);

        function drawKittens() {
            ctx.drawImage(catImg, xCat + 60 , yCat, wCat , hCat );
            ctx.drawImage(catImg, xCat + 160 , yCat, wCat , hCat );
            ctx.drawImage(catImg, xCat + 260 , yCat, wCat  , hCat );
        }

        function moveMyKittens() {
            ctx.clearRect(0, 400, 500, 400);

            drawKittens();

            if (moveCatLeft) {
                if ( xCat > 5 ) { xCat -= 5 ; }
                else { moveCatLeft = false; moveCatRight = true;  }
            }

            if (moveCatRight) {
                if (  xCat + 350 < myCanvas.width ) { xCat += 5 ; }
                else {  moveCatLeft = true; moveCatRight = false; }
            }          
        }

        moveCatLeft = true;
        moveCatRight = false;

        catMoveId = setInterval(moveMyKittens, 70);
    };

    timeDisplay.innerHTML = time;
    let intervalId = setInterval( function () { // COUNTDOWN
        time--;
        timeDisplay.innerHTML = time;
        if (time <= 0) {clearInterval(intervalId); clearInterval(catMoveId); }
    }, 1000 );

    winLoseId = setTimeout( function() { // TIMEOUT THE MATCHING
        currentWordTyped = wordInput.value;
        win = matchWords(currentWordsArray,currentWordTyped);
    }, 5000 ); 

    levelTimeout = setTimeout( function() { // TIMEOUT THE PLAYING / WIN / LOSE
        clearTimeout(winLoseId); 

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