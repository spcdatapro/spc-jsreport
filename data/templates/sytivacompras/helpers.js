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
        tbien: 0.00, tserv: 0.00, tiva: 0.00, tcompra: 0.00, texento: 0.00
    };
    
    data.forEach(function(lbc){
        suma.tbien += parseFloat(parseFloat(lbc.bien).toFixed(2));
        suma.tserv += parseFloat(parseFloat(lbc.servicio).toFixed(2));
        suma.tiva += parseFloat(parseFloat(lbc.iva).toFixed(2));
        suma.tcompra += parseFloat(parseFloat(lbc.totfactex).toFixed(2));
        suma.texento += parseFloat(parseFloat(lbc.exento).toFixed(2));
    });
    
    var tabla = "<tr>";
    tabla += "<td style='text-align: right; font-weight:bold' colspan=5>TOTALES:</td>";
    tabla += "<td class='total2'>" + numberWithCommas(suma.tbien.toFixed(2), 0) + "</td>";
    tabla += "<td class='total2'>" + numberWithCommas(suma.tserv.toFixed(2), 0) + "</td>";
    tabla += "<td class='total2'>" + numberWithCommas(suma.texento.toFixed(2), 0) + "</td>";
    tabla += "<td class='total2'>" + numberWithCommas(suma.tiva.toFixed(2), 0) + "</td>";
    tabla += "<td class='total2'>" + numberWithCommas(suma.tcompra.toFixed(2), 0) + "</td>";
    tabla += "</tr>";
    return tabla;
}

function getResumen(data, act){
    var suma = {
        tbienserv: 0.00, tactivo: 0.00
    };
    
    data.forEach(function(lbc){
        suma.tbienserv += parseFloat(parseFloat(lbc.bien).toFixed(2))+parseFloat(parseFloat(lbc.servicio).toFixed(2));
    });
    
    var tabla = "<table style='width:75%'><tbody><tr>";
    tabla += "<td style='text-align: right; font-weight:bold;'>Bienes y Servicios</td>";
    tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tbienserv.toFixed(2), 0) + "</td>";
    tabla += "<td style='text-align: right;'></td>";
    tabla += "</tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>(-) Activos Fijos</td>";
    tabla += "<td style='text-align: right;'>" + numberWithCommas(act.monto.toFixed(2), 0) + "</td>";
    tabla += "<td style='text-align: left; padding-left: 1em;'>" + act.referencia.trim() + "</td>";
    tabla += "</tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>Total Gastos</td>";
    tabla += "<td class='total'>" + numberWithCommas((suma.tbienserv - act.monto).toFixed(2), 0) + "</td>";
    tabla += "<td style='text-align: right;'></td>";
    tabla += "</tr></tbody></table>";
    return tabla;
}