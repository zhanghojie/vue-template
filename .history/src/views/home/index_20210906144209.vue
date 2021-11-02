<template>
  <div class="container">
    <van-nav-bar title="监察助手" :border="false" />
    <div class="wrap">
      <div class="top">
        <div class="press-top">
          <img src="../../assets/imgs/文字.png" alt="" />
        </div>
        <div class="main-top">
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
        </div>

        <div class="main">
          <div class="classify">
            <div @click="ActiveChange" :class="[isActive == 0 ? 'active' : '']">全部</div>
            <div @click="ActiveChange1" class="iswidth" :class="[isActive == 1 ? 'active' : '']">未开始</div>
            <div @click="ActiveChange2" class="iswidth" :class="[isActive == 2 ? 'active' : '']">进行中</div>
            <div @click="ActiveChange3" class="iswidth" :class="[isActive == 3 ? 'active' : '']">已完成</div>
          </div>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <template v-if="list.length">
                <div class="main-main" v-for="(i, index) of list" :key="index + 'list'">
                  <h3>{{ i.zfname }}</h3>
                  <div class="main-main-jd">
                    <div class="main-main-jd-btn">未完成</div>
                    <div>
                      <van-progress :percentage="70" color="#1677FF" :show-pivot="false" />
                      <!-- <div>{{ i.progress }}</div> -->
                      <div>70</div>
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
          <!-- <div class="main-main">
            <h3>监察任务名称-任务状态未完成</h3>
            <div class="main-main-jd">
              <div class="main-main-jd-text">未完成</div>
              <div>
                <van-progress :percentage="70" color="#1677FF" :show-pivot="false" />
                <div>70%</div>
              </div>
            </div>
            <p>
              <span>开始时间：</span>
              <span>2021年09月07日</span>
            </p>
            <p>
              <span>结束时间：</span>
              <span>2021年09月07日</span>
            </p>
            <p>
              <span>被监察单位：</span>
              <span>单位1</span>
            </p>
            <p>
              <span>联系人：</span>
              <span>傅子明</span>
            </p>
          </div>
          <div class="main-main">
            <h3>监察任务名称-任务状态未完成</h3>
            <div class="main-main-jd">
              <div class="main-main-jd-text">未完成</div>
              <div>
                <van-progress :percentage="70" color="#1677FF" :show-pivot="false" />
                <div>70%</div>
              </div>
            </div>
            <p>
              <span>开始时间：</span>
              <span>2021年09月07日</span>
            </p>
            <p>
              <span>结束时间：</span>
              <span>2021年09月07日</span>
            </p>
            <p>
              <span>被监察单位：</span>
              <span>单位1</span>
            </p>
            <p>
              <span>联系人：</span>
              <span>傅子明</span>
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getJcListAPI} from 'api/home';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      isActive: 0,
      refreshing: false,
      loading: false,
      finished: false,
      list: [],
      pageNum: 0,
      pageSize: 10
    };
  },
  methods: {
    ActiveChange() {
      this.isActive = 0;
    },
    ActiveChange1() {
      this.isActive = 1;
    },
    ActiveChange2() {
      this.isActive = 2;
    },
    ActiveChange3() {
      this.isActive = 3;
    },
    onRefresh() {
      this.list = [];
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      let data = {
        userId: '123',
        pageNum: this.pageNum++,
        pageSize: this.pageSize,
        zfstatus: 0
      };
      getJcListAPI(data)
        .then(res => {
          let result = res?.result;
          if (result) {
            result.forEach(item => {
              if (item.zfPlanEndTime != null) {
                item.zfPlanStartTime = dayjs(item.zfPlanStartTime).format('YYYY-MM-DD');
                item.zfPlanEndTime = dayjs(item.zfPlanEndTime).format('YYYY-MM-DD');
              }
            });

            this.list = [...this.list, ...result];
            this.loading = false;
            if (result.length <= this.pageSize) {
              this.finished = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.finished = true;
        });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/styles/home/index.scss';
</style>