<template>
  <div>
    <fly-dialog
      width="500px"
      title="碰撞对比分析"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <div class="mode-cachedata">
        <el-form
          :model="dataForm"
          :rules="dataRule"
          ref="dataForm"
          @keyup.enter.native="dataFormSubmit()"
          label-width="80px"
        >
          <el-form-item label="碰撞源">
            <el-checkbox-group v-model="dataForm.checkList">
              <el-checkbox
                v-for="(item, index) of relationTypeList"
                :label="item.type"
                :key="index"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="ft" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">分析</el-button>
      </span>
    </fly-dialog>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
export default {
  components: {
    FlyDialog,
  },
  props: {},
  data() {
    return {
      visible: false,
      relationTypeList: [
        {
          type: 'Fugitive',
          name: '在逃人员',
        },
        {
          type: 'ImportantControl',
          name: '重点人',
        },
        {
          type: 'Car',
          name: '车',
        },
        {
          type: 'RailwayReal',
          name: '铁路实名制 ',
        },
        {
          type: 'Case',
          name: '案件',
        },
      ],
      dataForm: {
        keywords: '',
        name: '',
        folderId: '',
        checkList: [],
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init() {
      this.$api
        .getAllFolderByUserName('10011')
        .then(({ data }) => {})
        .then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        })
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped>
>>>.el-checkbox
  color #fff
  font-weight 500
  font-size 14px
  cursor pointer
  -moz-user-select none
  -webkit-user-select none
  -ms-user-select none
  user-select none
  margin-right 30px
>>>.el-input__inner
  color #fff !important
>>>.el-form--inline .el-form-item
  display inline-block
  margin-right 10px
  vertical-align top
  width 150px
.mode-cachedata
  padding 10px
.filter-form
  padding-bottom 10px
.el-table__body
  tr.hover-row>td
    background-color transparent !important
</style>
