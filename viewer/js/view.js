window.View = (function() {
    var View = Classy();

    View.extend({
        "clear" : function() {
            $("#canvas").html('<p class="loading">een momentje...</p>');
            View.emit('cleared');
        },

        "init" : function() {
            $("#canvas").on('mouseenter', '.painting', function(e) {
                var thumb = $(this).data('thumb');
                $(this).css('background-image', 'url(' + thumb + ')');
            });
        },

        "redraw" : function(data) {
            $("#canvas .loading").remove();
            $.each(data, function(i, item) {
               var $p = $(''.concat(
                   '<a class="painting" data-img="' + item.image + '"',
                   'data-thumb="' + item.thumb + '"',
                   'href="' + item.link + '">' + item.title + '</a>'
               )).css({
                   'width' : item.width,
                   'height' : item.height,
                   'display' : 'none'
               });

               $("#canvas").append( $p );
            });

            $("#canvas").isotope({
                itemSelector : '.painting',
                layoutMode : 'fitRows'
            });

            $("#canvas .painting").show();
            View.emit('reloaded');
         }
    });

    return View;
});