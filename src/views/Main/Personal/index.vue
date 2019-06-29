<template>
  <scrollbar class="personal">
    <title-card title="账号信息">
      <div class="personal__info">
        <span class="personal__info-item"
          v-for="item of baseInfo"
          :key="item.prop">{{item.label}}{{user[item.prop]}}</span>
      </div>
    </title-card>
    <title-card title="头像修改"></title-card>
    <title-card title="密码修改"></title-card>
  </scrollbar>
</template>

<script>
import TitleCard from './TitleCard'
import { mapActions } from 'vuex'
export default {
  name: 'Personal',

  components: {
    TitleCard
  },

  data() {
    return {
      baseInfo: [
        { prop: 'username', label: '用户名：' },
        { prop: 'nickname', label: '昵称：' },
        { prop: 'email', label: '邮箱：' },
        { prop: 'createDateTime', label: '创建日期：' },
        { prop: 'updateDateTime', label: '修改日期：' },
        { prop: 'lastLoginDateTime', label: '最近登陆：' }
      ],
      user: { createDateTime: '', updateDateTime: '', lastLoginDateTime: '' }
    }
  },

  methods: {
    ...mapActions('layout', ['updateTitle']),

    reFindUserInfo() {
      this.$callApi({ api: 'users/user_info' }).then(data => {
        Object.assign(this.user, data)
      })
    }
  },

  created() {
    this.updateTitle('个人中心')
    this.reFindUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.personal {
  /deep/ .title-card {
    margin-bottom: 20px;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 14px;
    color: #666666;
    max-width: 800px;
  }
  &__info-item {
    padding: 5px 0;
    width: 250px;
  }
}
</style>
