<template>
  <div class="container">
    <van-nav-bar title="工作计划" left-arrow @click-left="onClickLeft" />
    <div class="main">
      <div class="main-common">
        <p>序号</p>
        <p>工作安排好后的序号，有实际含义</p>
      </div>
      <div class="main-common">
        <p>进驻时间</p>
        <p>2021-08-26:16:30</p>
      </div>
      <div class="main-common">
        <p>完成时间</p>
        <p>2021-08-26:16:30</p>
      </div>
      <div class="main-wrap">
        <p>工作内容</p>
        <p>当前工作项的工作内容描述、当前工作项的工作内容描述、当前工作项的工作内容描述、当前工作项的工作内容描述</p>
      </div>
      <div class="main-wrap">
        <p>负责人</p>
        <p>朱恩新、李秀平、王翔</p>
      </div>
      <div class="main-common">
        <p>监察方式</p>
        <p>现场监察</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/issue/workflow.scss';
</style>