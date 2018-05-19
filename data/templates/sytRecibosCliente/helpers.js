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