// Ankur Ingale
// Maze Generation Visualizer

var columns , rows;
var wallLength = 30;
var grid = [] , stack = [];
var current;

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  
  // setting up number of rows and columns
  rows = floor(height / wallLength);
  columns = floor(width / wallLength);
  
  // making a grid of Boxes 
  for(var i = 0; i < rows; i++){
      var p = [];
      for(j = 0; j < columns; j++){
          p.push(new Box(i,j));
      }
      grid.push(p);
  }
  
  // setting current box as the first box
  current = grid[0][0];
  
  // visited = 1 means the Box has not beem used again(backtracked)
  current.visited = 1;
}

function draw() {
  background(51);
  
  // drawing walls
  for(var i = 0;i < grid.length; i++){
      for(var j = 0; j < grid[i].length; j++)
          grid[i][j].drawWall();
  }
  
  // highlighting current box
  current.highlight();
  
  // getting next box
  next = current.getRandomBox();
  
  if(next){
      next.visited = 1;
    
      // for backtrack
      stack.push(current);
    
      // removing wall between
      removeWall(current , next);
      current = next;
  }
  else{
      // box has been backtracked and will not be used again
      current.visited = 2;
    
      if(stack.length > 0){
          current = stack.pop();
          current.visited = 2;
      }
  }
  
  // border colouring
  stroke(255,0,0);
  line(0,0,0,height);
  line(width,0,width,height);
  line(0,height,width,height);
  line(0,0,width,0);
}

function indexChecker(i , j){
    if(i < 0 || j < 0 || i >= rows || j >= columns)
        return false;
    return true;
}

function removeWall(currentBox , nextBox){
  
    if(nextBox.x - currentBox.x === 1){
        currentBox.wall[0] = false;
    }
  
    if(nextBox.x - currentBox.x === -1){
        nextBox.wall[0] = false;
    }
  
    if(nextBox.y - currentBox.y === 1){
        currentBox.wall[1] = false;
    }
  
    if(nextBox.y - currentBox.y === -1){
        nextBox.wall[1] = false;
    }
}