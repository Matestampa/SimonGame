import {Normal_sequenceGenerator,NextTo_sequenceGenerator} from "./sequences.js";
import {sleep,Timeout_handler} from "./timers.js";
import {SimonButton_handler,SimonButton_factory} from "./buttons_gen.js";

//-------------------------------- PADRE -------------------------------------------------
class GameMode{
    constructor(squareFactory,on_nextround,on_finish,init_buttons){
      this.SquareFactory=squareFactory; //ya lo pasamos construido;
      
      //definir callbacks pasados
      this.on_nextround=on_nextround;
      this.on_finish=on_finish;

      //definir variables logicas o que se necesitan si o si
      this.level=0;
      this.on_game=true;
      this.in_round=false;
      
      //definimos el controlador del timepo de respuesta del jugador
      this.finish_game=this.__finish_game.bind(this); //hacemos bind al callback que le pasamos al que esta abajo
      this.response_controller=new Timeout_handler(this.finish_game);
      
      //definir las del tiempo(que pueden ser mas personalizadas)
      //si o si: time_btw_round, time_btw_sequence, time_plyr_response
      this.p__define_timeVars();
      
      //hacer el sequence generator y una variable para guardar la secuencia, cada vez que se pida
      this.sequence;
      this.SequenceGenerator=this.p__build_SequenceGenerator(); //ahi elegimos el que queramos
      
      //hacer el ButtonHandler
      this.init_buttons=init_buttons; //Personal para indicar cant inicial de botones
      this.press_button=this.press_button.bind(this); //hacemos bind al callback que le vamos a pasar a ButtonHandler
      this.ButtonFactory=new SimonButton_factory("html",50); //para hacer los buttons
      this.ButtonHandler=this.__build_buttons(this.init_buttons); //aca hacemos de todo para 
                                                 //tener finalmente el ButtonHandler
    }
    //------------------------------ GENERALES -------------------------------------------
    
    start(){
        this.next_round(true);
        this.main_loop();

    }
    
    async main_loop(){
        while (this.on_game==true){
            if(this.in_round==false){
               this.in_round=true;
               await this.show_sequence()
               this.handle_player();
               this.response_controller.new_TimeOut(this.time_plyr_response);
            }
            await sleep(50); //si o si xq si no, se cuelga
        }
        this.response_controller.delete_timeOut();
        this.ButtonHandler.disable_buttons(); //deshabilitamos los botones       
        await sleep(this.time_btw_round); //esperamos un poco(para diferenciar del juego)
        this.show_sequence(); //mostramos la secuecia correcta
        this.on_finish() //llamamos al callback pasado x el main
    }

    async next_round(first_time){ //solo se pasa first_time cuando la llamamos x primera vez en start
                                  //para que no se buguee el this.in_round en el main_loop().
        this.ButtonHandler.disable_buttons();
        
        this.level++;

        this.sequence=this.SequenceGenerator.generate();
        
        this.p__nextRound(); //cambios personalizados
        
        this.on_nextround(); //callback pasado por el main
        
        if (!first_time){ //si no es la primera vez que la llamamos, activamos el sleep
            await sleep(this.time_btw_round); //tiempo entre rondas
        }
        this.in_round=false;
        
    }

    async show_sequence(){
        for (let i of this.sequence){
            this.ButtonHandler.activate(i);
            await sleep(this.time_btw_sequence);//tiempo entre ind secuencia
        }  
    }

    handle_player(){ //habilita las acciones del jugador
        this.player_index=0;
        this.ButtonHandler.enable_buttons();
    }

    __finish_game(){ //termina el juego
        this.p__finish();
        this.on_game=false;
        
    }

    __build_buttons(cant){ //mete los butons al ButtonHandler
        let buttonHandler=new SimonButton_handler(this.press_button,this);
        
        for (let i=0;i<cant;i++){
            let new_simonButton=this.__add_button(); //hacemos un simonButton
            buttonHandler.add_button(new_simonButton.id,new_simonButton); //lo metemos al ButtonHandler
        }
        return buttonHandler;
    }
    __add_button(){ //cada vez que qeuramos añadir un boton al juego hay que:
        let element=this.SquareFactory.create(); //hacer el elemento del ui
        let simon_button=this.ButtonFactory.create(element); //hacer el simonButton
        this.SequenceGenerator.add_option(simon_button.id); //meter una nueva opcion al SequenceGenerator
        
        return simon_button;
    }
    
