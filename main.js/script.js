/*----- constants -----*/
// 1. Define required constants
// 1.1 The Players and their info

/*----- state variables -----*/
// 2. Define the variables that are used to track the game
// 2.1 The board holes 
// 2.4 The players hand
// 2.5 A winner (Player 1, 2, or Tie)
// 2.6 Who's turn it is

/*----- cached elements  -----*/
// 3. Store page Els that will be used multiple times:
// 3.1 The 12 main holes on the board
// 3.2 The 2 home base holes on the left and right of the board
// 3.3 The element that shoes how many pebbles are in whatever
// hole the mouse is hovering over
// 3.4 The element that displays who's turn it is/ win results
// 3.5 The play again button
// 3.6 The pebbles

/*----- event listeners -----*/

/*----- functions -----*/
// 4. Initialize the state variables
  // 4.1 Initialize the state variables:
	  // 4.1.1 The game starts with empty home bases
		// 4.1.2 The game starts with each main hole having 4 pebbles
    // 4.1.3 The game starts with player 1
    // 4.1.4 The winner is null
    // 4.1.5 The players hand is empty
  // 4.2 Render the state variables to page:
    // 4.2.1 Render the board:
    // 4.2.1.1 Loop over the main holes array, and for each iteration:
      // 4.2.1.2 Use the number of that iteration to update the hole at
      // that index, and update its value to match data
			// 4.2.1.3 Use the value to display according amount of pebbles
      // 4.2.1.2 Use the home-base value to update its visible pebbles
    // 4.2.2. Render the message:
		  // 4.2.2.1 If winner is null, render who's turn it is
      // 4.2.2.2 If winner is 'T', render a tie message
      // 4.2.2.3 If winner is not null, render congrats msg
  // 4.3 Wait for user to click a hole

// 5. Handle a player clicking a hole
 // 5.1 Players hand gets updated with the amount of pebbles in that hole
 // 5.2 Player deposits one of the pebbles in each hole going counter clock-
 // wise, until the hand is 0
	 // 5.2.1 If it's their opponents hole, it gets skipped
   // 5.2.2 If it's their own hole, they place a pebble in it
     // 5.2.2.1 If it's their last pebble being placed into their own hole
     // they play again
   // 5.2.3 If the last piece is dropped in an empty hole on the players side
   // they get to take the pebbles on the opposing side if any
 // 5.3 Check for a winner

// 6. Checking for a winner:
 // 6.1 Check if six pockets on one side are empty:
  // 6.1.1 If yes the other players takes whatever pebbles are left on
  // their side
 // 6.2 Check which player has the most pebbles
  // 6.2.1 Winner gets updated to the player with the most pebbles
  // 6.2.2 If player have equal amounts winner gets set to tie
// 6.3 Render the updated state

// 7. Handle player clicking replay button:
  // 7.1 Step 4 and 4.2