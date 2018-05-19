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

function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return '';
}