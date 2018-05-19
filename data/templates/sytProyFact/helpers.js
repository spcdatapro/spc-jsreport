function printTC(tc){
    if(tc !== ''){
        return parseInt(tc) > 0 ? (" con tasa de cambio de: " + parseFloat(tc).toFixed(2)) : "";
    }else{
        return '';
    }
}

function lgHeading(tc){ return tc !== '' ? 'firstb' : 'firsta'; }

function strCut(str, tam){
    if(str !== null && str !== undefined){
        if(str.length <= tam){
            return str;
        }else{
            return str.substring(0, tam);
        }
    }else{
        return '';
    }
}