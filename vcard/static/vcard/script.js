$(document).ready(function() {
    var menu = $('.index_page nav');

    var handlePicturesSelectInProjectDetails = function() {
        $('#project_details #additional_pictures a').click(function(e) {
            $('#project_details #picture_preview img').attr('src', $(this).attr('href'));
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            e.preventDefault();
        });
    };

    var setProjectDetailsPopup = function() {
        $('.projectstable .element .picture a').magnificPopup({
            type: 'ajax',
            callbacks: {
                ajaxContentAdded: handlePicturesSelectInProjectDetails
            }
        });
    };

    var handleProjectsGridStart = function() {
        window.runProjectsTableOnce(window.projects);
        setProjectDetailsPopup()
    };

    var moveMenuUpOnChangeToLowerSection = function() {
        $(menu).animate({'bottom': '-50px'}, 700);
    };

    var moveMenuDownOnChangeToUpperSection = function() {
        $(menu).animate({'bottom': '0'}, 700);
    };

    var handleSectionChangeToLower = function() {
        moveMenuUpOnChangeToLowerSection();
        handleProjectsGridStart();
    };

    var handleSectionChangeToUpper = function() {
        moveMenuDownOnChangeToUpperSection();
    };

    var startFullpage = function() {
        $('#fullpage').fullpage({
            verticalCentered: false,
            controlArrows: false,
            onLeave: function(index, nextIndex, direction) {
                if (index == 1 && nextIndex == 2)
                    handleSectionChangeToLower();

                if (index == 2 && nextIndex == 1)
                    handleSectionChangeToUpper();
            }
        });
    };

    var autoSetHashForMainSection = function() {
        mainSection = $('#section').first();
        mainSectionAnchor = $(mainSection).attr('data-anchor');
        window.location.hash = window.location.hash || '#' + mainSectionAnchor;
    };

    var disableManualScrolling = function() {
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
    };

    var highlightActiveMenuItem = function() {
        activePageUnitAnchor = "li a[href='" + window.location.hash + "']";
        activeMenuItem = $(activePageUnitAnchor, menu).parent();
        $(activeMenuItem).addClass('active');
        $(activeMenuItem).siblings().removeClass('active');
    };

    var autoHighlightActiveMenuItem = function() {
        highlightActiveMenuItem();
        $(window).on('hashchange', function() {
            highlightActiveMenuItem();
        });
    };

    var handleFullpage = function() {
        startFullpage();
        disableManualScrolling();
        autoHighlightActiveMenuItem();
        autoSetHashForMainSection();
    };

    handleFullpage();
});
