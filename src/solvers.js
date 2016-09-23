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



window.findNRooksSolution = function(n) {
  var solutionMatrix = undefined;
  console.log("n: " + n)
  var r = node();
  r.matrix = _rootMatrix(n);
  var buildTree = function(board, tuple, depth){
      // console.log("depth: " + depth)
      if ( solutionMatrix ) {
        return board;
      }
      if(!board.hasConflict && _checkForConflicts("Rooks", board.matrix) ) {
        board.hasConflict = true;
        return board;
      }
      
      if ( depth === n ) {
      
        solutionMatrix = board.matrix;
        /*return solution here or board? */
        return board;
      }
      while ( tuple ) {
          var newBoard = node();
          newBoard.matrix = _copyMatrix(board.matrix); // n^2
          newBoard.matrix[tuple[0]][tuple[1]] = 1;
          tuple = _getNextSpaceOnBoard(n, tuple);

          var child = buildTree(newBoard, tuple, depth + 1);
          // console.log(JSON.stringify(child.matrix));
          if ( !child.hasConflict ) {
            board.children.push(child);
          }
          if ( !tuple ) {
            break;
          }
        }
        return board;
      }
  buildTree(r, [0,0], 0);
  return solutionMatrix;
}

window._copyMatrix = function(matrix){
  return matrix.map(function(row){
    return row.map(function(v){
      return v;
    })
  });
}


window._rootMatrix = function(n) {
  var rootMatrix = [];
  for(var i=0; i<n; i++){
    var row = [];
    for(var j=0; j<n; j++){
      row[j] = 0;
    }
    rootMatrix[i] = row;
  }
  return rootMatrix;
}
window.node = function() {
  var instance = {};
  instance.hasConflict = false;
  instance.matrix = null;
  // instance.location = null;
  instance.children = [];
  return instance;
}
window._checkForConflicts = function(criteria, board) {
    var hasConflict = false;
    var board = new Board(board);
    var criteriaList = criteria.split(" ");
    // console.log(criteriaList)
    for(var i=0; i<criteriaList.length; i++){
      var funcName = "hasAny" + criteriaList[i] + "Conflicts";
      // console.log(funcName)
      var conflictDetected = board[funcName]();
      hasConflict = hasConflict || conflictDetected;
      if(hasConflict) {break;}    
    }

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
  var solutionCount = 0; //fixme

  console.log("n: " + n)
  var r = node();
  r.matrix = _rootMatrix(n);
  var buildTree = function(board, tuple, depth){
      // console.log("depth: " + depth)
      if(depth > 1 && !board.hasConflict ) {
        if(_checkForConflicts("Rooks", board.matrix)){
          board.hasConflict = true;
          return board;
        }
      }
      
      if ( depth === n ) {      
        solutionMatrix = board.matrix;
        /*return solution here or board? */
        solutionCount++;
        // console.log(solutionCount)
        // if(solutionCount % 120 === 0){
          // debugger;
        // }
        return board;
      }
      while ( tuple ) {
          var newBoard = node();
          newBoard.matrix = _copyMatrix(board.matrix); // n^2
          newBoard.matrix[tuple[0]][tuple[1]] = 1;
          tuple = _getNextSpaceOnBoard(n, tuple);

          var child = buildTree(newBoard, tuple, depth + 1);
          // console.log(JSON.stringify(child.matrix));
          if ( !child.hasConflict ) {
            board.children.push(child);
          }
          if ( !tuple ) {
            break;
          }
        }
        return board;
      }
  buildTree(r, [0,0], 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
 var solutionMatrix = undefined;
  console.log("n: " + n)
  var r = node();
  r.matrix = _rootMatrix(n);
  var buildTree = function(board, tuple, depth){
      // console.log("depth: " + depth)

      if ( solutionMatrix ) {
        return board;
      }
      if(depth > 1 && !board.hasConflict && _checkForConflicts("Queens", board.matrix) ) {
        board.hasConflict = true;
        return board;
      }
      
      if ( depth === n ) {
        solutionMatrix = board.matrix;
        /*return solution here or board? */
        return board;
      }
      while ( tuple ) {
          var newBoard = node();
          newBoard.matrix = _copyMatrix(board.matrix); // n^2
          newBoard.matrix[tuple[0]][tuple[1]] = 1;
          tuple = _getNextSpaceOnBoard(n, tuple);

          var child = buildTree(newBoard, tuple, depth + 1);
          // console.log(JSON.stringify(child.matrix));
          if ( !child.hasConflict ) {
            board.children.push(child);
          }
          if ( !tuple ) {
            break;
          }
        }
        return board;
      }
  buildTree(r, [0,0], 0);
  if(!solutionMatrix){
    solutionMatrix = _rootMatrix(n);
  }
  return solutionMatrix;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  // console.log("n: " + n)
  var r = node();
  r.matrix = _rootMatrix(n);
  var buildTree = function(board, tuple, depth){
      // console.log("depth: " + depth)
      if(depth > 1 && !board.hasConflict ) {
        if(_checkForConflicts("Queens", board.matrix)){
          board.hasConflict = true;
          return board;
        }
      }
      
      if ( depth === n ) {
       // console.log('queens : ' +depth +`
       //    ` +JSON.stringify(board));      
        solutionMatrix = board.matrix;
        solutionCount++;
        console.log(solutionCount);
        return board;
      }
      while ( tuple ) {
          var newBoard = node();
          newBoard.matrix = _copyMatrix(board.matrix); // n^2
          newBoard.matrix[tuple[0]][tuple[1]] = 1;
          tuple = _getNextSpaceOnBoard(n, tuple);

          var child = buildTree(newBoard, tuple, depth + 1);
          // console.log(JSON.stringify(child.matrix));
          if ( !child.hasConflict ) {
            board.children.push(child);
          }
          if ( !tuple ) {
            break;
          }
        }
        return board;
      }
  buildTree(r, [0,0], 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
