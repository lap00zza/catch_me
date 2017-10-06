// Available difficulties
const diff_enum = {
    EASY: 0,
    MEDIUM: 25,
    HARD: 50,
    EXTREME: 100,
};

// Utility Functions
const mv_x = function mv_x(what, x) {
    return what.style.left = x;
},
    mv_y = function mv_y(what, y) {
    return what.style.top = y;
},
    rand = function rand(limit) {
    return Math.random() * limit;
},
    inRange = function inRange(lower, upper, what) {
    return what >= lower && what <= upper;
};

// Selectors. Duh!
const catch_me = document.getElementById("catch_me"),
    counter = document.getElementById("counter"),
    body = document.querySelectorAll(".body")[0];

// Useful global values
const catch_height = 50,
    catch_width = 100,
    difficulty = diff_enum.HARD; // CHANGE THIS FOR MORE FUN

const incr_counter = function incr_counter() {
    return counter.innerText = +counter.innerText + 1;
};
// Next positions should be within the visible portion of the window.
const rand_x = function rand_x() {
    return rand(window.innerWidth - catch_width);
},
    rand_y = function rand_y() {
    return rand(window.innerHeight - catch_height);
},
    mv_catch_x = function mv_catch_x() {
    return mv_x(catch_me, rand_x());
},
    mv_catch_y = function mv_catch_y() {
    return mv_y(catch_me, rand_y());
};

// Initial State
catch_me.style.position = "absolute";
catch_me.style.height = catch_height + 'px';
catch_me.style.width = catch_width + 'px';
catch_me.style.backgroundColor = "#555";
mv_catch_x();
mv_catch_y();

// If you can get your mouse inside here you get a point.
// But the question is, can you? ;)
catch_me.addEventListener("mouseenter", function () {
    mv_catch_x();
    mv_catch_y();
    incr_counter();
});

// Track mouse movent inside body.
body.addEventListener("mousemove", function (e) {
    const delta_x = e.offsetX - catch_me.offsetLeft,
        delta_y = e.offsetY - catch_me.offsetTop,
        xInRange = inRange(-difficulty, difficulty + catch_width, delta_x),
        yInRange = inRange(-difficulty, difficulty + catch_height, delta_y);
    if (xInRange && yInRange) {
        mv_catch_x();
        mv_catch_y();
        // console.log(`x: ${delta_x} y: ${delta_y}`);
    }
});
