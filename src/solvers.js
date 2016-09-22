/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.node = function() {
  var instance = {};
  instance.hasConflict = false;
  instance.matrix = null;
  instance.location = null;
  instance.children = [];
  return instance;
}

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme


  var rootMatrix = [];
  for(var i=0; i<n; i++){
    var row = [];
    for(var j=0; j<n; j++){
      row[j] = 0;
    }
    rootMatrix[i] = row;
  }
  console.log(rootMatrix)
  var r = node();
  r.matrix = rootMatrix;

  var buildTree = function(board, tuple, depth){
      console.log("depth: " + depth)
      // add 1 to tuple location
      board.matrix[tuple[0]][tuple[1]] = 1;
      console.log(JSON.stringify(board.matrix))
      // check if it has conflicts
      if(_checkForConflicts("rooks", board.matrix)){
          // if has conflicts, return
        // console.log("HAS CONFLICT");
        board.hasConflict = true;
        return board;
      } else {
        var newLocation = _getNextSpaceOnBoard(n, tuple);
        while(newLocation){
          if(depth === n){
            console.log("SOLUTION")
            solution = board.matrix;
          }
          // console.log(newLocation)
          var newBoard = node();
          newBoard.matrix = _copyMatrix(board.matrix);
          // console.log()
          var child = buildTree(newBoard, newLocation, depth + 1);
          if(!child.hasConflict){
            board.children.push(child);
          }
          newLocation = _getNextSpaceOnBoard(n, newLocation);
        }
      }


      var newLocation = _getNextSpaceOnBoard(n, tuple);
      console.log(newLocation)
      var child = buildTree(r, newLocation, depth + 1);
      if(!child.hasConflict) {
        board.children.push(child);
      }
      // newLocation = _getNextSpaceOnBoard(n, newLocation);

      return board;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
var tree = buildTree(r, [0,0], 0);
return solution;
}  

window._copyMatrix = function(matrix){
  return matrix.map(function(row){
    return row.map(function(v){
      return v;
    })
  });
}


window._checkForConflicts = function(criteria, board) {
    var hasConflict = false;

        var board = new Board(board);

      var conflictDetected = board["hasAnyRooksConflicts"]();
    // _.map(criteria.split(' '), function(conflictType) {
      hasConflict = hasConflict || conflictDetected;
    // });

    return hasConflict; 
}

window._getNextSpaceOnBoard = function(n, tuple) {
  var newTuple =[tuple[0],tuple[1]];
  if(tuple[0] >= n-1 && tuple[1] >= n-1){
    return null;
  }

  if(tuple[1] >= n - 1){
    newTuple[0] = tuple[0] + 1;
    newTuple[1] = 0;
  } else{
    newTuple[0] = tuple[0];
    newTuple[1] = newTuple[1] + 1;
  }
  return newTuple;
}

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
