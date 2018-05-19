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

function strcut(str){ return str.substring(0, 30); }

function strcutconc(str1, str2){ 
    var str = str1 + ' ' + str2;
    return str.substring(0, 45); 
}