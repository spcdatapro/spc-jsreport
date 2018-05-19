function shortStr(str, tam){
    if(str !== null && str !== undefined){
        if(str.length > +tam){
            return str.substr(0, +tam);
        }else{
            return str;
        }
    }
    return '';
}

function addBreak(tran){
    if(tran !== null && tran !== undefined){
        if(tran.length > 25){
            return 'page-break-before: always';
        }
    }
    return '';
}