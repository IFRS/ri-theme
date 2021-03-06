require('bootstrap');

require('lazysizes');
require('lazysizes/plugins/native-loading/ls.native-loading');

require('picturefill');

$(function() {
    picturefill();

    $('[data-toggle="tooltip"]').tooltip();

    let barra = document.createElement('div');
    barra.id = 'barra-brasil';
    document.body.prepend(barra);

    var script = document.createElement('script');
    script.src = 'https://barra.brasil.gov.br/barra.js';
    script.defer = 'defer';
    document.body.appendChild(script);
});
