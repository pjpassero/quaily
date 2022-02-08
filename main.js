var questions = [
    "What is the rarest M&M color?",
    "In what year were the first Air Jordan sneakers released?",
    "According to Greek mythology who was the first woman on earth?",
    "Which African country was formerly known as Abyssinia?",
    "In which European city would you find Orly airport?",
    "Fissures, vents and plugs are all associated with which geological feature?",
    "Which country consumes the most chocolate per capita?",
    "Which of Shakespeare's plays is the longest",
    "What is the softest mineral in the world?",
    "What is the world's biggest island?",
    "Which country is known as the Land of White Elephant?",
    "What color eyes do most humans have?",
    "What is the largest type of deer?",
    "Which Disney film features the song 'When You Wish Upon a Star'?",
    "What is the lowest army rank of a US soldier?",
    "What is often seen as the smallest unit of memory?",
    "Gregg and ________ Allman were founded the Allman Brothers Band, the artists behing 'Ramblin Man'",
    "Which planet is the hottest in the solar system?",
    "Which country produces the most coffee in the world?",
    "What is the common name for dried plums?",
    "Which fairy tale character had really, really, really, long hair?",
    "What character lives in a rubbish bin on Sesame Street?",
    "In what country would I find Buckingham Palace?",
    "What is Harry Potter's middle name? ",
    "What shape is a STOP sign? ",
    "From what tree do acorns fall?",
    "What animal became Shrek's offsider/best friend? ",
    "Which country is home to the Koala? ",
    "In what country would I find Michelangelo's famous statue of David?",
    "Who is Batman's crime fighting partner? ",
    "When Walt Disney's seven dwarfs went off to work in the mines, what were they looking for?",
    "When listed in alphabetical order, what is the first country in the world? ",
    "What was the first PC game to feature a multi-player deathmatch mode?",
    "What is the capital city of Italy?",
    "What 1976 Atari game was designed by Steve Wozniak and Steven Jobs?",
    "This 17th-century French scientist/mathematician/philosopher gave his name to the SI unit of pressure",
    "Which kind of bulbs (flowers) were once exchanged as a form of currency?",
    "Which chess piece can only move diagonally?",
    "Which country did bagels originate from?",
    "What does a Scoville unit measure?",
    "Apple's CEO Steve Jobs was known for wearing what color turtleneck?",
    "How many red stripes are there on the American flag?",
    "Galileo was the citizen of which country?",
    "Which country is the largest producer of vanilla?",
    "What is the only fruit that has its seeds on the outside?",
    "What is the driest continent?",
    "What is the most abundant metal in the Earth’s crust?",
    "Botany is the scientific study of what?",
    "In what country did carving jack o’ lanterns originate?",
    "What company makes the Butterfinger bar?",
    "What is the biggest artery in the human body?",
    "The tuba is the largest member of which musical family?",
    "Where did rap superstar Eminem grow up?",
    ""
];
var answers = [
    "Brown",
    "1984",
    "Pandora",
    "Ethiopia",
    "Paris",
    "Volcanos",
    "Switzerland",
    "Hamlet",
    "Talc",
    "Greenland",
    "Thailand",
    "Brown",
    "Moose",
    "Pinocchio",
    "Private",
    "kilobyte",
    "Duane",
    "Venus",
    "Brazil",
    "Prunes",
    "Rapunzel",
    "Oscar",
    "England",
    "James",
    "Octagon",
    "Oak",
    "Donkey",
    "Australia",
    "Italy",
    "Robin",
    "Diamonds",
    "Afghanistan",
    "Doom",
    "Rome",
    "Breakout",
    "Pascal",
    "Tulips",
    "bishop",
    "Poland",
    "Spiciness",
    "Black",
    "Seven",
    "Italy",
    "Madagascar",
    "Strawberry",
    "Antartica",
    "Aluminium",
    "Plants",
    "Ireland",
    "Nestle",
    "Aorta",
    "Brass",
    "Detroit",
    ""
]
var today = new Date().setHours(0, 0, 0, 0);
var startDate = new Date(2022, 1, 1, 0, 0, 0, 0);
var questionElement = document.getElementById("dailyQuestion");
var userData = {
    "streak": 0,
    "attempts": 0,
    "lastTimePlay": new Date()
};
function bodyOnload() {

    userData = {
        "streak": returnUserStreak(),
        "attempts": returnUserAttempts(),
        "lastTimePlay": getLastTimePlay()
    };
    dailyPuzzle()

}
//generate an index for the arrays based on today's date
function generateIndex() {
    return (Math.abs(startDate - today) / 864e5) - 5;
}

