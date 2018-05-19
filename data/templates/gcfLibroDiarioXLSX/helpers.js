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

function resumen(cuentas){
    var suma = {debe:0.0, haber: 0.0};
    cuentas.forEach(function(cta){
        cta.dld.forEach(function(det){
            if(+det.estotal === 1){
                suma.debe += parseFloat(det.debe);
                suma.haber += parseFloat(det.haber);
            }
        });
    });
    
    var html = '<row>';
    html += '<c t="inlineStr" s="{{@root.$removedItem.c.[0].$.s}}"><is><t></t></is></c>';
    html += '<c t="inlineStr" s="{{@root.$removedItem.c.[1].$.s}}"><is><t></t></is></c>';
    html += '<c t="inlineStr" s="{{@root.$removedItem.c.[2].$.s}}"><is><t>Total General:</t></is></c>';
    html += '<c s="{{@root.$removedItem.c.[3].$.s}}"><v>' + suma.debe.toFixed(2) + '</v></c>';
    html += '<c s="{{@root.$removedItem.c.[4].$.s}}"><v>' + suma.haber.toFixed(2) + '</v></c>';
    html += '</row>';
    return html;
}