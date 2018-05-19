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
        nit: ' ', nombre: 'Total de Saldos --->', vigente: 0.00, a15: 0.00, a30: 0.00, a60: 0.00, a90: 0.00, total: 0.00
    };
    
    data.forEach(function(ant){
        suma.vigente += parseFloat(parseFloat(ant.vigente).toFixed(2));
        suma.a15 += parseFloat(parseFloat(ant.a15).toFixed(2));
        suma.a30 += parseFloat(parseFloat(ant.a30).toFixed(2));
        suma.a60 += parseFloat(parseFloat(ant.a60).toFixed(2));
        suma.a90 += parseFloat(parseFloat(ant.a90).toFixed(2));
        suma.total += parseFloat(parseFloat(ant.total).toFixed(2));
        
    });
    
    var tabla = "<table style='width: 100%'><tbody><tr>";
    tabla += "<td style='width:43.5%; text-align: right; font-weight:bold'>" + suma.nombre + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.vigente.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.a15.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.a30.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.a60.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.a90.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.total.toFixed(2), 0) + "</td>";
    tabla += "</tr></tbody></table>";
    return tabla;
}