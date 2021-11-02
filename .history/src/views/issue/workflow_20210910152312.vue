<template>
  <div class="container">
    <van-nav-bar title="工作计划" left-arrow @click-left="onClickLeft" />
    <div class="main" v-if="isShow">
      <div class="main-common">
        <p>序号</p>
        <p>{{ list.id }}</p>
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
    <template v-if="list.length">
      <van-collapse v-model="activeName" accordion v-for="(i, index) of list" :key="index + 'collapse'">
        <van-collapse-item :title="'序号' + i.id" :name="index">
          <div class="main">
            <!-- <div class="main-common">
              <p>序号</p>
              <p>{{ i.id }}</p>
            </div> -->
            <div class="main-common">
              <p>进驻时间</p>
              <p>{{ i.startTime }}</p>
            </div>
            <div class="main-common">
              <p>完成时间</p>
              <p>{{ i.endTime }}</p>
            </div>
            <div class="main-wrap">
              <p>工作内容</p>
              <p>{{ i.contentDesc }}</p>
            </div>
            <div class="main-wrap">
              <p>负责人</p>
              <p>{{ i.userName }}</p>
            </div>
            <div class="main-common">
              <p>监察方式</p>
              <p>{{ i.contentTypeName }}</p>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </template>
  </div>
</template>

<script>
import {getWorkListAPI} from '@/api/issue';
import {mapState} from 'vuex';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      list: [],
      isShow: false,
      activeName: '0'
    };
  },
  computed: {
    ...mapState('app', ['zfid', 'userId'])
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  },
  mounted() {
    getWorkListAPI({userId: this.userId, zfid: this.zfid})
      .then(res => {
        let result = res?.result;
        if (result.length) {
          result.forEach(item => {
            if (item.startTime && item.startTime !== null) {
              item.startTime = dayjs(item.startTime).format('YYYY-MM-DD hh:mm');
            }
            if (item.endTime && item.endTime !== null) {
              item.endTime = dayjs(item.endTime).format('YYYY-MM-DD hh:mm');
            }
          });
          Object.freeze(result);
          this.list = result;
        } else {
          this.$toast('当前没有计划');
        }
      })
      .catch(err => {});
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/issue/workflow.scss';
</style>