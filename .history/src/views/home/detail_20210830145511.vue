<template>
  <div class="container">
    <van-nav-bar title="监察助手" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div>
        <h4>监察任务名称-任务状态进行中</h4>
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
    </div>
    <div class="bottom">
      <div>
        <p><van-icon size="60" name="info" color="#1677FF" /></p>
        <p>签到提醒</p>
        <p>请点击“我已到达”按钮进行监察签到</p>
      </div>
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
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
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
          this.$router.replace({
            name: '走访记录'
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
              this.$router.push({
                name: '走访门户'
              })
            }
          })
          break
        case 'personArrived':
          let datas = {
            zfstatus: 4,
            zfid: this.commonState.zfid,
            zfuserid: this.userId
          }
          getRegisterAPI(datas).then(res => {
            if (res.code == 200) {
              this.$router.replace({
                name: '走访记录'
              })
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
        case 'deletezf':
          return '删除走访'
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
        case 'deletezf':
          return require('../../assets/imgs/删除.png')
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/home/detail.scss';
</style>