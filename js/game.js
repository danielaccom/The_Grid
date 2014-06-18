//FUNCTION DECLARATION
function initGame(){
	//INIT UNDO STACK
	stackMove = new Array();
	stackCount = 0;
	
	//INIT POSITIONS
	currPos = [0,1]
	arrTargetPos = {}
	
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
	if(stackCount >= 13 {
		return false;
	}
	
	if(x >= 0 && x<6 && y > 0 && y<7){
		if(x == currPos[0]+1 && y == currPos[1]
			|| x == currPos[0]-1 && y == currPos[1]
			|| x == currPos[0] && y == currPos[1] + 1
			|| x == currPos[0] && y == currPos[1] - 1)
		{
			if(stackMove.indexOf([x,y])== -1){
				return true;
			}else{
				return false;
			}
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
	if(stackCount == 14 && currPos == [5,6] && isAllTargetConnected()){
		return true;
	else{
		return false;
	}
}
	
	//NEED TO FILL
//CHECK IF CAN UNDO
function isCanUndo(x,y){
	if(stackCount != 0){
		return true;
	}else{
		return false;
	}
}

//FUNCTION FOR UNDO MOVE
function undoLastMove(){
	currPos = stackMove.pop();
	stackCount--;
}

//IS ARRAY TARGET POS IN STACK COUNT
function isAllTargetConnected(){
	var i;
	var count;//TARGET CONNECTED COUNT
	
	for(i = 0;i<arrTargetPos.length;i++){
		if(stackMove.indexOf(arrTargetPos[i])!= -1){
			count++
		}
	}
	
	if(count == 3){
		return true;
	}
	
	return false;
}

//VARIABLE DECLARATION
var stackMove;//STACK FOR UNDO
var stackCount;

var currPos;////CURRENT POSITION IN X,Y STARTS AT 0
var arrTargetPos;//ARRAY POSITION TARGET IN X,Y STARTS AT 0

//BODY
initGame();