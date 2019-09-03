<template>
  <el-drawer size="90%"
    direction="btt"
    :visible.sync="mVisible">
    <div slot="title">编辑发布流程 - {{flow.name}}</div>
    <base-list-layout class="pubish-edit">
      <div slot="action"
        class="pubish-edit__action">
        <el-tooltip v-for="item of actionList"
          effect="dark"
          placement="top"
          :content="item.name"
          :key="item.type">
          <el-link :icon="item.icon"
            :underline="false"
            @click="onActionClick(item.type)"></el-link>
        </el-tooltip>
      </div>
      <div class="pubish-edit__body">
        <node-editor :node-list="nodeList"></node-editor>
      </div>
      <div slot="footer"
        style="text-align:right;">
        <el-button type="primary">保存</el-button>
      </div>
    </base-list-layout>
    <!-- 添加节点弹窗 -->
    <el-dialog append-to-body
      title="添加节点"
      width="500px"
      :visible.sync="isDisplayAddNodeDialog"
      @close="onAddNodeClose">
      <el-form ref="nodeForm"
        :model="node">
        <el-form-item label="节点名称"
          prop="name"
          :rules="[
            { required: true, max:16, message: '节点名称不能为空，最多16个字符'}
          ]">
          <el-input v-model="node.name"
            placeholder="请输入节点名称(最多16个字符)"></el-input>
        </el-form-item>
        <el-form-item label="节点指令"
          prop="code"
          :rules="{ required: true, message: '节点指令不能为空'}">
          <el-input v-model="node.code"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <el-button slot="footer"
        type="primary"
        @click="addNode">添加</el-button>
    </el-dialog>
  </el-drawer>
</template>

<script>
import FlowNode from './FlowNode.js'
import NodeEditor from './NodeEditor'
export default {
  name: 'ProjectPublishEdit',

  components: {
    NodeEditor
  },

  props: {
    visible: { type: Boolean, default: false },
    flow: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      mVisible: false,
      isDisplayAddNodeDialog: false,
      node: { name: '', code: '' },
      nodeList: [],
      actionList: [
        {
          name: '添加节点',
          type: 'addNode',
          icon: 'el-icon-document-add'
        },
        {
          name: '添加分歧',
          type: 'addSelect',
          icon: 'el-icon-folder-add'
        }
      ]
    }
  },

  methods: {
    addNode() {
      this.$refs.nodeForm
        .validate()
        .then(() => {
          this.nodeList.push(new FlowNode(this.node))
          this.isDisplayAddNodeDialog = false
        })
        .catch(() => {})
    },

    addSelect() {},

    onActionClick(type) {
      this.isDisplayAddNodeDialog = type === 'addNode'
    },

    onAddNodeClose() {
      this.$refs.nodeForm.resetFields()
    }
  },

  watch: {
    visible(val) {
      this.mVisible = val
    },

    mVisible(val) {
      this.$emit('update:visible', val)
    },

    flow(flow) {}
  }
}
</script>

<style lang="scss" scoped>
.pubish-edit {
  position: relative;
  height: 100%;
  padding: 0 10px 10px 10px;

  &__action {
    margin-bottom: 10px;
    a {
      font-size: 20px;
    }
    a + a {
      margin-left: 10px;
    }
  }

  /deep/ .main {
    height: 0;
  }

  &__body {
    overflow: auto;
    height: 100%;
  }
}
</style>
