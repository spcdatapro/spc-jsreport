function strCut(str, tam){
    if(str !== null && str !== undefined){
        if(str.length <= +tam){
            return str;
        }else{
            return str.substring(0, (+tam));
        }
    }
    return '';
}