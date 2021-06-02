(function ($, window, document) {
    if ($('#startContest').length > 0) {
        $('.contest-start-form').on("submit", function (e) {
            e.preventDefault();
            disableBtn('#startContest');

            $('#startContest').html("STARTING CONTEST...");
            playContestStart();

            $.ajax({
                type: 'POST',
                url: "/contest/start",
                data: {
                    categoryId: 0, //$('#categoryId').val(),
                    fullName: $("#fullName").val()
                }, beforeSend: function () {
                },
                complete: function (response) {
                },
                success: function (response) {
                    response = JSON.parse(response)
                    console.log(response.data)
                    localStorage.setItem("kbcContestID", response.data.contestId);
                    setTimeout(function () {
                        window.location.href = "/contest";
                    }, 6000);
                },
                error: function (data) {
                    alert("Something went wrong, Please try again later");
                }
            });
        });
    }

    IS_FIRST_QUESTION = false;

    // LOAD FIRST QUESTION
    var contestID = window.localStorage.getItem("kbcContestID");
    var nextQInfo = window.localStorage.getItem("NEXTQUESTION");
    var currQuesWorth = window.localStorage.getItem("CURRQUESWORTH");

    if (contestID > 0) {
        disableBtn('.next');

        if (nextQInfo === null) {
            playQuestionStart();

            iS_FIRST_QUESTON = true;
            lastQDelivered = -1;

            var answerObject = { QuestionId: lastQDelivered, AnswerKey: 1, IsWalkAway: false };
            getNextQuestion(contestID, answerObject);
        } else {
            nextQInfo = JSON.parse(nextQInfo);
            $("#questionStatement").html(nextQInfo.QuestionStatement);
            $("#optionA").html(nextQInfo.OptionA);
            $("#optionB").html(nextQInfo.OptionB);
            $("#optionC").html(nextQInfo.OptionC);
            $("#optionD").html(nextQInfo.OptionD);
            $("#QLevel").html(nextQInfo.ContestLevel);

            currQuesWorthInt = parseInt(currQuesWorth);
            $("#CurrQuesAmount").html(Intl.NumberFormat('en-IN').format(currQuesWorthInt));

            $('.rsl-tr').removeClass("active-tr");
            $('#rsl-tr-' + parseInt(nextQInfo.ContestLevel)).addClass("active-tr");

            $('.item').hide();
            playQuestionStart();

            if (nextQInfo.ContestLevel < 6) {
                setTimeout(function () {
                    $('.item').show();
                    playClockSound();
                    startCountdownTimer();
                }, 5000);

            } else {
                $('.item').hide();
            }
        }
    }

    // HANDLE MANUAL NEXT QUESTION RELOAD
    $(".next").on("click", function (e) {
        doForcefulNext(false);
    });

    // HANDLE MANUAL NEXT QUESTION RELOAD
    $(".walkaway").on("click", function (e) {
        doForcefulWalkAway();
    });

    // Handling option clicks for answer purpose
    $(".option-block").on("click", function (e) {
        handleOptionClick(e, $(this));
    });

    var FFLifeLineStatus = window.localStorage.getItem("FFLifeLineStatus");
    var PollLifeLineStatus = window.localStorage.getItem("PollLifeLineStatus");
    var QuesSwitchLifeLineStatus = window.localStorage.getItem("QuesSwitchLifeLineStatus");

    if (FFLifeLineStatus == "taken") {
        $('#fifty-fifty-lifeline').addClass("UsedLifeline");
        disableBtn('#fifty-fifty-lifeline');
    }

    if (PollLifeLineStatus == "taken") {
        $('#audience-poll-lifeline').addClass("UsedLifeline");
        disableBtn('#audience-poll-lifeline');
    }

    if (QuesSwitchLifeLineStatus == "taken") {
        $('#ques-switch-poll-lifeline').addClass("UsedLifeline");
        disableBtn('#ques-switch-poll-lifeline');
    }

    // Handling lifelines 
    $('#fifty-fifty-lifeline').on('click', function (e) {
        var FFLifeLineStatus = window.localStorage.getItem("FFLifeLineStatus");

        if (FFLifeLineStatus != "taken") {
            triggerFFLifeLine();

            window.localStorage.setItem("FFLifeLineStatus", "taken");

            $('#fifty-fifty-lifeline').addClass("UsedLifeline");
            disableBtn('#fifty-fifty-lifeline');
        }
    });

    $('#audience-poll-lifeline').on('click', function (e) {
        var FFLifeLineStatus = window.localStorage.getItem("PollLifeLineStatus");

        if (FFLifeLineStatus != "taken") {

            triggerPollLifeLine();

            window.localStorage.setItem("PollLifeLineStatus", "taken");

            $('#audience-poll-lifeline').addClass("UsedLifeline");
            disableBtn('#audience-poll-lifeline');
        }
    });

    $('#ques-switch-poll-lifeline').on('click', function (e) {
        var QSLifeLineStatus = window.localStorage.getItem("QuesSwitchLifeLineStatus");

        if (QSLifeLineStatus != "taken") {

            triggerQSLifeLine();

            window.localStorage.setItem("QuesSwitchLifeLineStatus", "taken");

            $('#ques-switch-poll-lifeline').addClass("UsedLifeline");
            disableBtn('#ques-switch-poll-lifeline');
        }
    });

    $('#level-listing-toggle-switch').on('click', function () {
        $('#kbc-level-listing').toggle();
    })

}(window.jQuery, window, document));

