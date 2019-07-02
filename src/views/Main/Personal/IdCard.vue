<template>
  <el-card class="id-card-wrapper"
    shadow="hover"
    :body-style="{padding:0, height:'100%'}">
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
        @click="$emit('editClick')"></i>
    </div>
  </el-card>
</template>

<script>
export default {
  props: { user: { type: Object, default: () => [{}] } }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.id-card-wrapper {
  width: 500px;
  height: 300px;
  margin-bottom: 20px;
  border-radius: 20px;
  background: linear-gradient(120deg, #2c2c2c 0%, #505050 100%);
  color: rgba($color: #fff, $alpha: 0.8);
  &:hover {
    animation: flashlight 0.5s linear 0.1s 1;
  }
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
}

@keyframes flashlight {
  0% {
    background: linear-gradient(120deg, #505050 0%, #2c2c2c 100%);
  }
  10% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 10%, #2c2c2c 100%);
  }
  20% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 20%, #2c2c2c 100%);
  }
  30% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 30%, #2c2c2c 100%);
  }
  40% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 40%, #2c2c2c 100%);
  }
  50% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 50%, #2c2c2c 100%);
  }
  60% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 60%, #2c2c2c 100%);
  }
  70% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 70%, #2c2c2c 100%);
  }
  80% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 80%, #2c2c2c 100%);
  }
  90% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 90%, #2c2c2c 100%);
  }
  100% {
    background: linear-gradient(120deg, #2c2c2c 0%, #505050 100%);
  }
}
</style>
