<template>
  <div class="user-edit">
    <div class="action">
      <el-input class="action__search"
        v-model="keyword"
        size="small"
        placeholder="请输入筛选的关键词">
        <i slot="suffix"
          class="el-icon-search el-input__icon"></i>
      </el-input>
      <el-button class="action__button"
        size="small"
        type="primary">新增</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',

  data() {
    return {
      keyword: '',
      page: { size: 20, index: 1, count: 0 }
    }
  },

  methods: {
    reFindUserList() {
      this.$callApi({
        method: 'post',
        api: 'users/list',
        param: { ...this.page, keyword: this.keyword }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.action {
  display: flex;
  align-items: center;
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
