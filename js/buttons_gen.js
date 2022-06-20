import {HtmlButton,CanvasButton,rgbStr_2_dark} from "./buttons_help.js";

class Simon_button{
    constructor(id,element,normal_color,dark_color){
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
//Tambien se le pasa la opacidad, para poder generar las variantes del color
class SimonButton_factory{
  constructor(type,opacity){
    this.ButtonClass=HtmlButton;
    this.id=0;
    this.type=type;
    this.opacity=opacity;
  }
  create(element){
    this.id+=1;
    let button=new this.ButtonClass(this.id,element);
    let normal_color=button.color;
    let dark_color=rgbStr_2_dark(normal_color,this.opacity);
    
    return new Simon_button(this.id,button,normal_color,dark_color);
  }
  
}

//--------------------------Button Handler-------------------------------------

class SimonButton_handler{
  constructor(on_press){
    this.buttons={};
    
    this.on_press=on_press;
    this.functions={};
  }

  add_button(key,button){ //añade un botton ya construido
    let on_press=this.on_press;
    this.buttons[key]=button;
    
    //hacemos una funcion aux, para que llame a on_press
    this.functions[key]=function aux(){
      return on_press(button.id);
    }

  }

  activate(button_key){ //"hace el efecto de presion de boton"
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