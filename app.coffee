require('howler')

# show warning before navigating from the page
window.onbeforeunload = () ->
    return 'You will lose your progress!'

window.fillVersionSpans = () ->
    $('.version-number').text(globalData.version)

window.globalData = {};
globalData.gameDir = '';

$(document).ready( ()->
    version = '0.0.0';
    $.get(globalData.gameDir+'/package.json', {}, (data, textStatus, jqXHR)->
        globalData.version = data.version
        window.fillVersionSpans()
    , 'json');

)

module.exports = globalData
