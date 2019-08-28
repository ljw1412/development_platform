<template>
  <div class="advanced">
    <el-collapse accordion
      @change="onCollapseChange">
      <el-collapse-item name="1">
        <div class="advanced__collapse-title"
          slot="title">重命名项目 / Rename project</div>
        <el-form ref="renameForm"
          class="rename-form"
          :model="renameForm">
          <el-form-item label="项目名称"
            prop="name"
            :rules="{required: true,trigger: 'blur',message: '请输入新项目名称'}">
            <el-input v-model="renameForm.name"
              placeholder="请输入新的项目名称"
              maxlength="30"
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <ul style="list-style: disc;padding-inline-start: 40px;">
              <li>修改项目名称不会修改项目最终路径</li>
            </ul>
          </el-form-item>
          <el-button type="warning"
            @click="onRenameClick">修改</el-button>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <div class="advanced__collapse-title"
          slot="title">删除项目 / Remove project</div>
        <div class="delete-project">
          <div style="margin-bottom:18px;">删除项目将会……(现在还没想好)</div>
          <el-button type="danger"
            @click="isDisplayDeleteDialog = true">删除</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 警告弹窗 -->
    <el-dialog title="警告"
      class="delete-dialog"
      :visible.sync="isDisplayDeleteDialog"
      @open="onDeleteDialogOpen">
      <p class="text-danger">将要删除 {{project.name}}。删除后将无法恢复！确定执行此操作？</p>
      <p>此操作可能导致数据丢失。为了防止意外行为，我们要求您确认您的意图。<br />请输入 <span class="code">{{project.name}}</span> 以继续，或关闭弹窗来取消。</p>
      <el-input v-model="deleteForm.name"></el-input>
      <el-button type="danger"
        slot="footer"
        :disabled="isDisabledDelete"
        @click="reDelProject">删除</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProjectAdvanced',

  props: {
    project: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      renameForm: { name: '' },
      deleteForm: { name: '' },
      isDisplayDeleteDialog: false
    }
  },

  computed: {
    isDisabledDelete() {
      return this.deleteForm.name !== this.project.name
    }
  },

  methods: {
    reSaveNewName() {
      this.$callApi({
        method: 'post',
        api: 'project/save',
        param: { id: this.project.id, name: this.renameForm.name }
      }).then(data => {
        this.$notify.success({
          title: '消息',
          message: '修改成功'
        })
        this.$emit('nameChange')
      })
    },

    reDelProject() {
      this.$callApi({
        method: 'post',
        api: 'project/delete',
        param: { id: this.project.id }
      }).then(data => {
        this.$notify.success({
          title: '消息',
          dangerouslyUseHTMLString: true,
          message:
            `${this.project.name} 删除成功。<br/>` +
            (this.project.path ? '请手动连接服务器删除项目文件夹' : '')
        })
        this.$router.push({ name: 'project' })
      })
    },

    onDeleteDialogOpen() {
      this.deleteForm.name = ''
    },

    onCollapseChange() {
      this.$refs.renameForm.clearValidate()
    },

    onRenameClick() {
      this.$refs.renameForm
        .validate()
        .then(this.reSaveNewName)
        .catch(() => {})
    }
  },

  created() {
    this.renameForm.name = this.project.name
  },

  watch: {
    project(val) {
      if (val.name) {
        this.renameForm.name = this.project.name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.advanced {
  padding: 0 10px;
  @include auto-center-view(800px);
  &__collapse-title {
    font-size: 16px;
    font-weight: 600;
  }
}
.rename-form,
.delete-project {
  padding: 0 10px;
}

.delete-dialog p {
  margin-bottom: 20px;
}
.text-danger {
  color: $--color-danger;
  font-weight: 700;
}
.code {
  padding: 2px 4px;
  color: #c0341d;
  background-color: #fbe5e1;
  border-radius: 3px;
  word-break: break-word;
}
</style>
