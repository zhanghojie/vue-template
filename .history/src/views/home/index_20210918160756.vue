<template>
  <div class="container">home</div>
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
        userId: this.userId,
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
    let userId = JSON.parse(value);
    // let userId = '27326084554948660';
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