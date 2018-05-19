function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function printCodigo(codigo){
    if(+codigo > 0){
        return codigo;
    }else{
        return '';
    }
}

function numberWithCommas(x, tipo, estotal) {
    if(parseInt(tipo) == 1){
        return '';
    }
    
    if(+estotal === 0 && parseFloat(x) == 0){
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

function esDeTotales(estotal){
    if(+estotal === 0){
        return '';
    }else{
        return 'lineaTotales';
    }
}

function esDeTotalesCod(estotal){
    if(+estotal === 0){
        return '';
    }else{
        return 'lineaTotalesCod';
    }
}

function resumen(cuentas){
    var suma = {debe:0.0, haber: 0.0};
    if(cuentas !== null && cuentas !== undefined){
        cuentas.forEach(function(cta){
            cta.dld.forEach(function(det){
                if(+det.estotal === 1){
                    suma.debe += parseFloat(det.debe);
                    suma.haber += parseFloat(det.haber);
                }
            });
        });
    }
    
    var html = "<div class='row'>";
    html += "<div class='col-xs-2'></div>";
    html += "<div class='col-xs-1'></div>";
    html += "<div class='col-xs-5 lineaTotalesCod'>Total general</div>";
    html += "<div class='col-xs-2 num lineaTotalGen'>" + numberWithCommas(suma.debe.toFixed(2), 0, 1) + "</div>";
    html += "<div class='col-xs-2 num lineaTotalGen'>" + numberWithCommas(suma.haber.toFixed(2), 0, 1) + "</div>";
    html += "</div>";
    return html;
}

function strcut(str1, str2){ 
    var str = str1 + ' ' + str2;
    return str.substring(0, 80); 
}

function strcutnomcta(str){
    return str.substring(0, 60);
}