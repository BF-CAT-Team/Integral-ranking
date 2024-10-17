<template>
    <div class="Lan">
      <div class="lantern left-lantern">
        <!-- 顶部绳索 -->
        <div class="lantern-rope lantern-top-rope "></div>
        <!-- 提手 -->
        <div class="lantern-handle lantern-top-handle"></div>
        <!-- 中间部分 -->
        <div class="lantern-center">新年</div>
        <!-- 下提手 -->
        <div class="lantern-handle lantern-bottom-handle"></div>
        <!-- 绳 -->
        <div class="lantern-bottom">
          <div class="lantern-rope lantern-bottom-rope"></div>
          <!-- 灯穗 -->
          <div class="lantern-panicle"></div>
        </div>
      </div>
      <div class="lantern right-lantern">
        <!-- 顶部绳索 -->
        <div class="lantern-rope lantern-top-rope "></div>
        <!-- 提手 -->
        <div class="lantern-handle lantern-top-handle"></div>
        <!-- 中间部分 -->
        <div class="lantern-center">快乐</div>
        <!-- 下提手 -->
        <div class="lantern-handle lantern-bottom-handle"></div>
        <!-- 绳 -->
        <div class="lantern-bottom">
          <div class="lantern-rope lantern-bottom-rope"></div>
          <!-- 灯穗 -->
          <div class="lantern-panicle"></div>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.Lan {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
}

.Lan,
:root {
  --lantern-yellow: #ecaa2f;
}

.lantern {
  width: 150px;
  animation: lantern 2.5s infinite ease-in-out alternate;
  transform-origin: center -100px;
}

.lantern-rope {
  width: 4px;
  background-color: var(--lantern-yellow);
  margin: 0 auto;
}

.lantern-top-rope {
  height: 40px;
}

.lantern-bottom-rope {
  height: 20px;
}

.lantern-handle {
  width: 40%;
  height: 8px;
  background-color: var(--lantern-yellow);
  position: relative;
  z-index: 1;
}

.lantern-top-handle {
  border-radius: 5px 5px 0 0;
  margin: 0 auto -2px auto;
}

.lantern-bottom-handle {
  border-radius: 0 0 5px 5px;
  margin: -2px auto 0 auto;
}

.lantern-center {
  width: 100%;
  height: 100px;
  background-color: red;
  border-radius: 50px;
  position: relative;
  font-size: 28px;
  color: var(--lantern-yellow);
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-lr;
  font-weight: 700;
  box-shadow: 0 0 40px -10px red;
}

.lantern-center::before,
.lantern-center::after {
  top: 0;
  content: '';
  position: absolute;
  display: block;
  width: 75%;
  height: 100%;
  border: solid 2px var(--lantern-yellow);
  border-radius: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.lantern-center::before {
  width: 75%;
}

.lantern-center::after {
  width: 35%;
}

.lantern-panicle {
  width: 12px;
  height: 50px;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f00, #e36d00 3px, #fbd342 5px, #e36d00 8px, #e36d00 12px, #f00 16px, rgba(255, 0, 0, .8)26px, rgba(255, 0, 0, .6));
}

@keyframes lantern {
  from {
    transform: rotate(-10deg);
  }
  to {
    transform: rotate(10deg);
  }
}

.left-lantern {
  position: absolute;
  top: 0px;
  left: 55px;
}

.right-lantern {
  position: absolute;
  top: 0px;
  right: 55px;
}

</style>
