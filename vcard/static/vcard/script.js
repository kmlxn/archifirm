$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors:['main', 'projects', 'about', 'contact'],
        verticalCentered: false,
        onLeave: function(index, nextIndex, direction) {
            var nav = $('nav');

            if (index == 1 && nextIndex == 2) {
                $(nav).animate({'bottom': '-50px'}, 700);
            }

            if (index == 2 && nextIndex == 1) {
                $(nav).animate({'bottom': '0'}, 700);
            }
        }
    });
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
});
