function shouldPrint(codigo, tamanio, options){
    if(tamanio > 1){
        if(codigo.length == tamanio){
            return options.fn(this);
        }
        return options.inverse(this);
    }else{
        if(codigo.length <= tamanio){
            return options.fn(this);
        }
        return options.inverse(this);
    }
}