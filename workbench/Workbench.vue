<template>
  <div class="all-wraper">
    <!-- 头部部分 -->
    <div class="header-wraper">
      <el-row type="flex" justify="space-between" align="middle">
        <!-- logo部分 -->
        <el-col :span="6">
          <img class="cm-logo" src="./icons/cm_logo.png" alt="icon">
        </el-col>

        <!-- 时间和个人操作部分 -->
        <el-col :span="8">
          <el-row type="flex" justify="end" align="middle">
            <el-col :span="11">
              <span class="time-wraper">{{ nowTime }}</span>
            </el-col>

            <el-col :span="2">
              <span class="division-line"></span>
            </el-col>

            <el-col class="info-wraper" :span="4">
              <img class="avatar" src="./icons/default_avatar.jpeg" alt="avatar">

              <el-dropdown
                trigger="click"
              >
                <div class="name-box">
                  <span class="name">{{ '李浩' }}</span>
                  <i style="color: blue" class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu
                  slot="dropdown"
                >
                  <el-dropdown-item>
                    修改密码
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- 主体内容部分 -->
    <div class="content-wraper">
      <el-row>
        <!-- 个人信息板 -->
        <el-col :span="6">
          <div class="info-board">
            <span class="blue-top-bar"></span>

            <div class="user-avatar-box">
              <img class="user-avatar" src="./icons/default_avatar.jpeg" alt="avatar">
            </div>
            <p class="user-name">
              {{ '隔壁老王' }}
            </p>
            <p class="user-id">
              ID：{{ '15625412541245' }}
            </p>

            <!-- 身份证-电话 -->
            <div class="id-tel-wraper">
              <div class="id-box flex-start-center">
                <img class="icon-id" src="./icons/id_icon.png" alt="icon">
                <span class="text">510456199612135895</span>
              </div>

              <div class="id-box flex-start-center">
                <img class="icon-phone" src="./icons/phone_icon.png" alt="icon">
                <span class="text text-tel">13656235698</span>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 工作台项目 -->
        <el-col :span="18">
          <el-row 
            type="flex" 
            class="organization-wraper" 
            justify="start" 
            align="middle"
          >
            <el-col :span="4" class="flex-all-center">
              <div class="flex-start-center">
                <img class="home-icon" src="./icons/home_icon.png" alt="icon">
                <span class="current-org">当前企业</span>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="flex-all-center">
                <el-dropdown trigger="click">
                  <span class="current-org-name">中国移动成都产业研究院</span>
                  <i 
                    style="color: #3859D7;font-size:24px" 
                    class="el-icon-arrow-down el-icon--right"
                  >
                  </i>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span :style="listOrgName">中国移动成都产业研究院</span>
                      <span :style="listCurrentTag">当前企业</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span :style="listOrgName">研究院</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span :style="listOrgName">华西医养中心</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Workbench',
  data() {
    return {
      timeTimer: null,
      nowTime: '',

      // 内联样式覆盖elementui的
      listOrgName: {
        'display': 'inline-block',
        'font-size': '16px',
        'font-weight': 500,
        'color': 'rgba(89,89,89,1)',
        'line-height': '24px',
        'padding': '15px 10px'
      },
      listCurrentTag: {
        'font-size': '14px',
        'font-weight': 500,
        'color': 'rgba(63,88,207,1)',
        'line-height': '21px',
        'margin-left': '50px'
      }
    };
  },
  mounted() {
    this.countTime();
  },
  methods: {
    transformTime() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let week = time.getDay();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let second = time.getSeconds();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      second = second < 10 ? '0' + second : second;

      this.nowTime = `${year}年${month}月${day}日 星期${week} ${hours}:${minutes}:${second}`;
    },
    // 定时器函数
    countTime() {
      this.transformTime();
      this.timeTimer = setTimeout(this.countTime, 1000);
    }
  },
  beforeRouterLeave(to, from, next) {
    clearTimeout(this.timeTimer);
  }
};
</script>

<style lang="scss" scoped>
/* 头部导航条样式 */
.header-wraper {
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid rgba(229,229,229,1);
  box-sizing: border-box;
  padding: 0 35px;
  .cm-logo {
    width: 101px;
    margin-top: 10px;
  }
  .time-wraper {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular,SourceHanSansCN;
    font-weight: 400;
    color: rgba(93,95,98,1);
    line-height: 21px;
  }
  .division-line {
    display: inline-block;
    width: 1px;
    height: 28px;
    background-color: #D1D9E2;
  }
  .avatar {
    width: 31px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .info-wraper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .name-box {
    cursor: pointer;
    .name {
      font-size: 14px;
      font-weight: 400;
      color: rgba(94,94,94,1);
      line-height: 21px;
    }
  }
}

/* 主体内容 */
.content-wraper {
  margin: 28px 186px 0;

  .info-board {
    position: relative;
    width: 320px;
    min-height: 411px;
    padding: 28px 32px 52px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 1px 0px 6px 0px rgba(183,185,203,0.5);
  }
  .blue-top-bar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 125px;
    height: 8px;
    background: rgba(63,88,207,1);
    border-radius: 11px;
  }
  .user-avatar-box {
    text-align: center;
    .user-avatar {
      width: 125px;
      border-radius: 50%;
    }
  }
  .user-name {
    font-size: 28px;
    font-family: SourceHanSansCN-Medium,SourceHanSansCN;
    font-weight: 500;
    color: rgba(75,112,157,1);
    line-height: 42px;
    text-align: center;
    margin-top: 22px;
  }
  .user-id {
    color: rgba(90,90,90,1);
    line-height: 21px;
    margin-top: 15px;
    text-align: center;
  }
  .id-tel-wraper {
    border-top: 1px solid #E3E3E3;
    margin-top: 32px;
    padding: 28px 12px 0;
    box-sizing: border-box;
    .id-box {
      &:not(:last-child) {
        margin-bottom: 22px;
      }
    }
    .icon-id {
      width: 17px;
    }
    .text {
      font-size: 18px;
      font-weight: 400;
      color: rgba(163,163,163,1);
      line-height: 27px;
      margin-left: 8px;
    }
    .icon-phone {
      width: 11px;
    }
    .text-tel {
      margin-left: 12px !important;
    }
  }
  
  /* 选择机构部分 */
  .organization-wraper {
    background-color: #fff;
    box-shadow: 1px 0px 6px 0px rgba(183,185,203,0.5);
    border-radius: 8px;
    height: 71px;
    .home-icon {
      width: 18px;
      margin-right: 6px;
    }
    .current-org {
      font-size: 16px;
      font-weight: 400;
      color: rgba(63,88,207,1);
      line-height: 24px;
    }

    .current-org-name {
      font-size: 24px;
      font-weight: 500;
      color: rgba(89,89,89,1);
      line-height: 36px;
      cursor: pointer;
    }
  }
}

/* 通用样式 */
.flex-start-center {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex-all-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>