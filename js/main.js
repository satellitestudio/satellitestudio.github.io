var CHAPTERS = [
    {
        hotword: 'emojiglobe',
        timecodes: [0, 2],
    },
    {
        hotword: 'charts',
        timecodes: [24, 28],
    },
    {
        hotword: 'maps',
        timecodes: [38, 40],
    },
    {
        hotword: 'analysistools',
        timecodes: [57, 59],
    },
    {
        hotword: 'interactivearticles',
        timecodes: [62, 66],
    },
    {
        hotword: 'fishing',
        timecodes: [84, 87],
    },
    {
        hotword: 'coffee',
        timecodes: [46, 49],
    },
    {
        hotword: 'climate',
        timecodes: [128, 131],
    },
    {
        hotword: 'literature',
        timecodes: [140, 142],
    },
    {
        hotword: 'design',
        timecodes: [75, 78],
    },
    {
        hotword: 'fearless',
        timecodes: [166, 170],
    },
    {
        hotword: 'tiny',
        timecodes: [179, 181],
    },
    {
        hotword: 'giganticdb',
        timecodes: [148, 150],
    },
    {
        hotword: '30seconds',
        timecodes: [193, 197],
    },
    {
        hotword: 'dashboards',
        timecodes: [3, 7],
    },
    {
        hotword: 'meaning',
        timecodes: [184, 187],
    },
    {
        hotword: 'emotion',
        timecodes: [66, 69],
    },
    {
        hotword: 'google',
        timecodes: [138, 164],
    },
    {
        hotword: 'enveritas',
        timecodes: [42, 60],
    },
    {
        hotword: 'map3',
        timecodes: [83, 120],
    },
    {
        hotword: 'slavery',
        timecodes: [62, 80],
    },
    {
        hotword: 'causanatura',
        timecodes: [120, 125],
    },
    {
        hotword: 'cvp',
        timecodes: [3, 31],
    },
    {
        hotword: 'renfe',
        timecodes: [33, 40],
    },
    {
        hotword: 'cervest',
        timecodes: [126, 137],
    },
    {
        hotword: 'drowning',
        timecodes: [165, 177],
    },
    {
        hotword: 'emoji',
        timecodes: [178, 191],
    },
    {
        hotword: 'haiku',
        timecodes: [193, 207],
    },
]
var eyeVisibility = true;
var manifesto = document.getElementsByClassName('manifesto')[0]
var video = document.getElementsByTagName('video')[0]
var eye = document.getElementById('eye')
var nav = document.getElementsByTagName('nav')[0]
var logo = document.getElementById('logo')
var menuBtn = document.getElementById('menuBtn')
var menuContainer = document.getElementById('menuContainer')
var manifestoBtn = document.getElementById('manifestoBtn')
var reelBtn = document.getElementById('reelBtn')
var reelLink = document.getElementById('reelLink')

function positionEyeHint(e) {
    var firstHotwordPosition = document.getElementById('eyeSpan').getBoundingClientRect();
    eye.style.setProperty('top', firstHotwordPosition.top + window.pageYOffset + 'px');
    eye.style.setProperty('left', firstHotwordPosition.left + window.pageXOffset + 'px');
}

window.onresize = positionEyeHint;
window.onscroll = function () {
    logo.style.setProperty('opacity', 1 - window.pageYOffset / 100);
    hideCapture(null);
}
var hotwords = document.querySelectorAll('[data-capture]');

for (var i = 0; i < hotwords.length; i++) {
    if (typeof window.orientation !== 'undefined') {
        hotwords[i].addEventListener('click', showCapture);
        // window.addEventListener('click', hideCapture);
    } else {
        hotwords[i].addEventListener('mouseenter', showCapture);
        hotwords[i].addEventListener('mouseout', hideCapture);
    }
}

var showCaptureTimeout = null;
var hideCaptureTimeout = null;
var currentWord = null;
var currentWordId = null;

function getChapterByHotword(hotword) {
    return CHAPTERS.find(function(c) {
        return c.hotword === hotword
    })
}

function doShowCapture(disableManifesto = false) {
    video.classList.add('shown');
    manifesto.classList.add('hidden');
    eye.classList.add('invisible');
    if (disableManifesto) {
        manifesto.classList.add('disabled');
    }
}

function showCapture(e) {
    clearTimeout(hideCaptureTimeout);
    showCaptureTimeout = setTimeout(function () {
        currentWord = e.target;
        currentWordId = currentWord.dataset.capture
        var timecode = getChapterByHotword(currentWordId).timecodes[0]
        video.currentTime = timecode
        doShowCapture()
        if (eyeVisibility) {
            eye.classList.add('invisible');
            eyeVisibility = false;
        }

        showCaptureTimeout = null;
        window.addEventListener('click', hideCapture);
    }, 200);
}

function doHideCapture() {
    manifesto.classList.remove('hidden');
    video.classList.remove('shown');
    if (eyeVisibility === true) {
        eye.classList.remove('invisible');
    }
    manifesto.classList.remove('disabled');
}

function hideCapture() {
    clearTimeout(hideCaptureTimeout);
    if (showCaptureTimeout !== null) {
        clearTimeout(showCaptureTimeout);
        showCaptureTimeout = null;
    } else {
        hideCaptureTimeout = setTimeout(function () {
            if (currentWord) {
                currentWord.classList.add('visited');
                currentWord = null;
                currentWordId = null;
            }
        }, 300);
        if (currentWord) {
            doHideCapture()
            window.removeEventListener('click', hideCapture);
        }
    }
}

function showManifesto() {
    doHideCapture(true)
    video.controls = false
    video.muted = true
    video.classList.remove('reel')
}

function showReel() {
    doShowCapture(true)
    video.currentTime = 0
    video.controls = true
    video.muted = false
    video.classList.add('reel')
    return false
}

manifestoBtn.addEventListener('click', showManifesto)
logo.addEventListener('click', showManifesto)
reelBtn.addEventListener('click', showReel)
reelLink.addEventListener('click', showReel)

menuBtn.addEventListener('click', function() {
    menuContainer.classList.toggle('hidden')
    logo.classList.toggle('noFade')
})

video.addEventListener('timeupdate', function() {
    if (video.controls || !currentWordId) return
    var timecodes = getChapterByHotword(currentWordId).timecodes
    if (this.currentTime >= timecodes[1]) {
        video.currentTime = timecodes[0]
    }
})

setTimeout(function() {
    doHideCapture()
    positionEyeHint();
}, 400)
setTimeout(function() {
    eye.classList.remove('invisible');
    nav.classList.add('shown');
}, 600)