function getNextQuestion(contestID, answerObject) {
    clearTimeout(TIMER_INSTANCE);

    $.ajax({
        type: 'POST',
        url: "/contest/deliverNextQuestion",
        data: {
            contestId: contestID,
            answerObject: JSON.stringify(answerObject)
        }, beforeSend: function () {
            $('.loader').show();
        },
        complete: function (response) {
            $('.loader').hide();
        },
        success: function (response) {
            response = JSON.parse(response)
            response = response.data;

            if (!response.ContestEnded) {
                window.localStorage.setItem("NEXTQUESTION", JSON.stringify(response.NextQuestion));
                window.localStorage.setItem("CONTESTINFO", JSON.stringify(response.Contest));
                window.localStorage.setItem("PREVCORRECT", JSON.stringify(response.PrevCorrect));
                window.localStorage.setItem("CONTESTENDED", JSON.stringify(response.ContestEnded));
                window.localStorage.setItem("CURRQUESWORTH", JSON.stringify(response.CurrQuesWorth));

                // question to be delivered
                $("#questionStatement").html(response.NextQuestion.QuestionStatement);
                $("#optionA").html(response.NextQuestion.OptionA);
                $("#optionB").html(response.NextQuestion.OptionB);
                $("#optionC").html(response.NextQuestion.OptionC);
                $("#optionD").html(response.NextQuestion.OptionD);
                $("#QLevel").html(response.NextQuestion.ContestLevel);

                currQuesWorthInt = parseInt(response.CurrQuesWorth);
                $("#CurrQuesAmount").html(Intl.NumberFormat('en-IN').format(currQuesWorthInt));

                $('.rsl-tr').removeClass("active-tr");
                $('#rsl-tr-' + parseInt(response.NextQuestion.ContestLevel)).addClass("active-tr");

                $('.item').hide();
                playQuestionStart();

                if (response.NextQuestion.ContestLevel < 6) {
                    setTimeout(function () {
                        $('.item').show();
                        playClockSound();
                        startCountdownTimer();
                    }, 5000);

                } else {
                    $('.item').hide();
                }

                $('.option-block').removeAttr("style");

                enableBtn('.walkaway');
                disableBtn('.next');
            } else {
                window.localStorage.setItem("CONTESTINFO", JSON.stringify(response.Contest));
                window.localStorage.setItem("CONTESTENDED", JSON.stringify(response.ContestEnded));

                window.onbeforeunload = function () { }
                window.location.href = "/thanks";
            }
        },
        error: function (data) {
            alert("Something went wrong, Please try again later");
        }
    });
}

function doForcefulNext(isForceIncorrect = false) {
    var contestID = window.localStorage.getItem("kbcContestID");
    var nextQInfo = window.localStorage.getItem("NEXTQUESTION");
    var contestEnded = window.localStorage.getItem("CONTESTENDED");
    var prevUserResponse = window.localStorage.getItem("LOCAL_PREVUSER_RES");

    $("[opt-val]").css("pointer-events", "auto");
    $("[opt-val").css("cursor", "pointer");

    if (contestEnded != null) {
        contestEnded = JSON.parse(contestEnded);
        if (contestEnded === true) {
            alert("Contest ENDED.")
        } else {
            nextQInfo = JSON.parse(nextQInfo);
            prevUserResponse = parseInt(prevUserResponse);

            if (isForceIncorrect) {
                prevUserResponse = 5;
            }

            var answerObject = { QuestionId: nextQInfo.Id, AnswerKey: prevUserResponse, IsWalkAway: false };
            getNextQuestion(contestID, answerObject);
        }
    }
}

