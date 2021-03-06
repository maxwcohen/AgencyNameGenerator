var letter = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

var adjective = [
  "Yellow",
  "Meaty",
  "Sticky",
  "Super",
  "Hot",
  "Blonde",
  "Crispy",
  "Banana",
  "Mama",
  "The",
  "A",
  "Folding",
  "Young",
  "Deep",
  "Daily",
  "Proud",
  "Mighty",
  "Big",
  "Fat",
  "Rough",
  "Vanilla",
  "Pineapple",
  "Cuckoo",
  "Fandango",
  "Jumbo",
  "Blue",
  "Effervescent",
  "Silly",
  "Brick",
  "Khaki",
  "Lemon",
  "Amber",
  "Apricot",
  "Salmon",
  "Rusty",
  "Indigo",
  "Turquoise",
  "Cloudy"
];

var noun = [
  "Rabbit",
  "Bear",
  "Kid",
  "Captian",
  "Red",
  "Topic",
  "Wish",
  "Bloom",
  "Stuff",
  "Detention",
  "Bastard",
  "Box",
  "Momma",
  "Ball",
  "Berry",
  "Nine",
  "Battleship",
  "Bicycle",
  "Chance",
  "Divide",
  "Sunday",
  "Passion",
  "Biplane",
  "Loft",
  "Wax",
  "Thanks",
  "Luck",
  "Step<wbr>mother",
  "Pineapple",
  "Avocado",
  "Guru",
  "Hooligan",
  "Igloo",
  "Juggernaut",
  "Parabola",
  "Ricochet",
  "Thunder",
  "Creep",
  "Glory",
  "Toad",
  "Duck",
  "Cod",
  "Goat",
  "Fudge",
  "Bucket",
  "Hog",
  "Nugget",
  "Zucchini",
  "Apricot",
  "Salmon",
  "Lavender",
  "Arm",
  "Bone",
  "Bucket",
  "Abberation",
  "Cheese",
  "Island",
  "Window",
  "Umbrella",
  "Toast",
  "Radio",
  "Dude"
];

var surname = [
  "Billingston",
  "Abalone"
]

var bannedStyles = [
  "9", "18"
];

var nameJQ = $("#name");
var nameJS = document.getElementById("name");
var backgroundJQ = $("#siteBackground");
var backgroundJS = document.getElementById("siteBackground");

function replaceStyle(num){
  num = num || styleNum;
  nameJQ.removeClass();
  backgroundJQ.removeClass();
  nameJQ.addClass("style" + num);
  backgroundJQ.addClass("background" + num);
  styleNum = nameJS.className.split("style")[1];
  console.log(styleNum);
}

function replaceName(name){
  name = name || currentName;
  nameJQ.html(name);
  currentName = nameJS.innerHTML;
  console.log(currentName);
}

function updateURL(name, num){
  name = name || currentName;
  num = num || styleNum;
  window.history.replaceState({}, "", "?" + name + "=" + num);
}

function getStyle(){
  styleNum = Math.floor(Math.random()*26+1);
  replaceStyle();
}

function getLetter(){
  var letterIndex = Math.floor(Math.random()*letter.length);
  var letterValue = letter[letterIndex];
  nameJQ.append(letterValue);
}

