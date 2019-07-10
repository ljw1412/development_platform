<template>
  <scrollbar>
    <div class="personal">
      <transition name="el-zoom-in-center">
        <id-card v-show="isDisplayIdCard"
          class="personal__card"
          :user="user"
          @editClick="onEditClick"></id-card>
      </transition>
      <transition name="el-zoom-in-center">
        <info-card v-show="isDisplayInfoCard"
          class="personal__card"
          :user="user"
          @back="onCardBack"
          @change="onInfoChange"></info-card>
      </transition>
      <transition name="el-zoom-in-center">
        <password-card v-show="isDisplayPasswordCard"
          id="password-card"
          class="personal__card"
          @back="onCardBack"></password-card>
      </transition>
      <transition name="el-zoom-in-center">
        <avatar-card v-show="isDisplayAvatarCard"
          class="personal__card"
          @back="onCardBack"></avatar-card>
      </transition>
    </div>
  </scrollbar>
</template>

<script>
import IdCard from './components/IdCard'
import PasswordCard from './components/PasswordCard'
import InfoCard from './components/InfoCard'
import AvatarCard from './components/AvatarCard'
import { mapActions } from 'vuex'
export default {
  name: 'Personal',

  components: { IdCard, InfoCard, PasswordCard, AvatarCard },

  computed: {
    isDisplayPasswordCard() {
      return this.mode === 'password'
    },

    isDisplayInfoCard() {
      return this.mode === 'info'
    },

    isDisplayAvatarCard() {
      return this.mode === 'avatar'
    },

    isDisplayIdCard() {
      return !this.mode
    }
  },

  data() {
    return {
      user: {},
      mode: ''
    }
  },

  methods: {
    ...mapActions('layout', ['updateTitle']),

    reFindUserInfo() {
      this.$callApi({ api: 'users/user_info' }).then(data => {
        this.user = data
      })
    },

    onEditClick(mode) {
      this.mode = mode
    },

    onInfoChange() {
      this.reFindUserInfo()
    },

    onCardBack() {
      this.mode = ''
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
  position: relative;
  &__card {
    position: absolute;
    top: 0;
    left: 0;
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
.el-zoom-in-center-enter-active {
  transition-delay: 0.3s;
}
</style>
