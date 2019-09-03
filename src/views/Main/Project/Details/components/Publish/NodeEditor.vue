<template>
  <div class="node-editor">
    <template v-for="(node,index) of nodeList">
      <div class="node-wrapper"
        :key="'node'+index">
        <el-tooltip effect="dark"
          placement="top"
          :content="node.name+':'+node.code">
          <span class="node">{{node.name}}</span>
        </el-tooltip>
      </div>
      <div :key="'line'+index"
        class="line"></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NodeEditor',

  props: {
    nodeList: { type: Array, default: () => [] }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';

.node-wrapper {
  text-align: center;
}

.node {
  display: inline-block;
  width: 100px;
  padding: 5px;
  overflow-x: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid $--color-primary;
}
.line {
  width: 10px;
  height: 30px;
  margin: 0 auto;
  background-color: $--color-primary;
}
</style>
