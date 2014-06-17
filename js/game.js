//FUNCTION DECLARATION
function initGame(){
	//INIT UNDO STACK
	stackMove = new Array();
	stackCount = 0;
	
	//INIT POSITIONS
	currPos = [0,1]
	
	//INIT 
}

//MOVE TO
function move(newX,newY){
	
	//IMPORTANT
	//NEEDS TO ADD VALIDATION
	if(true){
		stackMove.push(currPos);
		stackCount++;
		
		currPos = [newX,newY];
		alert("moved");
	}else{
		alert("Invalid Move");
	}
}

//VARIABLE DECLARATION
var stackMove;//STACK FOR UNDO
var stackCount;

var currPos;////CURRENT POSITION IN X,Y
var arrTargetPos;//ARRAY POSITION TARGET

var connectorCount;//CONNECTOR USED
//BODY
initGame();