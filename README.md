clove.js
========
clove.js is a jQuery plugin that makes adding scrolling efects to web pages easy. The original intention was to make a plugin to add parallax effects to background images. From that idea came clove. Clove lets you alter any css attribute based on the scroll position of the page. Clove is extremly customizable allowing you for it to be customized in many ways.

Usage
========
To use clove include jQuery and clove.js in your webpage and
apply the effect by selecting an object with jQuery and calling the clove method

```javascript
$("#sample").clove();
```

This will add a vertical scrolling effect to the background image.
The default options may not be suitable for every instance and can be customized by overriding the default values when applying the clove effect.

```javascript
$("#sample").clove({
  min:0
  max:1000
});
```

This overrides the range of values that the background position will be set to. When the scrollbar is at the top the background position will be 0. When the scrollbar is at the bottom of the page the background position of the element will be 100.

Attributes
========

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

