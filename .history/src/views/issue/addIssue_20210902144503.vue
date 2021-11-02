<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="监察类别" value="请选择" is-link />
      <van-cell title="监察项目" value="请选择" is-link />
      <van-cell title="监察要点" value="请选择" is-link />
    </van-cell-group>
    <van-field v-model="filedValue" rows="2" autosize label="留言" type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filedValue: ''
    }
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