<template>
  <div class="container">
    <van-nav-bar title="监察助手" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div>
        <div v-if="isShow">
          <div>
            <span>{{ list.zfname }}</span>
            <div @click="gowork">工作计划</div>
          </div>
          <div class="jd">
            <van-progress :percentage="list.progress" stroke-width="8" color="#1677FF" :show-pivot="false" />
            <div>{{ list.progress }}%</div>
          </div>
          <p>
            <span>起止时间：</span>
            <span>{{ list.zfPlanStartTime }}至{{ list.zfPlanEndTime }}</span>
          </p>
          <p>
            <span>被监察单位：</span>
            <span>{{ list.jcOrg }}</span>
          </p>
          <p>
            <span>单位联系人：</span>
            <span>{{ list.orgLxr }}</span>
          </p>
          <p>
            <span>单位联系电话：</span>
            <span>{{ list.orgLxdh }}</span>
          </p>
          <h3 v-if="isActive">本次监察</h3>
          <div class="jc" v-if="isActive && list.cm.length">
            <div v-for="(i, index) of list.cm" :key="index + 'cm'">
              <p>
                <span>联系人：{{ i.userName }}</span>
              </p>
              <p>
                <span>联系方式：{{ i.mobilePhone }}</span>
              </p>
            </div>
          </div>
          <h3 v-if="isActive">监察员</h3>
          <div class="jc mbt" v-if="isActive && list.zj.length">
            <div v-for="(i, index) of list.zj" :key="index + 'zj'">
              <p>
                <span>联系人：{{ i.userName }}</span>
              </p>
              <p>
                <span>联系方式：{{ i.mobilePhone }}</span>
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
import dayjs from 'dayjs';
import {getJudgeOperationButtonAPI, getJcInfoAPI, arriveAPI} from '@/api/home';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      isActive: false,
      authority: [],
      list: {},
      isShow: false
    };
  },
  computed: {
    ...mapState('app', ['zfid'])
  },
  methods: {
    hanlderClick(i) {
      const {code} = i;
      switch (code) {
        case 'personLeave':
          break;
        case 'AddIssues':
          this.$router.replace({
            name: 'addIssue'
          });
          break;
        case 'Completed':
          break;
        case 'UnionCancel':
          break;
        case 'personArrived':
          arriveAPI({userId: '27326084554948660', zfid: this.zfid})
            .then(res => {
              this.$router.replace({
                name: 'addIssue'
              });
            })
            .catch(err => {
              this.$toast('签到失败');
            });

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
  },
  mounted() {
    getJcInfoAPI({zfid: this.zfid})
      .then(res => {
        let result = res?.result;
        for (let key in result) {
          if (Object.hasOwnProperty.call(result, key)) {
            if (key == 'zfPlanStartTime' && key != null) {
              let zfPlanStartTime = result[key];
              result.zfPlanStartTime = dayjs(zfPlanStartTime).format('YYYY-MM-DD');
            }
            if (key == 'zfPlanEndTime' && key != null) {
              let zfPlanEndTime = result[key];
              result.zfPlanEndTime = dayjs(zfPlanEndTime).format('YYYY-MM-DD');
            }
          }
        }
        result = Object.freeze(result);
        this.list = result;
        this.isShow = true;
      })
      .catch(err => {
        console.log(err);
      });

    let data = {
      userId: '27326084554948660',
      zfid: this.zfid
    };
    getJudgeOperationButtonAPI(data)
      .then(res => {
        let result = res?.result;
        this.authority = result;
      })
      .catch(err => {});
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/home/detail.scss';
</style>