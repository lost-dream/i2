<template>
  <div id="userManage">
    <div class="coat1">
      <div class="coat2">
        <div class="operateMenu">
          <ul class="clearfix">
            <li @click="clearValue(), (addDialog = true)">添加</li>
            <li @click="pitchOn() && (addValue(), (editDialog = true))">
              编辑
            </li>
            <li @click="lookUser">查看</li>
            <li @click="pitchOn2() && (deleteDialog = true)">删除</li>
            <li @click="importDialog = true">导入</li>
            <li @click="exportDialog = true">导出</li>
            <li @click="pitchOn() && (startDialog = true)">启用</li>
            <li @click="pitchOn() && (stopDialog = true)">停用</li>
            <li @click="pitchOn() && (resetPassDialog = true)">重置密码</li>
            <li @click="pitchOn() && (resetAnswerDialog = true)">重置回答</li>
            <li @click="flush()">刷新</li>
          </ul>
        </div>
        <div class="fgx"></div>
        <div class="criteria">
          <el-form
            ref="criteria"
            :model="criteria"
            status-icon
            class="demo-ruleForm"
          >
            <el-form-item>
              <el-input
                v-model="criteria.user"
                placeholder="登录名（输入)"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="criteria.name"
                placeholder="姓名（输入）"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="criteria.status"
                popper-class="fromselect"
                placeholder="请选择状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="criteria.section"
                popper-class="fromselect"
                placeholder="请选择部门"
              >
                <el-option
                  v-for="(item, index) in sectionList"
                  :key="index"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="criteria.userGroup"
                popper-class="fromselect"
                placeholder="请选择用户组"
              >
                <el-option
                  v-for="(item, index) in userGroupList"
                  :key="index"
                  :label="item.description"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="seekBut" type="primary" @click="search">
                <span>搜索</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="userList">
          <div class="organTable">
            <el-table
              ref="multipleTable"
              :data="userList"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="username"
                label="登录名"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="nickName"
                label="姓名"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="description"
                label="部门"
                width="110"
              ></el-table-column>
              <el-table-column
                prop="userGroup"
                label="用户组"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="endTime"
                label="最后登录时间"
                width="180"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="loginWay"
                label="登录类型"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="policeType"
                label="警种类别"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="berichtenDepartment"
                label="上报部门"
              ></el-table-column>
            </el-table>
          </div>
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
          <fly-dialog title="添加用户" width="560px" :show.sync="addDialog">
            <el-form
              ref="form"
              :model="form"
              status-icon
              :rules="rules"
              :hide-required-asterisk="asterisk"
              label-width="49%"
              class="demo-ruleForm"
            >
              <el-form-item label="登陆账号" prop="user">
                <el-input v-model="form.user"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="IDCard">
                <el-input v-model="form.IDCard"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
              </el-form-item>
              <el-form-item label="警号" prop="policeNo">
                <el-input v-model="form.policeNo"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="departmentId">
                <el-select
                  v-model="form.departmentId"
                  popper-class="fromselect"
                  placeholder="请选择部门"
                >
                  <el-option
                    v-for="(item, index) in sectionList"
                    :key="index"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户组" prop="userGroup">
                <el-select
                  v-model="form.userGroup"
                  popper-class="fromselect"
                  placeholder="请选择用户组"
                >
                  <el-option
                    v-for="(item, index) in userGroupList"
                    :key="index"
                    :label="item.description"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!--<el-form-item label="登录类型" prop="loginType">
                <el-select
                  v-model="form.loginType"
                  popper-class="fromselect"
                  placeholder="请选择登录类型"
                >
                  <el-option
                    v-for="(item, index) in loginTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>-->
              <!--<el-form-item label="状态" prop="status">
                <el-select
                  v-model="form.status"
                  popper-class="fromselect"
                  placeholder="请选择状态"
                >
                  <el-option
                    v-for="(item, index) in statusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>-->
              <el-form-item label="警种类别" prop="policeKind">
                <el-select
                  v-model="form.policeKind"
                  popper-class="fromselect"
                  placeholder="请选择警种类别"
                >
                  <el-option
                    v-for="(item, index) in policeKindList"
                    :key="index"
                    :label="item.typeName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上报部门" prop="reportedSection">
                <el-select
                  v-model="form.reportedSection"
                  popper-class="fromselect"
                  placeholder="请选择上报部门"
                  @change="chooseDepartmentId"
                >
                  <el-option
                    v-for="(item, index) in sectionList"
                    :key="index"
                    :label="item.title"
                    :value="item.title"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="butCoat">
              <el-button class="canBut" @click="addDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="addUser">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
          <!-- 编辑 -->
          <fly-dialog title="编辑用户" width="560px" :show.sync="editDialog">
            <el-form
              ref="form"
              :model="form"
              status-icon
              :hide-required-asterisk="asterisk"
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="登陆账号" prop="username">
                <el-input v-model="form.username" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="nickName">
                <el-input v-model="form.nickName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="departmentId">
                <el-select
                  v-model="form.departmentId"
                  popper-class="fromselect"
                  placeholder="请选择部门"
                >
                  <el-option
                    v-for="(item, index) in sectionList"
                    :key="index"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户组" prop="userGroup">
                <el-select
                  v-model="form.userGroup"
                  popper-class="fromselect"
                  placeholder="请选择用户组"
                >
                  <el-option
                    v-for="(item, index) in userGroupList"
                    :key="index"
                    :label="item.description"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="登录类型" prop="loginType">
                <el-select
                  v-model="form.loginType"
                  popper-class="fromselect"
                  placeholder="请选择登录类型"
                >
                  <el-option
                    v-for="item in loginTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>-->
              <!--<el-form-item label="状态" prop="status">
                <el-select
                  v-model="form.status"
                  popper-class="fromselect"
                  placeholder="请选择状态"
                >
                  <el-option
                    v-for="(item, index) in statusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>-->
              <el-form-item label="警种类别" prop="policeKind">
                <el-select
                  v-model="form.policeKind"
                  popper-class="fromselect"
                  placeholder="请选择警种类别"
                >
                  <el-option
                    v-for="(item, index) in policeKindList"
                    :key="index"
                    :label="item.typeName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上报部门" prop="reportedSection">
                <el-select
                  v-model="form.reportedSection"
                  popper-class="fromselect"
                  placeholder="请选择上报部门"
                >
                  <el-option
                    v-for="(item, index) in sectionList"
                    :key="index"
                    :label="item.title"
                    :value="item.title"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="butCoat">
              <el-button class="canBut" @click="editDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="editUser">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
          <!--查看-->
          <fly-dialog title="查看用户详情" width="560px" :show.sync="lookDialog">
            <div id="uesrInfo">
              <div>
                <span>登陆账号:</span>
                <span>{{ lookInfo.username }}</span>
              </div>
              <div>
                <span>姓名:</span>
                <span>{{ lookInfo.nickName }}</span>
              </div>
              <div>
                <span>部门:</span>
                <span>
                  {{
                    lookInfo.description === '' || lookInfo.description === null
                      ? '暂无数据'
                      : lookInfo.description
                  }}
                </span>
              </div>
              <div>
                <span>用户组:</span>
                <span>{{ lookInfo.userGroup }}</span>
              </div>
              <!-- <div>
                <span>登录类型:</span>
                <span>{{ lookInfo.loginType }}</span>
              </div>-->
              <div>
                <span>状态:</span>
                <span>{{ lookInfo.status }}</span>
              </div>
              <div>
                <span>警种类别:</span>
                <span>{{ lookInfo.policeType }}</span>
              </div>
              <div>
                <span>上报部门:</span>
                <span>
                  {{
                    lookInfo.berichtenDepartment === '' ||
                    lookInfo.berichtenDepartment === null
                      ? '暂无数据'
                      : lookInfo.berichtenDepartment
                  }}
                </span>
              </div>
              <div class="butCoat">
                <el-button class="canBut" @click="lookDialog = false">
                  <span>取 消</span>
                </el-button>
              </div>
            </div>
          </fly-dialog>
          <!--删除-->
          <fly-dialog title="删除" :show.sync="deleteDialog">
            <span class="content">确定删除？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="deleteDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="deleteUser">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
          <!-- 导入 -->
          <fly-dialog title="导入" :show.sync="importDialog">
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
              <el-button class="impBut" size="small" type="primary"
                >点击上传</el-button
              >
              <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
            </el-upload>
            <div class="butCoat">
              <el-button class="canBut" @click="importDialog = false"
                >取 消</el-button
              >
              <el-button class="okBut" type="primary" @click="importUser"
                >确 定</el-button
              >
            </div>
          </fly-dialog>
          <!--导出-->
          <fly-dialog title="导出" :show.sync="exportDialog">
            <span class="content">导出</span>
            <div class="butCoat">
              <el-button class="canBut" @click="exportDialog = false"
                >取 消</el-button
              >
              <el-button class="okBut" type="primary" @click="exportUser"
                >确 定</el-button
              >
            </div>
          </fly-dialog>
          <!--启用-->
          <fly-dialog title="启用" :show.sync="startDialog">
            <span class="content">确定启用该用户？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="startDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="startUser">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
          <!--停用-->
          <fly-dialog title="停用" :show.sync="stopDialog">
            <span class="content">确定停用该用户？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="stopDialog = false"
                >取 消</el-button
              >
              <el-button class="okBut" type="primary" @click="stopUser"
                >确 定</el-button
              >
            </div>
          </fly-dialog>
          <!--重置密码-->
          <fly-dialog title="重置密码" :show.sync="resetPassDialog">
            <span class="content">确定重置该用户密码？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="resetPassDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="resetPassUser">
                <span>确 定</span>
              </el-button>
            </div>
          </fly-dialog>
          <!--重置回答-->
          <fly-dialog title="重置回答" :show.sync="resetAnswerDialog">
            <span class="content">确定重置该用户回答？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="resetAnswerDialog = false">
                <span>取 消</span>
              </el-button>
              <el-button class="okBut" type="primary" @click="resetAnswerUser">
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
import {
  queryUserApi,
  queryDepartmentApi,
  queryUserGroup,
  queryPoliceType,
  addUserApi,
  operateUser,
  resetPassword,
  reset2ndPWD,
  userCompile,
} from '@/api/system'

