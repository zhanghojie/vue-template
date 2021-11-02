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
            <p>查询历史</p>
          </div>
        </div>

        <div class="main">
          <div class="classify">
            <div @click="ActiveChange" :class="[isActive == 0 ? 'active' : '']">全部</div>
            <div @click="ActiveChange1" class="iswidth" :class="[isActive == 1 ? 'active' : '']">未开始</div>
            <div @click="ActiveChange2" class="iswidth" :class="[isActive == 2 ? 'active' : '']">进行中</div>
            <div @click="ActiveChange3" class="iswidth" :class="[isActive == 3 ? 'active' : '']">已完成</div>
          </div>
          <div class="main-main">
            <h3>监察任务名称-任务状态未完成</h3>
            <div>未完成</div>
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
              <span>本次带队业务参谋：</span>
              <span>傅子明</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: 0
    }
  },
  methods: {
    ActiveChange() {
      this.isActive = 0
    },
    ActiveChange1() {
      this.isActive = 1
    },
    ActiveChange2() {
      this.isActive = 2
    },
    ActiveChange3() {
      this.isActive = 3
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/home/index.scss';
</style>