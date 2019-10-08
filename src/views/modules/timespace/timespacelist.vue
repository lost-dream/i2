<template>
  <div class="timespacelist">
    <div class="tsimp">
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            popper-class="datePicker"
            type="date"
            placeholder="选择开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate">
          <el-date-picker
            popper-class="datePicker"
            v-model="form.endDate"
            type="date"
            placeholder="选择结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="infoCoat1">
      <div class="infoCoat2">
        <div class="infoList">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              placement="top"
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              <div class="listCoat1">
                <div class="listCoat2">
                  <div v-if="tooltype == 'hc'">
                    <div class="infoItem" style="width: 17%">
                      <span
                        ><img src="../../../assets/img/huoche.png" alt=""
                      /></span>
                      <span style="font-size: 14px">&nbsp;火车出行信息</span>
                    </div>
                    <div class="infoItem" style="width: 32%">
                      <span style="font-size: 18px">成都东 to 广安南</span>
                      <span class="el-icon-time">&nbsp;2015年6月25日11:41</span>
                    </div>
                    <div class="infoItem" style="width: 23%">
                      <span class="icon-zdy-facheshikebiao">&nbsp;D5172次</span>
                    </div>
                    <div class="infoItem" style="width: 23%">
                      <span class="icon-zdy-yizi">&nbsp;05车11F</span>
                    </div>
                    <div class="infoItem" style="width: 5%">
                      <span
                        @click="gotoInfo"
                        class="el-icon-d-arrow-right"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="infoCard" v-show="showCard">
      <personal-info-card></personal-info-card>
    </div>
  </div>
</template>

<script>
import personalInfoCard from "@/views/common/personalInfoCard";
export default {
  name: "timespacelist",
  components: {
    personalInfoCard
  },
  data() {
    return {
      form: {
        idNumber: "",
        startDate: "",
        endDate: ""
      },
      tooltype: "hc",
      rules: {
        idNumber: this.filter_rules({ required: true, type: "idCard" }),
        startDate: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请选择结束日期", trigger: "blur" }
        ]
      },
      reverse: false,
      showCard: true,
      partiesInfo: {
        name: "fffff"
      },
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ]
    };
  },
  created() {
    var _self = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key === 13) {
        _self.onSubmit("form");
      }
    };
  },
  beforeDestroy() {
    document.onkeydown = function(e) {
      var key = window.event.keyCode;

      if (key === 13) {
      }
    };
  },
  mounted() {
    this.$route.params.form !== undefined && this.receiveRouter();
    document.addEventListener("click", this.handleDocumentClick);
  },
  methods: {
    // 获取路由参数
    receiveRouter() {
      this.form = JSON.parse(JSON.stringify(this.$route.params.form));
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.form);
        console.log(valid);
        if (valid) {
          alert("submit!");
          console.log(
            this.form.oldPass,
            this.form.newPass,
            this.form.checkPass
          );
          this.getTimespaceList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getTimespaceList() {
      this.$api.spacequery(this.from).then(({ data }) => {
        console.log(data);
      });
    },
    gotoInfo() {
      this.$router.push({
        name: "timespaceinfo",
        params: {
          partiesInfo: this.partiesInfo
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.timespacelist
      width 100%
      position relative
   .tsimp
       width 606px
       margin 0 auto
       padding-top 23px
     .el-form-item
        margin 0 1px
     >>>.el-form-item__error
        top 50px!important
        left 0!important
   .infoCoat1
       width 1200px
       max-height 720px
       margin 0 auto
       margin-top 30px
       overflow hidden
       /*padding 100px*/
   .infoCoat2
       width 1220px
       max-height 860px
       margin 0 auto
       overflow-y  scroll
       /*padding 100px*/
   .infoList
       width 865px
       max-height 860px
       margin 0 auto
       margin-top 55px
     >>>.el-timeline-item__tail
       border-left 1px solid rgba(44, 239, 255, 1)
     >>>.el-timeline-item__node
       background-color rgba(44, 239, 255, 1)
     >>>.el-timeline-item
       padding  0
     >>>.el-timeline-item__timestamp
         position relative
         top 0.5px
         left -110px
         color #ffffff
         font-size 14px
     >>>.el-timeline-item__timestamp.is-top
         margin 0
         padding 0
     >>>.el-timeline-item__content
         position relative
         top -65px
         left -20px
       .listCoat1
         width 740px
         height 110px
         position relative
         top 0
         left 0
         right 0
         bottom 0
         margin 0 auto
         background-color rgba(44, 239, 255, 0.1)
         padding 10px
       .listCoat2
             width 720px
             height 90px
             position relative
             top 0
             left 0
             right 0
             bottom 0
             margin 0 auto
             background-color rgba(44, 239, 255, 0.1)
             border solid 1px rgba(44, 239, 255, 0.2)
           .infoItem
               float left
               display inline-block
               height 90px
               padding 10px 0
             span
               display inline-block
               width 100%
               text-align center
               color #ffffff
               font-size 16px
               line-height: 30px;
           .infoItem:nth-child(2) span
               text-align initial
               line-height: 38px;
           .infoItem:nth-child(3),
           .infoItem:nth-child(4)
             span
               line-height: 113px;
</style>