function doForcefulWalkAway() {
    var contestID = window.localStorage.getItem("kbcContestID");
    var nextQInfo = window.localStorage.getItem("NEXTQUESTION");
    var contestEnded = window.localStorage.getItem("CONTESTENDED");

    if (contestEnded != null) {
        contestEnded = JSON.parse(contestEnded);
        if (contestEnded === true) {
            window.onbeforeunload = function () { }
            window.location.href = '/thanks';
        } else {
            nextQInfo = JSON.parse(nextQInfo);
            var answerObject = { QuestionId: nextQInfo.Id, AnswerKey: 1, IsWalkAway: true };
            getNextQuestion(contestID, answerObject);
        }
    }
}

function handleOptionClick(event, that) {
    var currQuestion = window.localStorage.getItem("NEXTQUESTION");
    if (currQuestion == null) {
        alert("SOMETHING WENT WRONG");
    } else {
        currQuestion = JSON.parse(currQuestion);
        currChosenBlock = that.attr("opt-val");

        if (currChosenBlock == currQuestion.CorrectOption) {
            that.css("background", "green");
            playCorrectAnswer();
        } else {
            that.css("background", "#be0027");
            $("[opt-val='" + currQuestion.CorrectOption + "']").css("background", "green");
            playIncorrectAnswer();

            $('.next').html("SEE RESULTS");
            setTimeout(function () {
                window.onbeforeunload = function () { }
                window.location.href = "/thanks";
            }, 6000);

        }

        clearTimeout(TIMER_INSTANCE);
        pauseClockSound();

        window.localStorage.setItem("LOCAL_PREVUSER_RES", currChosenBlock);

        $("[opt-val]").css("pointer-events", "none");
        $("[opt-val").css("cursor", "not-allowed");

        enableBtn('.next');
        disableBtn('.walkaway');
    }
}

function playQuestionStart() {
    stopAllSounds();
    $('#kbcQuestionStartPlay')[0].play();
}

function playContestStart() {
    stopAllSounds();
    $('#kbcThemePlay')[0].play();
}

function playCorrectAnswer() {
    stopAllSounds();
    $('#correctAnswerPlay')[0].play();
}

function playIncorrectAnswer() {
    stopAllSounds();
    $('#wrongAnswerPlay')[0].play();
}

function playLifelineSound() {
    stopAllSounds();
    $('#kbcLifelinePlay')[0].play();
}

function playClockSound() {
    pauseClockSound();
    $('#kbcClockPlay')[0].currentTime = 0;
    $('#kbcClockPlay')[0].play();
}

function pauseClockSound() {
    $('#kbcClockPlay')[0].pause();
}

function stopAllSounds() {
    var sounds = document.getElementsByTagName('audio');
    for (i = 0; i < sounds.length; i++) {
        sounds[i].pause();
        sounds[i].currentTime = 0;
    }
}

function disableBtn(selector) {
    $(selector).prop("disabled", true);
    $(selector).css("cursor", "not-allowed");
}

function enableBtn(selector) {
    $(selector).prop("disabled", false);
    $(selector).css("cursor", "pointer");
}

var TIMER_INSTANCE;

function startCountdownTimer() {
    clearInterval(TIMER_INSTANCE);

    var time = 30;
    var initialOffset = '440';
    var i = 1

    $('.item h2').html(time);

    /* Need initial run as interval hasn't yet occured... */
    $('.circle_animation').css('stroke-dashoffset', (1 * (initialOffset / time)));

    TIMER_INSTANCE = setInterval(function () {
        $('h2').text(time - i);
        if (i == time) {
            playIncorrectAnswer();

            clearInterval(TIMER_INSTANCE);

            disableBtn('.next');
            disableBtn('.walkaway');

            setTimeout(function () {
                pauseClockSound();
                doForcefulNext(true);
            }, 3000);

            return;
        }

        $('.circle_animation').css('stroke-dashoffset', ((i + 1) * (initialOffset / time)));

        if (i > (time * 0.75)) {
            $('.circle_animation').css('stroke', "red");
        }

        i++;

    }, 1000);
}

