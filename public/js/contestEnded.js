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
    var m2 = "Your Total Prize Money: <span class='prizemoney'>&#8377; " + totalPrizeMoney + "</span>";
    var m3 = "";

    if (finalQStatus == 'walkaway') {
        m1 = "Thank you for playing KBC contest!";
        m3 = "The contest ended as you choose to quit at level " + finalLevel + ". &#128530;";
    }

    if (finalQStatus == "incorrect") {
        m1 = "Thank you for playing KBC contest!";
        m3 = "The contest ended as you incorrectly answered the question at level " + finalLevel + ". &#128530;";
    }

    if (finalQStatus == "correct" && totalPrizeMoney == "10000000") {
        m1 = "<h2>!! CHAMPION !!</h2>";
        m3 = "Pleasure seeing you today at work! &#129321;"
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