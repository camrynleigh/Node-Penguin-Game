var Party = function (population, name) {
    this.population = population;
    this.name = name;
    this.isMyTurn = false;
}

var penguins = new Party(1000000, "Penguins");
var commies = new Party(1000000, "Communists");

function whoStarts() {
    var result = Math.random();
    if (result < 0.5) {
        penguins.isMyTurn = true;
    } else {
        commies.isMyTurn = true;
    }
}

function randomInt(maxPopulation) {
    return Math.floor(Math.random() * (maxPopulation) + 1);
}

function onHit(party) {
    console.log(party.name + " got hit by the nuke!")
    var howManyKilled = randomInt(party.population);
    party.population -= howManyKilled;
    console.log("The " + party.name + "'s lost " + howManyKilled + " population. The new population is " + party.population + " " + party.name);
}

function onMiss(party) {
    console.log("The " + party.name + "' nuke missed, and instead landed in the ocean.");
}

function sendNuke(party, onHit, onMiss) {
    var randomInt = Math.random();
    if (randomInt >= 0.5) {
        onHit(party);
    } else {
        onMiss(party);
    }
}

function runRoundOfGame() {

    if (penguins.isMyTurn) {
        sendNuke(commies, onHit, onMiss);
        penguins.isMyTurn = false;
        commies.isMyTurn = true;
    } else {
        sendNuke(penguins, onHit, onMiss);
        commies.isMyTurn = false;
        penguins.isMyTurn = true;
    }

    if (commies.population <= 0) {
        console.log("The Penguins won the battle!");
        clearInterval(intervalHandler);

    } else if (penguins.population <= 0) {
        console.log("The Communists won the battle!");
        clearInterval(intervalHandler);

    } else {
        console.log("Now it's the other party's turn!");
        console.log("");
    }
}



runRoundOfGame();
var intervalHandler = setInterval(runRoundOfGame, 2000);