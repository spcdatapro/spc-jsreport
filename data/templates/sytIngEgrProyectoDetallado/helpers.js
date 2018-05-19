function nwc(x) {
    if(x.length === 0){ return ''; }
    var pref = '', suf = '';
    x = Math.abs(x).toFixed(2);
    if(parseFloat(x) < 0){
        pref = '(';
        suf = ')';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}

function strCut(str, tam){
    if(str !== null && str !== undefined){
        if(str.trim().length <= +tam){
            return str.trim().toUpperCase();
        }else{
            return str.trim().substring(0, (+tam)).toUpperCase();
        }
    }
    return '';
}

function imprimir(det, options){
    if(det && det.length > 0){
        return options.fn(this);
    }
    return options.inverse(this);
}