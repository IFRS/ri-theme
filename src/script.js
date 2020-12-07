require('bootstrap');

require('lazysizes');
require('lazysizes/plugins/native-loading/ls.native-loading');

require('picturefill');

$(function() {
    picturefill();
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
