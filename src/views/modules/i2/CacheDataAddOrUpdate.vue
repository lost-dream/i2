<template>
  <fly-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mode-add-update">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文件夹">
          <el-select v-model="dataForm.foder" placeholder="请选择文件夹">
            <el-option
              v-for="item in folderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="dataForm.dataType" placeholder="请选择数据类型">
            <el-option
              v-for="(item, index) in dataTypeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="dataForm.description"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="dataForm.keywords" auto-complete="off"></el-input>
        </el-form-item>
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
        id: 0,
        name: '',
        foder: '',
        dataType: '',
        description: '',
        keywords: '',
      },
      dataTypeList: [
        // TODO 后期会改成server返回，不确定返回格式，暂定label === value
        {
          label: 'Person',
          value: 'Person',
        },
        {
          label: 'Case',
          value: 'Case',
        },
        {
          label: 'Household',
          value: 'Household',
        },
        {
          label: 'Car',
          value: 'Car',
        },
        {
          label: 'DrivingLicense',
          value: 'DrivingLicense',
        },
      ],
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      console.log(this.dataForm.id)
      this.$api
        .getAllFolderByUserName({
          userName: JSON.parse(this.$Cookies.get('user_info')).username,
        })
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
            if (this.dataForm.id) {
              this.$api.dataCacheGetById(this.dataForm.id).then(({ data }) => {
                if (data && data.code === 200) {
                  this.dataForm.name = data.result.name
                  this.dataForm.foder = data.result.folderId
                  this.dataForm.dataType = data.result.dataType
                  this.dataForm.description = data.result.description
                  this.dataForm.keywords = data.result.keywords
                }
              })
            }
          })
        })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          let obj = [
            {
              name: this.dataForm.name,
              dataType: this.dataForm.dataType,
              folderId: this.dataForm.foder,
              description: this.dataForm.description,
              keywords: this.dataForm.keywords,
            },
          ]
          this.$api
            .dataCacheSaveOrUpdate(!this.dataForm.id ? 'save' : 'update', obj)
            .then(({ data }) => {
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
