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
  "Molecular",
  "Deep",
  "Daily",
  "Proud",
  "Mighty",
  "Big",
  "Fat",
  "Rough",
  "Vanilla"
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
  "Step<wbr>mother"
];

var bannedStyles = ["9", "18"];

function getCustomTypeStyle(){
  var styleNum = Math.floor(Math.random()*19+1);

  $("#customType").removeClass();
  $("#siteBackground").removeClass();
  $("#customType").addClass("style"+styleNum);
  $("#siteBackground").addClass("background"+styleNum);
}

function getStyle(){
  window.styleNum = Math.floor(Math.random()*19+1);

  $("#name").removeClass();
  $("#siteBackground").removeClass();
  $("#name").addClass("style"+styleNum);
  $("#siteBackground").addClass("background"+styleNum);
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
  $("#name").append(nounValue);
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
    $("#name").append(" ");
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
  //Remove quotes/make all one string
  var nameB4 = document.getElementById("name").innerHTML;
  $("#name").html(nameB4);
}

function getCanvas(){
  return html2canvas(document.getElementById("siteBackground"))
    .then(function(canvas) {
        document.body.appendChild(canvas);
        document.getElementsByTagName("canvas")[0].setAttribute("id", "canvas");
    });
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
  if(styleLock == false){
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
  if(nameLock == false){
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
var isCustomType = false;

function generate(){
  // Record previous content for undo & reset undo
  window.lastStyle = document.getElementById("name").className;
  window.lastBackground = document.getElementById("siteBackground").className;
  window.lastName = document.getElementById("name").innerHTML;
  $("#undo").css("transform", "");
  $("#undoLabel").html("(U)ndo");
  undoStatus = false;

  if(styleLock == false){
    getStyle();
  }

  if(styleLock == false && nameLock == true && isCustomType == true){
    getCustomTypeStyle();
    window.currentStyle = document.getElementById("name").className;
    $("#name").addClass(tyle);
  }

  if(nameLock == false){
    //Remove any custom text

    $("#name").removeClass("hidden");
    $("#customType").addClass("hidden");
    isCustomType = false;
    currentStyle = document.getElementById("name").className;
    $("#name").addClass(currentStyle);
    $("#name").html("");
    getName();
  }

  // Update URL
  window.currentName = document.getElementById("name").innerHTML;
  window.history.replaceState({}, "", "?" + currentName + "=" + styleNum);
}

function undo(){
  if(lastStyle){
    if(styleLock == false){
      window.redoStyle = document.getElementById("name").className;
      window.redoBackground = document.getElementById("siteBackground").className;
      $("#name").removeClass();
      $("#siteBackground").removeClass();
      $("#name").addClass(lastStyle);
      $("#siteBackground").addClass(lastBackground);
    }
    if(nameLock == false){
      window.redoName = document.getElementById("name").innerHTML;
      $("#name").html(lastName);
    }

    $("#undo").css("transform", "scaleX(-1)");
    $("#undoLabel").html("(R)edo");

    undoStatus = true;
    window.history.replaceState({}, "", "?" + lastName + "=" + lastStyle.replace("style",""));
  }
}

function redo(){
  if(redoStyle || redoName){
    if(styleLock == false){
      $("#name").removeClass();
      $("#siteBackground").removeClass();
      $("#name").addClass(redoStyle);
      $("#siteBackground").addClass(redoBackground);
    }
    if(nameLock == false){
      $("#name").html(redoName);
    }

    $("#undo").css("transform", "");
    $("#undoLabel").html("(U)ndo");

    undoStatus = false;
  }
  window.history.replaceState({}, "", "?" + redoName + "=" + redoStyle.replace("style",""));
}

function undoOrRedo(){
  if(undoStatus == false){
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
  $("#name").html("Tap Anywhere to Begin");
}
$("#siteBackground").click(function(){
  if(isMobile){
    generate();
  }
});

function beginWriting(){
  currentStyle = document.getElementById("name").className;
  $("#name").addClass("hidden");
  $("#customType").removeClass();
  $("#customType").addClass(currentStyle);
  $("#customType").focus();
}

$("#button").click(generate);

function downloadImage(){
  window.clearInterval(countdownToFlash);
  var currentName = document.getElementById("name").innerHTML;
  var currentStyleNum = document.getElementById("name").className.split("style")[1];
  if(bannedStyles.includes(currentStyleNum) == false){
    $("canvas").remove();
    getCanvas().then(function() {
      var okToDownload = confirm("Download Image?");
      if(okToDownload){
        canvasToImage("canvas", currentName + currentStyleNum);
      }
    });
  }
  else{
    alert("Sorry, this style cannot be downloaded.");
  }
}

$("#download").click(downloadImage);

//Custom typing
// $(document).keydown(function(e){
//   // console.log(e);
//   if(isCustomType == false){
//     if(e.keyCode == 16||65||66||67||68||69||70||71||72||73||74||75||76||77||78||79||80||81||82||83||84||85||86||87||88||89||90){
//       beginWriting();
//       isCustomType = true;
//     }
//   }
// })
// $(document).keydown(function(e){
//   if(e.keyCode == 16||65||66||67||68||69||70||71||72||73||74||75||76||77||78||79||80||81||82||83||84||85||86||87||88||89||90){
//     var customName = document.getElementById("customType").value
//     window.history.replaceState({}, "", "?" + customName + "=" + styleNum);
//   }
// })

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
  // if(e.keyCode == 68){
  //   downloadImage();
  // }
})

//Get elements from URL
var urlParts = window.location.search.split("?")[1];
var nameFromURL = decodeURIComponent(urlParts.split("=")[0]);
var styleFromURL = urlParts.split("=")[1];
$("#name").removeClass();
$("#siteBackground").removeClass();
$("#name").addClass("style"+styleFromURL);
$("#siteBackground").addClass("background"+styleFromURL);
$("#name").html(nameFromURL);
