<template>
  <div class="container">
    <van-nav-bar title="监察助手" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div>
        <div>
          <div>
            <span>监察任务名称-任务状态进行中</span>
            <div @click="gowork">工作计划</div>
          </div>
          <div class="jd">
            <van-progress :percentage="70" color="#1677FF" :show-pivot="false" />
            <div>70%</div>
          </div>
          <p>
            <span>起止时间：</span>
            <span>2021-08-16至2021-08-31</span>
          </p>
          <p>
            <span>被监察单位：</span>
            <span>单位名称</span>
          </p>
          <p>
            <span>单位联系人：</span>
            <span>田雨</span>
          </p>
          <p>
            <span>单位联系电话：</span>
            <span>010-03155832</span>
          </p>
          <h3 v-if="isActive">本次监察</h3>
          <div class="jc" v-if="isActive">
            <div>
              <p>
                <span>联系人：刘子翔</span>
              </p>
              <p>
                <span>联系方式：15112562167</span>
              </p>
            </div>
            <div>
              <p>
                <span>联系人：王杰</span>
              </p>
              <p>
                <span>联系方式：15112562167</span>
              </p>
            </div>
          </div>
          <h3 v-if="isActive">监察员</h3>
          <div class="jc" v-if="isActive">
            <div>
              <p>
                <span>联系人：刘子翔</span>
              </p>
              <p>
                <span>联系方式：15112562167</span>
              </p>
            </div>
            <div>
              <p>
                <span>联系人：王杰</span>
              </p>
              <p>
                <span>联系方式：15112562167</span>
              </p>
            </div>
            <div style="margin-bottom: 10px">
              <p>
                <span>联系人：王杰</span>
              </p>
              <p>
                <span>联系方式：15112562167</span>
              </p>
            </div>
          </div>
          <div class="abs">
            <span v-if="!isActive" @click="isActive = true">展开</span>
            <span v-else @click="isActive = false">收起</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <p><van-icon size="60" name="info" color="#1677FF" /></p>
        <p>签到提醒</p>
        <p>请点击“我已到达”按钮进行监察签到</p>
      </div>
      <div class="bot-foxed" v-if="authority.length">
        <div class="foxed">
          <template v-for="(i, index) of authority">
            <div :key="index + 'authority'" @click="hanlderClick(i)">
              <img :src="typeImg(i)" alt="" />
              <p>{{ textType(i) }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      authority: []
    };
  },
  methods: {
    hanlderClick(i) {
      const {code} = i;
      switch (code) {
        case 'personLeave':
          break;
        case 'AddIssues':
          break;
        case 'Completed':
          break;
        case 'UnionCancel':
          break;
        case 'personArrived':
          break;
        case 'deletezf':
          break;
      }
    },
    textType(item) {
      const {code} = item;
      switch (code) {
        case 'personLeave':
          return '我已离开';
        case 'AddIssues':
          return '添加记录';
        case 'Completed':
          return '办结';
        case 'UnionCancel':
          return '关闭';
        case 'personArrived':
          return '我已到达';
        case 'deletezf':
          return '删除走访';
      }
    },
    typeImg(item) {
      const {code} = item;
      switch (code) {
        case 'personLeave':
          return require('../../assets/imgs/我已离开.png');
        case 'AddIssues':
          return require('../../assets/imgs/添加记录.png');
        case 'Completed':
          return require('../../assets/imgs/办结.png');
        case 'UnionCancel':
          return require('../../assets/imgs/关闭.png');
        case 'personArrived':
          return require('../../assets/imgs/我已到达.png');
        case 'deletezf':
          return require('../../assets/imgs/删除.png');
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    gowork() {
      this.$router.push({
        path: '/workflow'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/home/detail.scss';
</style>