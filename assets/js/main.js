/*jslint browser: true, indent: 4, regexp: true*/
/*global $*/

(function() {
    'use strict';

    function toggleMenu() {
        var className = "menu-open",
            classString = document.body.className,
            nameIndex = classString.indexOf(className);

        if (nameIndex == -1) {
            classString += " " + className;
        } else {
            classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
        }

        document.body.className = classString;
    }

    document.getElementById("menu").addEventListener("click", toggleMenu, false);
    document.getElementById("dim").addEventListener("click", toggleMenu, false);
}());
