function nwc(x) {
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
        if(str.length <= +tam){
            return str;
        }else{
            return str.substring(0, (+tam - 3)) + '...';
        }
    }
    return '';
}