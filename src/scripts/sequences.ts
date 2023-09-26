//--------------------------------------------------------------------------------------
//clase para hacer secuencia
//Esta en particular no puede elegir el ultimo elegido
//tiene un track de la secuencia y la devuelve toda
abstract class SequenceGenerator{
   options:number[];
   curr_sequence:number[];
   last_chosed:number;

   constructor(){ 
     this.options=[];
     this.curr_sequence=[];
     this.last_chosed;
    }

    generate(){//agrega uno mas a la secuencia y la devuelve
     let option;
     do{
         option=this.__get_option();
     }
     while (this.last_chosed==option) //no puede elegir el ultimo elegido
     
     this.last_chosed=option;
     
     this.p__generate(this.last_chosed); //por si queremos generar algo aparte
                                                //con el valor obtenido.
     this.curr_sequence.push(this.last_chosed);
     
     return this.curr_sequence;
    }
    
    add_option(option:number){ //añade opcion al array de opciones
        this.options.push(option);
    }

    empty(){ //borra la secuencia
        this.curr_sequence=[];
        this.last_chosed=undefined;
    }
    
    __get_option():number{
     let rand_index=Math.floor(Math.random()*this.options.length); //el coso random;
     return this.options[rand_index];
    }

    p__generate(option:number){
      return;
    }
    
}

//----------------------------- HIJOS ----------------------------------

//hace lo mismo que la de arriba
class Normal_sequenceGenerator extends SequenceGenerator{
    constructor(){
        super();
    }
}


//hace la normal, pero aparte hace una con la posicion dezplazada, 
//ciertos lugares, hacia la izquierda
class NextTo_sequenceGenerator extends SequenceGenerator{
    alter_sequence:number[];
    displace:number;
    
    constructor(displace:number){ //recibe dezplazamiento(hacia la izquierda)
                           //si es igual a la cantidad de buttons, va a quedar en el mismo lugar.
        super();
        this.alter_sequence=[];
        this.displace=displace;
    }
     
    //generamos la opcion dezplazada, teniendo en cuenta como se ven visualmente los botones
    p__generate(option:number){
      let curr_index=this.options.indexOf(option);
      let future_index;
  
      for (let i=0;i<this.displace;i++){
          future_index=curr_index+2;
          if (this.options[future_index]==undefined){
            if (curr_index%2==0){
              curr_index=1;
            }
            else{
              curr_index=0;
            } 
          }
          else{
            curr_index=future_index;
          }
      }
      let final_option=this.options[curr_index];
      this.alter_sequence.push(final_option);
    }
}

export {Normal_sequenceGenerator,NextTo_sequenceGenerator};
export type {SequenceGenerator};