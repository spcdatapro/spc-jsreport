function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function numberWithCommas(x, tipo) {
    /*
    if(parseInt(tipo) == 1){
        return '';
    }
    */
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
        id: 0, idcuentac: 0, codigo: '      ', nombrecta: 'Totales de cuentas', tipocuenta: 1, 
        anterior: 0.00, debe: 0.00, haber: 0.00, actual: 0.00
    };
    
    try{
        data.forEach(function(cta){
        if(+cta.tipocuenta === 0){
            suma.anterior += parseFloat(parseFloat(cta.anterior).toFixed(2));
            suma.debe += parseFloat(parseFloat(cta.debe).toFixed(2));
            suma.haber += parseFloat(parseFloat(cta.haber).toFixed(2));
            suma.actual += parseFloat(parseFloat(cta.actual).toFixed(2));
        }
        });
    }catch(err){
        
    }
    
    var tabla = "<table style='width: 100%'><tbody><tr>";
    tabla += "<td style='width:5.5%; text-align: right; font-weight:bold'>" + suma.codigo + "</td>";
    tabla += "<td style='width:43.5%; text-align: right; font-weight:bold'>" + suma.nombrecta + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.anterior.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.debe.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.haber.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.actual.toFixed(2), 0) + "</td>";
    tabla += "</tr></tbody></table>";
    return tabla;
}

function strcut(str){ return str.substring(0, 40); }