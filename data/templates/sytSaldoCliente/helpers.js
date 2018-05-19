function formatname(nombre){
    if(nombre !== null && nombre !== undefined){
        if(nombre.length > 40){
            var nombremax = nombre.substring(0,40)+'...';
            return nombremax;
        }else{
            return nombre;
        }
    }
    return;
}

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
        nit: ' ', nombre: 'Totales de Saldos --->', anterior: 0.00, cargos: 0.00, abonos: 0.00, saldo: 0.00, cliente: 0
    };
    
    data.forEach(function(sld){
        suma.anterior += parseFloat(parseFloat(sld.anterior).toFixed(2));
        suma.cargos += parseFloat(parseFloat(sld.cargos).toFixed(2));
        suma.abonos += parseFloat(parseFloat(sld.abonos).toFixed(2));
        suma.saldo += parseFloat(parseFloat(sld.saldo).toFixed(2));
    });
    
    var tabla = "<table style='width: 100%'><tbody><tr>";
    tabla += "<td style='width:43.5%; text-align: right; font-weight:bold'>" + suma.nombre + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.anterior.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.cargos.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.abonos.toFixed(2), 0) + "</td>";
    tabla += "<td class='total'>" + numberWithCommas(suma.saldo.toFixed(2), 0) + "</td>";
    tabla += "</tr></tbody></table>";
    return tabla;
}