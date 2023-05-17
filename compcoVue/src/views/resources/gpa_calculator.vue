<script setup>

    import footerVue from '../../components/footerVue.vue'
</script>

<template>
    <main>
        <div class="mainContent">
        <div style="float:left">
            <div class="title">GPA CALCULATOR</div>
            <div class="topButton" onclick="reset()">reset</div>
            <div id="saveButton" class="topButton" onclick="save()">save (local)</div>
        </div>
        
        <div class="calculatorArea">
            <div id="subjects">
                <div id="subjectArea1" class="subjectArea">
                    <div class="subjectLevel">
                        <input class="categoryTitle" placeholder="Math">
                        <div class="subjectGpaArea">
                            <div id="0-level-0" onclick="selectLevel(0,0)" class="subjectGpaSelected">S</div>
                            <div id="0-level-1" onclick="selectLevel(0,1)">S+</div>
                            <div id="0-level-2" onclick="selectLevel(0,2)">H</div>
                            <div id="0-level-3" onclick="selectLevel(0,3)">H+</div>
                            <div id="0-level-4" onclick="selectLevel(0,4)">A-Level</div>
                            <div id="0-level-5" onclick="selectLevel(0,5)">AP</div>
                            <div id="0-level-6" onclick="selectLevel(0,6)">IB</div>
                        </div>
                    </div>

                    <div class="subjectChooseGpa">
                        <div id="0-score-0" onclick="selectScore(0,0)" class="subjectGpaSelected">0</div>
                        <div id="0-score-1" onclick="selectScore(0,1)">60</div>
                        <div id="0-score-2" onclick="selectScore(0,2)">68</div>
                        <div id="0-score-3" onclick="selectScore(0,3)">73</div>
                        <div id="0-score-4" onclick="selectScore(0,4)">78</div>
                        <div id="0-score-5" onclick="selectScore(0,5)">83</div>
                        <div id="0-score-6" onclick="selectScore(0,6)">88</div>
                        <div id="0-score-7" onclick="selectScore(0,7)">93</div>
                    </div>
                </div>
                <div class="subjectArea">
                    <div class="subjectLevel">
                        <input class="categoryTitle" placeholder="English">
                        <div class="subjectGpaArea">
                            <div id="1-level-0" onclick="selectLevel(1,0)" class="subjectGpaSelected">S</div>
                            <div id="1-level-1" onclick="selectLevel(1,1)">S+</div>
                            <div id="1-level-2" onclick="selectLevel(1,2)">H</div>
                            <div id="1-level-3" onclick="selectLevel(1,3)">H+</div>
                            <div id="1-level-4" onclick="selectLevel(1,4)">A-Level</div>
                            <div id="1-level-5" onclick="selectLevel(1,5)">AP</div>
                            <div id="1-level-6" onclick="selectLevel(1,6)">IB</div>

                        </div>
                    </div>

                    <div class="subjectChooseGpa">
                        <div id="1-score-0" onclick="selectScore(1,0)" class="subjectGpaSelected">0</div>
                        <div id="1-score-1" onclick="selectScore(1,1)">60</div>
                        <div id="1-score-2" onclick="selectScore(1,2)">68</div>
                        <div id="1-score-3" onclick="selectScore(1,3)">73</div>
                        <div id="1-score-4" onclick="selectScore(1,4)">78</div>
                        <div id="1-score-5" onclick="selectScore(1,5)">83</div>
                        <div id="1-score-6" onclick="selectScore(1,6)">88</div>
                        <div id="1-score-7" onclick="selectScore(1,7)">93</div>
                    </div>
                </div>
                <div class="subjectArea">
                    <div class="subjectLevel">
                        <input class="categoryTitle" placeholder="Chinese">
                        <div class="subjectGpaArea">
                            <div id="2-level-0" onclick="selectLevel(2,0)" class="subjectGpaSelected">1-2</div>
                            <div id="2-level-1" onclick="selectLevel(2,1)">3-4</div>
                            <div id="2-level-2" onclick="selectLevel(2,2)">5-7/AP/S</div>
                            <div id="2-level-3" onclick="selectLevel(2,3)">H</div>
                            <div id="2-level-4" onclick="selectLevel(2,4)">H+</div>
                            <div id="2-level-5" onclick="selectLevel(2,5)">IB</div>
                        </div>
                    </div>

                    <div class="subjectChooseGpa">
                        <div id="2-score-0" onclick="selectScore(2,0)" class="subjectGpaSelected">0</div>
                        <div id="2-score-1" onclick="selectScore(2,1)">60</div>
                        <div id="2-score-2" onclick="selectScore(2,2)">68</div>
                        <div id="2-score-3" onclick="selectScore(2,3)">73</div>
                        <div id="2-score-4" onclick="selectScore(2,4)">78</div>
                        <div id="2-score-5" onclick="selectScore(2,5)">83</div>
                        <div id="2-score-6" onclick="selectScore(2,6)">88</div>
                        <div id="2-score-7" onclick="selectScore(2,7)">93</div>
                    </div>
                </div>
            </div>

            <div class="addSubjectButton" onclick="addSubject()">+</div>
            <div class="addChoices" hidden>
                <div></div>
            </div>

        </div>

        <div class="predictionArea">
            <div class="gpaArea">GPA: <input id="gpa" placeholder="0.00"></div>
            <div class="collegeChance">
                <div class="subTitle">estimated college chances:</div>
                <div class="satArea">enter SAT/ACT: <input id="gpa" placeholder="ex. 1600 or 36"></div>
                <div class="subTitle averageChance" style="margin-top:10px;">Avg</div>
                <div class="subTitle" style="margin-top:10px">American</div>
                <!--<div style="position:absolute; right:20px; text-align:right; margin-top:-22px">Average</div>-->
                <div>
                    <a target="_blank" href="https://www.usnews.com/best-colleges/massachusetts-institute-of-technology-2178">
                        T5 MIT:
                    </a><label id="mitChance">0%</label>  <a target="_blank" href="https://www.prepscholar.com/sat/s/colleges/MIT-SAT-scores-GPA" class="averageChance">(4.17 / 1535)</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.usnews.com/best-colleges/jhu-2077">
                        T10 JHU:
                    </a><label id="mitChance">0%</label><a target="_blank" href="https://www.prepscholar.com/sat/s/colleges/Johns-Hopkins-SAT-scores-GPA" class="averageChance">(3.92 / 1505)</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.usnews.com/best-colleges/university-of-california-berkeley-1312">
                        T20 UCB:
                    </a><label id="mitChance">0%</label><a target="_blank" href="https://www.prepscholar.com/sat/s/colleges/NYU-admission-requirements" class="averageChance">(3.89 / 1415)</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.usnews.com/best-colleges/nyu-2785#:~:text=It%20has%20a%20total%20undergraduate,is%20National%20Universities%2C%20%2325.">
                        T30 NYU:
                    </a><label id="mitChance">0%</label><a target="_blank" href="https://www.prepscholar.com/sat/s/colleges/NYU-admission-requirements" class="averageChance">(3.69 / 1440)</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.usnews.com/best-colleges/university-of-texas-at-austin-3658">T40 UT Austin:</a>
                    <label id="mitChance">0%</label>
                    <a target="_blank" href="https://www.prepscholar.com/sat/s/colleges/UT-Austin-SAT-scores-GPA" class="averageChance">(3.83 / 1355)</a>
                </div>

                <div class="subTitle" style="margin-top:20px">UK</div>
                <div>
                    <a target="_blank" href="https://www.timeshighereducation.com/world-university-rankings/university-oxford">
                        Oxford:
                    </a><label id="mitChance">0%</label><a target="_blank" href="https://www.gotouniversity.com/university/university-of-oxford/sat" class="averageChance">(3.7 / 1400)</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.timeshighereducation.com/world-university-rankings/university-cambridge">
                        Cambridge:
                    </a><label id="mitChance">0%</label><a target="_blank" href="https://www.gotouniversity.com/university/university-of-cambridge/application-requirements" class="averageChance">(3.4 / 1470)</a>
                </div>

                <div class="subTitle" style="margin-top:20px">Asian</div>
                <div>
                    <a target="_blank" href="https://www.timeshighereducation.com/world-university-rankings/seoul-national-university">
                        Seoul:
                    </a><label id="mitChance">0%</label><a target="_blank" href="https://www.gotouniversity.com/university/seoul-national-university-snu/gpa-requirement" class="averageChance">(2.0 / null)</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.timeshighereducation.com/world-university-rankings/tsinghua-university">
                        Tsinghua:
                    </a><label id="mitChance">0%</label><a target="_blank" href="https://www.gotouniversity.com/university/tsinghua-university/gpa-requirement" class="averageChance">(3.0 / )</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.timeshighereducation.com/world-university-rankings/university-tokyo">
                        Tokyo:
                    </a><label id="mitChance">0%</label><label class="averageChance">(4.17)</label>
                </div>
                <div>
                    <a target="_blank" href="https://www.timeshighereducation.com/world-university-rankings/university-hong-kong">
                        HKU:
                    </a><label id="mitChance">0%</label><a target="_blank" href="https://www.gotouniversity.com/university/the-university-of-hong-kong/ib-requirement" class="averageChance">(3.5 / 1350)</a>
                </div>
            </div>
            <div style="position:absolute; bottom:3px; width:100%; text-align:center">
                <a style="text-decoration:none; color:var(--main-text-color)" target="_blank" href="https://apps.apple.com/us/app/gpa-calculator-by-michel/id1540111715">Check Out Michel's IOS Version</a>
            </div>
        </div>
    </div>
    
    </main>
