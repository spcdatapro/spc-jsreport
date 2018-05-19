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

function estotstr(str){ return str.toUpperCase().indexOf('TOTAL') > -1 ? 'text-align: right; font-weight: bold; padding-right: 1em' : ''; }
function estotnum(str){ return str.toUpperCase().indexOf('TOTAL') > -1 ? 'font-weight: bold; border-top: solid 0.1em black; border-bottom: double 0.25em black' : ''; }

function showDiv(empre){
    if(empre !== null && empre !== undefined){
        if(empre.length === 0){
            return 'style="display: none;"';
        }
        return '';
    }
    return '';
}

function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return '';
}