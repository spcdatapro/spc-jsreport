function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function numberWithCommas(x) {
    
    var pref = '', suf = '';
    if(parseFloat(x) < 0){
        x = Math.abs(x).toFixed(2);
        pref = '(';
        suf = ')';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}

function getTotales(data){
    var suma = {
        tsubtotal: 0.00, tisr: 0.00, ttotal: 0.00
    };
    
    data.forEach(function(lbc){
        suma.ttotal += parseFloat(parseFloat(lbc.totfact).toFixed(2));
        suma.tsubtotal += parseFloat(parseFloat(lbc.subtotal).toFixed(2));
        suma.tisr += parseFloat(parseFloat(lbc.isr).toFixed(2));
    });
    
    
    var tabla = "<tr>";
    tabla += "<td style='text-align: right; font-weight:bold' colspan=4>TOTALES:</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.tsubtotal.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.tisr.toFixed(2), 0) + "</td>";
    tabla += "</tr>";
    return tabla;
}

function getResumen(data){
    var suma = {
        tbienserv: 0.00, tactivo: 0.00
    };
    
    
    
    data.forEach(function(lbc){
        suma.tbienserv += parseFloat(parseFloat(lbc.bien).toFixed(2))+parseFloat(parseFloat(lbc.servicio).toFixed(2));
    });
    
    
    var tabla = "<table style='width:30%'><tbody><tr>";
    tabla += "<td style='text-align: right; font-weight:bold;'>Bienes y Servicios</td>";
    tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tbienserv.toFixed(2), 0) + "</td>";
    tabla += "</tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>(-) Activos Fijos</td>";
    tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tactivo.toFixed(2), 0) + "</td>";
    tabla += "</tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>Total Gastos</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.tbienserv.toFixed(2), 0) + "</td>";
    tabla += "</tr></tbody></table>";
    return tabla;
}