</template>

<style scoped>

.calculatorArea {
    float:left;
    width: calc(100% - 450px);
}
.predictionArea {
    position:relative;
    float:right;
    margin-right:-25px;
    background-color: var(--main-panel-color);
    height: 700px;
    width: 425px;
    border-radius: 10px;
}
.subjectArea {
    width: 100%;
    float: left;
    min-height: 50px;
    margin-bottom: 50px;
    background: var(--main-panel-color);
    border-radius: 10px;
}

.topButton {
    cursor: pointer;
    border-radius: 6px;
    float: left;
    background-color: var(--secondary-panel-color);
    margin-top: 3px;
    margin-bottom: 2px;
    margin-left: 15px;
    margin-right: 10px;
    min-width: 45px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    font-size:17px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border: solid var(--main-text-color) 1px;
}

.topButton:hover {
    background-color: var(--main-text-color);
    color: white;
}
.subjectLevel {

    float:left;
    width: calc(100% - 20px);
    padding-top: 20px;
    padding-left: 20px;
    min-height: 20px;
    padding-bottom: 15px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom: solid var(--main-text-color) 1px;
}
.subjectChooseGpa {
    display: table-row;
    height: 135px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.subjectChooseGpa div {
    cursor:pointer;
    border-radius: 10px;
    float: left;
    background-color: var(--secondary-panel-color);
    margin-top:10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 45px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom:10px;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border: solid var(--main-text-color) 1px;
}
.subjectChooseGpa div:hover {
    background-color: var(--main-text-color);
    color: white;
}

.subjectGpaArea {
    margin-left: 120px;
}

.title {
    float:left;
    font-size: 30px;
    font-family: Montserrat-Bold;
    margin-bottom:20px;
}

.categoryTitle {
    font-size: 25px;
    font-family: Montserrat-Bold;
    float: left;
    width: 120px;
    background:none;
    border:none;
    color:var(--main-text-color);
}

.collegeChance{
    margin-top:20px;
    margin-left:15px;
    font-size:20px;
}
.collegeChance div{
    margin-top:10px;
}

.collegeChance a{
    text-decoration:none;
    color:var(--main-text-color);
}
.categoryTitle::placeholder {
    color: var(--main-text-color);
}
.gpaArea input::placeholder {
    color: var(--main-text-color);
}
.satArea input::placeholder {
    color: var(--main-text-color);
}
.subjectGpaArea div {
    border-radius: 10px;
    float: left;
    background-color: var(--secondary-panel-color);
    margin-top: 2px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;
    width: 65px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border: solid var(--main-text-color) 1px;
}


.subjectGpaArea div:hover {
    background-color: var(--main-text-color);
    color: white;
    cursor: pointer;
}

.subjectGpaSelected {
    background-color: var(--main-searchbar-color) !important;
    color: var(--searchbar-text-color);
    cursor: pointer;
}

.removeSubjectButton {
    text-align: center;
    margin-bottom:5px;
    cursor: pointer;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.removeSubjectButton:hover{
    color:darkred;
}

.addSubjectButton {
    float: left;
    margin-left: calc((100% - 50px)/2);
    width: 50px;
    height: 30px;
    border-radius: 20px;
    background-color: var(--main-panel-color);
    margin-bottom: 20px;
    text-align: center;
    padding-top: 15px;
    cursor: pointer;
}

.addSubjectButton:hover{
    box-shadow: 0px 0px 5px 0px var(--main-text-color);
}

.addChoices {
    float: left;
    margin-left: calc((100% - 200px)/2);
    width: 200px;
    height: 200px;
    border-radius: 10px;
    background-color: var(--main-panel-color);
    margin-bottom: 20px;
    text-align: center;
    padding-top: 15px;
    cursor: pointer;
}


/*PREDICTION AREA*/
.gpaArea {
    text-align: center;
    margin-top: 20px;
    font-size: 40px;
    font-family: Montserrat-Bold;
}
.gpaArea input {
    font-size: 40px;
    font-family: Montserrat-Bold;
    border: none;
    background: none;
    width: 100px;
    color: var(--main-text-color);
}
.satArea {
    margin-top: 20px;
    font-size: 20px;
    font-family: Montserrat-Bold;
}
.satArea input {
    font-size: 20px;
    border-radius:5px;
    border:solid 1px;
    background: none;
    width: 150px;
    color: var(--main-text-color);
}
.averageChance {
    float: right;
    margin-right: 15px;
}
.subTitle {
    font-family: Montserrat-Bold;
}
@media only screen and (max-width: 1500px) {
    .predictionArea {
        width: 325px;
        height: 790px;
    }
    .calculatorArea {
        width: calc(100% - 325px);
    }
}
@media only screen and (max-width: 1100px) {
    .predictionArea {
        margin-right:0px;
        width: 100%;
        margin-top: 20px;
    }

    .calculatorArea {
        width: 100%;
    }
}
</style>