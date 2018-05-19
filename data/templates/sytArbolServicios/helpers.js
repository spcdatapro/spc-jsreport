function genArbol(arbol){
    var fila = "", padlft = 0, tieneHijos = false;
    if(arbol !== null && arbol !== undefined){
        arbol.forEach(function(rama){
            padlft = parseFloat(parseFloat(+rama.nivel/1.25).toFixed(2));
            fila+= "<tr>";
            fila+= "<td colspan='10'>";
            fila+= "<span class='bld' style='padding-left: " + padlft + "em'>";
            //fila+= (rama.empresa + "(" + rama.abreviaempresa + ")");
            fila+= rama.abreviaempresa;
            fila+= "</span>";
            fila+= "</td>";
            fila+= "</tr>";
            rama.ramas.forEach(function(contador){
                tieneHijos = contador.ramas.length > 0;
                fila+= "<tr>";
                fila+= "<td " + (!tieneHijos ? "" : "class='bld'") + " style='width: 15%; padding-left: " + padlft + "em'>" + contador.numidentificacion + "</td>";
                fila+= "<td>" + contador.ubicadoen + "</td>";
                fila+= "<td style='width: 7%' class='cntxt'>" + (contador.fechainicial !== null && contador.fechainicial !== undefined ? contador.fechainicial : '') + "</td>";
                fila+= "<td style='width: 7%' class='cntxt'>" + (contador.fechafinal !== null && contador.fechafinal !== undefined ? contador.fechafinal : '') + "</td>";
                fila+= "<td style='width: 7%' class='num'>" + (contador.lecturainicial !== null && contador.lecturainicial !== undefined ? contador.lecturainicial : '') + "</td>";
                fila+= "<td style='width: 7%' class='num'>" + (contador.lecturafinal !== null && contador.lecturafinal !== undefined ? contador.lecturafinal : '') + "</td>";
                fila+= "<td style='width: 7%' class='num'>" + (contador.consumo !== null && contador.consumo !== undefined ? contador.consumo : '') + "</td>";
                fila+= "<td style='width: 7%' class='num'>" + (contador.preciobase !== null && contador.preciobase !== undefined ? contador.preciobase : '') + "</td>";
                fila+= "<td style='width: 7%' class='num'>" + (contador.base !== null && contador.base !== undefined ? contador.base : '') + "</td>";
                fila+= "<td style='width: 7%' class='num'>" + (contador.afacturar !== null && contador.afacturar !== undefined ? contador.afacturar : '') + "</td>";
                fila+= "</tr>";
                fila+= genArbol(contador.ramas);
            });
        });
        return fila;
    }
    return '';
}