<template>
  <div class="timeline">
    <el-timeline>
      <el-timeline-item v-for="item of timelineList"
        :key="item.id"
        :timestamp="item.time">
        <h3>{{item.title}}</h3>
        <p>{{item.log}}</p>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'ProjectTimeline',

  props: {
    project: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      timelineList: []
    }
  },

  methods: {
    reFindTimelineList() {
      this.$callApi({
        api: 'project/timeline',
        param: { id: this.project.id }
      }).then(data => {
        data.forEach(item => {
          item.time = moment(item.unix).format('YYYY-MM-DD HH:mm:ss')
        })
        this.timelineList = data
      })
    }
  },

  watch: {
    'project.id'() {
      this.reFindTimelineList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.timeline {
  @include auto-center-view(1000px);
  padding: 20px 15px 0 15px;
}
</style>
