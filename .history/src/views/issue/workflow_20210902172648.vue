<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
    <div class="container-main">
      <div class="container-main-common">
        <p>序号</p>
        <p>工作安排好后的序号，有实际含义</p>
      </div>
      <div class="container-main-common">
        <p>进驻时间</p>
        <p>2021-08-26:16:30</p>
      </div>
      <div class="container-main-common">
        <p>完成时间</p>
        <p>2021-08-26:16:30</p>
      </div>
      <div class="container-main-wrap">
        <p>工作内容</p>
        <p>当前工作项的工作内容描述、当前工作项的工作内容描述、当前工作项的工作内容描述、当前工作项的工作内容描述</p>
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
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/issue/workflow.scss';
</style>