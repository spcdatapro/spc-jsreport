function subtot(str){
    if(str !== null && str !== undefined){
        return str.toUpperCase().indexOf('TOTAL') > -1 ? 'subtotal padtop' : '';
    }
    return '';
}

function fnum(x) {
    var pref = '', suf = '';
    x = (x).toFixed(2);
    if(parseFloat(x) < 0){
        x = Math.abs(x).toFixed(2);
        pref = '(';
        suf = ')';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}