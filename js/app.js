import {GameModes} from "./game_modes.js";
import {SquareFactories} from "./squares_gen.js"
import {sleep} from "./timers.js";

//y en un futuro los creadores de botones
window.start=start;
//---------------------------- Todo lo del ui ---------------------------
let level_label=document.getElementById("level"); //texto para el level
let gameOver_label=document.getElementById("game_over"); //texto para el game_over

let game_zone=document.getElementById("game_zone"); //obtenemos la zona done va a estar el simon

//--------------------------- Crear Factory ---------------------------------
function get_squareFactory(){
    let select=document.getElementById("square_type");
    let value=select[select.selectedIndex].value; //obtenemos el valor del option menu
    return SquareFactories[value].class;
}

function get_gameMode(){
    let select=document.getElementById("game_mode");
    let value=select[select.selectedIndex].value; //obtenemos el valor del option menu
    return GameModes[value].class;
}

//------------------------ Funcion Start -----------------------
let SquareFactory;
let Game;

async function start(){
    if (Game){
        Game.delete(); //borramos todo lo que contenia por detras el game(buttons,html elements, etc).
    }
    SquareFactory=get_squareFactory();
    SquareFactory=new SquareFactory(game_zone,400,100);
    
    level_label.innerText="Level:0"; //reiniciamos el level a 0
    gameOver_label.innerText=""; //borramos el game_over

    Game=get_gameMode()
    Game=new Game(SquareFactory,game_nextRound,game_finish);
    
    await sleep(1000); //esperamos un poquito para empezar
    Game.start(); //darle start
}

//--------------------- callback para on_finish -----------------------
function game_finish(){
    gameOver_label.innerText="Game Over" //mostramos el gameover
}

//--------------------- callback para nextround ------------------------
function game_nextRound(){
    level_label.innerText=`Level: ${Game.level}`; //cambiamos el nivel
}