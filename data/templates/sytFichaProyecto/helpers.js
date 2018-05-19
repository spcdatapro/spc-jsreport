function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return '';
}

function fnum(x) {
    var pref = '', suf = '';
    x = Math.abs(x).toFixed(2);
    if(parseFloat(x) < 0){
        pref = '(';
        suf = ')';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}

function toUpperCase(s){ return s.toUpperCase(); }

function setStyleNom(str){ return str.toUpperCase().indexOf('TOTAL') > -1 ? 'text-align: right; font-weight: bold; padding-right: 2em' : 'text-align: left'; }
function setStyleNum(str){ return str.toUpperCase().indexOf('TOTAL') > -1 ? 'font-weight: bold; border-top: solid 0.1em black; border-bottom: solid 0.1em black' : ''; }

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