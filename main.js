var letter = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

var adjective = [
  "Yellow",
  "Meaty",
  "Windy",
  "Sticky",
  "Super",
  "Hot",
  "Blonde",
  "Crispy"
];

var noun = [
  "Rabbit",
  "Bear",
  "Kid",
  "Caftan",
  "Red",
  "Topic",
  "Wish",
  "Bloom",
  "Stuff",
  "Detention",
  "Bastard",
  "Box"
];
function changeStyle(){
  var styleNum = Math.floor(Math.random()*18+1);

  $("#name").removeClass();
  $("#siteBackground").removeClass();
  $("#name").addClass("style"+styleNum);
  $("#siteBackground").addClass("background"+styleNum);

  console.log(styleNum);
}

function getLetter(){
  var letterIndex = Math.floor(Math.random()*letter.length);
  var letterValue = letter[letterIndex];
  $("#name").append(letterValue);
}

function getAcronym(){
  var numLetter = Math.floor(Math.random()*3+2);
  var coinFlip = Math.random();
  function slash(){
    if(coinFlip > 0.5){
      $("#name").append("/");
    }
  }
  getLetter();
  slash();
  getLetter();
  if (numLetter > 2){
    slash();
    getLetter();
  }
  if (numLetter > 3){
    slash();
    getLetter();
  }
}

function getAdjective(){
  var adjectiveIndex = Math.floor(Math.random()*adjective.length);
  var adjectiveValue = adjective[adjectiveIndex];
  $("#name").append(adjectiveValue);
}

function getNoun(){
  var nounIndex = Math.floor(Math.random()*noun.length);
  var nounValue = noun[nounIndex];
  $("#name").append(" " + nounValue);
}

function getWords(){
  var threeSidedCoin = Math.random();
  if(threeSidedCoin > .67){
    getAdjective();
  }
  if(threeSidedCoin < .33){
    getNoun();
  }
  if(threeSidedCoin >= .33 && threeSidedCoin <= .67){
    getAdjective();
    getNoun();
  }
}

function getName(){
  if(Math.random()>0.5){
    getAcronym();
  }
  else{
    getWords();
  }
}

function generate(){
  $("#name").html("");
  changeStyle();
  getName();
}

$("#button").click(generate);
