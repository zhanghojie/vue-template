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
        <van-collapse-item :title="'序号' + i.id" name="1">内容</van-collapse-item>
      </van-collapse>
    </template>
  </div>
</template>

<script>
import {getWorkInfoAPI, getWorkListAPI} from '@/api/issue';
import {mapState} from 'vuex';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      list: [],
      isShow: false,
      activeName: '1'
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
        this.list = result;
        /* let data = result[0];
        if (!data) return this.$toast('当前没有计划');
        const {id} = data;
        getWorkInfoAPI({id})
          .then(res => {
            let result = res?.result;
            if (result) {
              for (let key in result) {
                if (Object.hasOwnProperty.call(result, key)) {
                  if (key == 'startTime' && key != null) {
                    let startTime = result[key];
                    result.startTime = dayjs(startTime).format('YYYY-MM-DD hh:mm');
                  }
                  if (key == 'endTime' && key != null) {
                    let endTime = result[key];
                    result.endTime = dayjs(endTime).format('YYYY-MM-DD hh:mm');
                  }
                }
              }
            }
            result = Object.freeze(result);
            this.list = result;
            this.isShow = true;
          })
          .catch(err => {}); */
      })
      .catch(err => {});
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/issue/workflow.scss';
</style>