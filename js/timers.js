//-------------------- Para manejar la cancelacion del timeOut -----------------------

class Timeout_handler{
    constructor(on_finish){
        this.callback=on_finish;
        this.time_out;
    }
    new_TimeOut(delay){
        this.time_out=setTimeout(this.callback,delay);
    }

    delete_timeOut(){
        clearTimeout(this.time_out);
    }
}

//---------------------Funcion sleep ---------------------------------
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


export {Timeout_handler,sleep};