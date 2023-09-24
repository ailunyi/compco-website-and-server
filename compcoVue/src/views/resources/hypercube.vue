<script setup>
    import { onUnmounted, onMounted } from 'vue'
</script>

<template>
    <main>
        <div id="canvas-container"> </div>
        <div class="slider-container">
            <div class="slider-group">
                <span>Speed</span>
                <input type="range" class="range" min="0" max="10" value="1" step="0.1" id="velocitySlider">
            </div>
            <div class="slider-group">
                <span>Hue</span>
                <input type="range" class="range" min="0" max="360" value="0" step="1" id="hueSlider">
            </div>
            <div class="slider-group">
                <span>Saturation</span>
                <input type="range" class="range" min="0" max="100" value="0" step="1" id="saturationSlider">
            </div>
            <div class="slider-group">
                <span>Brightness</span>
                <input type="range" class="range" min="0" max="100" value="0" step="1" id="brightnessSlider">
            </div>
        </div>
    </main>
</template>



<style scoped>
.main {
    margin: 0;
    padding: 0;
}

span {
    position: relative;
    bottom: 2px;
    padding-right: 5px;
    text-align: center;
    font-family:'Times New Roman', Times, serif;
    font-weight: bold;
    font-size: large;
    color: #000;
}

#canvas-container {
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle, #d7dde8, #757f9a);
}

.slider-container {
    margin: 0px;
    padding: 0px 30px 0px 0px;
    width: 300px;
    height: 200px;
    position: absolute;
    top: 10%;
    right: 5%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: end;
    gap: 15px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.slider-container:hover {
    background: rgba(255, 255, 255, 0.5);
}

input[type="range"] {
    width: 150px;
    height: 20px;
    appearance: none;
    background: #ddd;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb{
    width: 20px;
    height: 20px;
    appearance: none;
    background: #fff;
    border: 2px solid #000;
    border-radius: 10px;
    box-shadow: -160px 0 0 150px #757f9a;
}
</style>

<script>
export default {
  mounted() {
    this.includeExternalJS();
  },
  methods: {
    includeExternalJS() {
      const p5 = document.createElement("script");
      p5.src = "./p5.js";
      document.body.appendChild(script1);

      const sketch = document.createElement("script");
      sketch.src = "./sketch.js";
      document.body.appendChild(script2);

      const cube = document.createElement("script");
      cube.src = "./hypercube.js";
      document.body.appendChild(script2);
    },
  },
};
</script>


