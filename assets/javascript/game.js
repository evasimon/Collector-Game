$(document).ready(function() {

	// Global Varibales
	var globalNumber = 0;
	var myScore = 0;
	var wins = 0;
	var losses = 0;

	// YAY Array of Fruit Objects
	var fruits = [
		{
			name: "apple",
			class: "btn-apple",
		},
		{
			name: "pear",
			class: "btn-pear",
		},
		{
			name: "peach",
			class: "btn-peach",
		},
		{
			name: "kiwi",
			class: "btn-kiwi",
		},
	];
	
	// Create <div> elements
	var globalNumberDiv = $("<div id='global-number'></div>");
	var myScoreDiv = $("<div>Match the above number by clicking on the fruit buttons: <span id='my-score-number'></span></div>");
	var winsDiv = $("<div class='score'>Wins: <span id='wins-count'>0</span></div>");
	var lossesDiv = $("<div class='score'>Losses: <span id='losses-count'>0</span></div>");
	var fruitsDiv = $("<div id='fruits-container'></div>");


	// Insert into #container div
	$("#container").append(globalNumberDiv);
	$("#container").append(fruitsDiv);
	$("#container").append(myScoreDiv);
	$("#container").append(winsDiv);
	$("#container").append(lossesDiv);


	// FUNCTIONS
	// ************** START GAME **************

	// ************** RANDOM NUMBER GENERATOR **************

	// Random number generated between two numbers, passing them as arguments
	function randomNumber(min, max) {

		return Math.floor((Math.random() * (max - min)) + min);

	} // ************** END RANDOM NUMBER GENERATOR **************


	// ************** RESETTING THE NUMBERS **************
	var resetNumbers = function() {
		myScore = 0;
		globalNumber = randomNumber(19, 121);
		globalNumberDiv.text(globalNumber);
		$("#my-score-number").text(myScore);
		populateFruitNumbers();

		// ************** CLICK EVENT HANDLER **************
		// after creating the new buttons set
		$("button").on("click", function(){
			// get the data-value of the button clicked
			var btnValue = parseInt($(this).attr("data-value"));

			// calculate myScore
			myScore = myScore + btnValue;

			// add myScore to HTML
			$("#my-score-number").text(myScore);

			// Compare the globalNumber with myScore
			if ( globalNumber === myScore ) {

				wins++;
				$("#wins-count").text(wins);
				console.log("My wins: " + wins);

				// call resetNumbers function
				// generate a new number + data-value set
				resetNumbers();

			} else if ( globalNumber < myScore ) {

				losses++; 
				$("#losses-count").text(losses);
				console.log("My losses: " + losses);

				// call resetNumbers function
				// generate a new number + data-value set
				resetNumbers();

			}; // End Compare the globalNumber with myScore


		}); // ************** END CLICK EVENT HANDLER **************

	}// ************** END RESETTING THE NUMBERS **************


	// ************** CREATING FRUIT BUTTONS **************
	var populateFruitNumbers = function() {
		// cleares the fruits buttons and their data-value
		fruitsDiv.html("");

		// for each fruit a button and it's random number is generated
		for ( var i = 0; i < fruits.length; i++) {
			// create fruit buttons
			var fruitBtn = $("<button>");

			// for each fruit button a random number is generated
			fruits[i].value = randomNumber(1, 13);

			// add btn and btn-fruit classes to the button element
			fruitBtn.addClass("btn " + fruits[i].class);

			// pass the data-value genarated to the button
			fruitBtn.attr("data-value", fruits[i].value);

			// test/debuging purposes: write generated number on the button
			// fruitBtn.text(fruits[i].name + fruits[i].value);

			// add the buttons to the fruits container (HTML)
			fruitsDiv.append(fruitBtn);

		}
	} // ************** END CREATING FRUIT BUTTONS **************

	console.log(fruits);

	// ************** CALLING THE FUNCTION **************
	resetNumbers();

});

