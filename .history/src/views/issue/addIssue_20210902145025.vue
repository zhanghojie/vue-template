<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="监察类别" value="请选择" is-link />
      <van-cell title="监察项目" value="请选择" is-link />
      <van-cell title="监察要点" value="请选择" is-link />
    </van-cell-group>
    <van-cell title="问题描述" />
    <van-field v-model="filedValue" rows="2" autosize type="textarea" maxlength="240" placeholder="请输入不少于10个字的描述" show-word-limit />
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
@import '@/styles/issue/addIssue.scss';
</style>