function toUC(str){
    if(str !== null && str !== undefined){
        return str.toUpperCase();
    }
    return '';
}

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
        return str.trim().length < tam ? str.trim() : (str.trim().substring(0, (+tam-3)) + '...') ;
    }
    return '';
}

function estot(str){
    if(str.toUpperCase().indexOf('TOTAL DE') > -1){
        return 'num bld';
    }
}