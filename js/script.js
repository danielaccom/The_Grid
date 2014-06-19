//VARIABLE DECLARATION
var stackMove;//STACK FOR UNDO
var stackCount;

var currPos;////CURRENT POSITION IN X,Y STARTS AT 0
var arrTargetPos = [];//ARRAY POSITION TARGET IN X,Y STARTS AT 0
var arrPinkTiles = [];//ARRAY CANDIDATE PINK TILES
var table = document.getElementById("gameBoard");

var minutes = 0;
var seconds = 0;
var timer;

var timerDelay;
var gameStarted = false;
var timerForPurple;
var purpleBlinked = 0;
var counterDelay = 0;
var drawX = 1;
var drawY = 2;

function randomizeTile() {
   for (var i = 2; i <= 7; i++) {
      for (var j = 1; j <= 6; j++) {
         var classes = ["man","woman1","woman2"];
         $('table tr:nth-child('+ i +') td:nth-child('+ j +').cell').addClass(classes[Math.round(Math.random()*(classes.length-1))]);
      }
   }
}

function count()
{
   seconds++;
   if(seconds == 60) {
      minutes++;
      seconds = 0;
   }

   //$('h2').html(minutes + " minute(s) " + seconds + " second(s)");
}

//FUNCTION DECLARATION
function initGame(){
   randomizeTile();

   //INIT UNDO STACK
   stackMove = new Array();
   stackCount = 0;
   
   //INIT POSITIONS
   currPos = [0,1];
   
   $('#text-chart-2').addClass("hidden");
   gameStart = false;

   //RANDOMIZE ARRAY POSITION
   randomizeTargetPos();
}

function purpleBlip() {
   if(purpleBlinked > 4) {
      clearInterval(timerForPurple);
      timerDelay = setInterval(function(){delayedStart()},100);
   } else {
      purpleBlinked++;
      for(var i = 0; i < arrTargetPos.length; i++) {
         $(".content table tr:nth-child("+ arrTargetPos[i][1] +") td:nth-child("+ arrTargetPos[i][0] +")").toggleClass("purple");
      }
   }
}

function anotherDelay() {
   if(counterDelay > 5) {
      $('#text-chart-2').addClass("hidden");
   } else {
      counterDelay++;
   }
}

function delayedStart() {
   if(counterDelay > 36) {
      counterDelay = 0;
      clearInterval(timerDelay);
      $('#text-chart-2').removeClass("hidden");
      timerDelay = setInterval(function(){anotherDelay()},100);
      timer = setInterval(function(){count()},1000);
      minutes = 0;
      seconds = 0;
	  
   } else {
       $(".content table tr:nth-child("+ drawY +") td:nth-child("+ drawX +")").toggleClass("dotted");
      counterDelay++;
      drawX++;
      if(drawX > 6) {
         drawX = 1;
         drawY++;
      }
   }
}

   //NEED TO FILL//
//TARGET RANDOMIZER
function randomizeTargetPos(){
   //DUMMY RANDOMIZER
   var row, col;
   
   do{
		var i = 0;
		while (i < 4)
		{
			row = Math.floor((Math.random() * 6) + 2);
			col = Math.floor((Math.random() * 5) + 1);
		  
			if(isInArray2d(arrTargetPos,[col,row]))
			{

			}
			else
			{
				//$(".content table tr:nth-child("+ row +") td:nth-child("+ col +")").toggleClass("pink");
				arrTargetPos[i] = [col,row];
				//	arrPinkTiles[i] = [col,row];
				i++;
		  }
		}
		arrTargetPos[4] = [6,7];
	}while(!pinkTilesValidator(arrTargetPos));
	
	for (i = 0; i < arrTargetPos.length; i++)
	{
		$(".content table tr:nth-child("+ arrTargetPos[i][1] +") td:nth-child("+ arrTargetPos[i][0] +")").toggleClass("purple");
	}
	
   //DUMMY RANDOMIZER END
   //alert(arrTargetPos);
}

