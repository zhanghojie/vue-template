<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
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