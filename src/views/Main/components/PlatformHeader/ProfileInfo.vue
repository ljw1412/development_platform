<template>
  <el-dropdown size="medium"
    :show-timeout="100"
    @command="onCommand">
    <div class="profile-info">
      <el-avatar class="profile-info__avatar"
        :size="32"></el-avatar>
      <div class="profile-info__username">{{username}}</div>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item icon="el-icon-user-solid"
        command="personal">个人中心</el-dropdown-item>
      <el-dropdown-item divided
        icon="el-icon-error"
        command="logout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProfileInfo',

  computed: {
    ...mapState(['user']),

    username() {
      return this.user.nickname || this.user.username
    }
  },

  methods: {
    onCommand(command) {
      switch (command) {
        case 'personal':
          this.$router.push({ name: 'personal' })
          break
        case 'logout':
          Store.clearAll()
          this.$router.replace({ name: 'login' })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-info {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: #ffffff;
  padding: 5px 10px;
  &:hover {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  &__avatar {
    margin-right: 10px;
  }
  &__username {
    font-size: 16px;
    line-height: 16px;
  }
}
</style>
