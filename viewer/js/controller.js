window.Controller = (function() {
    var Controller = Classy(),
        model,
        view;

    Controller.extend({
        "init" : function() {
            model = Model();
            view = View();

            model.on('dataloaded', function() {
                view.redraw( model.getAll() );
            });

            view.init();

            model.init({
                'local' : true
            });
        }
    });

    return Controller;
});