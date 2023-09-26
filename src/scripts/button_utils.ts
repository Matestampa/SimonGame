import type {rgb} from "./types";
//------------------ Tipos de Buttons --------------------------------
//Son pasados al SimonButton como elemento principal
//Tienen las mismas funciones, pero cada uno las implementa a su manera
//Asi el SimonButton no depende de ninguna de ellas en particular
//simplemente las hace accionar con un nombre de funcion en comun.
class HtmlButton{
    element:HTMLDivElement;
    color:rgb;

    constructor(id,element:HTMLDivElement){
        this.element=element;
        this.element.id=id; //acaaaaaaaaaaa
        this.color=element.style.backgroundColor as rgb;
    }
    change_color(color:string){
        this.element.style.backgroundColor=color;
    }

    setClick_event(callback,obj?){
        this.element.addEventListener("click",callback);
    }

    removeClick_event(callback){
        this.element.removeEventListener("click",callback);
    }

    delete(){
        this.element.remove();
    }
}

/*nunk la usamos, pero podria servir si en ves de usar Html, usabamos Canvas.
class CanvasButton{
    constructor(element){
        this.element=element;
        this.color=element["fill"];
    }
    change_color(color){
       this.element.set("fill",color);
    }

    setClick_event(callback){
        this.element.on("mouse:down",callback);
    }
    removeClick_event(){
        this.element.off("mouse:down");
    }
}*/

//------------------- Para oscurecer (usado en el factory de "buttons_gen.js") ------------------------------------
function rgbStr_2_dark(color:rgb,opacity:number):rgb{
    
    //devolvemos el arr rgb con la opacidad que le pasemos.
    function darken_rgb(rgb_arr:number[],opacity:number):number[]{
        const OPACITY=opacity/100;
        let new_arr=rgb_arr.map(color=>{
        return Math.floor(color-(color*OPACITY));})
    
        return new_arr
    }
    
    //formatear el rgb para que quede como array;
    function str2arr(color:rgb):number[]{
        let indColor_str="";
        let colorArr=[];
        for (let i of color){
            if (isNaN(i as unknown as number)==false){
                indColor_str+=i;
            }
            if (i==","||i==")"){
                colorArr.push(parseInt(indColor_str));
                indColor_str="";
            }
        }
        return colorArr;
    }
    let rgbArray=str2arr(color);
    return `rgb(${darken_rgb(rgbArray,opacity)})` as rgb; 

}

export{HtmlButton,rgbStr_2_dark};