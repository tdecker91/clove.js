/**
 * Clove JS
 * A simple jQuery plugin for adding parallax effects to web pages
 * 
 * Author: Tyson Decker
 * Website: http://www.tysondecker.com/
 */

/**
 * Known Issues / TODO
 *
 *  - Even though it doesn't change a property when it is offscreen the value changes as if it had done it while offscreen
 *  - Make generic formatValue function
 *  - formatCss needs to do only one thing. aka it shouldn't be scaling the value
 */

$.getScript("lib/easings.js", function(){ // Might cause problems if this loads asynchronously?

});

(function($)
{

    /**
     * scales the scroll position of the screen to a given range
     * 
     * @param  {object} range contains the min and max values of the range to scale to [ ex. { min:0, max:100 } ]
     * @return {number} the scaled number
     */
    var scaleFunction = function(range) 
    {
        var scrollPercent = $(window).scrollTop() / ($(document).height() - $(window).height());
        return (range.max - range.min) * scrollPercent + range.min;
    };

    /**
     * Formats a value to a valid background-position property for the scroll axis defined.
     * 
     * @param  {number} values the values for the x and y axis to be formatted. [ ex. {x:0, y:150} ]
     * @return {string} a string in the unit '[x]px [y]px' for the background-position css
     */
    var formatBgPositionValue = function(values, unit)
    {
        return values.x + unit + " " + values.y + unit;
    };

    /**
     * Default threshold function for elements. Returns true if the element is currenlty displayed on the screen.
     * The property will or will not be modified based on this function. 
     *  
     * @param  {element} element the html element 
     * @return {bool} returns true if the element is displayed on the screen
     */
    var isWithinThreshold = function(element) 
    {

        var top = element.offsetTop;
        var bottom = element.offsetTop + element.offsetHeight;
        var windowBottom = $(window).height() + $(window).scrollTop();

        var topInWindow = (top > $(window).scrollTop() && top < windowBottom);
        var bottomInWindow = (bottom > $(window).scrollTop() && bottom < windowBottom);

        return topInWindow || bottomInWindow;

    };

    var formatCss = function(object, range)
    {

        var newValue;

        if(object.property === "background-position-y")
        {
            var x = object.initialX
            var y = ease(object.easing, object.scaleFunction(range));
            newValue = formatBgPositionValue({x:x,y:y}, object.offsetUnit);
        }
        else if(object.property === "background-position-x")
        {

            var x = ease(object.easing, object.scaleFunction(range));
            var y = object.initialY;
            newValue = formatBgPositionValue({x:x,y:y}, object.offsetUnit);
        }
        else
        {
            newValue = ease(object.easing, object.scaleFunction(range)) + object.offsetUnit;
        }

        return newValue;

    };

    /**
     * Takes the scaled value and runs it through an easing function defined.
     * The easing function can eithe be a pre-defined function in jQuery expressed
     * as a string or a custom easing function.
     * 
     * @param  easingFunction   Name of a pre-defined easing function, or a custom easing function
     * @param  {number} value   the 'x' value to ease
     * @return {number}         The eased result
     */
    var ease = function(easingFunction, value)
    {           
        // x, t, b, c, d ?
        if(typeof easingFunction == 'string')
        {
            return $.easing[easingFunction](value);
        }
        else
        {
            return easingFunction(value);
        }
    };

    $.clove = {
    	defaults: {
    		
            min: 500,
            max: 1500,
            initialX: 0,
            initialY: 0,
            offsetUnit: "px",
            property: "background-position",
            scrollOffscreen: false,
            scaleFunction: scaleFunction,
            thresholdFunction: isWithinThreshold,
            easing: "linear"
    	},
        objects: [],
        scrollTop: 0,
        scroll: function(e) {

            var difference = this.scrollTop - $(window).scrollTop();
            this.scrollTop = $(window).scrollTop();

            for(var i=0; i<this.objects.length; ++i) {

                var object = this.objects[i];
                var element = object.element;
                var range = {
                    min:object.min,
                    max:object.max
                };
                range.scaled = scaleFunction(range);
                var newValue = formatCss(object, range);
                var property = object.property;

                if(property === "background-position-x" || property === "background-position-y")
                    property = "background-position";

                if(object.scrollOffscreen || object.thresholdFunction(element))
                    $(element).css(property, newValue);
            }

        }

    }

    // $.fn is the object we add our plugin to
    $.fn.clove = function(options)
    {

        $(window).bind("scroll", $.clove.scroll.bind($.clove));
        $.clove.scrollTop = $(window).scrollTop();


        return this.each(function(n)
        {

            var element = {
                element: this,
            };

            $.extend(element, $.clove.defaults);

            if(options)
                $.extend(element, options);

            $.clove.objects.push(element);

        });

    };

})(jQuery);