    press_button(id){ //en la parte de evaluar cada voton, y si paso de ronda; llamamos a las personalizables
        this.ButtonHandler.activate(id);
        let personal=this.p__onPress(id); //le pasamos el id
        
        if (personal.correctOption(this.player_index)){ //chequea si toco bien el de la secuencia(en ese caso return true)
            
            this.response_controller.delete_timeOut();
            
            if (personal.passedRound(this.player_index)){ //chequea si ya paso de ronda(en ese caso return true)
                this.next_round();
            }
            else{
                this.response_controller.new_TimeOut(this.time_plyr_response); //si no paso se resetea el contador
                                                                               //para responder
            }
        }
        else{ //si no ,finalizamos
            this.__finish_game();
        }
        this.player_index++;
    
    }

    delete(){
        this.ButtonHandler.delete();
    }
    //-------------------------------- INDIVIDUALES --------------------------------------------------

    p__nextRound(){ //para definir o modificar lo que queramos cuando pase la ronda
        return;
    }

    p__define_timeVars(){ //setear el valor que queramos a las variables de tiempo
       this.time_btw_round=1000;
       this.time_btw_sequence=300;
       this.time_plyr_response=3000;
    }

    p__build_SequenceGenerator(){ //modificar las opciones como queramos, para pasarselas al Seq generator.
      return;
    }

    p__onPress(id){ //personalizar, cuando esta correcto el toque de boton
      return;               //cuando se pasa de ronda.
    }

    p__finish(){
        return;
    }
}

//-------------------------------------- HIJOS ------------------------------------------------------

class Normal_gameMode extends GameMode{
    constructor(squareFactory,on_nextround,on_finish,init_buttons=10){
        super(squareFactory,on_nextround,on_finish,init_buttons);
    }

    p__build_SequenceGenerator(){ //modificar las opciones como queramos, para pasarselas al Seq generator.
        let seqGen=new Normal_sequenceGenerator();
        return seqGen;
    }
    
    p__onPress(id){
        return{
            correctOption:(player_index)=>{
                if (this.sequence[player_index]==id){
                    return true;
                }
            },
            passedRound:(player_index)=>{
                if (this.sequence.length-1==player_index){
                    return true;
                }
            }
        }
    }

    p__nextRound(){
        return;
    }

    p__finish(){
        return;
    }
}


//el correcto no es el que se muestra
//sino su posicion dezplazada, 'x' cantidad de veces hacia la izquierda
class NextTo_gameMode extends GameMode{ 
    constructor(squareFactory,on_nextround,on_finish,init_buttons=10){
        super(squareFactory,on_nextround,on_finish,init_buttons);
        this.alter_sequence;

    }

    p__build_SequenceGenerator(){
        let seqGen=new NextTo_sequenceGenerator(3); //podriamos variar el parametro, para cambiar el dezplazamiento
                                                    //NUNCA DEBE SER IGUAL A LA CANT DE BUTTONS.
        return seqGen;
    }
    
    p__onPress(id){
      return{
        correctOption:(player_index)=>{
            if (this.alter_sequence[player_index]==id){ //hacemos las validaciones con la alternativa.
                return true;
            }
        },
        passedRound:(player_index)=>{
            if (this.alter_sequence.length-1==player_index){
                return true;
            }
        }
      }
    }

    p__nextRound(){
        this.alter_sequence=this.SequenceGenerator.alter_sequence; //obtenemos la alternativa
    }

    p__finish(){
        this.sequence=this.alter_sequence; //para que en el ultimo show_sequence mustre la alternativa.
    }
}

//------------------------------ EXPORTACION ---------------------------------------------

const GameModes={"normal":{"class":Normal_gameMode,"descr":"Presionar el boton que se encienda"},
                 "nextto":{"class":NextTo_gameMode,"descr":"Presionar el boton que este 3 lugares a la izquierda del encendido"}
                };

export {GameModes};