function triggerFFLifeLine() {
    let currentQ = localStorage.getItem("NEXTQUESTION");

    if (currentQ !== null) {
        currentQ = JSON.parse(currentQ);

        var correctOpt = parseInt(currentQ.CorrectOption);

        origArr = [1, 2, 3, 4]
        corrIdx = origArr.indexOf(correctOpt);
        origArr.splice(corrIdx, 1);

        randomOpt = origArr[Math.floor(Math.random() * origArr.length)];

        $("[opt-val]").hide();

        $("[opt-val='" + correctOpt + "']").show();
        $("[opt-val='" + randomOpt + "']").show();

        clearTimeout(TIMER_INSTANCE);
        pauseClockSound();
        playLifelineSound();
    }
}

function triggerPollLifeLine() {
    let currentQ = localStorage.getItem("NEXTQUESTION");

    if (currentQ !== null) {
        currentQ = JSON.parse(currentQ);

        $("[opt-val]").show();
        var correctOpt = parseInt(currentQ.CorrectOption);

        var allOptions = [1, 2, 3, 4];
        var percentNums = [
            [64, 12, 8, 16],
            [82, 4, 10, 4],
            [49, 40, 6, 5],
            [57, 21, 13, 9],
            [71, 11, 9, 9]
        ];

        var currPercentNums = percentNums[Math.floor(Math.random() * percentNums.length)];
        var correctAnsPercent = currPercentNums[0];

        currPercentNums.splice(0, 1);

        var bodyHtml = '';

        for (i in allOptions) {
            let randNum = 0;

            if (allOptions[i] == correctOpt) {
                randNum = correctAnsPercent;
            } else {
                tempRandIdx = Math.floor(Math.random() * currPercentNums.length);
                randNum = currPercentNums[tempRandIdx];

                currPercentNums.splice(tempRandIdx, 1);
            }

            var repeatableNum = Math.floor(randNum / 4);
            bodyHtml += "Option " + String.fromCharCode(65 + parseInt(i)) + ": " +
                "&#9608;".repeat(repeatableNum) + " " + randNum + "% <br>";
        }

        $('#PollLifeLineModal').modal();
        $('#PollLifeLineModal .modal-body').html(bodyHtml);
        $('#PollLifeLineModal .modal-body').css("text-align", "left");


        clearTimeout(TIMER_INSTANCE);
        pauseClockSound();
        playLifelineSound();
    }
}

function triggerQSLifeLine() {
    let currentQ = localStorage.getItem("NEXTQUESTION");
    var contestID = window.localStorage.getItem("kbcContestID");

    if (currentQ) {
        currentQ = JSON.parse(currentQ);
    }

    $.ajax({
        type: 'POST',
        url: "/contest/switchQuestion",
        data: {
            contestId: contestID,
            currQId: currentQ.Id,
            currLevel: currentQ.ContestLevel
        },
        beforeSend: function (e) {
            $('.loader').show();
        },
        complete: function (e) {
            $('.loader').hide();
        },
        success: function (response) {
            response = JSON.parse(response)
            response = response.data;

            window.localStorage.setItem("NEXTQUESTION", JSON.stringify(response.Question));

            // question to be delivered
            $("#questionStatement").html(response.Question.QuestionStatement);
            $("#optionA").html(response.Question.OptionA);
            $("#optionB").html(response.Question.OptionB);
            $("#optionC").html(response.Question.OptionC);
            $("#optionD").html(response.Question.OptionD);

            $('.rsl-tr').removeClass("active-tr");
            $('#rsl-tr-' + parseInt(response.Question.ContestLevel)).addClass("active-tr");

            $('.item').hide();
            playQuestionStart();

            if (response.Question.ContestLevel < 6) {
                setTimeout(function () {
                    $('.item').show();
                    playClockSound();
                    startCountdownTimer();
                }, 5000);

            } else {
                $('.item').hide();
            }

            $('.option-block').removeAttr("style");

            enableBtn('.walkaway');
            disableBtn('.next');
        },
        error: function (response) {

        }
    });

    clearTimeout(TIMER_INSTANCE);
    pauseClockSound();
    playLifelineSound();
}
