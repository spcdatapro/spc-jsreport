function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function fnum(x) {
    var pref = '', suf = '';
    if(parseFloat(x) < 0){
        x = Math.abs(x).toFixed(2);
        pref = '(';
        suf = ')';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}

function toUpperCase(s){ return s.toUpperCase(); }

function cutStr(str, size){
    if(str !== null && str !== undefined){
        return str.substring(0, +size);
    }
    return '';
}

function wTitle(t){ return t == 3 ? '65%' : '59%'; }