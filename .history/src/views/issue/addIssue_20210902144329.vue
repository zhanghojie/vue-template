<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="监察类别" value="请选择" is-link />
      <van-cell title="监察项目" value="请选择" is-link />
      <van-cell title="监察要点" value="请选择" is-link />
    </van-cell-group>
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
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/issue/index.scss';
</style>