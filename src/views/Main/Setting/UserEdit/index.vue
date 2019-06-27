<template>
  <div class="user-edit">
    <div class="action">
      <el-input class="action__search"
        v-model="keyword"
        placeholder="请输入筛选的关键词">
        <i slot="suffix"
          class="el-icon-search el-input__icon"
          @click="onSearchClick"></i>
      </el-input>
      <el-button class="action__button"
        type="primary"
        @click="onAddUserClick">新增</el-button>
    </div>
    <el-table border
      :data="userList">
      <el-table-column label="用户名"
        prop="username"></el-table-column>
      <el-table-column label="身份"
        prop="role"></el-table-column>
      <el-table-column label="昵称"
        prop="nickname"></el-table-column>
      <el-table-column label="邮箱"
        prop="email"></el-table-column>
      <el-table-column label="创建时间"
        prop="createDateTime"></el-table-column>
      <el-table-column label="最后登录时间"
        prop="lastLoginDateTime"></el-table-column>
    </el-table>
    <user-edit-dialog v-model="isDisplayUserEditDialog"
      :title="userEditDialogTitle"
      ref="userEditDialog"></user-edit-dialog>
  </div>
</template>

<script>
import UserEditDialog from './UserEditDialog'
export default {
  name: 'UserEdit',

  components: {
    UserEditDialog
  },

  computed: {
    userEditDialogTitle() {
      return (this.isAddUser ? '添加' : '修改') + '用户'
    }
  },

  data() {
    return {
      keyword: '',
      userList: [],
      page: { size: 20, index: 1, count: 0 },
      isDisplayUserEditDialog: false,
      isAddUser: false
    }
  },

  methods: {
    reFindUserList() {
      this.$callApi({
        method: 'get',
        api: 'users/list',
        param: { ...this.page, keyword: this.keyword }
      }).then(data => {
        this.userList = data
      })
    },

    onSearchClick() {
      this.reFindUserList()
    },

    onAddUserClick() {
      this.$refs.userEditDialog.clearUser()
      this.isAddUser = true
      this.isDisplayUserEditDialog = true
    }
  },

  mounted() {
    this.reFindUserList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.action {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &__search {
    width: 200px;
  }
  &__button {
    margin-left: 10px;
  }
  .el-icon-search {
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    &:hover {
      color: $--color-primary;
    }
  }
}
</style>
