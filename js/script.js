var table = document.getElementById("gameBoard");
var currPos = [0,1];

$(document).ready(function(){
   var i = 1;
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
         $(".content table tr:nth-child("+ row +") td:nth-child("+ col +")").addClass("pink");
         i++;
      }
   }

      for (var i = 2; i <= 7; i++) {
            for (var j = 1; j <= 6; j++) {
               $('table tr:nth-child('+ i +') td:nth-child('+ j +').cell').click(function(){
                  if(currPos[0]+1 == this.cellIndex) {
                     var x = currPos[0]+1;
                     var y = currPos[1]+1;
                     $(this).toggleClass("left");
                     $('table tr:nth-child('+ y +') td:nth-child('+ x +').cell').toggleClass("right");
                     currPos[0] = this.cellIndex;
                     currPos[1] = this.parentNode.rowIndex;
                  } else if(currPos[0]-1 == this.cellIndex) {
                     var x = currPos[0]+1;
                     var y = currPos[1]+1;
                     $(this).toggleClass("right");
                     $('table tr:nth-child('+ y +') td:nth-child('+ x +').cell').toggleClass("left");
                     currPos[0] = this.cellIndex;
                     currPos[1] = this.parentNode.rowIndex;
                  } else if(currPos[1]+1 == this.parentNode.rowIndex) {
                     var x = currPos[0]+1;
                     var y = currPos[1]+1;
                     $(this).toggleClass("up");
                     $('table tr:nth-child('+ y +') td:nth-child('+ x +').cell').toggleClass("down");
                     currPos[0] = this.cellIndex;
                     currPos[1] = this.parentNode.rowIndex;
                  } else if(currPos[1]-1 == this.parentNode.rowIndex) {
                     var x = currPos[0]+1;
                     var y = currPos[1]+1;
                     $(this).toggleClass("down");
                     $('table tr:nth-child('+ y +') td:nth-child('+ x +').cell').toggleClass("up");
                     currPos[0] = this.cellIndex;
                     currPos[1] = this.parentNode.rowIndex;
                  }
               });
            }  
      }
});