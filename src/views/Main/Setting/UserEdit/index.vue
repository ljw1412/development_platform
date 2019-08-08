<template>
  <div class="user-edit">
    <div class="action">
      <el-input class="action__search"
        v-model="keyword"
        placeholder="请输入关键词(支持正则)">
        <i slot="suffix"
          class="el-icon-search el-input__icon"
          @click="onSearchClick"></i>
      </el-input>
      <el-button class="action__button"
        type="primary"
        @click="onAddUserClick">新增</el-button>
    </div>
    <el-table :data="userList">
      <el-table-column label="用户名"
        prop="username"></el-table-column>
      <el-table-column label="身份">
        <el-tag v-if="scope.row.roleName"
          slot-scope="scope"
          :type="scope.row.isSuperAdmin?'success':''">{{scope.row.roleName}}</el-tag>
      </el-table-column>
      <el-table-column label="昵称"
        prop="nickname"></el-table-column>
      <el-table-column label="邮箱"
        prop="email"></el-table-column>
      <el-table-column label="创建时间"
        prop="createDateTime"></el-table-column>
      <el-table-column label="最后登录时间"
        prop="lastLoginDateTime"></el-table-column>
      <el-table-column label="操作"
        width="100">
        <div slot-scope="scope"
          style="min-height: 32px;">
          <template v-if="!scope.row.isSuperAdmin">
            <el-button circle
              icon="el-icon-edit"
              @click="onEditClick(scope.row)"></el-button>
            <el-button circle
              type="danger"
              icon="el-icon-delete"
              @click="onDeleteClick(scope.row)"></el-button>
          </template>
        </div>
      </el-table-column>
    </el-table>
    <user-edit-dialog ref="userEditDialog"
      v-model="isDisplayUserEditDialog"
      :isAdd="isAddUser"
      :roleList="roleList"
      @change="onUserChange"></user-edit-dialog>
  </div>
</template>

<script>
import UserEditDialog from './UserEditDialog'
export default {
  name: 'UserEdit',

  components: {
    UserEditDialog
  },

  data() {
    return {
      keyword: '',
      userList: [],
      roleList: [],
      page: { size: 20, index: 1, count: 0 },
      isDisplayUserEditDialog: false,
      isAddUser: false
    }
  },

  methods: {
    reFindRoleList() {
      this.$callApi({
        api: 'users/roleslist'
      }).then(data => {
        this.roleList = data
      })
    },

    reFindUserList() {
      this.$callApi({
        api: 'users/list',
        param: { ...this.page, keyword: this.keyword }
      }).then(data => {
        this.userList = data
      })
    },

    reDelUser(id) {
      this.$callApi({ method: 'delete', api: `users/${id}` }).then(
        this.reFindUserList
      )
    },

    onSearchClick() {
      this.reFindUserList()
    },

    onAddUserClick() {
      this.$refs.userEditDialog.clearUser()
      this.isAddUser = true
      this.isDisplayUserEditDialog = true
    },

    onUserChange() {
      this.reFindUserList()
    },

    onEditClick(user) {
      this.isAddUser = false
      user.password = ''
      this.$refs.userEditDialog.initUser(user)
      this.isDisplayUserEditDialog = true
    },

    onDeleteClick(user) {
      this.$confirm(`确认删除用户"${user.username}"吗？`, '提示', {
        type: 'warning'
      })
        .then(() => {
          this.reDelUser(user.id)
        })
        .catch(() => {})
    }
  },

  mounted() {
    this.reFindUserList()
    this.reFindRoleList()
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
