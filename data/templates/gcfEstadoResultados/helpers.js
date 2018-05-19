function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function numberWithCommas(x, tipo) {
    if(parseInt(tipo) == 1){
        return '';
    }
    
    var pref = '', suf = '';
    if(parseFloat(x) < 0){
        x = Math.abs(x).toFixed(2);
        pref = '(';
        suf = ')';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
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

function rowStyle(codigo){
    return codigo.length < 6 ? 'bold' : 'normal';
}

function strcut(str){ return str.substring(0, 40); }