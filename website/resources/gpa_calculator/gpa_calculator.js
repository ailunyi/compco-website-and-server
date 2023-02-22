
var nonlan = [["S", [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0]],
    ["S+", [0, 2.25, 2.65, 2.95, 3.25, 3.55, 3.85, 4.15]],
    ["H", [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4, 4.3]],
    ["A-Level", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]],
    ["AP", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]],
    ["IB", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]]];

var chin = [["1-2", [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0]],
["3-4", [0, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1]],
["5-7/AP/S", [0, 2.3, 2.7, 3.0, 3.3, 3.6, 3.9, 4.2]],
["H", [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3]],
["H+", [0, 2.5, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4]],
["IB", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]]];
//("H+", (0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5))

var eng = [["S", [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0]],
["S+", [0, 2.3, 2.7, 3.0, 3.3, 3.6, 3.9, 4.2]],
["H", [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3]],
    ["H+", [0, 2.5, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4]],
    ["A-Level", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]],
["AP", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]],
["IB", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]]];

var math = [["S", [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0]],
["S+", [0, 2.25, 2.65, 2.95, 3.25, 3.55, 3.85, 4.15]],
    ["H", [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4, 4.3]],
    ["H+", [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4, 4.3]],
["A-Level", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]],
["AP", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]],
    ["IB", [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]]];

var scoresTemplate = [0, 60, 68, 73, 78, 83, 88, 93];

var avgGpa = [4.17, 3.92, 3.89, 3.69, 3.83, 3.7, 3.7, 3.6, 2.0, 3.0, 3.5];
var avgSat = [1535, 1505, 1415, 1440, 1355, 1470, 1470, 1450, null, 1440, 1350];
//var avgAct = [., ., ., ., ., 33, 32, 32, null, 30, 27];
var difficulty = [];

var gpa = 0.00;
var weights = [];
// start with math, english, chinese
var subjects = [0,0,0];
var weights = [];
var levels = [0, 0, 0];
var scores = [0, 0, 0];
var subjectElements = [null, null, null];
var activeSubject = [true, true, true];
var removed = 0;
function calculateGpa() {
    var sum = 0;
    var count = 0;
    for (var i = 0; i < subjects.length; i++) {
        if (!activeSubject[i])
            continue;
        count += 1;
        if (i == 0) { // math
            sum += math[levels[i]][1][scores[i]];
        } else if (i == 1) { // egnlish
            sum += eng[levels[i]][1][scores[i]];
        } else if (i == 2) { // chinese
            sum += chin[levels[i]][1][scores[i]];
        } else { // other
            sum += nonlan[levels[i]][1][scores[i]];
        }
    }
    gpa = sum / count;
    document.getElementById("gpa").value = (Math.round(gpa * 100) / 100).toFixed(2);
}
function reset() {
    for (var i = 0; i < subjects.length; i++) {
        selectLevel(i, 0);
        selectScore(i, 0);
    }
    calculateGpa();
}
function save() {
    document.getElementById("saveButton").innerHTML = "saved";
    setTimeout(function () {
        document.getElementById("saveButton").innerHTML = "save";
    }, 1000);
}

var ib = false;

function toggleIB(isIb, cur) {
    ib = isIb;
    if (isIb) {
        for (var i = 0; i < levels.length; i++) {
            if (i == 0 || i ==1)
                selectLevel(i, 6);
            else
                selectLevel(i, 5);
        }
    }
    //else {
    //    for (var i = 0; i < levels.length; i++) {
    //        if (i != cur)
    //            selectLevel(i, 0);
    //    }
    //}
}

function selectLevel(subject, level) {
    if (!activeSubject[subject])
        return;

    //console.log(subject + " " + level);
    document.getElementById(subject + "-level-" + levels[subject]).classList.remove("subjectGpaSelected");
    levels[subject] = level;
    document.getElementById(subject + "-level-" + level).classList.add("subjectGpaSelected");
    if (subject == 0 || subject == 1) {
        if (level == 6) {//IB
            if (!ib)
                toggleIB(true, subject);
        }
        else {
            if (ib)
                toggleIB(false, subject);
        }
    } else {
        if (level == 5) {//IB
            if (!ib)
                toggleIB(true, subject);
        }
        else {
            if (ib)
                toggleIB(false, subject);
        }
    }
    calculateGpa();
}

