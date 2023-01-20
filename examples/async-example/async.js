"use strict";

let test1 = function() {
    setTimeout(function() {
        console.log('Code starts here!');
        alert('This is an Alert!');
        console.log('Code ends here!');
    }, 3000);
};

let test2 = function() {
    console.log('Please notice me!');
};

test1();
test2();