<template>
  <div class="organManage">
    <div class="coat1">
      <div class="coat2">
        <div class="operateMenu">
          <ul class="clearfix">
            <li @click="addDialog = true">添加</li>
            <li @click="pitchOn() && (getChooseData(), (editDialog = true))">
              编辑
            </li>
            <li @click="importDialog = true">导入</li>
            <li @click="pitchOn2() && (deleteDialog = true)">删除</li>
            <li @click="flush()">刷新</li>
          </ul>
        </div>
        <div class="fgx"></div>
        <div class="organTable">
          <el-table
            :data="organData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="title" label="机构名称" width="225">
            </el-table-column>
            <el-table-column prop="coding" label="机构编码" width="225">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="225">
            </el-table-column>
            <el-table-column prop="describeP" label="描述"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="225">
            </el-table-column>
          </el-table>
          <Pagination
            class="user-list-pagination"
            :curPage="currentPage"
            :totalPage="totalPage"
            :size="pageSize"
            @handleCurrentChange="changePage"
          />
        </div>
        <div class="dialog">
          <!--添加-->
          <fly-dialog title="添加机构" :show.sync="addDialog">
            <div class="from">
              <el-form
                ref="form"
                :model="form"
                status-icon
                :rules="rules"
                :hide-required-asterisk="asterisk"
                label-width="50%"
                class="demo-ruleForm"
              >
                <el-form-item label="机构名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="机构编码" prop="code">
                  <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="机构描述" prop="desc">
                  <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="上级机构" prop="superior">
                  <el-select
                    v-model="form.superior"
                    popper-class="fromselect"
                    placeholder="请选择部门"
                    @change="chooseDepartmentId"
                  >
                    <el-option
                      v-for="(item, index) in superiorList"
                      :key="index"
                      :label="item.title"
                      :value="item.title"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="下辖授权数" prop="authNum">
                  <el-input
                    v-model="form.authNum"
                    placeholder="为大于0的整数"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="butCoat">
              <el-button class="canBut" @click="addDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="addOrgan">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
          <!--编辑-->
          <fly-dialog title="编辑机构" :show.sync="editDialog">
            <div class="from">
              <el-form
                ref="form"
                :model="organInfo"
                status-icon
                :rules="rules"
                :hide-required-asterisk="asterisk"
                label-width="50%"
                class="demo-ruleForm"
              >
                <el-form-item label="机构名称" prop="title">
                  <el-input v-model="organInfo.title"></el-input>
                </el-form-item>
                <el-form-item label="机构编码" prop="coding">
                  <el-input
                    v-model="organInfo.coding"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="机构层级" prop="superior">
                  <el-select
                    v-model="organInfo.parentId"
                    popper-class="fromselect"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in organDepartment"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="机构描述" prop="describeP">
                  <el-input v-model="organInfo.describeP"></el-input>
                </el-form-item>
                <el-form-item label="机构状态" prop="state">
                  <el-select
                    v-model="organInfo.state"
                    popper-class="fromselect"
                    placeholder="请选择状态"
                  >
                    <el-option
                      v-for="item in stateList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="下辖授权数" prop="authNum">
                  <el-input
                    v-model="organInfo.roleCount"
                    placeholder="为大于0的整数"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="butCoat">
              <el-button class="canBut" @click="closeEditOrgan">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="editOrgan">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
          <!--导入-->
          <fly-dialog title="导入机构" :show.sync="importDialog">
            <span class="content">导入</span>
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-error="uploadError"
              :on-success="uploadSuccess"
              :limit="1"
              :on-exceed="handleExceed"
              :auto-upload="false"
            >
              <el-button class="impBut" size="small" type="primary">
                <span>点击上传</span>
              </el-button>
              <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
            </el-upload>
            <div class="butCoat">
              <el-button class="canBut" @click="importDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="importOrgan">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
          <!--删除-->
          <fly-dialog title="删除" :show.sync="deleteDialog">
            <span class="content">确定删除？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="deleteDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="deleteOrgan()">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import FlyDialog from '@/components/fly-dialog'
