<template>
  <div class="server-info">
    <div>{{ hostname }}</div>
    <div>{{ os }}</div>
  </div>
</template>

<script>
export default {
  name: 'ServerInfo',

  props: {
    hostname: String,
    os: String
  }
}
</script>

<style lang="scss" scoped>
</style>