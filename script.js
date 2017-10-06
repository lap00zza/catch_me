// Available difficulties
const diff_enum = {
    EASY: 0,
    MEDIUM: 25,
    HARD: 50,
    EXTREME: 100,
};

// Utility Functions
const mv_x = (what, x) => what.style.left = x;
const mv_y = (what, y) => what.style.top = y;
const rand = (limit) => Math.random() * limit;
const inRange = (lower, upper, what) => what >= lower && what <= upper;

// Selectors. Duh!
const catch_me = document.getElementById("catch_me");
const counter = document.getElementById("counter");
const body = document.querySelectorAll(".body")[0];

// Useful global values
const catch_height = 50;
const catch_width = 100;
const difficulty = diff_enum.HARD; // CHANGE THIS FOR MORE FUN

const incr_counter = () => counter.innerText = +counter.innerText + 1;
// Next positions should be within the visible portion of the window.
const rand_x = () => rand(window.innerWidth - catch_width);
const rand_y = () => rand(window.innerHeight - catch_height);
const mv_catch_x = () => mv_x(catch_me, rand_x());
const mv_catch_y = () => mv_y(catch_me, rand_y());

// Initial State
catch_me.style.position = "absolute";
catch_me.style.height = catch_height;
catch_me.style.width = catch_width;
catch_me.style.backgroundColor = "#555"
mv_catch_x();
mv_catch_y();

// If you can get your mouse inside here you get a point.
// But the question is, can you? ;)
catch_me.addEventListener("mouseenter", () => {
    mv_catch_x();
    mv_catch_y();
    incr_counter();
});

// Track mousemovent inside body.
body.addEventListener("mousemove", e => {
    const delta_x = e.offsetX - catch_me.offsetLeft;
    const delta_y = e.offsetY - catch_me.offsetTop;
    const xInRange = inRange(-difficulty, difficulty + catch_width, delta_x);
    const yInRange = inRange(-difficulty, difficulty + catch_height, delta_y);
    if (xInRange && yInRange) {
        mv_catch_x();
        mv_catch_y();
        // console.log(`x: ${delta_x} y: ${delta_y}`);
    }
});
