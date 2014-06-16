//VARIABLE DECLARATION
var stackMove;//STACK FOR UNDO
var stackCount;

var currPos;////CURRENT POSITION IN X,Y STARTS AT 0
var arrTargetPos = [];//ARRAY POSITION TARGET IN X,Y STARTS AT 0
var table = document.getElementById("gameBoard");

//FUNCTION DECLARATION
function initGame(){
   //INIT UNDO STACK
   stackMove = new Array();
   stackCount = 0;
   
   //INIT POSITIONS
   currPos = [0,1];
   
   //RANDOMIZE ARRAY POSITION
   randomizeTargetPos();
}

   //NEED TO FILL//
//TARGET RANDOMIZER
function randomizeTargetPos(){
   //DUMMY RANDOMIZER
   var i = 0;
   var row, col;
   
   while (i < 4)
   {
      row = Math.floor((Math.random() * 6) + 2);
      col = Math.floor((Math.random() * 5) + 1);
      
      if( $(".content table tr:nth-child("+ row +") td:nth-child("+ col +")").hasClass("pink") ) 
      {

      }
      else
      {
         $(".content table tr:nth-child("+ row +") td:nth-child("+ col +")").toggleClass("pink");
         arrTargetPos[i] = [col,row];
         i++;
      }
   }
   arrTargetPos[4] = [5,6];
   //DUMMY RANDOMIZER END
}

//MOVE TO
function move(newX,newY){
   
      stackMove.push(currPos);
      stackCount++;
      
      currPos = [newX,newY];
      alert(currPos);
      $('h1').html(stackCount+'/14');
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
      alert("YOU WIN BITCHES!!!!");
   }
}
   
   //NEED TO FILL
//CHECK IF CAN UNDO
function isCanUndo(x,y){
   alert("clicked at : "+x+","+y);
   alert("currPos : "+ currPos[0] +","+currPos[1]);
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
   $('h1').html(stackCount+'/14');
}

$(document).ready(function(){
   initGame();

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
               if($(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").hasClass("up")) {
                  undoLastMove();
                  alert(currPos);
                  $(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").toggleClass("up");
                  $(".content table tr:nth-child("+ (currPos[1]+1) +") td:nth-child("+ (currPos[0]+1) +").cell").toggleClass("down");
               } else if($(".content table tr:nth-child("+ this.parentNode.rowIndex +") td:nth-child("+ (this.cellIndex+1) +").cell").hasClass("down")) {
                  undoLastMove();
                  alert(currPos);
                  $(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").toggleClass("down");
                  $(".content table tr:nth-child("+ (currPos[1]+1) +") td:nth-child("+ (currPos[0]+1) +").cell").toggleClass("up");
               } else if($(".content table tr:nth-child("+ this.parentNode.rowIndex +") td:nth-child("+ (this.cellIndex+1) +").cell").hasClass("left")) {
                  undoLastMove();
                  alert(currPos);
                  $(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").toggleClass("left");
                  $(".content table tr:nth-child("+ (currPos[1]+1) +") td:nth-child("+ (currPos[0]+1) +").cell").toggleClass("right");
               } else if($(".content table tr:nth-child("+ this.parentNode.rowIndex +") td:nth-child("+ (this.cellIndex+1) +").cell").hasClass("right")) {
                  undoLastMove();
                  alert(currPos);
                  $(".content table tr:nth-child("+ (this.parentNode.rowIndex+1) +") td:nth-child("+ (this.cellIndex+1) +").cell").toggleClass("right");
                  $(".content table tr:nth-child("+ (currPos[1]+1) +") td:nth-child("+ (currPos[0]+1) +").cell").toggleClass("left");
               }
            }
         });
      }  
   }
});