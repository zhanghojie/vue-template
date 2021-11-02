<template>
  <div class="container">
    <van-nav-bar title="工作计划" left-arrow @click-left="onClickLeft" />
    <div class="main">
      <div class="main-common">
        <p>序号</p>
        <p>工作安排好后的序号，有实际含义</p>
      </div>
      <div class="main-common">
        <p>进驻时间</p>
        <p>{{ list.startTime }}</p>
      </div>
      <div class="main-common">
        <p>完成时间</p>
        <p>{{ list.endTime }}</p>
      </div>
      <div class="main-wrap">
        <p>工作内容</p>
        <p>{{ list.contentDesc }}</p>
      </div>
      <div class="main-wrap">
        <p>负责人</p>
        <p>{{ list.userName }}</p>
      </div>
      <div class="main-common">
        <p>监察方式</p>
        <p>{{ list.contentTypeName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getWorkInfoAPI, getWorkListAPI} from '@/api/issue';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      list: {}
    };
  },
  computed: {
    ...mapState('app', ['zfid'])
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  },
  mounted() {
    getWorkListAPI({userId: '27326084554948660', zfid: this.zfid})
      .then(res => {
        let result = res?.result;
        let data = result[0];
        if (!data) return;
        const {id} = data;
        getWorkInfoAPI({id})
          .then(res => {
            let result = res?.result;
            this.list = result;
          })
          .catch(err => {});
      })
      .catch(err => {});
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/issue/workflow.scss';
</style>