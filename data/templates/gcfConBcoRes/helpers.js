function nwc(x) {
    var pref = '', suf = '';
    x = parseFloat(x).toFixed(2);
    if(parseFloat(x) < 0){
        x = Math.abs(x).toFixed(2);
        pref = '('; suf = ')';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}

function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}