var TIMECODES = {
    emojiglobe: 100,
    gfishcartogram: 200,
    fishing: 400
}

var eyeVisibility = true;
var manifesto = document.getElementsByClassName('manifesto')[0]
var video = document.getElementsByTagName('video')[0]
var eye = document.getElementById('eye')

function positionEyeHint(e) {
    var firstHotwordPosition = document.getElementById('eyeSpan').getBoundingClientRect();
    eye.style.setProperty('top', firstHotwordPosition.top + window.pageYOffset + 'px');
    eye.style.setProperty('left', firstHotwordPosition.left + window.pageXOffset + 'px');
}

window.onresize = positionEyeHint;
window.onscroll = function () {
    document.getElementById('logo').style.setProperty('opacity', 1 - window.pageYOffset / 100);
    hideCapture(null);
}
var hotwords = document.getElementsByClassName('hotword');

for (var i = 0; i < hotwords.length; i++) {
    if (typeof window.orientation !== 'undefined') {
        hotwords[i].addEventListener('click', showCapture);
        // window.addEventListener('click', hideCapture);
    } else {
        hotwords[i].addEventListener('mouseenter', showCapture);
        hotwords[i].addEventListener('mouseout', hideCapture);
    }
}

var functionDelay = null;
var currentWord = null;
var currentWordId = null;

function showCapture(e) {
    functionDelay = setTimeout(function () {
        currentWord = e.target;
        currentWordId = currentWord.dataset.capture
        var timecode = TIMECODES[currentWordId]
        video.currentTime = timecode
        video.classList.add('shown');
        manifesto.classList.add('hidden');
        if (eyeVisibility) {
            eye.classList.add('invisible');
            eyeVisibility = false;
        }
        functionDelay = null;
        window.addEventListener('click', hideCapture);
    }, 200);
}

function doHideCapture() {
    manifesto.classList.remove('hidden');
    video.classList.remove('shown')
}

function hideCapture() {
    if (functionDelay != null) {
        clearTimeout(functionDelay);
        functionDelay = null;
    } else {
        setTimeout(function () {
            if (currentWord) {
                currentWord.classList.add('visited');
                currentWord = null;
            }
        }, 300);
        if (currentWord) {
            doHideCapture()
            window.removeEventListener('click', hideCapture);
        }
    }
}

setTimeout(doHideCapture, 4000)
setTimeout(function() {
    eye.classList.remove('invisible');
}, 6000)
positionEyeHint();