<template>
  <div class="container">
    <van-nav-bar title="监察助手" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div>
        <div>
          <p>
            <span>监察任务名称-任务状态进行中</span>
          </p>
          <p>
            <span>起止时间：</span>
            <span>2021-08-16至2021-08-31</span>
          </p>
          <p>
            <span>被监察单位：</span>
            <span>单位名称</span>
          </p>
          <p>
            <span>联系人：</span>
            <span>田雨</span>
          </p>
          <p>
            <span>本次监察同行的业务参谋和检查员：</span>
            <span>武小平、陈雅芳</span>
          </p>
          <p v-if="isActive">
            <span>走访状态：</span>
            <span v-if="list.zfstatus == 0">企业已经申请待安排</span>
            <span v-else-if="list.zfstatus == 1">待走访</span>
            <span v-else-if="list.zfstatus == 2">等待接受安排</span>
            <span v-else-if="list.zfstatus == 3">待走访</span>
            <span v-else-if="list.zfstatus == 4">走访中</span>
            <span v-else-if="list.zfstatus == 5">已走访</span>
            <span v-else-if="list.zfstatus == 7">已取消</span>
            <span v-else-if="list.zfstatus == 9">待补录</span>
          </p>
          <p v-if="isActive">
            <span>走访时间：</span>
            <span>{{ list.zfRealStartTime }}</span>
          </p>
          <p v-if="isActive">
            <span>所属行业：</span>
            <span>{{ list.industrycodename }}</span>
          </p>
          <p v-if="isActive">
            <span>企业划型：</span>
            <span>{{ list.scqylx }}</span>
          </p>
          <p v-if="isActive">
            <span>企业联系人姓名：</span>
            <span v-if="list.zftype == 0">{{ list.orgContactName }}</span>
            <span v-else>{{ list.legalperson }}</span>
          </p>
          <p v-if="isActive">
            <span>企业联系方式：</span>
            <a :href="getphone()" style="color: #1677ff" v-if="list.zftype == 0">{{ list.orgContactPhone }}</a>
            <a :href="getphone()" style="color: #1677ff" v-else>{{ list.telno }}</a>
          </p>
          <p v-if="isActive">
            <span>企业地址：</span>
            <span>{{ list.orgLocaltion }}</span>
          </p>
          <div class="abs">
            <span v-if="!isActive" @click="isActive = true">展开</span>
            <span v-else @click="isActive = false">收起</span>
          </div>
        </div>
      </div>
      <div>
        <!-- 0 待处理 2办理中 3已办结 -->

        <div><van-divider>问题情况</van-divider></div>
        <div v-if="issue">
          <div @click="Isactive1">
            <img src="../../assets/imgs/未处理.png" alt="" />
            <p>
              <span>{{ issue.wcl }}项</span>
            </p>
            <p :class="{active: active1}"><span>待处理</span></p>
          </div>

          <div @click="Isactive2">
            <img src="../../assets/imgs/计划处理.png" alt="" />
            <p>
              <span>{{ issue.jhcl }}项</span>
            </p>
            <p :class="{active: active2}"><span>办理中</span></p>
          </div>
          <div @click="Isactive3">
            <img src="../../assets/imgs/现场办结.png" alt="" />
            <p>
              <span>{{ issue.xcjb }}项</span>
            </p>
            <p :class="{active: active3}"><span>已办结</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <template v-if="active1">
        <van-list v-model="loading1" :finished="finished0" finished-text="没有更多了" @load="onLoad1">
          <template v-if="list1.length">
            <div class="wrap-bottom" @click="goplayBack(i)" v-for="(i, index) of list0" :key="index + 'a'">
              <div>
                <van-tag type="primary" text-color="#fff" color="#007AFF">待处理</van-tag>
                <h4>问题{{ i.issueOrder }}</h4>
              </div>
              <p>
                {{ i.issueDesc }}
              </p>
              <div>
                <p><!-- <van-tag type="primary" round text-color="#1582FF" color="#E7F1FF">人才服务</van-tag> --></p>
                <p>
                  <span>记录办理人:</span><span>{{ i.userName }} {{ i.issueProTime }}</span>
                </p>
              </div>
            </div>
          </template>
        </van-list>
      </template>
      <template v-if="active2">
        <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
          <template v-if="list2.length">
            <div class="wrap-bottom" @click="goplayBack(i)" v-for="(i, index) of list2" :key="index + 'b'">
              <div>
                <van-tag type="primary" text-color="#fff" color="#007AFF">办理中</van-tag>
                <h4>问题{{ i.issueOrder }}</h4>
              </div>
              <p>
                {{ i.issueDesc }}
              </p>
              <div>
                <p><!-- <van-tag type="primary" round text-color="#1582FF" color="#E7F1FF">人才服务</van-tag> --></p>
                <p>
                  <span>记录办理人:</span><span>{{ i.userName }} {{ i.issueProTime }}</span>
                </p>
              </div>
            </div>
          </template>
        </van-list>
      </template>
      <template v-if="active3">
        <van-list v-model="loading3" :finished="finished3" finished-text="没有更多了" @load="onLoad3">
          <template v-if="list3.length">
            <div class="wrap-bottom" @click="goplayBack(i)" v-for="(i, index) of list3" :key="index + 'c'">
              <div>
                <van-tag type="primary" text-color="#fff" color="#007AFF">已办结</van-tag>
                <h4>问题{{ i.issueOrder }}</h4>
              </div>
              <p>
                {{ i.issueDesc }}
              </p>
              <div>
                <p><!-- <van-tag type="primary" round text-color="#1582FF" color="#E7F1FF">人才服务</van-tag> --></p>
                <p>
                  <span>记录办理人:</span><span>{{ i.userName }} {{ i.issueProTime }}</span>
                </p>
              </div>
            </div>
          </template>
        </van-list>
      </template>

      <div class="bot-foxed" v-if="authority.length">
        <div class="foxed">
          <template v-for="(i, index) of authority">
            <div :key="index + 'authority'" @click="hanlderClick(i)">
              <img :src="typeImg(i)" alt="" />
              <p>{{ textType(i) }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ImagePreview} from 'vant'
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
      active1: false,
      active2: false,
      active3: false,

      loading1: false,
      finished1: false,
      loading2: false,
      finished2: false,
      loading3: false,
      finished3: false,

      pageSize: 10,
      pageNum1: 1,
      pageNum2: 1,
      pageNum3: 1,
      list1: [],
      list2: [],
      list3: [],

      authority: [],
      isActive: false
    }
  },
  methods: {
    getphone() {
      if (this.list.zftype == 0) {
        return `tel:${this.list.orgContactPhone}`
      } else {
        return `tel:${this.list.telno}`
      }
    },

    hanlderClick(i) {
      const {code} = i
      switch (code) {
        case 'personLeave':
          let params = {
            zfstatus: 5,
            zfid: this.commonState.zfid,
            zfuserid: this.userId
          }
          getRegisterAPI(params).then(res => {
            if (res.code == 200) {
              this.$router.push({
                name: '走访门户'
              })
            }
          })
          break
        case 'AddIssues':
          this.$router.push({
            name: '走访记录',
            params: {
              zfid: this.commonState.zfid,
              uniscid: this.commonState.uniscid
            }
          })
          break
        case 'situation':
          this.$router.push({
            name: '现场情况',
            params: {
              zfid: this.commonState.zfid,
              uniscid: this.commonState.uniscid
            }
          })
          break
        case 'Collection':
          this.$router.push({
            name: '走访记录',
            params: {
              zfid: this.commonState.zfid,
              uniscid: this.commonState.uniscid
            }
          })
          break
        case 'Completed':
          let data1 = {
            zfid: this.commonState.zfid,
            zfstatus: 6
          }
          updateJointVisitStatueAPI(data1).then(res => {
            if (res.code == 200) {
              this.$router.push({
                name: '走访门户'
              })
            }
          })
          break
        case 'UnionCancel':
          let data = {
            zfid: this.commonState.zfid,
            zfstatus: 7
          }
          updateJointVisitStatueAPI(data).then(res => {
            if (res.code == 200) {
              this.$router.go(-1)
            }
          })
          break
        case 'deletezf':
          this.$dialog
            .confirm({
              message: '是否确认进行删除操作'
            })
            .then(() => {
              // on confirm
              deleteAPI({zfid: this.commonState.zfid}).then(res => {
                if (res.code == 200) {
                  this.$router.push({
                    name: '走访门户'
                  })
                }
              })
            })
            .catch(() => {
              // on cancel
            })
          break

        case 'personArrived':
          return '我已到达'
        case 'personChange':
          return '改签走访'
      }
    },
    textType(item) {
      const {code} = item
      switch (code) {
        case 'personLeave':
          return '我已离开'
        case 'AddIssues':
          return '添加记录'
        case 'Completed':
          return '办结'
        case 'UnionCancel':
          return '关闭'
        case 'personArrived':
          return '我已到达'
        case 'personChange':
          return '改签走访'
        case 'Collection':
          return '补录记录'
        case 'deletezf':
          return '删除走访'
        case 'situation':
          return '现场情况'
      }
    },
    typeImg(item) {
      const {code} = item
      switch (code) {
        case 'personLeave':
          return require('../../assets/imgs/我已离开.png')
        case 'AddIssues':
          return require('../../assets/imgs/添加记录.png')
        case 'Completed':
          return require('../../assets/imgs/办结.png')
        case 'UnionCancel':
          return require('../../assets/imgs/关闭.png')
        case 'personArrived':
          return require('../../assets/imgs/我已到达.png')
        case 'personChange':
          return require('../../assets/imgs/改签走访.png')
        case 'Collection':
          return require('../../assets/imgs/补录记录.png')
        case 'deletezf':
          return require('../../assets/imgs/删除.png')
        case 'situation':
          return require('../../assets/imgs/xcqk.png')
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },

    Isactive1() {
      this.active1 = true
      this.active2 = false
      this.active3 = false
    },
    Isactive2() {
      this.active1 = false
      this.active2 = true
      this.active3 = false
    },
    Isactive3() {
      this.active1 = false
      this.active2 = false
      this.active3 = true
    },

    getType() {
      //0 待处理 2办理中 3已办结
      if (this.active1) {
        return 1
      } else if (this.active2) {
        return 2
      } else if (this.active0) {
        return 0
      }
    },

    onLoad1() {
      let data = {
        uniscid: this.commonState.uniscid,
        issueSecType: this.getType(),
        zfid: this.commonState.zfid,
        pageNum: this.pageNum1++,
        pageSize: this.pageSize
      }
      getwtListAPI(data).then(res => {
        let result = res?.result?.rows
        this.list1 = [...this.list1, ...result]
        this.loading1 = false
        if (result?.length < this.pageSize) {
          this.finished1 = true
        }
      })
    },
    onLoad2() {
      let data = {
        uniscid: this.commonState.uniscid,
        issueSecType: this.getType(),
        zfid: this.commonState.zfid,
        pageNum: this.pageNum2++,
        pageSize: this.pageSize
      }
      getwtListAPI(data).then(res => {
        let result = res?.result?.rows
        this.list2 = [...this.list2, ...result]
        this.loading2 = false
        if (result.length < this.pageSize) {
          this.finished2 = true
        }
      })
    },
    onLoad3() {
      let data = {
        uniscid: this.commonState.uniscid,
        issueSecType: this.getType(),
        zfid: this.commonState.zfid,
        pageNum: this.pageNum3++,
        pageSize: this.pageSize
      }
      getwtListAPI(data).then(res => {
        let result = res?.result?.rows
        this.list3 = [...this.list3, ...result]
        this.loading3 = false
        if (result?.length < this.pageSize) {
          this.finished3 = true
        }
      })
    },

    imageClick(imgs, index) {
      console.log(imgs, 'imgs')
      let images = []
      imgs.forEach(element => {
        images.push(element.fk)
      })
      ImagePreview({
        images: images,
        startPosition: index
      })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/issue/index.scss';
</style>