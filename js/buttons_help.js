//------------------ Tipos de Buttons --------------------------------
//Son pasados al SimonButton como elemento principal
//Tienen las mismas funciones, pero cada uno las implementa a su manera
//Asi el SimonButton no depende de ninguna de ellas en particular
//simplemente las hace accionar con un nombre de funcion en comun.
class HtmlButton{
    constructor(id,element){
        this.element=element;
        this.element.id=id; //acaaaaaaaaaaa
        this.color=element.style.backgroundColor;
    }
    change_color(color){
        this.element.style.backgroundColor=color;
    }

    setClick_event(callback,obj){
        this.element.addEventListener("click",callback);
    }

    removeClick_event(callback){
        this.element.removeEventListener("click",callback);
    }

    delete(){
        this.element.remove();
    }
}

//nunk la usamos, pero podria servir si en ves de usar Html, usabamos Canvas.
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
}

//------------------- Para oscurecer (usado en el factory de "buttons_gen.js") ------------------------------------
function rgbStr_2_dark(color,opacity){
    //devolvemos el arr rgb con la opacidad que le pasemos.
    function darken_rgb(rgb_arr,opacity){
        const OPACITY=opacity/100;
        let new_arr=rgb_arr.map(color=>{
        return parseInt(color-(color*OPACITY));})
    
        return new_arr
    }
    
    //formatear el rgb para que quede como array;
    function str2arr(color){
        let indColor_str="";
        let colorArr=[];
        for (let i of color){
            if (isNaN(i)==false){
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
    return `rgb(${darken_rgb(rgbArray,opacity)})`; 

}

export{HtmlButton,CanvasButton,rgbStr_2_dark};