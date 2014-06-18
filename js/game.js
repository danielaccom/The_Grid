//FUNCTION DECLARATION
function initGame(){
	//INIT UNDO STACK
	stackMove = new Array();
	stackCount = 0;
	
	//INIT POSITIONS
	currPos = [0,1]
	arrTargetPos = {}
	
	//INIT CONNECTOR COUNT
	connectorCount = 0;
	
	//RANDOMIZE ARRAY POSITION
	randomizeTargetPos();
}

	//NEED TO FILL//
//TARGET RANDOMIZER
function randomizeTargetPos(){
	//DUMMY RANDOMIZER
	arrTargetPos[0] = [1,3]
	arrTargetPos[1] = [3,3]
	arrTargetPos[2] = [1,5]
	arrTargetPos[3] = [3,6]
	arrTargetPos[4] = [5,6]
	//DUMMY RANDOMIZER END
}

//MOVE TO
function move(newX,newY){
	
		stackMove.push(currPos);
		stackCount++;
		
		currPos = [newX,newY];

}

	//NEED TO FILL//
//CHECK MOVE VALIDITY, RETURN BOOLEAN
function isMoveValid(x,y){
	//DUMMY VALIDATION
	return true;
	//END DUMMY VALIDATION
}
	
	//NEED TO FILL
//CHECK WIN CONDITION
function isWin(){
	//DUMMY VALIDATION
	return true;
	//END DUMMY VALIDATION
}
	
	//NEED TO FILL
//CHECK IF CAN UNDO
function isCanUndo(x,y){
	//DUMMY VALIDATION
	return true;
	//END DUMMY VALIDATION
}

//FUNCTION FOR UNDO MOVE
function undoLastMove(){
	currPos = stackMove.pop();
	stackCount--;
}

//VARIABLE DECLARATION
var stackMove;//STACK FOR UNDO
var stackCount;

var currPos;////CURRENT POSITION IN X,Y STARTS AT 0
var arrTargetPos;//ARRAY POSITION TARGET IN X,Y STARTS AT 0

var connectorCount;//CONNECTOR USED
//BODY
initGame();