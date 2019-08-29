<template>
  <div v-loading="!isLoaded"
    class="publish">
    <template v-if="publishList.length">
      <div class="publish__action">
        <div>发布流程总数: {{publishList.length}}</div>
        <div class="publish__icons">
          <el-link class="el-icon-plus"
            :underline="false"
            @click="onCreateClick" />
          <el-link :class="isEdit?'el-icon-close':'el-icon-setting'"
            :underline="false"
            @click="isEdit = !isEdit" />
        </div>
      </div>
      <div class="publish__flows">
        <div v-for="item of publishList"
          :key="item.id"
          class="flow-wrapper"
          :class="{ 'flow-wrapper--edit': isEdit }">
          <div class="flow"
            :class="{ 'is-not-node': !item.nodeCount }"
            @click="onFlowCardClick(item)">
            <div>{{item.name}}</div>
            <div class="flow__options"
              @click.stop>
              <el-link class="el-icon-edit"
                :underline="false"
                @click="onEditFlowClick(item)" />
              <el-link class="el-icon-delete"
                type="danger"
                :underline="false"
                @click="onDeleteFlowClick(item)" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 没有任何流程的结果页 -->
    <result v-else-if="isLoaded"
      title="您还未创建任何发布流程"
      icon="el-icon-truck"
      icon-color="#606266">
      <template #subTitle>
        <el-link type="primary"
          @click="onCreateClick">
          <span>立刻创建</span>
          <i class="el-icon-right"></i>
        </el-link>
      </template>
    </result>
    <!-- 发布记录 -->
    <el-table border
      style="margin-top:10px;">
      <el-table-column label="发布名称"></el-table-column>
      <el-table-column label="信息"></el-table-column>
      <el-table-column label="状态"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <!-- 编辑抽屉 -->
    <edit :visible.sync="isDisplayEdit"
      :flow="currentFlow"></edit>
  </div>
</template>

<script>
import Edit from './Edit'
export default {
  name: 'ProjectPublish',

  components: {
    Edit
  },

  props: {
    project: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      isLoaded: false,
      isEdit: false,
      isDisplayEdit: false,
      publishList: [],
      currentFlow: {}
    }
  },

  methods: {
    reFindPublishList() {
      this.isLoaded = false
      this.$callApi({
        api: 'project/flow/list',
        param: { projectId: this.project.id }
      }).then(data => {
        this.isLoaded = true
        this.publishList = data
      })
    },

    reSaveFlow(name) {
      this.$callApi({
        method: 'post',
        api: 'project/flow/create',
        param: { projectId: this.project.id, name }
      }).then(this.reFindPublishList)
    },

    onCreateClick() {
      this.$prompt('请输入发布流程的名称', '创建发布流程', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: '请输入流程的名称'
      })
        .then(({ value }) => {
          this.reSaveFlow(value)
        })
        .catch(() => {})
    },

    onFlowCardClick(item) {
      if (!item.nodeCount) {
        this.$confirm('该流程没有配置流程节点', '提示', {
          confirmButtonText: '立刻配置',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.onEditFlowClick(item)
          })
          .catch(() => {})
      }
    },

    onEditFlowClick(item) {
      console.log(item)
      this.currentFlow = item
      this.isDisplayEdit = true
    },

    onDeleteFlowClick(item) {
      this.$confirm(`确定要删除发布流程"${item.name}"吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    }
  },

  mounted() {
    this.reFindPublishList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.publish {
  padding: 0 20px;
  min-height: 200px;
  @include auto-center-view();
  &__action {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    @include divider;
  }
  &__icons {
    * {
      font-size: 18px;
      margin: 0 5px;
    }
  }
  &__flows {
    display: flex;
    flex-wrap: wrap;
  }
}

.flow-wrapper {
  box-sizing: border-box;
  width: 25%;
  min-width: 150px;
  padding: 5px;
  text-align: center;
  &--edit {
    .flow {
      cursor: initial;
    }
    &:hover .flow__options {
      display: block;
    }
  }
}

.flow {
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  position: relative;
  height: 50px;
  line-height: 50px;
  border: 1px solid $--border-color-base;
  border-radius: 4px;
  &:not(.is-not-node):hover {
    transition-duration: 0.5s;
    background-color: $--border-color-extra-light;
  }
  &__options {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    a {
      font-size: 20px;
      margin: 0 5px;
      color: #fff;
    }
  }
}

.is-not-node {
  background-color: #fff;
  border-color: #ebeef5;
  border-style: dashed;
  color: #c0c4cc;
}
</style>
