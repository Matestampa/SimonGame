//-------------------- Para manejar la cancelacion del timeOut -----------------------

class Timeout_handler{
    callback:any;
    time_out:any;

    constructor(on_finish:void){
        this.callback=on_finish;
        this.time_out;
    }
    new_TimeOut(delay:number){
        this.time_out=setTimeout(this.callback,delay);
    }

    delete_timeOut(){
        clearTimeout(this.time_out);
    }
}


//---------------------Funcion sleep ---------------------------------
function sleep(ms:number):Promise<void>{
    return new Promise(resolve => setTimeout(resolve, ms));
  }


export {Timeout_handler,sleep};