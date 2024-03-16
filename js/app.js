const gameOptions = {
    "Lotto": { numbers: [1, 2, 3, 4, 5, 6, 7], lNumbers: [1], length: [1,40], lLength: [1, 40], rows: [1, 2, 3] },
    "EuroJackpot": { numbers: [1, 2, 3, 4, 5], lNumbers: [1, 2], length: [1,50], lLength: [1, 12], rows: [1, 2, 3] },
    "VikingLotto": { numbers: [1, 2, 3, 4, 5, 6], lNumbers: [1], length: [1,48], lLength: [1, 5], rows: [1, 2, 3] },
    "Keno": { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], lNumbers: [0], length: [1,70], lLength: [0], rows: [1, 2, 3] }
};
// audio för object
const buttonClickSound = new Audio('audio/Lotto.mp3', 'audio/Lotto.ogg');
const bonusSound = new Audio('audio/game-bonus.mp3', 'audio/game-bonus.ogg');


// klickfunktion för knappen "Generate numbers"
document.getElementById("button").addEventListener("click", function() {
    buttonClickSound.play();
    const selectedGame = document.getElementById("gameSelect").value; 
    const numberOfDigits = parseInt(document.getElementById("numberSelect").value); 
    const selectedRows = parseInt(document.getElementById("rowsSelect").value);
    const game = gameOptions[selectedGame]; 

    let mainNumbers = []; 
    let lNumbers = []; 

// generera numbers och lNumbers nummer för varje rad
for (let i = 0; i < selectedRows; i++) {
    const numbersForRow = generateNumbers(game.numbers, game.length, numberOfDigits);
    mainNumbers.push(numbersForRow.join(", "));

    if (game.lNumbers.length > 0) {
        const lNumbersForRow = generateNumbers(game.lNumbers, game.lLength, document.getElementById("lNumberSelect").value);
        lNumbers.push(lNumbersForRow.join(", "));
    } else {
        lNumbers.push(""); 
    }
    
}

// visar resultatet 
    document.getElementById("mainNumbers").textContent = "Main Numbers: \n" + mainNumbers.join("\n");
    document.getElementById("lNumbers").textContent = "Additional Numbers: \n" + lNumbers.join("\n");
});

// ändra spelval
document.getElementById("gameSelect").addEventListener("change", function() {
    const selectedGame = this.value; 
    updateOptions(selectedGame); 
});

// funktion som att uppdatera alternativ beroende på det valda spelet
function updateOptions(selectedGame) {
    const game = gameOptions[selectedGame]; 
    fillSelectOptions("numberSelect", game.numbers);
    fillSelectOptions("lNumberSelect", game.lNumbers);

    const logo = document.getElementById("logo");
    const gameText = document.getElementById("gameText");
    switch(selectedGame) {
        case "Lotto":
            logo.innerHTML = "<img src='img/lotto2.png' alt='Lotto Logo'>";
            gameText.innerHTML = "<p>Lotto är ett lotterispel med miljoner jackpots tillgängliga varje vecka. I spelet väljs sju nummer mellan 1-40 och ett stjärnnummer mellan 1-40.</p>";
            break;
        case "EuroJackpot":
            logo.innerHTML = "<img src='img/eurojackpot.png' alt='EuroJackpot Logo'>";
            gameText.innerHTML = "<p>Eurojackpot är ett multinationellt jackpottspel med två veckodragningar. I spelet väljs fem huvudnummer mellan 1-50 och två stjärnnummer mellan 1-12.</p>";
            break;
        case "VikingLotto":
            logo.innerHTML = "<img src='img/vikinglotto.png' alt='VikingLotto Logo'>";
            gameText.innerHTML = "<p>Vikinglotto är ett multinationellt lotterispel som spelas i Finland. I spelet väljs sex huvudnummer mellan 1-48 och ett vikingtal mellan 1-5.</p>";
            break;
        case "Keno":
            logo.innerHTML = "<img src='img/keno.png' alt='Keno Logo'>";
            gameText.innerHTML = "<p>Keno har tre dragningar dagligen: Dagdragning, Kvällsdragning och Late Night-dragning. I spelet väljs 1 till 10 spelnummer per rad.</p>";
            break;
        default:
            logo.innerHTML = "";
            gameText.innerHTML = ""; 
            break;
    }
}

// funktion för rullgardinslista
function fillSelectOptions(selectId, options) {
    const selectElement = document.getElementById(selectId); // få ID-element
    selectElement.innerHTML = ""; // kasta bort gamla options
    options.forEach(option => { 
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// det är funktion för att generera slumptal
function generateNumbers(possibleNumbers, range, count) {
    const min = range[0];
    const max = range[1];
    const result = [];
    const selectedNumbers = {};

    for (let i = 0; i < count; i++) {
        let randomNumber;
        do {
            randomNumber = getRandomInt(min, max);
        } while (selectedNumbers[randomNumber]); 
        selectedNumbers[randomNumber] = true; 

        result.push(randomNumber);
    }

    const selectedGame = document.getElementById("gameSelect").value;
    if (selectedGame === "Keno") {
        return result;
    }

    const matchedNumber = result.find(num => possibleNumbers.includes(num));
    const bonus = document.getElementById("bonus");
    const gameText2 = bonus.querySelector("#gameText2");
    if (matchedNumber) {
        // bonus.innerHTML = "<img src='img/bonus.gif' alt='bonus gif'>";
        // gameText2.innerHTML = "<p>Spel kan vara beroendeframkallande. Om du är orolig för att spela, vänligen kontakta oss!</p>";
        bonusSound.play();

        // setTimeout(function() {
        //     bonus.innerHTML = "<img src='img/bonus2.gif' alt='fon gif'>";
        //     gameText2.innerHTML = "<p>Spel kan vara beroendeframkallande. Om du är orolig för att spela, vänligen kontakta oss!</p>";
 
        // }, 2500); 
    }
 return result;
}

// vi genererar ett slumptal i ett givet intervall
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

updateOptions(document.getElementById("gameSelect").value);
