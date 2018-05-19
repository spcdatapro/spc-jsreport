function formatDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function toFloat(numero){
    if(numero && numero !== '' && numero !== '0.00' && numero !== '0'){
        return parseFloat(parseFloat(numero).toFixed(2));
    }
    return '';
}