function dailyPuzzle() {
    questionElement.innerHTML = questions[generateIndex()];

    if (userData['lastTimePlay'] == today) {
        openModal(true);
    }
}

function returnUserStreak() {
    var userStreak = localStorage.getItem("streak");

    if (userStreak == null) {
        localStorage.setItem("streak", 0);
        userStreak = localStorage.getItem("streak");
    }
    return userStreak;
}
function setUserStreak() {
    localStorage.setItem("streak", parseInt(localStorage.getItem("streak")) + 1);
    localStorage.setItem("lastTimePlay", today);
}
function returnUserAttempts() {
    if (localStorage.getItem("attempts") == null) {
        localStorage.setItem("attempts", 0);
    }
    return localStorage.getItem("attempts");
}
function getLastTimePlay() {
    return localStorage.getItem("lastTimePlay");

}




function guess() {
    var textBoxValue = document.getElementById("theanswer").value.toLowerCase();
    var solution = answers[generateIndex()].toLowerCase();
    

    var isInSolution = function (letter) {
        if (solution.indexOf(letter) > -1) {
            return true;
        }
        return false;
    };
    var guessElementString = "";
    if (solution == textBoxValue) {
        setUserStreak();
        openModal(true);
    } else {

        for (var i = 0; i <= solution.length; i++) {
            if (solution.charAt(i) == textBoxValue.charAt(i)) {
                guessElementString += `<span class="guessString" style="color:green;">${textBoxValue.charAt(i)}</span>`;
            } else if (isInSolution(textBoxValue[i])) {
                guessElementString += `<span class="guessString" style="color:yellow;">${textBoxValue.charAt(i)}</span>`;
            } else {
                guessElementString += `<span class="guessString" style="color:red;">${textBoxValue.charAt(i)}</span>`;
            }
        }

        document.getElementById("addGuess").innerHTML += `<span>${guessElementString}</span> <br>`;
        clearTextBox();

    }

}
function clearTextBox() {
    document.getElementById("theanswer").value = "";
}
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
function closeModal() {
    document.getElementById("statModal").style.display = "none";
}
function openModal(showSolution) {
    if (showSolution) {
        document.getElementById("soultionShow").innerHTML = capitalizeFirstLetter(answers[generateIndex()]) + "!";
    }
    document.getElementById("statModal").style.display = "block";


}
document.querySelector('#theanswer').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        guess();
    }
});

document.querySelector("#statsClicker").addEventListener("click", function () {
    openModal(false);
});

var timer = setInterval(function () {
    var timeNow = new Date();
    var nextQuaily = new Date();
    nextQuaily.setDate(timeNow.getDate() + 1);
    nextQuaily.setHours(0, 0, 0, 0);

    var distance = nextQuaily - timeNow;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(timer);
    }
}, 1000);


var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera());
    }
};
if (isMobile.iOS() || isMobile.Android()) {
    document.getElementsByTagName('body')[0].style.width = "90%";
    document.getElementsByTagName('body')[0].style.height = "100%";
    document.getElementsByTagName('body')[0].style.marginLeft = "0%";
    document.getElementsByTagName('body')[0].style.margin = "5%";
    document.getElementById("titleHeader").style.fontSize = "5em";
    document.getElementById("dailyQuestion").style.fontSize = "3em";
    document.getElementById("answeBTN").style.fontSize = "3em";
    document.getElementsByName("contentModal")[0].style.width = '90%';
    document.getElementsByName("contentModal")[0].style.margin = "5%";
    document.getElementsByClassName("modalHeader")[0].style.fontSize = "3.5em";
};
