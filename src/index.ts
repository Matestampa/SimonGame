//----------------------- Importar utilites --------------------------
import { SquareFactories } from "./scripts/squares_generators.js";
import { GameModes } from "./scripts/game_modes.js";
import {sleep} from "./scripts/time_utils.js";

//--------------------- Importar types ------------------------------
import type { SquareFactory as SquareFactory_type} from "./scripts/squares_generators.js";
import { GameMode as GameMode_type } from "./scripts/game_modes.js";


//y en un futuro los creadores de botones
(window as any).start=start;

//---------------------------- Todo lo del ui ---------------------------
let level_label=document.getElementById("level") as HTMLHeadingElement; //texto para el level
let gameOver_label=document.getElementById("game_over") as HTMLHeadingElement; //texto para el game_over

let game_zone=document.getElementById("game_zone") as HTMLDivElement; //obtenemos la zona done va a estar el simon


function get_squareFactory():typeof SquareFactory_type{
    let select=document.getElementById("square_type") as HTMLSelectElement;
    let value=(select[select.selectedIndex] as any).value; //obtenemos el valor del option menu
    
    return SquareFactories[value].class
}

function get_gameMode():typeof GameMode_type{
    let select=document.getElementById("game_mode") as HTMLSelectElement;
    let value=(select[select.selectedIndex] as any).value; //obtenemos el valor del option menu
    
    return GameModes[value].class;
}

//------------------------ Funcion Start -----------------------
let SquareFact_ref:any; //Referencias de las clases
let GameMode_ref:any;

let SquareFact:SquareFactory_type; //Instancias de las clases
let GameMode:GameMode_type;

async function start(): Promise<void> {
    if (GameMode){
        GameMode.delete(); //borramos todo lo que contenia por detras el game(buttons,html elements, etc).
    }
    
    SquareFact_ref=get_squareFactory();
    SquareFact=new SquareFact_ref(game_zone,400,100);
    
    level_label.innerText="Level:0"; //reiniciamos el level a 0
    gameOver_label.innerText=""; //borramos el game_over

    GameMode_ref=get_gameMode()
    GameMode=new GameMode_ref(SquareFact,game_nextRound,game_finish);
    
    await sleep(1000); //esperamos un poquito para empezar
    
    GameMode.start(); //darle start

}
console.log("putoo");
//--------------------- callback para on_finish -----------------------
function game_finish():void{
    gameOver_label.innerText="Game Over" //mostramos el gameover
}

//--------------------- callback para nextround ------------------------
function game_nextRound():void{
    level_label.innerText=`Level: ${GameMode.level}`; //cambiamos el nivel
}