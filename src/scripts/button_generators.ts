import {HtmlButton,rgbStr_2_dark} from "./button_utils.js";
import type {rgb} from "./types";

class Simon_button{
    id:number;
    element:HtmlButton;
    normal_color:rgb;
    dark_color:rgb;

    constructor(id:number,element:HtmlButton,normal_color:rgb,dark_color:rgb){
     this.id=id;
     this.element=element;
     this.normal_color=normal_color;
     this.dark_color=dark_color;
    }

    animate(){ //por un tiempo corto lo apagamos(oscurecer), y con setTimeout lo volvemos a prender.(iluminar)
      this.element.change_color(this.dark_color);
      setTimeout(()=>{
        this.element.change_color(this.normal_color);
      },200) 
    }
    
    delete(){
      this.element.delete();
      delete this.element;
    }
}   

//-------------------- Factory -----------------------------------------
//Se encarga de crear Simon Buttons
//Se le pasa al constrcutor el tipo de elemento(html o canvas), el cual va a tomar el SimonButton
//Tambien se le pasa la opacidad, que va a tomar el boton al ser presionado
class SimonButton_factory{
    ButtonClass:typeof HtmlButton;
    id:number;
    type:any;
    opacity:number;
  constructor(type,opacity:number){
    this.ButtonClass=HtmlButton;
    this.id=0;
    this.type=type;
    this.opacity=opacity;
  }
  
  create(element:HTMLDivElement){
    this.id+=1;
    let button=new this.ButtonClass(this.id,element);
    let normal_color=button.color;
    let dark_color=rgbStr_2_dark(normal_color,this.opacity);
    
    return new Simon_button(this.id,button,normal_color,dark_color);
  }
  
}

//--------------------------Button Handler-------------------------------------

class SimonButton_handler{
   buttons:{
    [key:string]:Simon_button
   };
   on_press=(id:any):void=>{};

   functions:{
    [key:number]:()=>void;
   }

   h:(a:string)=>number;

   constructor(on_press:(id:any)=>void){
    this.buttons={};
    
    this.on_press=on_press;
    this.functions={};
  }

  add_button(key:number,button:Simon_button){ //añade un botton ya construido
    let on_press=this.on_press;
    this.buttons[key]=button;
    
    //hacemos una funcion aux, para que llame a on_press
    this.functions[key]=function aux(){
      return on_press(button.id);
    }

  }

  activate(button_key:number){ //"hace el efecto de presion de boton"
    this.buttons[button_key].animate();
  }

  enable_buttons(){ 
    for(let i of Object.keys(this.buttons)){
      this.buttons[i].element.setClick_event(this.functions[i]); //pone eventListener
    }
  }
  disable_buttons(){
    for(let i of Object.keys(this.buttons)){
      this.buttons[i].element.removeClick_event(this.functions[i]);//saca eventListener
    }
  }

  delete(){
    for (let i of Object.keys(this.buttons)){
      this.buttons[i].delete();
      delete this.buttons[i];
    }
  }
}

export {SimonButton_factory,SimonButton_handler};