<template>
  <div class="timeline">
    <el-timeline>
      <el-timeline-item v-for="item of timelineList"
        hide-timestamp
        :key="item.id">
        <div class="timeline__time-and-user">
          <span style="margin-right:10px;">{{item.time}}</span>
          <span>{{item.user.nickname || item.user.username}}</span>
        </div>
        <h3>{{item.title}}</h3>
        <p class="timeline__log">{{item.log}}</p>
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
          if (!item.user) item.user = {}
          item.time = moment(item.unix).format('YYYY-MM-DD HH:mm:ss')
        })
        this.timelineList = data
      })
    }
  },

  created() {
    this.reFindTimelineList()
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
  @include auto-center-view();
  padding: 20px 20px 0 20px;
  &__time-and-user {
    margin-bottom: 8px;
    padding-top: 4px;
    color: #909399;
    line-height: 1;
    font-size: 13px;
  }
  &__log {
    word-break: break-all;
  }
}
</style>
