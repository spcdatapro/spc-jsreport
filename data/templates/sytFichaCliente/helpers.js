function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return '';
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

function sino(valor){ return parseInt(valor) > 0 ? 'Sí' : 'No'; }

function qdoc(valor){ return parseInt(valor) > 0 ? 'Factura' : 'Recibo'}

function imprimir(arr, options){ return arr.length > 0 ? options.fn(this) : options.inverse(this); }