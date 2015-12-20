$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors:['main', 'projects', 'about', 'contacts'],
        verticalCentered: false,
        menu: '#nav'
    });
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
});
