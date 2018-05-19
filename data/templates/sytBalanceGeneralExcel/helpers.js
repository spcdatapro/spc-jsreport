function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function toFloat(numero){
    if(numero && numero !== '' && numero !== '0.00' && numero !== '0'){
        return parseFloat(parseFloat(numero).toFixed(2));
    }
    return '';
}

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