import Pagination from '@/components/Pagination'
import {
  queryDepartment,
  addDepartment,
  queryDepartmentApi,
  editDepartment,
  delDepartment,
} from '@/api/system'

export default {
  name: 'organManage',
  metaInfo: {
    title: '机构管理',
  },
  components: {
    FlyDialog,
    Pagination,
  },
  data() {
    return {
      uploadURL:
        process.env.VUE_APP_COMMON_REQUEST_URL +
        'admin/importExcelDe?accessToken=' +
        Cookies.get('ac_token') +
        '&roleStr=' +
        Cookies.get('roleStr'),
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页显示信息条数
      totalPage: 1, // 总页数
      asterisk: true,
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      importDialog: false,
      form: {
        name: '',
        code: '',
        desc: '',
        superior: '',
        authNum: '',
        departmentId: '',
      },
      organInfo: {
        // 编辑时的数据
        name: '',
        code: '',
        hierarchy: '',
        state: 1,
        roleCount: '',
        superior: '',
      },
      organDepartment: [],
      stateList: [
        {
          value: 0,
          label: '有效',
        },
        {
          value: -1,
          label: '无效',
        },
      ],
      rules: {
        name: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入机构编码', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
      },
      // 上级机构列表
      superiorList: [
        {
          id: '',
          pid: '',
          title: '',
        },
      ],
      // 机构信息
      organData: [
        {
          coding: '',
          createBy: '',
          createTime: '',
          delFlag: null,
          describeP: '',
          establishmentLevel: '',
          id: '',
          parentId: '',
          roleCount: 0,
          sortCountSum: 0,
          sortCountSy: 0,
          sortId: null,
          status: null,
          title: '',
          updateBy: null,
          updateTime: null,
        },
      ],
      fileList2: [],
      multipleSelection: [],
    }
  },
  methods: {
    // 判断是否只选择一个机构
    pitchOn() {
      let isPitchOn = false
      this.multipleSelection.length === 1
        ? (isPitchOn = true)
        : this.$message.error('请选择一条数据!')
      return isPitchOn
    },
    // 判断是否选择机构
    pitchOn2() {
      let isPitchOn = false
      this.multipleSelection.length > 0
        ? (isPitchOn = true)
        : this.$message.error('请至少选择一条数据!')
      return isPitchOn
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeUpload(file) {
      const isText = file.type === 'application/vnd.ms-excel'
      const isTextComputer =
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      return isText | isTextComputer
    },
    uploadError() {
      this.$message({
        message: '文件上传失败!',
        type: 'error',
      })
    },
    uploadSuccess(res, file, fileList) {
      console.log(res, file, fileList)
      this.$message({
        type: 'success',
        message: '文件上传成功',
      })
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
    },
    // 删除机构
    deleteOrgan() {
      const selectedDepartment = this.multipleSelection[0]

      delDepartment({
        id: selectedDepartment.id,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.organData.map((value, index) => {
            if (value === selectedDepartment) {
              this.organData.splice(index, 1)
            }
          })

          this.$message({
            message: '删除成功',
            type: 'success',
          })

          this.deleteDialog = false
        } else {
          this.$message.error(data.data)
        }
      })
    },
    // 刷新
    flush() {
      this.initPage(() => {
        this.$message({
          message: '刷新成功',
          type: 'success',
        })
      })
    },
    // 导入
    importOrgan() {
      this.$refs.upload.submit()
      this.importDialog = false
    },
    // ------------------- edit by singleDogNo.1 -------------------
    // 添加机构
    chooseDepartmentId(val) {
      this.superiorList.map(value => {
        if (value.title === val) {
          this.form.departmentId = value.id
        }
      })
    },
    editOrgan() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          editDepartment({
            userId: Cookies.get('userId'),
            id: this.organInfo.id,
            title: this.organInfo.title,
            coding: this.organInfo.coding,
            describe: this.organInfo.describeP,
            parentId: this.organInfo.parentId,
            status: this.organInfo.state,
            roleCount: this.organInfo.roleCount,
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.initPage(() => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                })
                this.editDialog = false
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    closeEditOrgan() {
      this.editDialog = false
      this.organInfo = {}
      this.organDepartment = []
    },
    getChooseData() {
      this.organInfo = {
        id: this.multipleSelection[0].id,
        title: this.multipleSelection[0].title,
        coding: this.multipleSelection[0].coding,
        superior: null,
        parentId: this.multipleSelection[0].parentId,
        state: this.multipleSelection[0].status === '有效' ? 0 : -1,
        roleCount: this.multipleSelection[0].roleCount,
        describeP: this.multipleSelection[0].describeP,
        establishmentLevel: this.multipleSelection[0].establishmentLevel,
      }
      const copyDepartment = this.superiorList
      copyDepartment.shift()
      this.organDepartment = copyDepartment
      copyDepartment.forEach(value => {
        if (value.id === this.organInfo.parentId) {
          this.organInfo.superior = value.title
        }
      })
    },
    addOrgan() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          addDepartment({
            userId: Cookies.get('userId'),
            title: this.form.name,
            coding: this.form.code,
            describe: this.form.desc,
            parentId: this.form.departmentId,
            roleCount: this.form.authNum,
          }).then(({ data }) => {
            if (data && data.code === 200) {
              // 添加成功，重新拉取数据更新视图
              this.initPage(() => {
                this.$message({
                  message: '添加成功',
                  type: 'success',
                })
                this.addDialog = false
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    changePage(page) {
      this.currentPage = page
      this.getDepartmentList()
    },
    getDepartmentList(page = this.currentPage, size = this.pageSize) {
      queryDepartment({ page, size }).then(({ data }) => {
        if (data && data.code === 200) {
          const {
            list, // 当前页相关数据
            p, // 分页相关数据
          } = data.data

          list.map(value => {
            value.status = value.status === 0 ? '有效' : '无效'
          })

          this.organData = list
          this.currentPage = p.current
          this.totalPage = Math.ceil(p.total / p.size)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    async initPage(callback = () => {}) {
      await this.getDepartmentList()
      await queryDepartmentApi().then(({ data }) => {
        if (data && data.code === 200) {
          this.superiorList = data.data
          this.superiorList.unshift({
            id: -1,
            pid: -1,
            title: '（不选择）',
          })
        } else {
          this.$message.error(data.msg)
        }
      })
      await callback()
    },
  },
  mounted() {
    this.initPage()
  },
}
</script>

<style lang="stylus" scoped>
.organManage
  margin 0 auto
  position relative
.organManage ul
  display inline-block
.organManage ul li
  float left
  padding 8px 18px
  margin 0 3px
  color #ffffff
  background-color rgba(44, 239, 255, 0.3)
  border-radius: 2px;
.operateMenu
  text-align center
  margin 0 auto
.fgx
  width 95%
  margin 10px auto
  border-bottom 2px solid rgba(44, 239, 255, 0.4)
.organTable >>>
 .el-table th,
 .el-table tr
  background-color rgba(44, 239, 255, 0.2)!important
 .el-table,
 .el-table__expanded-cell
   background-color rgba(44, 239, 255, 0)!important
   color #ffffff
 .el-table--enable-row-hover .el-table__body tr:hover>td
  background-color rgba(44, 239, 255, 0.2)!important
 .el-table thead
  color #ffffff
.organTable >>>
  .el-table td,
  .el-table th.is-leaf
    border: 1px solid #143d4b!important;
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before
    background-color transparent;
.organManage
  .dialog
    .el-form-item
      width 180px
      display inline-block
      margin-right 8px
    >>>.el-input__inner {
      border-radius: 0px;
      background-color: rgba(44, 239, 255, 0.2);
      border: 1px none #DCDFE6;
      color: #ffffff;
    }
    .content
      min-width 50px
      display block
      color #ffffff
      text-align center
</style>
