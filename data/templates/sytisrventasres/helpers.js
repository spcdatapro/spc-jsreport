function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function numberWithCommas(x) {
    
    var pref = '', suf = '';
    x = Math.abs(x).toFixed(2);
    //x = Math.abs(x);
    if(parseFloat(x) < 0){
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
        tsubtotal: 0.00, tisr: 0.00, ttotal: 0.00, tparqueo: 0.00, tventa: 0.00, pago5: 0.00, pago7: 0.00, timpuesto: 0.00, tretencion: 0.00, timpago: 0.00
    };
    
    data.forEach(function(lbc){
        //suma.ttotal += parseFloat(parseFloat(lbc.totfact).toFixed(2));
        suma.ttotal += parseFloat(lbc.totfact);
        //suma.tsubtotal += parseFloat(parseFloat(lbc.subtotal).toFixed(2));
        suma.tsubtotal += parseFloat(lbc.subtotal);
        //suma.tisr += parseFloat(parseFloat(lbc.isr).toFixed(2));
        suma.tisr += parseFloat(lbc.isr);
        
        if(lbc.retencion !== ""){
            //suma.tretencion += parseFloat(parseFloat(lbc.isr).toFixed(2));
            suma.tretencion += parseFloat(lbc.isr);
        }else{
            //suma.tretencion = parseFloat(parseFloat(lbc.retenido).toFixed(2));
            suma.tretencion = parseFloat(lbc.retenido);
        }
        
        //suma.tparqueo =  parseFloat(parseFloat(lbc.parqueo).toFixed(2));
        suma.tparqueo =  parseFloat(lbc.parqueo);
    });
    
    suma.tventa += suma.tsubtotal + suma.tparqueo;
    
    if(suma.tventa > 30000){
        suma.pago5 = 1500.00;
        suma.pago7 = ((suma.tventa - 30000) * 7) / 100;
        suma.timpuesto = suma.pago5 + suma.pago7;
        suma.timpago = suma.timpuesto - suma.tretencion;
        
    }
    
    var tabla = "<table style='width:70%'><tbody><tr>";
    tabla += "<td style='text-align: right; font-weight:bold;'>BIENES O SERVICIOS</td>";
    //tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tsubtotal.toFixed(2), 0) + "</td>";
    tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tsubtotal, 0) + "</td>";
    tabla += "</tr>";
    
    if(suma.tparqueo > 0){
        tabla += "<tr>";
        tabla += "<td style='text-align: right; font-weight:bold'>PARQUEO</td>";
        //tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tparqueo.toFixed(2), 0) + "</td>";
        tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tparqueo, 0) + "</td>";
        tabla += "</tr>";
    }
    
    tabla += "<tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>TOTAL DE VENTAS</td>";
    //tabla += "<td class='total'>" + numberWithCommas(suma.tventa.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.tventa, 0) + "</td>";
    tabla += "</tr></tbody></table>";
    tabla += "</br>";
    tabla += "<table style='width:70%' class='resumen'><tbody><tr>";
    tabla += "<td style='text-align: right; font-weight:bold;'>Base de calculo</td>";
    //tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tventa.toFixed(2), 0) + "</td>";
    tabla += "<td style='text-align: right;'>" + numberWithCommas(suma.tventa, 0) + "</td>";
    tabla += "</tr><tr></tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>A pagar 5%</td>";
    tabla += "<td style='text-align: right; font-weight:normal'>" + numberWithCommas(suma.pago5.toFixed(2), 0) + "</td>";
    tabla += "</tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>A pagar 7%</td>";
    tabla += "<td style='text-align: right; font-weight:normal'>" + numberWithCommas(suma.pago7.toFixed(2), 0) + "</td>";
    tabla += "</tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>Impuesto determinado</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.timpuesto.toFixed(2), 0) + "</td>";
    tabla += "</tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>(-) Retenciones ISR)</td>";
    tabla += "<td style='text-align: right; font-weight:normal'>" + numberWithCommas(suma.tretencion.toFixed(2), 0) + "</td>";
    tabla += "</tr><tr>";
    tabla += "<td style='text-align: right; font-weight:bold'>Impuesto a pagar</td>";
    tabla += "<td style='text-align: right;' class='total'>" + numberWithCommas(suma.timpago.toFixed(2), 0) + "</td>";
    tabla += "</tr></tbody></table>";
    
    
    return tabla;
}