<script setup>

</script>

<template>
    <main>
        <div class="mainContent">
            <div class="gameTitle">QUANTUM HUNTER GAME</div>
            <iframe src="/webbuild/index.html" width="100%" height="600" title="quantum hunter chemistry game"></iframe>
            
            <div class="instructionArea">
                <div class="instructions">Instructions:</div>
                <div  class="instructions">Info</div>
                <div  class="instructions">This game aims to teach students about the quantum numbers and shapes of different orbitals. The orbitals are generated with schrodinger's equation and all the artwork is AI generated.</div>
                <div  class="instructions">.</div>
                <div  class="instructions">Multiplayer</div>
                <div  class="instructions">1. The teacher can create a room</div>
                <div  class="instructions">2. After all the students join, start the game!</div>
                <div  class="instructions">3. The LIVE LEADERBOARD will track the students progress</div>
                <div  class="instructions">4. After 2 minutes, the game will finish and the top students are shown</div>
                <div  class="instructions">.</div>
                <div  class="instructions">Practice Mode</div>
                <div  class="instructions">1. Join the practice room to learn the quantum numbers of each orbital</div>
                <div  class="instructions">2. press space to see the next orbital</div>
            </div>
            
        </div>
    </main>
</template>

<style scoped>
iframe:focus {
  outline: none;
}

iframe[seamless] {
  display: block;
}

.instructionArea{
    width:100%;
    margin-top: 20px;
    background-color:var(--main-panel-color);
    border-radius: 10px;
    padding: 10px;
}
.gameTitle{
    font-size: 40px;
    font-family: Montserrat-Bold;
    text-align: center;
}

.instructions{
    font-family: Montserrat-semiBOld;
    font-size: 20px;
}
.mainContent {
    position:relative;
    margin-top: 100px;
    width: 1400px;
    margin-left: calc((100% - 1400px)/2);
    margin-bottom:50px;
    min-height: 100vh;
}

</style>