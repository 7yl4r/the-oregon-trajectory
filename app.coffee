require('howler')

# show warning before navigating from the page
window.onbeforeunload = () ->
    return 'You will lose your progress!'
