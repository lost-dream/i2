<template>
  <div class="mod-basic">
    <div class="title tab-title">
      <span>个人信息</span>
    </div>
    <div class="basic-content tab-content">
      <div class="basic-info">
        <p><label class="key-info">证件号码</label>{{basicInfo.idNumber}}</p>
        <p><label class="key-info">姓名</label>{{basicInfo.name}}</p>
        <p><label class="key-info">民族</label>{{basicInfo.nation}}</p>
        <p><label class="key-info">性别</label>{{basicInfo.sex}}</p>
        <p><label class="key-info">出生日期</label>{{basicInfo.birthday}}</p>
        <p><label class="key-info">联系电话</label>{{basicInfo.cellphone}}</p>
        <p><label class="key-info">现居地</label>{{basicInfo.currentAddress}}</p>

      </div>
      <div class="image-info"> <img src=""></div>
    </div>
    <div class="title tab-title">
      <span>个人标签</span>
      <span
        class="fly-icon el-icon-plus"
        title="新增标签"
        @click="addTagHandle"
      ></span>
    </div>
    <div class="pTag">
      <el-tag
        v-for="tag in tagList"
        :key="tag.content"
        closable
        type=""
        @close="handleCloseTag(tag)"
        class="tag-item"
      >
        {{tag.content}}
      </el-tag>
    </div>
    <fly-dialog
      title="新增标签"
      width="400px"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
        class="addTagForm"
      >
        <el-form-item label="标签名称">
          <el-input
            v-model="dataForm.content"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="ft"
        class="dialog-footer"
      >
        <el-button @click="visible=false">取消</el-button>
        <el-button
          type="primary"
          @click="dataFormSubmit()"
        >确定</el-button>
      </span>
    </fly-dialog>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
export default {
  components: {
    FlyDialog
  },
  props: {
    basicInfo: {
      type: Object,
      default: function () {
        return {
          idNumber: '',
          name: '',
          nation: '',
          sex: '',
          birthday: '',
          cellphone: '',
          currentAddress: ''
        }
      }
    }
  },
  data () {
    return {
      visible: false,
      dataForm: {
        content: ''
      },
      dataRule: {}
    }
  },
  computed: {
    tagList: {
      set (value) {
        this.basicInfo.tagList.push(value);
      },
      get () {
        return this.basicInfo.tagList;
      }
    }
  },
  methods: {
    // 新增标签
    addTagHandle () {
      this.visible = true;
    },
    // 删除标签
    handleCloseTag (tag) {
      this.$api.deletePersonTag({ tagId: tag.id }).then(({ data }) => {
        if (data && data.code === 200) {
          this.tagList.splice(this.tagList.indexOf(tag), 1);
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = {
            idNumber: this.basicInfo.idNumber,
            content: this.dataForm.content
          }
          this.$api.savePersonTag(param).then(({ data }) => {
            if (data && data.code === 200) {
              this.tagList.push({ content: this.dataForm.content })
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                }
              })
            }
          })
        }
      })
    }
  },
  created () {
  },
  mounted () { }
}
</script>
<style lang="stylus" scoped>
>>>.el-input__inner
  color #fff !important
.el-tag
  background-color #70dbe8a8
  border-color #4dd4e6
  display inline-block
  height 32px
  padding 0 10px
  line-height 30px
  font-size 12px
  color #f2c43c
  border-width 1px
  border-style solid
  border-radius 4px
  -webkit-box-sizing border-box
  box-sizing border-box
  white-space nowrap
  margin 0 10px 10px 0
>>>.el-tag .el-tag__close
  color #d5dee8
.mod-basic, .basic-content
  .basic-info
    color #fff
    min-height 220px
    p
      font-size 14px
      color #fdfdfd
      .key-info
        margin-right 15px
.pTag
  padding 10px
  .tag-item
    margin 0 10px 10px 0
.fly-icon
  float right
  background #fff
  width 16px
  height 16px
  text-align center
  line-height 16px
  margin-top 6px
  color #e58628
  cursor pointer
  border-radius 2px
.addTagForm
  margin-top 20px
  margin-right 20px
</style>
