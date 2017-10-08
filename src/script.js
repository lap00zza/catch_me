// Available difficulties
const diff_enum = {
    EASY: 0,
    MEDIUM: 25,
    HARD: 50,
    EXTREME: 100,
};

//Setting difficulty from url
const url = new URL(window.location);
let diff_param = url.searchParams.get("difficulty");
diff_param = diff_param ? diff_param.toUpperCase() : "HARD";

// Utility Functions
const mv_x = (what, x) => what.style.left = x + "px",
    mv_y = (what, y) => what.style.top = y + "px",
    rand = (limit) => Math.random() * limit,
    inRange = (lower, upper, what) => what >= lower && what <= upper;

// Selectors. Duh!
const catch_me = document.getElementById("catch_me"),
    counter = document.getElementById("counter"),
    body = document.querySelectorAll(".body")[0],
    diff_btns = document.querySelectorAll(".diff-btn"),
    active_diff_btn = document.getElementById(diff_param),
    x = document.getElementById("count-sound"),
    level_num = document.getElementById("level_num"),
    level_description = document.getElementById("level_description"),
    time_remaining = document.getElementById("time_remaining");

// Useful global values
const catch_height = 50,
    catch_width = 100,
    difficulty = diff_enum[diff_param];

const incr_counter = () => {
    counter.classList.remove("animated");
    count++;
    setCounter(count);
    counter.classList.add("animated");
    x.play();
    setTimeout(() => {
        x.pause();
        x.currentTime = 0;
    }, 800);
};
// Next positions should be within the visible portion of the window.
const rand_x = () => rand(window.innerWidth - catch_width),
    rand_y = () => rand(window.innerHeight - catch_height),
    mv_catch_x = () => mv_x(catch_me, rand_x()),
    mv_catch_y = () => mv_y(catch_me, rand_y());


// Variables for level scoring/timing
let current_level = 1;
let count = 0;
let total_score = 0;
let target_score, target_time, target_time_millis;

// Initial State
active_diff_btn.setAttribute("disabled", "disabled");
// start_chron();
catch_me.style.position = "absolute";
catch_me.style.height = catch_height + "px";
catch_me.style.width = catch_width + "px";
catch_me.style.backgroundColor = "#CE1836";
mv_catch_x();
mv_catch_y();

// If you can get your mouse inside here you get a point.
// But the question is, can you? ;)
catch_me.addEventListener("mouseenter", () => {
    mv_catch_x();
    mv_catch_y();
    incr_counter();
});

// Track mouse movement inside body.
body.addEventListener("mousemove", e => {
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

diff_btns.forEach(el => {
    el.addEventListener("click", e => {
        url.searchParams.set("difficulty", e.target.id);
        window.location.replace(url);
    })
});


const setTargets = () => {
    target_time = 60; // seconds
    target_time_millis = target_time * 1000;
    target_score = current_level * 5;
};

const setCounter = count => {
    counter.innerHTML = "Score: " + count;
};

const setLevel = level => {
    level_num.innerHTML = "Level: " + level;
};

const setLevelDescription = level => {
    setTargets();
    level_description.innerHTML = "Touch " + target_score + " times in " + target_time + " seconds";
};

const displayTimer = time => {
    let tr = Math.round(time / 1000);
    time_remaining.innerHTML = tr + "s";
};

const advanceLevel = () => {
    current_level++;
};

const end_game = () => {
    total_score += count;
    
    alerty.alert("You passed " + (current_level - 1) + " levels and earned a score of " + total_score + "!")

const startNewLevel = () => {
    setLevel(current_level);
    setCounter(0);
    setLevelDescription(current_level);
    mv_catch_x();
    mv_catch_y();
    total_score += count;
    count = 0;

    alerty.toasts("Ready...Set...Go!");

    // Starting value for level timer,
    const level_start = new Date().getTime();

    const t = setInterval(function () {
        // Get today's date and time
        const now = new Date().getTime();
        let timer = target_time_millis + (level_start - now);
        displayTimer(timer);

        if (timer < 0) {
            clearInterval(t);
            alerty.alert("Time's Up!");
            end_game();
        }
        if (count >= target_score) {
            alerty.alert("Congratulations! You have leveled up.");
            clearInterval(t);
            advanceLevel();
            startNewLevel();
        }
    }, 100);
};

const game = () => {
    // Initial State
    catch_me.style.position = "absolute";
    catch_me.style.height = catch_height + "px";
    catch_me.style.width = catch_width + "px";
    catch_me.style.backgroundColor = "#555";
    startNewLevel();
};

game();
