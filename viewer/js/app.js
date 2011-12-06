// Sigh..
if (!$.fn.on) {
    $.fn.on = function(event, element, handler) {
        $(this).delegate(element, event, handler);
    }
}

!function() {
    if ($("html").hasClass('ielt9')) return;
    var controller = Controller();
    controller.init();
}();