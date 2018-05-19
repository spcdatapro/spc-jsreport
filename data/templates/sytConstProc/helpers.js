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

function strcut(str){
    if(str){ return str.trim().substring(0, 50); }
    return '';
}

function strcut2(str){ 
    if(str){
        return str.trim().substring(0, 10); 
    }
    return '';
}

function strcutconc(str1, str2){ 
    var str = str1 + ' ' + str2;
    return str.substring(0, 45); 
}

function shouldPrint(det, options){
    if(det && det.length > 0){
        return options.fn(this);
    }
    return options.inverse(this);
}