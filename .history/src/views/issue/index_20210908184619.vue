<template>
  <div class="container">
    <van-nav-bar title="监察助手" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div>
        <div>
          <div>
            <span>{{ list.zfname }}</span>
            <div @click="gowork">工作计划</div>
          </div>
          <div class="jd">
            <van-progress :percentage="progress" stroke-width="8" color="#1677FF" :show-pivot="false" />
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
          <div class="jc" v-if="isActive && list.zj.length">
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
      <div>
        <!-- 0 待确认 3已确认  -->
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
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" disabled> </van-pull-refresh>
        <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
          <template v-if="list1.length">
            <van-swipe-cell v-for="(i, index) of list1" :key="index + 'uncertain'">
              <div class="wrap-bottom" @click="handlerupdate(i.issueId)">
                <h2>问题{{ i.issueOrder }}</h2>
                <p>监察指标：</p>
                <p>是否合格：</p>
                <template v-if="i.visitImg.length">
                  <div>
                    <template v-for="(item, index) of i.visitImg">
                      <img :src="item.fk" alt="" :key="index + 'img'" @click.stop="imageClick(i.visitImg, index)" />
                    </template>
                  </div>
                </template>
                <p>{{ i.issueDesc }}</p>
                <p>
                  <span>监察员：</span>
                  <span>{{ i.username }}</span>
                  <span>{{ i.issueCreateTime }}</span>
                </p>
              </div>
              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="handlerdelete(i.issueId)" />
              </template>
            </van-swipe-cell>
          </template>
        </van-list>
      </template>
      <template v-if="active2">
        <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
          <template v-if="list2.length">
            <div class="wrap-bottom" v-for="(i, index) of list1" :key="index + 'certain'">
              <h2>问题{{ i.issueOrder }}</h2>
              <p>监察指标：</p>
              <p>是否合格：</p>
              <template v-if="i.visitImg.length">
                <div>
                  <template v-for="(item, index) of i.visitImg">
                    <img :src="item.fk" alt="" :key="index + 'img'" />
                  </template>
                </div>
              </template>
              <p>{{ i.issueDesc }}</p>
              <p>
                <span>监察员：</span>
                <span>{{ i.username }}</span>
                <span>{{ i.issueCreateTime }}</span>
              </p>
            </div>
          </template>
        </van-list>
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
import {mapState} from 'vuex';
import {getJcInfoAPI, getJudgeOperationButtonAPI} from '@/api/home';
import {deleteIssueAPI, getIssuesCountAPI, getIssuesListAPI} from '@/api/issue';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      active1: true,
      active2: false,

      loading1: false,
      finished1: false,
      loading2: false,
      finished2: false,
      isLoading: false,

      pageSize: 10,
      pageNum1: 0,
      pageNum2: 0,
      list1: [],
      list2: [],
      authority: [],
      isActive: false,
      issue: {},
      list: {}
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
          this.$router.replace({
            path: '/addIssue'
          });
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
        pageNum: this.pageNum1++,
        pageSize: this.pageSize,
        issueStatus: this.getType()
      };
      getIssuesListAPI(data)
        .then(res => {
          let result = res?.result?.rows;
          if (result) {
            result.forEach(item => {
              if (item.issueCreateTime !== '' && item.issueCreateTime !== null) {
                item.issueCreateTime = dayjs(item.issueCreateTime).format('YYYY-MM-DD hh:mm');
              }
            });

            this.list1 = [...this.list1, ...result];
            this.loading1 = false;
            if (this.isLoading) {
              this.isLoading = false;
            }
            if (result.length < this.pageSize) {
              this.finished1 = true;
            }
          } else {
            this.loading1 = false;
            this.finished1 = true;
            this.isLoading = false;
          }
        })
        .catch(err => {
          this.loading1 = false;
          this.finished1 = true;
          this.isLoading = false;
        });
    },
    onLoad2() {
      let data = {
        userId: '27326084554948660',
        zfid: this.zfid,
        pageNum: this.pageNum2++,
        pageSize: this.pageSize,
        issueStatus: this.getType()
      };
      getIssuesListAPI(data)
        .then(res => {
          let result = res?.result?.rows;
          if (result) {
            result.forEach(item => {
              if (item.issueCreateTime !== '' && item.issueCreateTime !== null) {
                item.issueCreateTime = dayjs(item.issueCreateTime).format('YYYY-MM-DD hh:mm');
              }
            });

            this.list2 = [...this.list2, ...result];
            this.loading2 = false;
            if (result.length < this.pageSize) {
              this.finished2 = true;
            }
          } else {
            this.loading2 = false;
            this.finished2 = true;
          }
        })
        .catch(err => {
          this.loading2 = false;
          this.finished2 = true;
        });
    },
    onRefresh() {
      this.pageNum1 = 0;
      this.list1 = [];
      this.finished1 = false;
      this.loading1 = true;
      this.onLoad1();
    },
    imageClick(imgs, index) {
      let images = [];
      imgs.forEach(element => {
        images.push(element.fk);
      });
      ImagePreview({
        images: images,
        startPosition: index
      });
    },
    handlerdelete(issueId) {
      this.$dialog
        .confirm({
          message: '您确认需要删除此条记录？'
        })
        .then(() => {
          deleteIssueAPI({userId: '27326084554948660', issueId})
            .then(res => {
              this.$toast('删除成功');
              this.onRefresh();
            })
            .catch(err => {
              this.$toast('删除失败');
            });
        })
        .catch(() => {});
    },
    handlerupdate(issueId) {
      this.$router.replace({
        name: 'addIssue',
        params: {
          issueId
        }
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
      })
      .catch(err => {});
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/issue/index.scss';
</style>