//COMPARING 2 ARRAY 2D
function isInArray2d(array2d,element){
	var i;
	for(i = 0;i<array2d.length;i++){
		if(element[0] == array2d[i][0] && element[1] == array2d[i][1])
			return true;
	}
	return false;
}

//GAME VALIDATOR
function pinkTilesValidator(arrPinkTiles){
	var dx = 0;
	var dy = 0;

   dx = dx + Math.abs(1 - arrPinkTiles[0][0]);
   dy = dy + Math.abs(2 - arrPinkTiles[0][1]);
   
   for(var i = 1; i < arrPinkTiles.length; i++)
   {
      dx = dx + Math.abs(arrPinkTiles[i-1][0] - arrPinkTiles[i][0]);
      dy = dy + Math.abs(arrPinkTiles[i-1][1] - arrPinkTiles[i][1]);
   }
	//alert(arrPinkTiles);
	//alert(dx+dy);
	
	if ((dx+dy) <= 14)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//MOVE TO
function move(newX,newY){
   
      stackMove.push(currPos);
      stackCount++;
      
      currPos = [newX,newY];
      $('h2#counter-desc').html((14-stackCount)+'x');
	  autoConnectorAlert();
}

   //NEED TO FILL//
//CHECK MOVE VALIDITY, RETURN BOOLEAN
function isMoveValid(x,y){
   //DUMMY VALIDATION
   if(stackCount > 13) {
      return false;
   }
   
   if(x >= 0 && x<6 && y > 0 && y<7){
      if(x == currPos[0]+1 && y == currPos[1]
         || x == currPos[0]-1 && y == currPos[1]
         || x == currPos[0] && y == currPos[1] + 1
         || x == currPos[0] && y == currPos[1] - 1)
      {
         var found = false;
         var i = 0;
         while(!found && i < stackCount)
         {
            if(stackMove[i][0] == x && stackMove[i][1] == y) {
               found = true;
            }
            i++;
         }

         return !found;
         /*if(stackMove.indexOf([x,y])== -1){
            alert("yang dimasukin " + [x,y] + " "  + y+" stackmove " +  stackMove);
            return true;
         }else{
            return false;
         }*/
      }else{
         return false;
      }
   }else{
      return false;
   }
   //END DUMMY VALIDATION
}
   
   //NEED TO FILL
//CHECK WIN CONDITION
function isWin(){
   var count = 0;
   var fufilled = false;
   for(var i = 0; i < arrTargetPos.length; i++) {
      for(var j = 0; j < stackMove.length; j++) {
         if(arrTargetPos[i][0] == stackMove[j][0]+1 && arrTargetPos[i][1] == stackMove[j][1]+1)
         {
            count++;
         }
      }
   }

   if(count > 3) {
      fufilled = true;
   } else {
      fufilled = false;
   }
   if(stackCount == 14 && currPos[0] == 5 && currPos[1] == 6 && fufilled){
      clearInterval(timer);
      alert("YOU WON!!!! YEAH... Your time record is " + minutes + " minute(s) " + seconds + " second(s)");
   }
}
   
   //NEED TO FILL
//CHECK IF CAN UNDO
function isCanUndo(x,y){
   if(stackCount != 0){
      if(x == currPos[0] && y == currPos[1]){
		
         return true;
      }else{
         return false;
      }
   }else{
      return false;
   }
}

//FUNCTION FOR UNDO MOVE
function undoLastMove(){
   currPos = stackMove.pop();
   stackCount--;
   $('h2#counter-desc').html((14-stackCount)+'x');
   autoConnectorAlert();
}

//FOR TOGGLE BLINKING
function autoConnectorAlert(){
	if(stackCount == 14){
		$('.counter').addClass('blinking');
	}else if(stackCount == 13){
		$('.counter').removeClass('blinking');
	}
}

$(document).ready(function(){
   initGame();
   
    $(".spielanleitung h2").click(function() 
	{
		$(".spielanleitung p").slideToggle( "slow" );
		$(".spielanleitung ol").slideToggle( "slow" );
	});

   $(document).click(function(){
      if(!gameStarted) {
		$(".spielanleitung p").slideUp( "slow" );
		$(".spielanleitung ol").slideUp( "slow" );
        $('#text-chart-1').toggleClass("hidden");
        gameStarted = true;
        timerForPurple = setInterval(function(){purpleBlip()},500);
      }
   });

   for (var i = 2; i <= 7; i++) {
      for (var j = 1; j <= 6; j++) {
         $('table tr:nth-child('+ i +') td:nth-child('+ j +').cell').click(function(){
            if(isMoveValid(this.cellIndex,this.parentNode.rowIndex) && currPos[0]+1 == this.cellIndex) {
               var x = currPos[0]+1;
               var y = currPos[1]+1;
               $(this).toggleClass("left");
               $('table tr:nth-child('+ y +') td:nth-child('+ x +').cell').toggleClass("right");
               move(this.cellIndex,this.parentNode.rowIndex);
               isWin();
            } else if(isMoveValid(this.cellIndex,this.parentNode.rowIndex) && currPos[0]-1 == this.cellIndex) {
               var x = currPos[0]+1;
               var y = currPos[1]+1;
               $(this).toggleClass("right");
               $('table tr:nth-child('+ y +') td:nth-child('+ x +').cell').toggleClass("left");
               move(this.cellIndex,this.parentNode.rowIndex);
               isWin();
            } else if(isMoveValid(this.cellIndex,this.parentNode.rowIndex) && currPos[1]+1 == this.parentNode.rowIndex) {
               var x = currPos[0]+1;
               var y = currPos[1]+1;
               $(this).toggleClass("up");
               $('table tr:nth-child('+ y +') td:nth-child('+ x +').cell').toggleClass("down");
               move(this.cellIndex,this.parentNode.rowIndex);
               isWin();
            } else if(isMoveValid(this.cellIndex,this.parentNode.rowIndex) && currPos[1]-1 == this.parentNode.rowIndex) {
               var x = currPos[0]+1;
               var y = currPos[1]+1;
               $(this).toggleClass("down");
               $('table tr:nth-child('+ y +') td:nth-child('+ x +').cell').toggleClass("up");
               move(this.cellIndex,this.parentNode.rowIndex);
               isWin();
            } else if(isCanUndo(this.cellIndex,this.parentNode.rowIndex)) {
               var tempCurrPos = currPos;
			      undoLastMove();
			      //GERAK KE KIRI
				   if(tempCurrPos[0]-1 == currPos[0] && tempCurrPos[1] == currPos[1]){
					    $(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").toggleClass("left");
					    $(".content table tr:nth-child("+ (currPos[1]+1) +") td:nth-child("+ (currPos[0]+1) +").cell").toggleClass("right");
				   }if(tempCurrPos[0]+1 == currPos[0] && tempCurrPos[1] == currPos[1]){
					    $(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").toggleClass("right");
					    $(".content table tr:nth-child("+ (currPos[1]+1) +") td:nth-child("+ (currPos[0]+1) +").cell").toggleClass("left");
				   }if(tempCurrPos[0] == currPos[0] && tempCurrPos[1] == currPos[1]+1){
					    $(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").toggleClass("up");
					    $(".content table tr:nth-child("+ (currPos[1]+1) +") td:nth-child("+ (currPos[0]+1) +").cell").toggleClass("down");
				   }if(tempCurrPos[0] == currPos[0] && tempCurrPos[1] == currPos[1]-1){
					    $(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").toggleClass("down");
					    $(".content table tr:nth-child("+ (currPos[1]+1) +") td:nth-child("+ (currPos[0]+1) +").cell").toggleClass("up");
				   }
            }
         });
      }  
   }
});