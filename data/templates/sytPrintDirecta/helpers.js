function strcut(str, tam){
    if(str) {
        if(str.length > +tam) {
            return str.substring(0, tam);
        } else {
            return str;
        }
    }
    return '';
}