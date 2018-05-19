function fDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return '';
}

function fNum(x) {
    var pref = '', suf = '';
    x = Math.abs(x).toFixed(2);
    if(parseFloat(x) < 0){ pref = '('; suf = ')'; }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}

function esTot(str){
    if(str !== null && str !== undefined){
        return str.toUpperCase().indexOf('TOTAL') < 0 ? '' : 'brdtot bld';
    }
    return '';
}

function esTotStr(str){
    if(str !== null && str !== undefined){
        return str.toUpperCase().indexOf('TOTAL') < 0 ? '' : 'style="text-align: right; font-weight: bold; padding-right: 0.5em;"';
    }
    return '';
}

function cutStr(str, size){
    if(str.length > size){
        if(str !== null && str !== undefined){
            return str.trim().substring(0, +size);
        }
    }else{ 
        return str; 
    }
    return '';
}