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
        pref = '';
        suf = '';
    }
    return pref + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
}

function shouldPrint(codigo, tamanio, options){
    if(tamanio > 1){
        if(codigo.length == tamanio){
            return options.fn(this);
        }
        return options.inverse(this);
    }else{
        if(codigo.length <= tamanio){
            return options.fn(this);
        }
        return options.inverse(this);
    }
}

function resumen(cuentas){
    var activo = 0.0, pasivo = 0.0, capital = 0.0;
    
    cuentas.forEach(function(cta){
        if(parseInt(cta.estotal) == 1){
            if(cta.nombrecta.toUpperCase().indexOf('ACTIVO') > -1){
                activo = parseFloat(cta.saldo);
            }
            if(cta.nombrecta.toUpperCase().indexOf('PASIVO') > -1){
                pasivo = parseFloat(cta.saldo);
            }
            if(cta.nombrecta.toUpperCase().indexOf('CAPITAL') > -1){
                capital = parseFloat(cta.saldo);
            }
        }
    });
    
    
    var pascap = (Math.abs(pasivo) + Math.abs(capital)).toFixed(2);
    var actpascap = (Math.abs(activo) - parseFloat(pascap)).toFixed(2);
    var html = "<table style='text-align:right'>";
    html += "<tr><td>TOTAL ACTIVO:</td><td class='numero'>" + numberWithCommas(activo, 0) + "</td></tr>";
    html += "<tr><td>TOTAL PASIVO + CAPITAL:</td>";
    html += "<td class='numero'>(" + numberWithCommas(pascap, 0) + ")</td></tr>";
    html += "<tr><td>TOTAL PERDIDAS O GANANCIAS:</td>";
    html += "<td class='numero'>" + numberWithCommas(actpascap, 0) + "</td></tr>";
    html += "</table>";
    
    return html;
}

function rowStyle(codigo){
    return codigo.length < 6 ? 'bold' : 'normal';
}

function strcut(str){ return str.toUpperCase().substring(0, 40); }

function tab(tipocuenta){
    if(+tipocuenta === 0){
        return 'padding-left: 0.75em;';
    }
    return '';
}