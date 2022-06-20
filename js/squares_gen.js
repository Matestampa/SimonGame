function create_square(x,y,width,height,color){
    let element=document.createElement("div");
    element.style.position="absolute";
    element.style.top=y;
    element.style.left=x
    element.style.width=width;
    element.style.height=height;
    element.style.backgroundColor=color;
    element.style.borderRadius="20%";
    return element;

}

class SquareFactory{
    constructor(parent,x,y){
        this.parent=parent;
        this.x=x;
        this.y=y;
        this.coord_parity=0; //para hacer lo de las coords
        
        this.width=100;
        this.height=100;
        this.distance=120;
        
        this.squares=[];

        //estas 2 se pueden cambiar con lo de abajo, pero x default van asi.
        this.max_squares=16;
    }
    
    //---------------------------- general -------------------------------------
    create(cant){ //siempre hsce return del creado, o creados en el momento
        let new_square;
        if (!cant){ //si no se pasa nada, se crea uno solo
            cant=this.default_squares;
            new_square=this.__add_one();
            this.squares.push(new_square);
            return new_square;

        }
        else{ //sino, se crea la cantidad pasada
            let new_squares=[]; //array que contiene los que se crean ahora
            for(let i=0;i<cant;i++){
                new_square=this.__add_one();
                this.squares.push(new_square);
                new_squares.push(new_square) //lo agregamos al momentaneo
            }
            return new_squares; 
        }
    }

    
    __add_one(){
        if (this.squares.length==this.max_squares){ //chequeamos que no se pase del maximo
            throw Error(`SquareGenerator maximum capacity (${this.max_squares}) exceded`);
        }
        
        let color=this.p__define_color(); //personalizado para elegir el color
        let new_square=create_square(this.x,this.y,this.width,this.height,color); //hacemos el elemento
        this.parent.appendChild(new_square); //lo añadimos a su parent
        this.__update_coords(); //actualizamos las coords

        return new_square;
        
    }

    __update_coords(){ //configurado para armarlos tipo cuadrito
        if (this.coord_parity%2==0){
            this.y+=this.distance;
        }
        else{
            this.x+=this.distance;
            this.y-=this.distance;
        }
        this.coord_parity+=1;

    }
    
    //----------------------------------------- individual -----------------------------------
    //Por ahora esta no
    /*#define_cantSquares(){ //definir(si se quiere) max_squares,default_squares
       return;
    }*/
    p__define_color(){
       return;
    }
}

//-------------------------------------- HIJOS --------------------------------------------------

class Clasic_squareFactory extends SquareFactory{ //Solo da normales
    constructor(parent,x,y){
        super(parent,x,y);
        
        this.color_options=["rgb(10, 226, 118)","rgb(255, 115, 0)","rgb(221, 255, 0)","rgb(0, 115, 255)"]
        this.color_iterator=this.iterator(this.color_options);
        this.options_index=0;

    }

    p__define_color(){
        return this.color_iterator.next(); //cuando se acaba, volvemos a empezar
    }

    iterator(arr){ //hacemos un carrousel
        let index=0;
        return{ 
           next:function(){
                  if (index>=arr.length){
                    index=0;
                  }
                  return arr[index++]
    
                }
          }
    }
}

const GEN_COLORS=["rgb(255, 0, 0)","rgb(0, 0, 255)","rgb(0, 255, 0)","rgb(0, 255, 255)","rgb(255, 51, 153)",
                 "rgb(255, 255, 0)","rgb(255, 102, 0)","rgb(102, 0, 204)"]


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

function getRandom(arr){
    let index=Math.floor(Math.random()*arr.length);
    return arr[index];
}

class Similar_squareFactory extends SquareFactory{//Parecidos tipo gradiente
      constructor(parent,x,y){
        super(parent,x,y);
        this.base_color=getRandom(GEN_COLORS); //elegimos random de las opciones
        this.base_colorArr=str2arr(this.base_color); //lo pasamos a Array
        this.light_or_dark; //para elegir entre uno u otro [0,1]
        this.dark_factor=0; //factor para hacer dark
        this.light_factor=0; //factor para hacer light
      }

      p__define_color(){ 
        let colorArr;
        this.light_or_dark=getRandom([0,1]) //elegimos el coso random
        
        if (this.light_or_dark==0){ //si salio dark
            colorArr=this.__darker();
        }
        if (this.light_or_dark==1){ //si salio light
            colorArr=this.__lighter();
        }
        return `rgb(${colorArr})` //devolvemos en formaro rgb
      }

      __darker(){
       let color=this.base_colorArr.map(color=>{ //les aplicamos uno x uno el factor
        return parseInt(color * (1-this.dark_factor));
       })
       
       this.dark_factor+=0.1; //cambiamos factor
       return color;
      }

      __lighter(){
       let color=this.base_colorArr.map(color=>{ //les aplicamos uno x uno el factor
        return parseInt(color+ (255-color) * this.light_factor);
       })
       this.light_factor+=0.1 //cambiamos factor
       return color;
      }
}

class Random_squareFactory extends SquareFactory{ //Todos random
    constructor(parent,x,y){
        super(parent,x,y);
    }

    p__define_color(){
        return getRandom(GEN_COLORS);
    }
}

//---------------------------- EXPORTACION --------------------------------------

const SquareFactories={"clasic":{"class":Clasic_squareFactory,"descr":"Los colores clasicos"},
                       "similar":{"class":Similar_squareFactory, "descr":"Gradientes que confunden"},
                       "random":{"class":Random_squareFactory, "descr":"Mezcla al azar de colores"}
                      };

export {SquareFactories};