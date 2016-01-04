$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors:['hello', 'we'],
        verticalCentered: false,
        controlArrows: false,
        onLeave: function(index, nextIndex, direction) {
            var nav = $('.index_page nav');

            if (index == 1 && nextIndex == 2) {
                $(nav).animate({'bottom': '-50px'}, 700);
                window.runProjectsTableOnce(window.projects);
                $('.projectstable .element .picture a').magnificPopup({
                    type: 'ajax'
                });
            }

            if (index == 2 && nextIndex == 1) {
                $(nav).animate({'bottom': '0'}, 700);
            }
        }
    });

    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);

    $(window).on('hashchange', function() {
        if (window.location.hash == '#hello')
            removeHash();
    });

    var removeHash = function() {
        var loc = window.location;

        if ("pushState" in history)
            history.pushState("", document.title, loc.pathname + loc.search);
        else {
            loc.hash = "";
        }
    }
});
