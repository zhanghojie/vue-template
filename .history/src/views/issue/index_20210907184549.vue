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
      <div>
        <!-- 0 待确认 2已确认  -->
        <div><van-divider>问题情况</van-divider></div>
        <div>
          <div @click="Isactive1">
            <img src="../../assets/imgs/未处理.png" alt="图片加载失败" />
            <p>
              <span>{{ issue.wqd }}项</span>
            </p>
            <p :class="{active: active1}"><span>待确认</span></p>
          </div>

          <div @click="Isactive2">
            <img src="../../assets/imgs/现场办结.png" alt="图片加载失败" />
            <p>
              <span>{{ issue.yqd }}项</span>
            </p>
            <p :class="{active: active2}"><span>已确认</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <template v-if="active1">
        <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
          <template v-if="list1.length">
            <div class="wrap-bottom" v-for="(i, index) of list1" :key="index + 'uncertain'">
              <h2>问题1</h2>
              <p>监察指标：</p>
              <p>是否合格：</p>
              <div>
                <img src="../../assets/imgs/补录记录.png" alt="图片加载失败" />
                <img src="../../assets/imgs/补录记录.png" alt="图片加载失败" />
                <img src="../../assets/imgs/补录记录.png" alt="图片加载失败" />
              </div>
              <p>
                <span>监察员：</span>
                <span>林国志</span>
                <span>2021-08-17 15:32</span>
              </p>
            </div>
          </template>
        </van-list>
      </template>
      <template v-if="active2">
        <div class="wrap-bottom">
          <h2>问题1</h2>
          <p>监察指标：</p>
          <p>是否合格：</p>
          <div>
            <img src="../../assets/imgs/补录记录.png" alt="图片加载失败" />
            <img src="../../assets/imgs/补录记录.png" alt="图片加载失败" />
            <img src="../../assets/imgs/补录记录.png" alt="图片加载失败" />
          </div>
          <p>
            <span>监察员：</span>
            <span>林国志</span>
            <span>2021-08-17 15:32</span>
          </p>
        </div>
        <div class="wrap-bottom">
          <h2>问题1</h2>
          <p>监察指标：</p>
          <p>是否合格：</p>
          <div>
            <img src="../../assets/imgs/补录记录.png" alt="" />
            <img src="../../assets/imgs/补录记录.png" alt="" />
            <img src="../../assets/imgs/补录记录.png" alt="" />
          </div>
          <p>
            <span>监察员：</span>
            <span>林国志</span>
            <span>2021-08-17 15:32</span>
          </p>
        </div>
        <!-- <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
          <template v-if="list2.length">
            <div class="wrap-bottom" v-for="(i, index) of list2" :key="index + 'b'">
              <div>
                <van-tag type="primary" text-color="#fff" color="#007AFF">办理中</van-tag>
                <h4>问题{{ i.issueOrder }}</h4>
              </div>
              <p>
                {{ i.issueDesc }}
              </p>
              <div>
                <p></p>
                <p>
                  <span>记录办理人:</span><span>{{ i.userName }} {{ i.issueProTime }}</span>
                </p>
              </div>
            </div>
          </template>
        </van-list> -->
      </template>

      <div class="bot-foxed" v-if="authority.length">
        <div class="foxed">
          <template v-for="(i, index) of authority">
            <div :key="index + 'authority'" @click="hanlderClick(i)">
              <img :src="imgType(i)" alt="" />
              <p>{{ textType(i) }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ImagePreview} from 'vant';
import {mapState, mapMutations} from 'vuex';
import {getJudgeOperationButtonAPI} from '@/api/home';
import {getIssuesCountAPI, getIssuesListAPI} from '@/api/issue';
export default {
  data() {
    return {
      active1: true,
      active2: false,

      loading1: false,
      finished1: false,
      loading2: false,
      finished2: false,

      pageSize: 10,
      pageNum1: 1,
      pageNum2: 1,
      list1: [],
      list2: [],
      authority: [],
      isActive: false,
      issue: {}
    };
  },
  computed: {
    ...mapState('app', ['zfid'])
  },
  methods: {
    gowork() {
      this.$router.push({
        path: '/workflow'
      });
    },
    hanlderClick(i) {
      const {code} = i;
      switch (code) {
        case 'personLeave':
          break;
        case 'AddIssues':
          break;
        case 'situation':
          break;
        case 'Collection':
          break;
        case 'Completed':
          break;
        case 'UnionCancel':
          break;
        case 'deletezf':
          break;
        case 'personArrived':
          return '我已到达';
        case 'personChange':
          return '改签走访';
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
        case 'personChange':
          return '改签走访';
        case 'Collection':
          return '补录记录';
        case 'deletezf':
          return '删除走访';
      }
    },
    imgType(item) {
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
        case 'personChange':
          return require('../../assets/imgs/改签走访.png');
        case 'Collection':
          return require('../../assets/imgs/补录记录.png');
        case 'deletezf':
          return require('../../assets/imgs/删除.png');
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    Isactive1() {
      this.active1 = true;
      this.active2 = false;
    },
    Isactive2() {
      this.active1 = false;
      this.active2 = true;
    },
    getType() {
      // 0 待确定 3 已确定
      if (this.active1) {
        return 0;
      } else if (this.active2) {
        return 3;
      }
    },

    onLoad1() {
      let data = {
        userId: '27326084554948660',
        zfid: this.zfid,
        pageNum1: this.pageNum1++,
        pageSize: this.pageSize,
        issueStatus: this.getType()
      };
      getIssuesListAPI(data)
        .then(res => {
          let result = res?.result;
          if (result) {
            this.list1 = [...this.list1, ...result];
            this.loading1 = false;
            if (result.length < this.pageSize) {
              this.finished1 = true;
            }
          } else {
            this.loading1 = false;
            this.finished1 = true;
          }
        })
        .catch(err => {
          this.loading1 = false;
          this.finished1 = true;
        });
    },
    onLoad2() {},
    imageClick(imgs, index) {
      console.log(imgs, 'imgs');
      let images = [];
      imgs.forEach(element => {
        images.push(element.fk);
      });
      ImagePreview({
        images: images,
        startPosition: index
      });
    }
  },
  mounted() {
    getJudgeOperationButtonAPI({userId: '27326084554948660', zfid: this.zfid})
      .then(res => {
        let result = res?.result;
        this.authority = result;
      })
      .catch(err => {});

    getIssuesCountAPI({userId: '27326084554948660', zfid: this.zfid})
      .then(res => {
        let result = res?.result;
        this.issue = result;
      })
      .catch(err => {});
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/issue/index.scss';
</style>