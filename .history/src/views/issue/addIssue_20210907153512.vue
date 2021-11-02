<template>
  <div class="container">
    <van-nav-bar title="问题登记" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="监察类别" :value="jclbValue" is-link @click="show1 = true" />
      <van-cell title="监察项目" :value="jcxmValue" is-link @click="jcxmClick" />
      <van-cell title="监察要点" :value="jcydValue" is-link @click="jcydClick" />
    </van-cell-group>
    <div class="ms">问题描述</div>
    <van-field v-model="filedValue" rows="2" autosize type="textarea" maxlength="240" placeholder="请输入不少于10个字的描述" show-word-limit />
    <div class="upload"><van-uploader @delete="uploadDelete" :max-count="9" :after-read="afterRead" upload-icon="plus" :upload-text="uploadIndex + '/9'" v-model="fileList" /></div>
    <div class="add">
      <van-button class="btn" size="large" block>保存</van-button>
    </div>

    <van-action-sheet v-model="show1" :actions="actions1" @select="onSelect1" />
    <van-action-sheet v-model="show2" :actions="actions2" @select="onSelect2" />
    <van-action-sheet v-model="show3" :actions="actions3" @select="onSelect3" />
  </div>
</template>

<script>
import {getIssuesClassifyAPI} from '@/api/home';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      jclbValue: '请选择',
      jcxmValue: '请选择',
      jcydValue: '请选择',
      filedValue: '',
      fileList: [],
      uploadIndex: 1,
      classifyList: [],
      show1: false,
      show2: false,
      show3: false,
      actions1: [],
      actions2: [],
      actions3: [],
      issueType: null,
      issueSubtype: null,
      issueSubtypeItem: null
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
    onSelect1(item) {
      const {issueType, issueSubtypes, name} = item;
      this.issueType = issueType;
      this.jclbValue = name;
      issueSubtypes.forEach(item => {
        item.name = item.title;
      });
      (this.actions2 = []), (this.jcxmValue = '请选择'), (this.jcydValue = '请选择');
      this.actions3 = [];
      this.actions2 = issueSubtypes;
      this.show1 = false;
    },
    onSelect2(item) {
      const {issueSubtype, issueSubtypeItems, name} = item;
      this.issueSubtype = issueSubtype;
      this.jcxmValue = name;
      issueSubtypeItems.forEach(item => {
        item.name = item.title;
      });
      this.actions3 = issueSubtypeItems;
      this.show2 = false;
      console.log(this.issueSubtype);
    },
    onSelect3(item) {
      const {issueSubtypeItem, name} = item;
      this.issueSubtypeItem = issueSubtypeItem;
      this.jcydValue = name;
      this.show3 = false;
    },
    jcxmClick() {
      if (this.issueType) {
        this.show2 = true;
      } else {
        this.$toast('请先选择监察类别');
      }
    },
    jcydClick() {
      if (this.issueSubtype) {
        this.show3 = true;
      } else {
        this.$toast('请先选择监察要点');
      }
    }
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