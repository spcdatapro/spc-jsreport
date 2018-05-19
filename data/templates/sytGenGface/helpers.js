function imprimir(valor, options){ return parseFloat(valor) !== 0 ? options.fn(this) : options.inverse(this); }
//function nl(){ return "\r\n"; }
function nl(){ return "\u000D\u000A"; }
//function nl(){ return String.fromCharCode(13); }
//function nl(){ return ''; }