<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
}

ul {
  list-style: none;
}

::-webkit-scrollbar-thumb {
  background-color: hsla(223, 3%, 50%, 0.4);
}
::-webkit-scrollbar-thumb:active {
  background-color: hsla(223, 3%, 50%, 0.6);
}
::-webkit-scrollbar {
  border: none;
  width: 6px;
  height: 6px;
}
</style>
