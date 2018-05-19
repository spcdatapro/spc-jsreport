var postURL = "http://localhost/gcf/php/rptlibmay.php/rptlibmay";

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    var periodo = {del: params.fdelstr, al: params.falstr};
    req.data = {
        fecha: new Date(), del: periodo.del, al: periodo.al,
        cuentas: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {fdelstr: "2016-01-01", falstr: "2016-01-31", idempresa: 1, codigo: "100602"},
        json: true,
        url: postURL
    }, function(err, response, body){
        //req.data.cuentas = JSON.parse(body.substring(1));
        //req.data.cuentas = body;
        //req.template.content = typeof body;
        if(typeof body == 'string'){
            req.data.cuentas = JSON.parse(body.substring(1));
        }else{
            req.data.cuentas = body;
        }
        //req.template.content = JSON.stringify(response.headers)
        //req.template.content = req.data.cuentas[0].codigo;
        //req.data.cuentas = [{"id":"7","idcuentac":"7","codigo":"100102","nombrecta":"BANCO INDUSTRIAL S.A. $ # 018-011049-6","tipocuenta":"0","anterior":"-114009.66","debe":"0.00","haber":"149258.67","actual":"-263268.33","dlm":[{"poliza":"P20161003010000817","fecha":"2016-10-03","referencia":"Cheque 417 BANCO INDUSTRIAL, S.A.","conceptomayor":"Pago de la cuota 09\/18 Omali V","debe":"0.00","haber":"10151.35","idorigen":"817","origen":"1"},{"poliza":"P20161004010000856","fecha":"2016-10-04","referencia":"Cheque 418 BANCO INDUSTRIAL, S.A.","conceptomayor":"Pago Cr\u00e9dito JRVQ-560 (Suit Blanco Honduras)","debe":"0.00","haber":"2554.23","idorigen":"856","origen":"1"},{"poliza":"P20161005010000924","fecha":"2016-10-05","referencia":"Cheque 419 BANCO INDUSTRIAL, S.A.","conceptomayor":"Reintegro de 3 cuotas IVA Retenido GCF 032-004 Cash Logistics, S.A.","debe":"0.00","haber":"297.44","idorigen":"924","origen":"1"},{"poliza":"P20161013010001615","fecha":"2016-10-13","referencia":"Cheque 425 BANCO INDUSTRIAL, S.A.","conceptomayor":"Pago de p\u00f3lizas EEG$-336 4\/4 y 3\/3 (Expediente GCF 039-001 4 P Media, S.A.)","debe":"0.00","haber":"1781.04","idorigen":"1615","origen":"1"},{"poliza":"P20161014010001660","fecha":"2016-10-14","referencia":"Cheque 426 BANCO INDUSTRIAL, S.A.","conceptomayor":"Pago de cuota 36\/36 de GCF 026-001 Omali I (Cr\u00e9dito # 90-1500004-6)","debe":"0.00","haber":"34643.83","idorigen":"1660","origen":"1"},{"poliza":"P20161014010001661","fecha":"2016-10-14","referencia":"Cheque 427 BANCO INDUSTRIAL, S.A.","conceptomayor":"Pago de comisiones a Eduardo Rodenas por caso Nuevos \u00c9ticos Neoheticals, S.A.","debe":"0.00","haber":"9712.98","idorigen":"1661","origen":"1"},{"poliza":"P20161017010001725","fecha":"2016-10-17","referencia":"Cheque 428 BANCO INDUSTRIAL, S.A.","conceptomayor":"Pago de la cuota 20\/36 y 26\/48 de Seguros Universales, S.A.. Cr\u00e9dito No. 90-1900008-3 y 90-190007-5 (GCF 041)","debe":"0.00","haber":"83012.64","idorigen":"1725","origen":"1"},{"poliza":"P20161017010001727","fecha":"2016-10-17","referencia":"Cheque 429 BANCO INDUSTRIAL, S.A.","conceptomayor":"Pago de honorarios por administraci\u00f3n de fideicomiso G&T","debe":"0.00","haber":"3365.60","idorigen":"1727","origen":"1"},{"poliza":"P20161017010001729","fecha":"2016-10-17","referencia":"Cheque 430 BANCO INDUSTRIAL, S.A.","conceptomayor":"Honorarios por administraci\u00f3n de fideicomiso Banco Industrial","debe":"0.00","haber":"3739.56","idorigen":"1729","origen":"1"}]}];
        //req.template.content = JSON.stringify(body);
        //request.template.content = JSON.stringify(params);
        done();
    });
    
}