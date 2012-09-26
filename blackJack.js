/* 
	This is Javascript code for playing 
	 Black Jack as one player against the dealer.
	There are unlimited decks of cards
	 used in a single game (as of v0.1)

	To do:	interaction on website not prompt
		Black Jack beats all other 21-point-hands
		Show the first dealer card upfront
		insurance (side bet)
		double
		split	
*/

// Card Constructor
function Card(s,r){
	var suit = s;
	var rank = r;
	this.getSuit = function(){
		return suit;
	};
	this.getNumber = function(){
		return rank;
	};
	this.getValue = function(){
		return (rank > 9) ? 10 : (rank === 1) ? 11 : rank;
	};
}

// deal function
function deal(){
	var s = Math.floor(Math.random() * 4 + 1);
	var r = Math.floor(Math.random() * 13 + 1);
	var n = new Card(s,r);
	return n;
}

// Hand constructor
function Hand(){
	var hand = [];
	hand[0] = deal();
	hand[1] = deal();
	this.getHand = function(){
		return hand;
	};
	this.score = function(){
		var sum = 0;
		var nOfAces = 0;
		for(i=0;i<hand.length;i++){
			sum += hand[i].getValue();
			if(hand[i].getNumber() === 1) nOfAces++;
		}
		while(nOfAces > 0 && sum > 21){
			sum -= 10;
			nOfAces--;
		}		
		return sum;
	};
	this.printHand = function(){
		var str = "";
		for(i=0;i<hand.length;i++){
			var rk = hand[i].getNumber();
			var su = hand[i].getSuit();
			if(rk === 1){
				rk = "Ace";
			} else if(rk === 11){
				rk = "Jack";
			} else if(rk === 12){
				rk = "Queen";
			} else if(rk === 13){
				rk = "King";
			}
			if(su === 1){
				su = "Clubs";
			} else if(su === 2){
				su = "Diamonds";
			} else if(su === 3){
				su = "Hearts";
			} else if(su === 4){
				su = "Spades";
			}
			str += rk + " of " + su + ((i === (hand.length - 1)) ? "" : ", ");
		}
		return str;
	};
	this.hitMe = function(){
		var nc = new Card(Math.floor(Math.random() * 4 + 1), Math.floor(Math.random() * 13 + 1));
		hand.push(nc);
	};
}

// dealer plays
function playAsDealer(){
	var dh = new Hand();
	while(dh.score() < 17){
		dh.hitMe();
	}
	return dh;
}

// player plays
function playAsUser(){
	var ph = new Hand();
	var con = true;
	while(con === true){
		con = confirm(ph.printHand() + "\n" + "\n" + "Your score is " + ph.score() + "." + "\n" + "\n" + "Press OK to get another card or cancel to stop." + "\n" + "\n");
		if(con === true){
			ph.hitMe();
		}
	}
	return ph;
}

// declare Winner
function declareWinner(userHand, dealerHand){
	if(userHand.score() > 21){
		if(dealerHand.score() < 22){
			return "You lose!";
		} else {
			return "You tied!";
		}
	} else if(dealerHand.score() > 21){
		if(userHand.score() < 22){
			return "You win!";
		} else {
			return "You tied!";
		}
	} else if(userHand.score() === dealerHand.score()){
		return "You tied!";
	} else if(userHand.score() > dealerHand.score()){
		return "You win!";
	} else if(userHand.score() < dealerHand.score() && dealerHand.score() < 22){
		return "You lose!";
	}
}

// play function
function playGame(){
	var user = playAsUser();
	var dealer = playAsDealer();
	var winner = declareWinner(user,dealer);
	alert("Player has " + "\n" + 
		user.printHand() + "\n" + 
		" scoring " + user.score() + "\n" + "\n" +
		"Dealer has " + "\n" + 
		dealer.printHand() + "\n" + 
		" scoring " + dealer.score() + "\n" + "\n" +
		winner + "\n" + "\n");
}

// call to play the game
playGame();


