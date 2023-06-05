let lastregreshtime = 0;
let snakespeed =1;
let inputdirection = { x: -1, y: 0 }

let expentationamout =1;
let lastinputdir = inputdirection
const snake_body = [
    { x: 8, y: 8 },
    
]
let score = 0;
let food = { x: 15, y: 15 }
let scoreget=document.getElementById("score")
function notrefresh(currenttime) {
    var time_in_sec = (currenttime - lastregreshtime) / 1000;
    requestAnimationFrame(notrefresh)
    if (time_in_sec < 1 / snakespeed) {
        return;
    }
    lastregreshtime = currenttime
    snake_update();
    draw()
    // console.log(currenttime)
}
window.requestAnimationFrame(notrefresh)
// bcz we want that whatever we doing inside page page will not refresh so we will give this window.requestAnimationFrame(notrefresh)
// and not for once in every time so we will profide as a loop
// function notrefresh() {
    // requestAnimationFrame(notrefresh)
// }
const gamebord = document.querySelector(".game-baord");
const draw = () => {
    draw_snake()
    drawfood()
}
const snake_update = () => {
    gamebord.innerHTML = "";

    snake_move()
    snakefoodeat()
}

const draw_snake = () => {
    snake_body.forEach((el,i) => {
        var snaakeelement = document.createElement("div")
        snaakeelement.style.gridColumnStart = el.x
        snaakeelement.style.gridRowStart = el.y;
        
       
        snaakeelement.style.transform="rotate(0dg)"

        if (i == 0) {
            snaakeelement.classList.add("head")
            if ((inputdirection.x == 1)) {
snaakeelement.style.transform = "rotate(-90dg)";
            } else if ((inputdirection.x == -1)) {
                snaakeelement.style.transform = "rotate(90dg)";
            } else if ((inputdirection.y == -1)) {
                snaakeelement.style.transform = "rotate(180dg)";
            } else if ((inputdirection.y == 1)) {
                snaakeelement.style.transform = "rotate(0dg)";
            }
        } else {
            snaakeelement.classList.add("snake");
        }
        
     gamebord.appendChild(snaakeelement)
    })
}
const drawfood = () => {
    var foodleemt = document.createElement("div")
     foodleemt.style.gridColumnStart = food.x;
    foodleemt.style.gridRowStart = food.y;
    foodleemt.classList.add("food")
     gamebord.appendChild(foodleemt);
        
}
 
const snake_move = () => {
    inputdirection = getinputdir();

    for (let i = snake_body.length - 2; i >= 0; i--){
        snake_body[i + 1] = { ...snake_body[i]}
    }
    snake_body[0].x+=inputdirection.x
    snake_body[0].y += inputdirection.y;
    gameover()

}
const getinputdir = () => {
    window.addEventListener("keydown", e => {
        // console.log("j")

        
          switch (e.key) {
            case "ArrowUp":
              if (lastinputdir.y == 1) break;
              inputdirection = { x: 0, y: -1 };
              break
            case "ArrowDown":
              if (lastinputdir.y == -1) break;
              inputdirection = { x: 0, y: 1 };
              break;
            case "ArrowLeft":
              if (lastinputdir.x == 1) break;
              inputdirection = { x: -1, y: 0 };
              break;
            case "ArrowRight":
              if (lastinputdir.x == -1) break;
              inputdirection = { x: 1, y: 0 };
              break;
            default:
              inputdirection = { x: 0, y: 0 };
          }
        
    })
    lastinputdir = inputdirection;
     return inputdirection;
    
   
}

function snakefoodeat() {
    if (iseate()) {
        score += 10
        scoreget.innerHTML=score
        food = getfoodrandmposition()
        snakespeed++
expandsnake()
    }
    
}

const iseate = () => {
    return snake_body[0].x===food.x&&snake_body[0].y===food.y
}

const getfoodrandmposition = () => {

    let a, b, foodcondition = true;
    while (foodcondition) {
        a = Math.ceil(Math.random() * 16);
        b = Math.ceil(Math.random() * 16)
        foodcondition = snake_body.some(el => {
            return el.x===a&&el.y===b
        })
    }
    return {
     x:a,y:b
    };
}
function expandsnake() {
    for (let i = 0; i <expentationamout; i++){
        snake_body.push(snake_body[snake_body.length-1])
    }
}
const gameover = () => {
    if (snakeoutofgrid() || snackself()) {
        // location.reload();
        alert("over")
        
    }
}
const snakeoutofgrid = () => {
    return snake_body[0].x < 0 || snake_body[0].y > 16||snake_body[0].x>16||snake_body[0].y<0
}

const snackself = () => {
    for (i = 1; i < snake_body.length; i++){
        if (snake_body[0].x === snake_body[i].x && snake_body[0].y === snake_body[i].y) {
            return true
        }
    }
}