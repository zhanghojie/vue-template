<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="监察类别" value="请选择" is-link @click="show1 = true" />
      <van-cell title="监察项目" value="请选择" is-link />
      <van-cell title="监察要点" value="请选择" is-link />
    </van-cell-group>
    <div class="ms">问题描述</div>
    <van-field v-model="filedValue" rows="2" autosize type="textarea" maxlength="240" placeholder="请输入不少于10个字的描述" show-word-limit />
    <div class="upload"><van-uploader @delete="uploadDelete" :max-count="9" :after-read="afterRead" upload-icon="plus" :upload-text="uploadIndex + '/9'" v-model="fileList" /></div>
    <div class="add">
      <van-button class="btn" size="large" block>保存</van-button>
    </div>

    <van-action-sheet v-model="show1" :actions="actions1" @select="onSelect1" />
  </div>
</template>

<script>
import {getIssuesClassifyAPI} from '@/api/home';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      filedValue: '',
      fileList: [],
      uploadIndex: 1,
      classifyList: [],
      show1: false,
      actions1: [{name: '选项一'}, {name: '选项二'}, {name: '选项三'}]
    };
  },
  computed: {
    ...mapState('app', ['zfid'])
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    uploadDelete(item, index) {
      this.imgList.splice(index.index, 1);
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
    },
    onSelect1(item, index) {
      console.log('🚀 ~ onSelect1 ~ item,index', item, index);

      this.show1 = false;
    },
    onSelect2() {},
    onSelect3() {}
  },
  mounted() {
    getIssuesClassifyAPI({userId: '27326084554948660', zfid: this.zfid}).then(res => {
      let result = res?.result;
      result.forEach(item => {
        item.name = item.title;
      });
      this.actions1 = result;
    });
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/issue/addIssue.scss';
</style>