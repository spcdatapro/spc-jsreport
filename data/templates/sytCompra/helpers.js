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
    
    if(x.length === 0){ return ''; }
    var pref = '', suf = '';
    x = Math.abs(x).toFixed(2);
    if(parseFloat(x) < 0){
        pref = '(';
        suf = ')';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}

function getTotales(data){
    var suma = {
        nit: ' ', nombre: 'Total de Saldos --->', tsaldo: 0.00, dec: ''
    };
    
    data.forEach(function(ant){
        suma.tsaldo += parseFloat(parseFloat(ant.tsaldo).toFixed(2));
    });
    
    var tabla = "<table style='width: 100%'><tbody><tr>";
    tabla += "<td style='text-align: right; font-weight:bold' colspan=5>" + suma.nombre + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.tsaldo.toFixed(2), 0) + "</td>";
    tabla += "</tr></tbody></table>";
    return tabla;
}