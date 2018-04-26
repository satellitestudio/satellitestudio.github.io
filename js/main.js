var eyeVisibility = true;
function positionEyeHint(e) {
    var firstHotwordPosition = document.getElementById('eyeSpan').getBoundingClientRect();
    document.getElementById('eye').style.setProperty("top", firstHotwordPosition.top + window.pageYOffset + "px");
    document.getElementById('eye').style.setProperty("left", firstHotwordPosition.left + window.pageXOffset + "px");
}
positionEyeHint();
window.onresize = positionEyeHint;
window.onscroll = function() {
    document.getElementById('logo').style.setProperty("opacity", 1 - window.pageYOffset / 100);
    hideCapture(null);
}
var hotwords = document.getElementsByClassName("hotword");

for (var i = 0; i < hotwords.length; i++) {
    hotwords[i].addEventListener("mouseenter", showCapture);
    hotwords[i].addEventListener("mouseout", hideCapture);
}

var functionDelay = null;
var currentImage = null;
var currentWord = null;
function showCapture(e) {
    functionDelay = setTimeout(function(){
        currentWord = e.target;
        currentImage = document.getElementsByClassName("--" + currentWord.dataset.capture)[0];
        currentImage.classList.add("shown");
        document.getElementsByClassName("manifesto")[0].classList.add("hidden");
        if (eyeVisibility) {
            document.getElementById('eye').classList.add("invisible");
            eyeVisibility = false;
        }
        ga('send', currentWord.dataset.capture);
        functionDelay = null;
    }, 200);
}

function hideCapture(e) {
    if (functionDelay != null) {
        clearTimeout(functionDelay);
        functionDelay = null;
    } else {
        setTimeout(function(){
            if(currentWord) {
                currentWord.classList.add("visited");
                currentWord = null;
            }
        }, 300);
        document.getElementsByClassName("manifesto")[0].classList.remove("hidden");
        if(currentImage) {
            currentImage.classList.remove("shown");
            currentImage = null;
        }
    }
}

