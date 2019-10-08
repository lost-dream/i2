<template>
  <fly-dialog
    :title="!dataForm.type ? '移动至文件夹' : '复制至文件夹'"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mode-add-update">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
      >
        <el-form-item label="文件夹">
          <el-select v-model="dataForm.foder" placeholder="请选择">
            <el-option
              v-for="item in folderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="关键字">
          <el-input
            v-model="dataForm.keywords"
            auto-complete="off"
          ></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    <span slot="ft" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </fly-dialog>
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
      folderList: [],
      dataForm: {
        type: 0,
        ids: [],
        foder: '',
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(type, ids) {
      this.dataForm.type = type || 0
      this.dataForm.ids = ids
      this.$api
        .getAllFolderByUserName('10011')
        .then(({ data }) => {
          let list = data && data.code === 200 ? data.result : []
          let arr = []
          for (let i in list) {
            arr.push({
              value: list[i].id,
              label: list[i].folderName,
            })
          }
          this.folderList = arr
        })
        .then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          let obj = {
            cacheIds: this.dataForm.ids,
            targetFolderId: this.dataForm.foder,
            operateFlag: !this.dataForm.type ? 'dataMove' : 'dataCopy',
          }
          this.$api.dataCacheMoveOrCopy(obj).then(({ data }) => {
            if (data && data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                },
              })
            }
          })
        }
      })
    },
    beforeClose() {
      this.$emit('refreshDataList')
      this.visible = false
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped>
.mode-add-update
  padding 10px
  >>>.el-input__inner
    color #fff !important
</style>
