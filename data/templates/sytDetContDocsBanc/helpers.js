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
function estot(descrip){
    if(descrip !== null && descrip !== undefined){
        return descrip.toUpperCase().indexOf('TOTALES') > -1 ? ' brdtp bld pdbtm' : '';
    }else{
        return '';
    }
}
function estot2(descrip){
    if(descrip !== null && descrip !== undefined){
        return descrip.toUpperCase().indexOf('TOTALES') > -1 ? ' bld pdbtm' : '';
    }else{
        return '';
    }
}
function estotdescr(descrip){
    if(descrip !== null && descrip !== undefined){
        return descrip.toUpperCase().indexOf('TOTALES') > -1 ? '' : 'N.I.T.';
    }else{
        return '';
    }
}
function imprimir(docsop, options){
    if(docsop !== null && docsop !== undefined)
        return docsop.length > 0 ? options.fn(this) : options.inverse(this); 
    return options.inverse(this);
}