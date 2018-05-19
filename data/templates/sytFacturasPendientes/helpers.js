function cutstr(str, tam){
    if(str !== null && str !== undefined){
        return str.trim().length < tam ? str.trim() : str.trim().substring(0, tam) ;
    }
    return '';
}
