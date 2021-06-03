(function ($, window, document) {
    var contestInfo = window.localStorage.getItem("CONTESTINFO");
    var isContestEnded = window.localStorage.getItem("CONTESTENDED");

    if (isContestEnded == null) {
        alert("SOMETHING WENT WRONG");
    }

    if (contestInfo == null) {
        alert("SOMETHING WENT WRONG");
    }

    contestInfo = JSON.parse(contestInfo)

    var currQuesWorthInt = parseInt(contestInfo.FinalPrizeMoney);
    var totalPrizeMoney = Intl.NumberFormat('en-IN').format(currQuesWorthInt);

    var finalLevel = contestInfo.FinalContestLevel;
    var finalQStatus = contestInfo.FinalQuestionStatus;

    var html = '';

    var m1 = "Thank you for playing KBC contest!";
    var m2 = "Your total prize money is <span class='prizemoney'>&#8377; " + totalPrizeMoney + "</span>";
    var m3 = "";

    if (finalQStatus == 'walkaway') {
        m1 = "Thank you for playing KBC contest!";
        m3 = "The contest ended as you choose to quit at level #" + finalLevel + ". &#128530;";
    }

    if (finalQStatus == "incorrect") {
        m1 = "Thank you for playing KBC contest!";
        m3 = "The contest ended as you incorrectly answered the question at level #" + finalLevel + ". &#128530;";
    }

    if (finalQStatus == "correct" && currQuesWorthInt == 10000000) {
        m1 = "<h2>&#127942;&nbsp; CHAMPION &nbsp;&#127942;</h2>";
        m3 = "Pleasure seeing you today at work! &#129321;"

        playCelebrationAnimaton();
    }

    $("#Line1").html(m1)
    $("#Line2").html(m2)
    $("#Line3").html(m3)

    playThanksSound();

}(window.jQuery, window, document));

function playThanksSound() {
    stopAllSounds();
    $('#kbcThanks')[0].play();
}

function stopAllSounds() {
    var sounds = document.getElementsByTagName('audio');
    for (i = 0; i < sounds.length; i++) sounds[i].pause();

}


function playCelebrationAnimaton() {
    for (i = 0; i < 100; i++) {
        // Random rotation
        var randomRotation = Math.floor(Math.random() * 360);
        // Random Scale
        var randomScale = Math.random() * 1;
        // Random width & height between 0 and viewport
        var randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        var randomHeight = Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));

        // Random animation-delay
        var randomAnimationDelay = Math.floor(Math.random() * 15);
        console.log(randomAnimationDelay);

        // Random colors
        var colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
        var randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Create confetti piece
        var confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.top = randomHeight + 'px';
        confetti.style.right = randomWidth + 'px';
        confetti.style.backgroundColor = randomColor;
        // confetti.style.transform='scale(' + randomScale + ')';
        confetti.style.obacity = randomScale;
        confetti.style.transform = 'skew(15deg) rotate(' + randomRotation + 'deg)';
        confetti.style.animationDelay = randomAnimationDelay + 's';
        document.getElementById("confetti-wrapper").appendChild(confetti);
    }
}
