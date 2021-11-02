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
      <van-button class="btn" size="large" @click="saveClick" block>保存</van-button>
    </div>

    <van-action-sheet v-model="show1" :actions="actions1" @select="onSelect1" />
    <van-action-sheet v-model="show2" :actions="actions2" @select="onSelect2" />
    <van-action-sheet v-model="show3" :actions="actions3" @select="onSelect3" />
  </div>
</template>

<script>
import {getIssuesClassifyAPI, uploadAPI} from '@/api/home';
import {mapState} from 'vuex';
import {issuesAddAPI, updateIssueInfoAPI} from '@/api/issue';
export default {
  data() {
    return {
      jclbValue: '请选择',
      jcxmValue: '请选择',
      jcydValue: '请选择',
      filedValue: '',
      fileList: [],
      uploadIndex: 0,
      show1: false,
      show2: false,
      show3: false,
      actions1: [],
      actions2: [],
      actions3: [],
      issueType: null,
      issueSubtype: null,
      issueSubtypeItem: null,
      imgList: []
    };
  },
  computed: {
    ...mapState('app', ['zfid'])
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    uploadDelete(index) {
      this.imgList.splice(index.index, 1);
      this.uploadIndex = this.imgList.length;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let formData = new FormData();
      formData.append('file', file.file);
      uploadAPI(formData)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            let str = res?.data?.domain + res?.data?.fk;
            this.imgList.push(str);
            this.uploadIndex = this.imgList.length;
          }
        })
        .catch(errr => {
          this.$toast('上传失败');
        });
    },
    onSelect1(item) {
      const {issueType, issueSubtypes, name} = item;
      this.issueType = issueType;
      this.jclbValue = name;
      issueSubtypes.forEach(item => {
        item.name = item.title;
      });
      (this.actions2 = []), (this.jcxmValue = '请选择'), (this.issueSubtype = null);
      (this.actions3 = []), (this.jcydValue = '请选择'), (this.issueSubtypeItem = null);
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
        this.$toast('请先选择监察项目');
      }
    },
    saveClick() {
      let data = {
        userId: '27326084554948660',
        zfid: this.zfid,
        issueType: this.issueType,
        issueSubtype: this.issueSubtype,
        issueSubtypeItem: this.issueSubtypeItem,
        issueDesc: this.filedValue,
        imgs: [...this.imgList]
      };
      issuesAddAPI(data)
        .then(res => {
          console.log(res);
          this.$router.replace({
            path: '/issueList'
          });
        })
        .catch(err => {});
    }
  },
  mounted() {
    getIssuesClassifyAPI({userId: '27326084554948660', zfid: this.zfid})
      .then(res => {
        let result = res?.result;
        result.forEach(item => {
          item.name = item.title;
        });
        this.actions1 = result;
      })
      .then(() => {
        let issueId = this.$route.params.issueId;
        if (issueId) {
          updateIssueInfoAPI({userId: '27326084554948660', issueId})
            .then(res => {
              let result = res?.result;
              this.jclbValue = result?.issueTypeName;
              this.jcxmValue = result?.issueSubtypeName;
              this.jcydValue = result?.issueSubtypeItemName;
              this.filedValue = result?.issueDesc;
              let imgs = result?.visitImg;
              let files = [];
              imgs.forEach(item => {
                files.push({
                  url: item.fk
                });
                this.imgList.push(item.fk);
              });
              this.fileList = files;
              this.issueType = result?.issueType;
              this.issueSubtype = result?.issueSubtype;
              this.issueSubtypeItem = result?.issueSubtypeItem;

              // todo
              let actions1 = this.actions1.find(item => item.issueType == this.issueType);
              if (!actions1) return;
              const {issueSubtypes} = actions1;
              if (!issueSubtypes?.length) return;
              issueSubtypes.forEach(item => {
                item.name = item.title;
              });
              this.actions2 = issueSubtypes;
              let actions2 = issueSubtypes.find(item => item.issueSubtype == this.issueSubtype);
              if (!actions2) return;
              const {issueSubtypeItems} = actions2;
              if (!issueSubtypeItems?.length) return;
              issueSubtypeItems.forEach(item => {
                item.name = item.title;
              });
              this.actions3 = issueSubtypeItems;
            })
            .catch(err => {});
        }
      });
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/issue/addIssue.scss';
</style>