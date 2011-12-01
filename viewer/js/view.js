window.View = (function() {
    var View = Classy();

    var painting = {
        "click" : function(e) {
            e.preventDefault();
            window.open( $(e.target).attr('href') );
        },

        "hover" : function(e) {
            var thumb = $(e.target).data('thumb');
            console.log(thumb);
            $(e.target).css('background-image', 'url(' + thumb + ')');
        }
    };

    View.extend({
        "clear" : function() {
            $("#canvas").html('<p class="loading">een momentje...</p>');
            View.emit('cleared');
        },

        "init" : function() {
            $("#canvas").on('click', '.painting', painting.click);
            $("#canvas").on('mouseenter', '.painting', painting.hover);
        },

        "redraw" : function(data) {
            $("#canvas .loading").remove();
            $.each(data, function(i, item) {
               var $p = $(''.concat(
                   '<a class="painting" data-img="' + item.image + '"',
                   'data-thumb="' + item.thumb + '"',
                   'href="' + item.link + '"><p>' + item.title + '</p></a>'
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