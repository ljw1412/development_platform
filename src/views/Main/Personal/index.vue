<template>
  <scrollbar class="personal">
    <id-card :user="user"></id-card>
    <title-card title="头像修改"></title-card>
    <password-card></password-card>
  </scrollbar>
</template>

<script>
import IdCard from './IdCard'
import PasswordCard from './PasswordCard'
import TitleCard from './TitleCard'
import { mapActions } from 'vuex'
export default {
  name: 'Personal',

  components: { IdCard, PasswordCard, TitleCard },

  data() {
    return {
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
