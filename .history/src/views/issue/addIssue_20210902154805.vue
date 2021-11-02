<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="监察类别" value="请选择" is-link />
      <van-cell title="监察项目" value="请选择" is-link />
      <van-cell title="监察要点" value="请选择" is-link />
    </van-cell-group>
    <div class="ms">问题描述</div>
    <van-field v-model="filedValue" rows="2" autosize type="textarea" maxlength="240" placeholder="请输入不少于10个字的描述" show-word-limit />
    <div class="upload"><van-uploader @delete="uploadDelete" :max-count="9" :after-read="afterRead" upload-icon="plus" :upload-text="'1/9'" v-model="fileList" /></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filedValue: '',
      fileList: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    uploadDelete(item, index) {
      this.imgList.splice(index.index, 1)
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      /* let formData = new FormData()
      formData.append('file', file.file)
      pushUploadAPI(formData).then(res => {
        if (res.code == 200) {
          let str = res?.data?.domain + res?.data?.fk
          this.imgList.push(str)
        }
      }) */
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/issue/addIssue.scss';
</style>