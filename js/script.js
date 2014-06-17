var table = document.getElementById("gameBoard");
var currPos = [0,1];

$(document).ready(function(){
	//$('td.cell').click(function(){
		//$(this).toggleClass("up");
		for (var i = 2; i <= 7; i++) {
   			for (var j = 1; j <= 6; j++) {
   				$('table tr:nth-child('+ i +') td:nth-child('+ j +').cell').click(function(){
   					//alert('My position in table is: '+this.cellIndex+'x'+this.parentNode.rowIndex);
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
	//});
});