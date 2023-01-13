/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let game of games) {
    let newdiv = document.createElement("div"); //create div element
    newdiv.setAttribute("class", "game-card"); //set class for div element

    let card = document.createElement("div"); //create div element
    card.setAttribute("class", "card"); //set class for div element
    newdiv.appendChild(card);

    let front = document.createElement("div"); //create div element
    front.setAttribute("class", "front"); //set class for div element
    card.appendChild(front);

    let back = document.createElement("div"); //create div element
    back.setAttribute("class", "back"); //set class for div element
    card.appendChild(back);

    front.innerHTML = `<img class="game-img" src="${game.img}" >
    <h3>${game.name}</h3>`;

    back.innerHTML = `<p> ${game.description} </p>`;
    gamesContainer.appendChild(newdiv);
  }
  // create a new div element, which will become the game card
  // add the class game-card to the list
  // set the inner HTML using a template literal to display some info
  // about each game
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")
  // append the game to the games-container
}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const number = GAMES_JSON.reduce((acc, val) => acc + val.backers, 0);
let num = number.toLocaleString("en-US");
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${num}</p> `;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const number2 = GAMES_JSON.reduce((acc, val) => acc + val.pledged, 0);
let num2 = number2.toLocaleString("en-US");
// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${num2}</p> `;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<p>11</p>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  var unfundedg = GAMES_JSON.filter((ufgame) => ufgame.pledged < ufgame.goal);
  // use filter() to get a list of games that have not yet met their goal

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedg);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  var fundedg = GAMES_JSON.filter(function (fgame) {
    return fgame.pledged >= fgame.goal;
  });

  // use filter() to get a list of games that have met or exceeded their goal
  addGamesToPage(fundedg);
  // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
  // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundednumber = GAMES_JSON.reduce(function (acc, val) {
  if (val.pledged < val.goal) {
    return (acc = acc + 1);
  } else {
    return acc;
  }
}, 0);
console.log(unfundednumber);
// create a string that explains the number of unfunded games using the ternary operator
let str = `A total of $800,268 has been raised for 11 games. Currently ${
  unfundednumber == 1 ? ` 1 game remains ` : ` ${unfundednumber} games remain`
} unfunded. We need your help to bump it up! `;
// create a new DOM element containing the template string and append it to the description container
let newdiv2 = document.createElement("p");
newdiv2.innerHTML = str;
descriptionContainer.appendChild(newdiv2);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [game1, game2, ...othergames] = sortedGames;
console.log(game1);
console.log(game2);
// create a new element to hold the name of the top pledge game, then append it to the correct element
let newdiv3 = document.createElement("p");
let newdiv4 = document.createElement("p");
newdiv3.innerHTML = `${game1.name}`;
newdiv4.innerHTML = `${game2.name}`;
firstGameContainer.append(newdiv3);
secondGameContainer.append(newdiv4);
// do the same for the runner up item
/*****************************************************************************************************
 */