function getAcronym(){
  var numLetter = Math.floor(Math.random()*3+2);
  var coinFlip = Math.random();
  function slash(){
    if(coinFlip > 0.5){
      nameJQ.append("/");
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
  nameJQ.append(adjectiveValue);
}

function getNoun(){
  var nounIndex = Math.floor(Math.random()*noun.length);
  var nounValue = noun[nounIndex];
  nameJQ.append(nounValue);
}

function getWords(){
  var threeSidedCoin = Math.random();
  if(threeSidedCoin > 0.75){
    getAdjective();
    window.isTwoWords = false;
  }
  if(threeSidedCoin < 0.35){
    getNoun();
    window.isTwoWords = false;
  }
  if(threeSidedCoin >= 0.35 && threeSidedCoin <= 0.75){
    getAdjective();
    nameJQ.append(" ");
    getNoun();
    window.isTwoWords = true;
  }
}

// function getSurname(){
//   var surnameIndex = Math.floor(Math.random()*surname.length);
//   var surnameValue = surname[surnameIndex];
//   nameJQ.append(surnameValue);
// }
//
// function getSurnames(){
//     var numSurname = Math.floor(Math.random()*3+2);
//     console.log(numSurname);
//     if (numSurname == 2) {
//       getSurname();
//       nameJQ.append(" & ");
//       getSurname();
//     }
//     if(numSurname == 3){
//       getSurname();
//       nameJQ.append(", ");
//       getSurname();
//       nameJQ.append(" & ");
//       getSurname();
//     }
//     if(numSurname == 4){
//       getSurname();
//       nameJQ.append(", ");
//       getSurname();
//       nameJQ.append(", ");
//       getSurname();
//       nameJQ.append(" & ");
//       getSurname();
//     }
// }

function getName(){
  nameJQ.html("");
  if(Math.random()<0.15){
    getAcronym();
  }
  else{
    getWords();
  }
  currentName = nameJS.innerHTML;
  //Make all one string
  nameJS.normalize();
}

//Flash options if they haven't been used
function addFlash(){
  $(".optionsContainer").addClass("flash");
}
var countdownToFlash = window.setTimeout(addFlash, 12000);
countdownToFlash;

var styleLock = false;
var nameLock = false;
function toggleStyleLock(){
  if(styleLock === false){
    $("#styleLock").addClass("fullOpacity");
    styleLock = true;
  }
  else{
    $("#styleLock").removeClass("fullOpacity");
    styleLock = false;
  }
  window.clearInterval(countdownToFlash);
}
function toggleNameLock(){
  if(nameLock === false){
    $("#nameLock").addClass("fullOpacity");
    nameLock = true;

  }
  else{
    $("#nameLock").removeClass("fullOpacity");
    nameLock = false;
  }
  window.clearInterval(countdownToFlash);
}
$("#styleLock").click(toggleStyleLock);
$("#nameLock").click(toggleNameLock);

var undoStatus = false;

function generate(){
  // Record previous content for undo & reset undo
  window.lastStyleNum = styleNum;
  window.lastName = currentName;
  $("#undo").css("transform", "");
  $("#undoLabel").html("(U)ndo");
  undoStatus = false;

  if(styleLock === false){
    getStyle();
  }

  if(nameLock === false){
    getName();
  }
  updateURL();
}
$("#button").click(generate);

function undo(){
  if(lastStyleNum){
    if(styleLock === false){
      window.redoStyleNum = styleNum;
      replaceStyle(lastStyleNum);
    }
    if(nameLock === false){
      window.redoName = currentName;
      replaceName(lastName);
    }

    $("#undo").css("transform", "scaleX(-1)");
    $("#undoLabel").html("(R)edo");
    undoStatus = true;

    updateURL();
  }
}

function redo(){
  if(redoStyleNum || redoName){
    if(styleLock === false){
      replaceStyle(redoStyleNum);
    }
    if(nameLock === false){
      replaceName(redoName);
    }

    $("#undo").css("transform", "");
    $("#undoLabel").html("(U)ndo");
    undoStatus = false;

    updateURL();
  }
}

function undoOrRedo(){
  if(undoStatus === false){
    undo();
  }
  else{
    redo();
  }
  window.clearInterval(countdownToFlash);
}
$("#undo").click(undoOrRedo);

//Mobile Changes
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if(isMobile){
  nameJQ.html("Tap Anywhere to Begin");
  $(".nameContainer").css("transform", "translate(-50%, -60%) scale(0.8)");
  $(".optionsContainer").css("transform", "scale(0.9)")
}
backgroundJQ.click(function(){
  if(isMobile){
    generate();
  }
});

function getCanvas(){
  return html2canvas(backgroundJS)
    .then(function(canvas) {
        document.body.appendChild(canvas);
        document.getElementsByTagName("canvas")[0].setAttribute("id", "canvas");
    });
}
function downloadImage(){
  window.clearInterval(countdownToFlash);
  if(bannedStyles.includes(styleNum) === false){
    $("canvas").remove();
    getCanvas().then(function() {
      var okToDownload = confirm("Download Image?");
      if(okToDownload){
        canvasToImage("canvas", currentName + styleNum);
      }
    });
  }
  else{
    alert("Sorry, this style cannot be downloaded.");
  }
}
$("#download").click(downloadImage);

$(document).keyup(function(e){
  if(e.keyCode == 32){
    generate();
  }
  if(e.keyCode == 85){
    undoOrRedo();
  }
  if(e.keyCode == 83){
    toggleStyleLock();
  }
  if(e.keyCode == 78){
    toggleNameLock();
  }
  if(e.keyCode == 82){
    redo();
  }
})

//Get elements from URL
var urlParts = window.location.search.split("?")[1];
var currentName = decodeURIComponent(urlParts.split("=")[0]);
var styleNum = urlParts.split("=")[1];
replaceStyle();
replaceName();
