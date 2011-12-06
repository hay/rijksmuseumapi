window.View = (function() {
    var View = Classy();

    var painting = {
        "click" : function(e) {
            e.preventDefault();
            window.open( $(e.target).attr('href') );
        },

        "hover" : function(e) {
            var thumb = $(e.target).data('thumb');
            $(e.target).css('background-image', 'url(' + thumb + ')');
        }
    };

    function drawItems(data) {
        var html = $.map(data, function(item) {
            return ''.concat(
               '<a class="painting" data-img="' + item.image + '"',
               'data-thumb="' + item.thumb + '"',
               'href="' + item.link + '"',
               'style="width:' + item.width + 'px;',
               'height:' + item.height + 'px;"',
               '"><p>' + item.title + '</p></a>'
            );
        });

        $("#canvas").html( html.join('') );
    }

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

            drawItems(data);

            View.emit('reloaded');
         }
    });

    return View;
});