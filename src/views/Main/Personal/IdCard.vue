<template>
  <base-card>
    <div class="id-card">
      <div class="id-card__top">
        <div class="id-card__avatar"
          @click="$emit('avatarClick')"></div>
        <div class="id-card__info">
          <div class="id-card__nickname">{{ user.nickname || '无名氏'}}</div>
          <div>用户名：{{ user.username }}</div>
          <div>邮箱：{{ user.email }}</div>
        </div>
      </div>
      <div class="id-card__bottom">
        <div>创建时间：{{ user.createDateTime }}</div>
        <div>修改时间：{{ user.updateDateTime }}</div>
        <div>最近登陆：{{ user.lastLoginDateTime }}</div>
      </div>
      <div class="id-card__role">{{ user.roleName || '无身份'}}</div>
      <i class="el-icon-edit id-card__edit"
        @click="isEdit = !isEdit"></i>
      <el-collapse-transition>
        <ul v-show="isEdit"
          class="id-card__edit-menu">
          <li @click="onEditMenuItemClick('info')">修改信息</li>
          <li @click="onEditMenuItemClick('password')">修改密码</li>
        </ul>
      </el-collapse-transition>
    </div>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard'
export default {
  name: 'IdCard',

  components: {
    BaseCard
  },

  props: { user: { type: Object, default: () => [{}] } },

  data() {
    return {
      isEdit: false
    }
  },

  methods: {
    onEditMenuItemClick(mode) {
      this.$emit('editClick', mode)
      this.isEdit = false
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.id-card {
  position: relative;
  height: 100%;
  padding: 36px;

  &__top {
    display: flex;
    margin-bottom: 28px;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 96px - 28px);
    font-size: 14px;
    line-height: 14px;
  }

  &__avatar {
    position: relative;
    flex-shrink: 0;
    width: 96px;
    height: 96px;
    margin-right: 24px;
    border: 1px solid rgba($color: #999, $alpha: 0.1);
    &:hover {
      &::after {
        content: '修改头像';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #999, $alpha: 0.2);
        text-align: center;
        line-height: 96px;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__nickname {
    font-size: 24px;
    line-height: 24px;
  }

  &__role {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 40px;
    line-height: 40px;
    color: rgba($color: #ffdd4e, $alpha: 0.9);
  }

  &__edit {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 28px;
    cursor: pointer;
    transition-duration: 0.4s;
    &:hover {
      color: #ffdd4e;
    }
  }
  &__edit-menu {
    position: absolute;
    top: 54px;
    right: 20px;
    display: flex;
    flex-direction: column;
    li {
      margin: 2px 0;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #ffdd4e;
      }
    }
  }
}
</style>
