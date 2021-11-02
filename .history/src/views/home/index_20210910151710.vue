<template>
  <div class="container">
    <van-nav-bar title="监察助手" :border="false" />
    <div class="wrap">
      <div class="top">
        <div class="press-top"></div>
        <!--  <div class="main-top">
          <div>
            <div><img src="../../assets/imgs/查.png" alt="" /></div>
            <p>新建检察</p>
          </div>
          <div>
            <div><img src="../../assets/imgs/房.png" alt="" /></div>
            <p>监察单位</p>
          </div>
          <div>
            <div><img src="../../assets/imgs/写.png" alt="" /></div>
            <p>历史查询</p>
          </div>
        </div> -->

        <div class="main" v-if="userId">
          <div class="classify">
            <div @click="ActiveChange" :class="[isActive == 0 ? 'active' : '']">全部</div>
            <div @click="ActiveChange1" class="iswidth" :class="[isActive == 1 ? 'active' : '']">未开始</div>
            <div @click="ActiveChange2" class="iswidth" :class="[isActive == 2 ? 'active' : '']">进行中</div>
            <div @click="ActiveChange3" class="iswidth" :class="[isActive == 3 ? 'active' : '']">已完成</div>
          </div>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh" disabled>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <template v-if="list.length">
                <div class="main-main" v-for="(i, index) of list" :key="index + 'list'" @click="handerClick(i)">
                  <h3>{{ i.zfname }}</h3>
                  <div class="main-main-jd">
                    <div class="main-main-jd-btn" v-if="i.zfstatus == 1">未完成</div>
                    <div class="main-main-jd-btn bg-green-btn" v-else-if="i.zfstatus == 2">进行中</div>
                    <div class="main-main-jd-btn bg-blue-btn" v-else-if="i.zfstatus == 3">已完成</div>
                    <div>
                      <van-progress :percentage="i.progress" stroke-width="8" color="#1677FF" :show-pivot="false" />
                      <div v-if="i.progress !== 100">{{ i.progress }}%</div>
                      <div v-else>
                        <van-icon name="checked" color="#1677FF" />
                      </div>
                    </div>
                  </div>
                  <p>
                    <span>开始时间：</span>
                    <span>{{ i.zfPlanStartTime }}</span>
                  </p>
                  <p>
                    <span>结束时间：</span>
                    <span>{{ i.zfPlanEndTime }}</span>
                  </p>
                  <p>
                    <span>被监察单位：</span>
                    <span>{{ i.orgName }}</span>
                  </p>
                  <p>
                    <span>联系人：</span>
                    <span>{{ i.orgContactName }}</span>
                  </p>
                </div>
              </template>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getJcListAPI} from 'api/home';
import dayjs from 'dayjs';
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      isActive: 0,
      refreshing: false,
      loading: false,
      finished: false,
      list: [],
      pageNum: 0,
      pageSize: 10,
      userId: ''
    };
  },
  methods: {
    ...mapMutations('app', ['SET_ZFID', 'SET_USER_ID']),
    handerClick(params) {
      if (params) {
        const {zfid, userStatus} = params;
        this.SET_ZFID(zfid);
        if (userStatus == 0) {
          this.$router.push({
            name: 'detail'
          });
        } else if (userStatus == 1) {
          this.$router.push({
            name: 'issueList'
          });
        }
      }
    },
    ActiveChange() {
      this.isActive = 0;
      this.onRefresh();
    },
    ActiveChange1() {
      this.isActive = 1;
      this.onRefresh();
    },
    ActiveChange2() {
      this.isActive = 2;
      this.onRefresh();
    },
    ActiveChange3() {
      this.isActive = 3;
      this.onRefresh();
    },

    onRefresh() {
      this.pageNum = 0;
      this.list = [];
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      let data = {
        userId: '27326084554948660',
        pageNum: this.pageNum++,
        pageSize: this.pageSize,
        zfstatus: this.isActive
      };
      getJcListAPI(data)
        .then(res => {
          let result = res?.result?.rows;
          if (result) {
            result.forEach(item => {
              if (item.zfPlanEndTime != null) {
                item.zfPlanStartTime = dayjs(item.zfPlanStartTime).format('YYYY-MM-DD');
                item.zfPlanEndTime = dayjs(item.zfPlanEndTime).format('YYYY-MM-DD');
              }
            });
            this.list = [...this.list, ...result];
            this.loading = false;
            if (this.refreshing) {
              this.refreshing = false;
            }
            if (result.length < this.pageSize) {
              this.finished = true;
            }
          } else {
            this.loading = false;
            this.finished = true;
            this.refreshing = false;
          }
        })
        .catch(err => {
          this.loading = false;
          this.finished = true;
          this.refreshing = false;
        });
    }
  },
  mounted() {
    let value = localStorage.getItem('userId');
    console.log(value, 'value');
    let userId = JSON.parse(value);
    console.log('🚀 ~ mounted ~ userId', userId);

    if (userId) {
      this.SET_USER_ID(userId);
      this.userId = userId;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/home/index.scss';
</style>