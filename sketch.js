// Ankur Ingale
// Maze Generation Visualizer

var columns , rows;
var wallLength = 30;
var grid = [] , stack = [];
var current;
var posx = 0 , posy = 0;

function setup() {
  createCanvas(300, 300);
  frameRate(100);
  
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
  grid[rows - 1][columns - 1].wall[0] = false;
  grid[rows - 1][columns - 1].wall[1] = false;
  
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
          grid[i][j].drawWalls();
  }
  
  // highlighting current box
  current.highlight();
  
  // getting next box
  next = current.getRandomBox();
  
  if(next){
      next.visited = 1;
    
      // depth-first-search
      stack.push(current);
    
      // removing the wall between
      removeWall(current , next);
      current = next;
  }
  else{
      // box has been backtracked and will not be used again
      current.visited = 2;
      if(stack.length > 0)
          current = stack.pop();
      else current.drawWalls();
  }
  
  // for playing the maze
  if(stack.length === 0)
      grid[posx][posy].highlight();
  
  // border colouring
  stroke(255,0,0);
  line(0,0,0,height);
  line(width,0,width,height - wallLength);
  line(0,height,width,height);
  line(wallLength,0,width,0);
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

function keyPressed(){
  
  if(stack.length === 0){
      if(keyCode == UP_ARROW){
         if(indexChecker(posx,posy - 1))
             if(grid[posx][posy - 1].wall[1] === false)
                 posy = posy - 1;
      }
      
      if(keyCode == DOWN_ARROW){
         if(indexChecker(posx,posy + 1))
             if(grid[posx][posy].wall[1] === false)
               posy = posy + 1;
      }
    
      if(keyCode == LEFT_ARROW){
         if(indexChecker(posx - 1,posy))
             if(grid[posx - 1][posy].wall[0] === false)
                 posx = posx - 1;
      }
  
      if(keyCode == RIGHT_ARROW){
         if(indexChecker(posx + 1,posy))
              if(grid[posx][posy].wall[0] === false)
                   posx = posx + 1;
      }
  }
  
  if(posx === rows - 1 && posy === columns - 1)
      console.log("Maze Completed");
}