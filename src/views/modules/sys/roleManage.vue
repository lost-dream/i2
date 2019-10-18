<template>
  <div class="roleManage">
    <div class="leftMenu">
      <el-button class="addBut" type="primary" @click="addDialog = true"
        >添加</el-button
      >
      <el-button
        class="editBut"
        type="primary"
        @click="pitchOn2() && editForm()"
        >编辑</el-button
      >
      <el-button
        class="delBut"
        type="primary"
        @click="pitchOn2() && (deleteDialog = true)"
        >删除</el-button
      >
      <div class="menuList">
        <table border="1" cellspacing="1">
          <tr v-for="(item, index) in roleList" :key="index">
            <td
              class="tal_tit"
              @click="isokRole(item), (roleActive = index)"
              :class="{ active: roleActive == index }"
            >
              {{ item.description }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="right">
      <div class="coat1">
        <div class="coat2">
          <div class="menuRes">
            <div class="title"><span>菜单资源</span></div>
            <el-tree
              :data="data"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              @check-change="handleCheckChange"
              :props="defaultProps"
            >
            </el-tree>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog">
      <!--添加-->
      <fly-dialog title="添加角色" :show.sync="addDialog">
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
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="butCoat">
          <el-button class="canBut" @click="addDialog = false">取 消</el-button>
          <el-button class="okBut" type="primary" @click="addRole('form')"
            >确 定</el-button
          >
        </div>
      </fly-dialog>
      <!--编辑-->
      <fly-dialog title="编辑角色" :show.sync="editDialog">
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
            <el-form-item label="角色名称" prop="name">
              <el-input :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="butCoat">
          <el-button class="canBut" @click="editDialog = false"
            >取 消</el-button
          >
          <el-button class="okBut" type="primary" @click="editRole('form')"
            >确 定</el-button
          >
        </div>
      </fly-dialog>
      <!--删除-->
      <fly-dialog title="删除" :show.sync="deleteDialog">
        <span class="content">确定删除？</span>
        <div class="butCoat">
          <el-button class="canBut" @click="deleteDialog = false"
            >取 消</el-button
          >
          <el-button class="okBut" type="primary" @click="deleteRole()"
            >确 定</el-button
          >
        </div>
      </fly-dialog>
    </div>
  </div>
</template>

<script>
import {
  rolePermission,
  queryRole,
  deleteRole,
  compileRole,
  addRole,
} from '@/api/system'
import Cookies from 'js-cookie'
import FlyDialog from '@/components/fly-dialog'
export default {
  name: 'roleManage',
  components: {
    FlyDialog,
  },
  data() {
    return {
      asterisk: true,
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      roleActive: null,
      okRole: '',
      roleList: [{ name: '管理员' }, { name: '超级管理员' }, { name: '游客' }],
      menuList: [],
      data: [
        {
          id: 1,
          label: '前端',
          children: [
            {
              id: 2,
              label: 'i2',
            },
            {
              id: 3,
              label: '话单分析',
            },
            {
              id: 4,
              label: '关系分析',
            },
            {
              id: 5,
              label: '时空分析',
            },
            {
              id: 6,
              label: '联案分析',
            },
          ],
        },
        {
          id: 2,
          label: '后端',
          children: [
            {
              id: 7,
              label: '用户管理',
            },
            {
              id: 8,
              label: '菜单管理',
            },
            {
              id: 9,
              label: '角色管理',
            },
            {
              id: 10,
              label: '机构管理',
            },
          ],
        },
      ],
      form: {
        name: '',
        desc: '',
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
      },
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  mounted() {
    this.queryRole()
  },
  methods: {
    // 查看角色
    queryRole() {
      const $THIS = this
      queryRole({
        userId: Cookies.get('userId'),
        accessToken: Cookies.get('ac_token'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          $THIS.roleList = data.data
        } else {
          this.$message({
            message: '获取角色信息失败!',
            type: 'error',
          })
        }
      })
      this.addDialog = false
    },
    // 添加角色和菜单关系
    rolePermission() {
      const $THIS = this
      rolePermission({
        userId: Cookies.get('userId'),
        roleId: this.okRole.id,
        permissionId: this.menuList,
        accessToken: Cookies.get('ac_token'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          $THIS.$message({
            message: '角色和菜单关系修改成功！!',
            type: 'success',
          })
        } else {
          this.$message({
            message: '角色和菜单关系修改失败!',
            type: 'error',
          })
        }
      })
    },
    isokRole(r) {
      console.log(r)
      this.okRole = r
    },
    // 判断是否选择角色
    pitchOn2() {
      // let isPitchOn = false
      let isPitchOn = false
      this.okRole !== ''
        ? (isPitchOn = true)
        : this.$message.error('请至少选择一条数据!')
      return isPitchOn
    },
    // 编辑表单
    editForm() {
      this.form.name = this.okRole.name
      this.form.desc = this.okRole.description
      this.editDialog = true
    },
    // 添加角色
    addRole(formName) {
      const $THIS = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          addRole({
            userId: Cookies.get('userId'),
            name: this.form.name,
            description: this.form.desc,
            accessToken: Cookies.get('ac_token'),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              $THIS.queryRole()
              $THIS.$message({
                message: '添加角色成功！!',
                type: 'success',
              })
            } else {
              this.$message({
                message: '添加角色失败!',
                type: 'error',
              })
            }
          })
          this.addDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑角色
    editRole(formName) {
      const $THIS = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          compileRole({
            userId: Cookies.get('userId'),
            id: this.okRole.id,
            description: this.form.desc,
            accessToken: Cookies.get('ac_token'),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              $THIS.queryRole()
              $THIS.$message({
                message: '角色信息修改成功！!',
                type: 'success',
              })
            } else {
              this.$message({
                message: '角色信息修改失败!',
                type: 'error',
              })
            }
          })
          this.editDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除角色
    deleteRole() {
      const $THIS = this
      deleteRole({
        id: this.okRole.id,
        accessToken: Cookies.get('ac_token'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          $THIS.queryRole()
          $THIS.$message({
            message: '删除角色成功！!',
            type: 'success',
          })
        } else {
          this.$message({
            message: '删除角色失败!',
            type: 'error',
          })
        }
      })
      this.deleteDialog = false
    },

    deleteData(a, b) {
      let index = a.indexOf(b)
      if (index > -1) {
        a.splice(index, 1)
      }
      this.menuList = a
    },
    // 权限菜单变化
    handleCheckChange(data, checked, indeterminate) {
      checked && data.children === undefined && this.menuList.push(data.id)
      !checked &&
        data.children === undefined &&
        this.deleteData(this.menuList, data.id)
      this.rolePermission()
    },
  },
}
</script>

<style lang="stylus" scoped>

.roleManage .leftMenu
  float left
.roleManage .leftMenu
  width: 239px;
  height: 971px;
  background-color rgba(44, 239, 255, 0.2)
  overflow hidden
  padding 0 30px
.roleManage .leftMenu .addBut,
.roleManage .leftMenu .editBut,
.roleManage .leftMenu .delBut
  color: #ffffff;
  margin 20px 4px
  padding: 9px 10px;
.roleManage .leftMenu .addBut,
.roleManage .leftMenu .editBut
  background-color: rgba(70, 125, 68, 1);
  border: 1px solid rgba(70, 125, 68, 1);
.roleManage .leftMenu .delBut
  background-color: #7f3237;
  border: 1px solid #7f3237;
.menuList
  width 180px
  overflow hidden
.roleManage .leftMenu table
  width 100%
  margin 0 auto
  color #ffffff
  /*border-collapse collapse*/
  border 5px solid transparent
.roleManage .leftMenu td
  /*border 1px solid transparent*/
  height: 34px;
  padding 0 15px
  background-color: rgba(44, 239, 255, 0.2)
.roleManage .leftMenu table .tal_tit
  background-color: rgba(44, 239, 255, 0.4)
  text-align center
.roleManage .leftMenu table .active
  background-color: rgba(44, 239, 255, 0.6)
.right
  width 1200px
  margin 0 auto
  position relative
.right .coat2 .title
  padding 10px 20px
  margin-bottom 5px
  color #ffffff
  background-color rgba(44, 239, 255, 0.1)
.right .coat2 .el-tree
  color #ffffff
  background-color rgba(44, 239, 255, 0.1)
.right .coat2 >>> .el-tree-node__content:hover
  background-color rgba(44, 239, 255, 0.1)
.right .coat2 >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content
  background-color rgba(44, 239, 255, 0)
.right .coat2 >>> .el-checkbox__input.is-checked .el-checkbox__inner,
.right .coat2 >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner
  background-color rgba(44, 239, 255, 0)
  border-color #ffffff
.right .coat2 >>> .el-checkbox__inner
  margin-right 5px
  margin-right 5px
  background-color rgba(44, 239, 255, 0)
  border-color #ffffff
.roleManage
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
<style lang="stylus">
.fromselect {
  background-color: rgba(19, 81, 93, 1)!important;
  border: 1px solid rgba(19, 81, 93, 1);
  border-radius: 5px;
  .el-select-dropdown {
  }
  .el-select-dropdown__item {
    background-color: rgba(19, 81, 93, 1);
    color: #ffffff;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: rgba(24, 123, 135, 1);
    color: #ffffff;
  }
  .el-select-dropdown__item.selected {
    color: #ffffff;
  }
}
</style>
