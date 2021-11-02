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
            <div @click="ActiveChange1" style="width: 72px" :class="[isActive == 1 ? 'active' : '']">我发起的</div>
            <div @click="ActiveChange2" style="width: 72px" :class="[isActive == 2 ? 'active' : '']">邀请我的</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/home/index.scss';
</style>