function selectScore(subject, score) {
    document.getElementById(subject + "-score-" + scores[subject]).classList.remove("subjectGpaSelected");
    scores[subject] = score;
    document.getElementById(subject + "-score-" + score).classList.add("subjectGpaSelected");
    calculateGpa();
}

function removeSubject(subject) {
    subjectElements[subject].remove();
    levels[subject] = 0;
    scores[subject] = 0;
    removed += 1;
    activeSubject[subject] = false;

    calculateGpa(); // recaculate gpa
}

function addSubject() {
    subjects.push(0);
    if (ib)
        levels.push(5);
    else
        levels.push(0);
    scores.push(0);
    activeSubject.push(true);
    var index = subjects.length-1;

    // head
    const element = document.createElement("div");
    element.className = "subjectArea";
    element.id = "subjectArea--" + index;
    document.getElementById("subjects").appendChild(element);


    // - subject Level
    const subjectLevel = document.createElement("div");
    subjectLevel.className = "subjectLevel";
    subjectLevel.id = "subjectLevel--" + index;
    element.appendChild(subjectLevel);

    // ---- category Title
    const categoryTitle = document.createElement("input");
    categoryTitle.className = "categoryTitle";
    categoryTitle.id = "categoryTitle--" + index;
    categoryTitle.placeholder = "Class " + (index + 1);
    subjectLevel.appendChild(categoryTitle);

    // ---- subject gpa area
    const subjectGpaArea = document.createElement("div");
    subjectGpaArea.className = "subjectGpaArea";
    subjectGpaArea.id = "subjectGpaArea--" + index;
    subjectLevel.appendChild(subjectGpaArea);

    // ---------- level
    for (var i = 0; i < nonlan.length; i++) {
        const subjectLevel = document.createElement("div");
        subjectLevel.id = index + "-level-" + i;
        if (i == 0 && !ib)
            subjectLevel.className = "subjectGpaSelected";

        if (ib && i == 5)
            subjectLevel.className = "subjectGpaSelected";

        subjectLevel.innerHTML = nonlan[i][0];
        subjectGpaArea.appendChild(subjectLevel);
        (function (i) {
            subjectLevel.addEventListener('click', function handleClick(event) {
                selectLevel(index, i);
            }, false)
        })(i);
    }

    // - subject Choose Gpa
    const subjectChooseGpa = document.createElement("div");
    subjectChooseGpa.className = "subjectChooseGpa";
    subjectChooseGpa.id = "subjectChooseGpa--" + index;
    element.appendChild(subjectChooseGpa);

    // ---------- score
    for (var i = 0; i < scoresTemplate.length; i++) {
        const subjectScore = document.createElement("div");
        subjectScore.id = index + "-score-" + i;
        if (i == 0)
            subjectScore.className = "subjectGpaSelected";
        subjectScore.innerHTML = scoresTemplate[i];
        subjectChooseGpa.appendChild(subjectScore);
        (function (i) {
            subjectScore.addEventListener('click', function handleClick(event) {
                selectScore(index, i);
            }, false)
        })(i);
    }
    // - remove
    const removeSubjectButton = document.createElement("div");
    removeSubjectButton.className = "removeSubjectButton";
    removeSubjectButton.innerHTML = "remove";
    removeSubjectButton.id = "removeSubjectButton--" + index;
    removeSubjectButton.addEventListener('click', function handleClick(event) {
        removeSubject(index);
    })
    element.appendChild(removeSubjectButton);

    subjectElements.push(element);

    calculateGpa(); // recaculate gpa

}

function start() {

}

start();

calculateGpa();