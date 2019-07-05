<template>
  <el-card class="base-card"
    shadow="hover"
    :body-style="{padding:0, height:'100%'}">
    <div v-if="title"
      class="base-card__header">
      <i v-if="!noBack"
        class="card-header-icon el-icon-arrow-left"
        @click="$emit('back')"></i>
      <span>{{title}}</span>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'BaseCard',

  props: {
    title: String,
    noBack: Boolean
  }
}
</script>

<style lang="scss" scoped>
.base-card {
  position: relative;
  flex-shrink: 0;
  width: 500px;
  height: 300px;
  margin-bottom: 20px;
  border-radius: 20px;
  background: linear-gradient(120deg, #2c2c2c 0%, #505050 100%);
  color: #fff;
  &:hover {
    animation: flashlight 0.5s linear 0.1s 1;
  }
  &__header {
    padding: 20px;
    display: flex;
    align-items: center;
  }
}
.card-header-icon {
  cursor: pointer;
  font-size: 20px;
  margin-right: 10px;
  &:hover {
    color: #ffdd4e;
  }
}
@keyframes flashlight {
  0% {
    background: linear-gradient(120deg, #505050 0%, #2c2c2c 100%);
  }
  10% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 10%, #2c2c2c 100%);
  }
  20% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 20%, #2c2c2c 100%);
  }
  30% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 30%, #2c2c2c 100%);
  }
  40% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 40%, #2c2c2c 100%);
  }
  50% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 50%, #2c2c2c 100%);
  }
  60% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 60%, #2c2c2c 100%);
  }
  70% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 70%, #2c2c2c 100%);
  }
  80% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 80%, #2c2c2c 100%);
  }
  90% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 90%, #2c2c2c 100%);
  }
  100% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 100%);
  }
}
</style>
