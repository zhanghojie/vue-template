<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="单元格" value="内容" is-link />
      <van-cell title="单元格" value="内容" is-link label="描述信息" />
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