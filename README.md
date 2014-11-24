clove.js v0.1.0
========
Clove is a jQuery plugin that makes it easy to add scrolling effects to web pages. The motivation behind Clove was to make a plugin that could add parallax effects to background images. The plugin lets you alter any CSS attribute based on the scroll position of the page. Clove is extremely customizable.


Usage
========
To use Clove, include jQuery and clove.js in your webpage and apply the effect by selecting an object with jQuery and calling the Clove method.

```javascript
$("#sample").clove();
```

This will add a vertical scrolling effect to the background image. The default options may not be suitable for every application but can be easily customized by overriding the default values.

```javascript
$("#sample").clove({
  min:0,
  max:1000
});
```

This overrides the range of values that the background position will be set to. When the scrollbar is at the top, the background position will be 0. When the scrollbar is at the bottom of the page, the background position of the element will be 100.

Attributes
========
Any of the following attributes can be overriden.

First Header | Second Header
------------ | ------------
min  | lower bound for the range of css values
max  | upper bound for the range of css values
initialX | Horizonal background position when dynamically changing vertical offset
initialY | Vertical background position when dynamically chaning horizonal offset
offsetUnit | unit for the CSS attribute (ex... 'px', '%', 'pt')
property | the CSS property to change based on the scroll position
scrollOffscreen | boolean value. Whether or not the css attribute should change when the element is offscreen |
scaleFunction | function that scales the scroll position of the screen inside a given the min and max offset |
thresholdFunction | determines if the elements CSS should be altered. Defaults to only update the element CSS if the element is currently displayed on the screen
easing | Easing function. Can either be a name of a predefined easing function in easings.js, or a user defined easing function

