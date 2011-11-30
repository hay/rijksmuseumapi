!function() {
    function Classy() {
        var eventHandlers = {},
            controller = function(){};

        controller.prototype = {
            emit : function(event, data) {
                data = data || null;

                if (eventHandlers[event] && eventHandlers[event].length > 0) {
                    var handlers = eventHandlers[event];

                    for (var i = 0, l = handlers.length; i < l; i++) {
                        var handler = handlers[i];
                        handler.call(null, data);
                    }
                }
            },

            extend : function(values) {
                for (var key in values) {
                    var val = values[key];
                    this[key] = val;
                }
            },

            // 'Eventparam' can either be a string with space-seperated events
            // or an object with key / value pairs for events and handlers
            on : function(eventParam, handler) {
                var eventObject = {};

                if (typeof eventParam === "string") {
                    eventObject[eventParam] = handler;
                } else {
                    // Event object
                    eventObject = eventParam;
                }

                for (var eventString in eventObject) {
                    var handler = eventObject[eventString],
                        events = eventString.split(" ");

                    for (var i = 0, l = events.length; i < l; i++) {
                        var event = events[i];

                        if (eventHandlers[event]) {
                            eventHandlers[event].push(handler);
                        } else {
                            eventHandlers[event] = [handler];
                        }
                    }
                }
            }
        }

        return new controller();
    }

    // The three-way check for CommonJS modules, AMD modules and plain old globals
    if (typeof module !== "undefined") {
        module.exports = Classy;
    } else if (typeof define !== "undefined") {
        define(Classy);
    } else {
        window.Classy = Classy;
    }
}();