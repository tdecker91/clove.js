clove.js
========
clove.js is a jQuery plugin that makes adding scrolling efects to web pages easy. The original intention was to make a plugin to add parallax effects to background images. From that idea came clove. Clove lets you alter any css attribute based on the scroll position of the page. Clove is extremly customizable allowing you for it to be customized in many ways.

Usage
========
To use clove include jQuery and clove.js in your webpage
Apply the effect by selecting an object with jQuery and calling the clove method

```
$("#sample").clove();
```

This will add a vertical scrolling effect to the background image.
The default options may not be suitable for every instance and can be customized by overriding the default values when applying the clove effect.

```
$("#sample").clove({
  min:0
  max:100
});
```

This overrides the range of values that the background position will be set to. When the scrollbar is at the top the background position will be 0. When the scrollbar is at the bottom of the page the background position of the element will be 100.