import FlyDialog from '@/components/fly-dialog'
import Pagination from '@/components/Pagination'
import { exportJsonToExcel } from '@/assets/js/Export2Excel'

export default {
  name: 'userManage',
  metaInfo: {
    title: '用户管理',
  },
  components: {
    FlyDialog,
    Pagination,
  },
  data() {
    return {
      uploadURL:
        process.env.VUE_APP_COMMON_REQUEST_URL +
        'admin/ImportExcelUser?accessToken=' +
        Cookies.get('ac_token') +
        '&roleStr=' +
        Cookies.get('roleStr'),
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页显示信息条数
      totalPage: 1, // 总页数
      asterisk: true,
      addDialog: false,
      editDialog: false,
      lookDialog: false,
      deleteDialog: false,
      importDialog: false,
      exportDialog: false,
      startDialog: false,
      stopDialog: false,
      resetPassDialog: false,
      resetAnswerDialog: false,
      form: {
        user: '',
        IDCard: '',
        name: '',
        mobile: '',
        policeNo: '',
        email: '',
        userGroup: '',
        // loginType: '',
        status: '',
        policeKind: '',
        reportedSection: '',
        departmentId: '',
      },
      criteria: {
        user: '',
        name: '',
        section: '',
        userGroup: '',
        status: '',
      },
      lookInfo: {},
      userList: [
        // 用户列表
        {
          username: '', // 登录名
          nickName: '', // 姓名
          description: '', // 部门
          userGroup: '', // 用户组
          endTime: '', // 最后登录时间
          loginWay: '', // 登录类型
          status: '', // 状态
          policeType: '', // 警种类别
          berichtenDepartment: '', // 上报部门
        },
      ],
      fileList2: [],
      rules: {
        user: [{ required: true, message: '请输入登陆账号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        IDCard: this.filter_rules({ required: true, type: 'idCard' }),
        mobile: this.filter_rules({ required: true, type: 'mobile' }),
        policeNo: [{ required: true, message: '请输入警号', trigger: 'blur' }],
        email: this.filter_rules({ required: true, type: 'email' }),
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'blur' },
        ],
        userGroup: [
          { required: true, message: '请选择用户组', trigger: 'blur' },
        ],
        lastLoginDate: [
          { required: true, message: '请选择最后登录时间', trigger: 'blur' },
        ],
        loginType: [
          { required: true, message: '请选择登录类型', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请选择登录状态', trigger: 'blur' },
        ],
        policeKind: [
          { required: true, message: '请选择警种类别', trigger: 'blur' },
        ],
        reportedSection: [
          { required: true, message: '请选择上报部门', trigger: 'blur' },
        ],
      },
      /* loginTypeList: [
        // 登录类型下拉框数据 （暂时不需要）
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ], */
      statusList: [
        // 选择状态下拉框数据
        {
          value: null,
          label: '(不选择)',
        },
        {
          value: 0,
          label: '启用',
        },
        {
          value: 1,
          label: '未启用',
        },
      ],
      sectionList: [
        // 选择部门下拉框数据
        {
          id: '',
          pid: '',
          title: '',
        },
      ],
      userGroupList: [
        // 选择用户组下拉框数据
        {
          createBy: '',
          createTime: '',
          delFlag: null,
          description: '',
          id: '',
          name: '',
          updateBy: '',
          updateTime: '',
        },
      ],
      policeKindList: [
        // 警种类型下拉框数据
        {
          id: '',
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: '',
          typeName: '',
          delFlag: 0,
        },
      ],
      /* reportedSectionList: [
        // 上报部门下拉框数据 （目前和部门数据完全相同，暂时弃用）
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ], */
      multipleSelection: [], // 存放选中的用户信息
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 清空属性值
    clearValue() {
      for (let key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = ''
        }
      }
    },
    // 添加选择值
    addValue() {
      console.log(this.multipleSelection[0])
      // this.form = this.multipleSelection[0]
      this.form.username = this.multipleSelection[0].username
      this.form.nickName = this.multipleSelection[0].nickName
      this.form.departmentId = this.multipleSelection[0].departmentId
      this.form.policeKind = this.multipleSelection[0].policeTypeId
      this.form.id = this.multipleSelection[0].id
      this.form.reportedSection = this.multipleSelection[0].berichtenDepartment
      this.form.userGroup = this.multipleSelection[0].typeId
    },
    // 判断是否只选择一个用户
    pitchOn() {
      let isPitchOn = false
      this.multipleSelection.length === 1
        ? (isPitchOn = true)
        : this.$message.error('请选择一条数据!')
      return isPitchOn
    },
    // 判断是否选择用户
    pitchOn2() {
      let isPitchOn = false
      this.multipleSelection.length > 0
        ? (isPitchOn = true)
        : this.$message.error('请至少选择一条数据!')
      return isPitchOn
    },
    // 导入
    importUser() {
      this.$refs.upload.submit()
      this.importDialog = false
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
    // 导出
    exportUser() {
      const tableCN = [
        {
          label: '登录名',
          width: '',
          prop: 'username',
        },
        {
          label: '姓名',
          width: '',
          prop: 'nickName',
        },
        {
          label: '部门',
          width: '',
          prop: 'description',
        },
        {
          label: '用户组',
          width: '',
          prop: 'userGroup',
        },
        {
          label: '最后登录时间',
          width: '',
          prop: 'endTime',
        },
        {
          label: '登录类型',
          width: '',
          prop: 'loginWay',
        },
        {
          label: '状态',
          width: '',
          prop: 'status',
        },
        {
          label: '警种类别',
          width: '',
          prop: 'policeType',
        },
        {
          label: '上报部门',
          width: '',
          prop: 'berichtenDepartment',
        },
      ]
      require.ensure([], () => {
        let tHeader = []
        let filterVal = []
        tableCN.forEach(val => {
          tHeader.push(val.label)
          filterVal.push(val.prop)
        })
        const list = this.multipleSelection
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '用户信息')
        this.exportDialog = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    chooseDepartmentId(val) {
      // // 选中上报机构时保存机构ID
      // this.sectionList.map((value, index) => {
      //   if (value.title === val) {
      //     this.form.departmentId = value.id
      //   }
      // })
    },
    /**
     * 获取用户列表
     * @param { string | number } page 查询的页码
     * @param { string | number } size 查询需要每页返还的数据量
     * @param { string | number } username 查询的登录名
     * @param { string | number } nickName 查询的姓名
     * @param { string | number } status 查询的状态
     * @param { string } departmentId 查询的部门
     * @param { string } rolesId 查询的用户组
     */
    getUserList(
      page = this.currentPage,
      size = this.pageSize,
      username = this.criteria.user,
      nickName = this.criteria.name,
      status = this.criteria.status,
      departmentId = this.criteria.section,
      rolesId = this.criteria.userGroup,
    ) {
      queryUserApi({
        id: Cookies.get('userId'),
        username,
        nickName,
        status,
        departmentId,
        rolesId,
        page,
        size,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          const {
            list, // 当前页相关数据
            tUserIPage, // 分页相关数据
          } = data.data

          list.map(value => {
            // 设置启用状态 0=> 启用  1=> 未启用
            value.status = `${value.status === 0 ? '' : '未'}启用`

            // 设置登录方式
            switch (value.loginWay) {
              // case === 1 只是一个示例，目前只有密码登录，但是后期有其他形式登录在这里维护
              case 1:
                value.loginWay = '二维码登录'
                break
              default:
                value.loginWay = '密码登录'
            }
          })

          this.userList = list
          this.currentPage = tUserIPage.current
          this.totalPage = Math.ceil(tUserIPage.total / tUserIPage.size)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 切换分页
    changePage(page) {
      this.currentPage = page
      this.getUserList()
    },
    search() {
      this.getUserList()
    },
    addUser() {
      this.$refs['form'].validate(valid => {
        if (!valid) return

        addUserApi({
          userId: Cookies.get('userId'),
          username: this.form.user,
          card: this.form.IDCard,
          nickName: this.form.name,
          policeType: this.form.policeKind,
          mobile: this.form.mobile,
          siren: this.form.policeNo,
          email: this.form.email,
          type: this.form.userGroup,
          berichtenDepartment: this.form.reportedSection,
          departmentId: this.form.departmentId,
        }).then(({ data }) => {
          if (data && data.code === 200) {
            // 添加成功，重新拉取数据更新视图
            this.initPage(() => {
              this.$message({
                message: '添加用户成功',
                type: 'success',
              })
              this.addDialog = false
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    editUser() {
      this.$refs['form'].validate(valid => {
        if (!valid) return

        userCompile({
          userId: Cookies.get('userId'),
          id: this.form.id,
          policeType: this.form.policeKind,
          type: this.form.userGroup,
          berichtenDepartment: this.form.reportedSection,
          departmentId: this.form.departmentId,
        }).then(({ data }) => {
          if (data && data.code === 200) {
            // 添加成功，重新拉取数据更新视图
            this.initPage(() => {
              this.$message({
                message: '编辑用户成功',
                type: 'success',
              })
              this.editDialog = false
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    lookUser() {
      if (this.pitchOn()) {
        this.lookInfo = this.multipleSelection[0]
        this.lookDialog = true
      }
    },
    deleteUser() {
      const selectedUser = this.multipleSelection[0]

      operateUser({
        id: selectedUser.id,
        state: 0,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
          })

          this.userList.map((value, index) => {
            if (value === selectedUser) {
              this.userList.splice(index, 1)
              this.deleteDialog = false
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    startUser() {
      const selectedUser = this.multipleSelection[0]

      operateUser({
        id: selectedUser.id,
        state: 2,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.$message({
            message: '启用成功',
            type: 'success',
          })

          this.userList.map((value, index) => {
            if (value === selectedUser) {
              this.userList[index].status = '启用'
              this.startDialog = false
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    stopUser() {
      const selectedUser = this.multipleSelection[0]

      operateUser({
        id: selectedUser.id,
        state: 1,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.$message({
            message: '停用成功',
            type: 'success',
          })

          this.userList.map((value, index) => {
            if (value === selectedUser) {
              this.userList[index].status = '未启用'
              this.startDialog = false
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    resetPassUser() {
      const selectedUser = this.multipleSelection[0]
      resetPassword({
        id: selectedUser.id,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.$message({
            message: '重置用户密码成功',
            type: 'success',
          })
          this.resetPassDialog = false
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    resetAnswerUser() {
      const selectedUser = this.multipleSelection[0]
      reset2ndPWD({
        id: selectedUser.id,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.$message({
            message: '重置回答二级密码问题成功',
            type: 'success',
          })
          this.resetAnswerDialog = false
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    flush() {
      this.initPage(() => {
        this.$message({
          message: '刷新成功',
          type: 'success',
        })
      })
    },
    async initPage(callback = () => {}) {
      await this.getUserList()
      await queryDepartmentApi().then(({ data }) => {
        if (data && data.code === 200) {
          this.sectionList = data.data
          this.sectionList.unshift({
            id: null,
            pid: null,
            title: '（不选择）',
          })
        } else {
          this.$message.error(data.msg)
        }
      })
      await queryUserGroup({
        id: Cookies.get('userId'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.userGroupList = data.data
          this.userGroupList.unshift({
            id: null,
            description: '（不选择）',
          })
        } else {
          this.$message.error(data.msg)
        }
      })
      await queryPoliceType().then(({ data }) => {
        if (data && data.code === 200) {
          this.policeKindList = data.data
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
#userManage {
  margin: 0 auto;
  position: relative;

  ul {
    display: inline-block;

    li {
      float: left;
      padding: 8px 18px;
      margin: 0 3px;
      color: #ffffff;
      background-color: rgba(44, 239, 255, 0.3);
      border-radius: 2px;
    }
  }

  .operateMenu {
    text-align: center;
    margin: 0 auto;
  }

  .fgx {
    width: 95%;
    margin: 10px auto;
    border-bottom: 2px solid rgba(44, 239, 255, 0.4);
  }

  .criteria, .dialog {
    >>>#uesrInfo {
      width: 70%;
      margin: 0 auto;
      padding: 30px;
      color: #ffffff;

      & div>span {
        margin: 1px;
        display: inline-block;
        width: 55%;
        height: 34px;
        line-height: 34px;
        padding: 0 15px;
      }

      & div>span:nth-child(1) {
        width: 43%;
        text-align: right;
        background-color: rgba(44, 239, 255, 0.4);
      }
    }

    .el-form-item {
      /* width 180px */
      display: inline-block;
      margin-right: 8px;
    }

    .seekBut {
      color: #ffffff;
      margin: 20px 14px;
      padding: 9px 15px;
      background-color: rgba(70, 125, 68, 1);
      border: 1px solid rgba(70, 125, 68, 1);
    }

    >>>.el-input__inner {
      border-radius: 0px;
      background-color: rgba(44, 239, 255, 0.2);
      border: 1px none #DCDFE6;
      color: #ffffff;
    }

    .content {
      min-width: 50px;
      display: block;
      color: #ffffff;
      text-align: center;
    }
  }

  .userList >>> {
    .el-table th, .el-table tr {
      background-color: rgba(44, 239, 255, 0.2) !important;
    }

    .el-table, .el-table__expanded-cell {
      background-color: rgba(44, 239, 255, 0) !important;
      color: #ffffff;
    }

    .el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: rgba(44, 239, 255, 0.2) !important;
    }

    .el-table thead {
      color: #ffffff;
    }

    .organTable {
      .el-table td, .el-table th.is-leaf {
        border: 1px solid #143d4b !important;
      }

      .el-table--border::after, .el-table--group::after, .el-table::before {
        background-color: transparent;
      }
    }
  }
}
</style>
<style lang="stylus">
.coat1 {
  width: 1200px;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: rgba(44, 239, 255, 0.1);
  padding: 20px;
}

.coat2 {
  width: 1160px;
  margin-top: 18px;
  margin-bottom: 20px;
  padding: 20px 15px 20px 15px;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: rgba(44, 239, 255, 0.1);
}

.user-list-pagination {
  margin-top: 20px;
}

.dialog {
/*  .el-dialog {
    !* background: rgba(44, 239, 255, 0.5)!important *!
    background: #083438 !important;
    top: 30%;
  }*/

  .butCoat {
    text-align: center;
  }

  .impBut {
    background-color: rgba(44, 239, 255, 0.3);
    border: 1px solid rgba(44, 239, 255, 0.3);
    color: #ffffff;
    padding: 9px 20px;
    margin-left: 1px;
  }

  .canBut, .okBut {
    color: #ffffff;
    margin: 20px 14px;
    padding: 9px 15px;
  }

  .okBut {
    background-color: rgba(70, 125, 68, 1);
    border: 1px solid rgba(70, 125, 68, 1);
  }

  .canBut {
    background-color: #7f3237;
    border: 1px solid #7f3237;
  }

  .el-form {
    width: 300px;
    height: auto;
    margin: 30px auto;
  }

/*  .el-dialog .el-dialog__body .body-content {
    background-color: rgba(44, 239, 255, 0.2);
  }*/

  .el-form-item__label {
    background-color: rgba(44, 239, 255, 0.4);
    color: #ffffff;
  }

  .el-input__inner {
    border-radius: 0px;
    background-color: rgba(44, 239, 255, 0.2);
    border: 1px none #DCDFE6;
    color: #ffffff;
    margin-left: 1px;
  }

  .el-form-item {
    margin: 0 auto;
    margin-bottom: 1px;
    width: 295px !important;
  }

  .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    width: 100px;
    text-align: initial;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 25%;
    left: 105%;
  }
}
</style>
