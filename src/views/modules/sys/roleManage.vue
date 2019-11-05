<template>
  <div class="roleManage">
    <div class="leftMenu">
      <el-button class="addBut" type="primary" @click="addDialog = true">
        <span>添加</span>
      </el-button>
      <el-button
        class="editBut"
        type="primary"
        @click="pitchOn2() && editForm()"
      >
        <span>编辑</span>
      </el-button>
      <el-button
        class="delBut"
        type="primary"
        @click="pitchOn2() && (deleteDialog = true)"
      >
        <span>删除</span>
      </el-button>
      <div class="menuList">
        <table border="1" cellspacing="1">
          <tr v-for="(item, index) in roleList" :key="index">
            <td
              class="tal_tit"
              @click="isokRole(item), (roleActive = index)"
              :class="{ active: roleActive === index }"
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
              :data="treeData"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :default-checked-keys="defaultMenu"
              @check-change="handleCheckChange"
              :props="defaultProps"
            >
            </el-tree>
          </div>
          <el-button
            class="addBut"
            type="primary"
            @click="
              menuList.length <= 0
                ? $message.error('请至少选择一条数据!')
                : rolePermission()
            "
          >
            <span>保存</span>
          </el-button>
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
          <el-button class="okBut" type="primary" @click="addRole('form')">
            <span>确 定</span>
          </el-button>
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
          <el-button class="canBut" @click="editDialog = false">
            <span>取 消</span>
          </el-button>
          <el-button class="okBut" type="primary" @click="editRole('form')">
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
          <el-button class="okBut" type="primary" @click="deleteRole()">
            <span>确 定</span>
          </el-button>
        </div>
      </fly-dialog>
    </div>
  </div>
</template>

<script>
import {
  rolePermission,
  queryRolePermission,
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
      roleActive: 0,
      okRole: '',
      roleList: [{ name: '管理员' }, { name: '超级管理员' }, { name: '游客' }],
      menuList: [],
      treeData: [
        /* {
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
        }, */
      ],
      defaultMenu: [],
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
      queryRole({
        userId: Cookies.get('userId'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.roleList = data.data
          this.isokRole(this.roleList[0])
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
      this.menuList = [...new Set(this.menuList)]
      rolePermission({
        userId: Cookies.get('userId'),
        roleId: this.okRole.id,
        permissionId: JSON.stringify(this.menuList),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.$message({
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
    // 查看角色和菜单关系
    queryRolePermission() {
      queryRolePermission({
        roleId: this.okRole.id,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.treeData = this.meunData(data.data.permission)
        } else {
          this.$message({
            message: '获取角色和菜单关系失败!',
            type: 'error',
          })
        }
      })
    },

    // 菜单封装
    meunData(a) {
      let list = []

      a.forEach(item => {
        let lists = {}
        if (item.list.length >= 1) {
          lists = {
            id: item.id,
            label: item.name,
            children: this.meunData(item.list),
          }
          list.push(lists)
        } else {
          lists = {
            id: item.id,
            label: item.name,
            items: [],
          }
          list.push(lists)
        }
        item.bool && this.defaultMenu.push(item.id)
      })
      return list
    },
    isokRole(r) {
      this.okRole = r
      this.defaultMenu = []
      this.menuList = []
      this.queryRolePermission()
      this.menuList = this.defaultMenu
    },
    // 判断是否选择角色
    pitchOn2() {
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
      this.$refs[formName].validate(valid => {
        if (!valid) return

        this.addDialog = false

        addRole({
          userId: Cookies.get('userId'),
          name: this.form.name,
          description: this.form.desc,
        }).then(({ data }) => {
          if (data && data.code === 200) {
            this.queryRole()
            this.$message({
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
      })
    },
    // 编辑角色
    editRole(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return

        compileRole({
          userId: Cookies.get('userId'),
          id: this.okRole.id,
          description: this.form.desc,
        }).then(({ data }) => {
          if (data && data.code === 200) {
            this.queryRole()
            this.$message({
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
      })
    },
    // 删除角色
    deleteRole() {
      deleteRole({
        id: this.okRole.id,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.queryRole()
          this.$message({
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

    // 数组去重
    // unique(ary) {
    //   let newAry = []
    //   for (let i = 0; i < ary.length; i++) {
    //     if (newAry.indexOf(ary[i]) === -1) {
    //       newAry.push(ary[i])
    //     }
    //   }
    //   return newAry
    // },

    // 删除权限
    deleteData(a, b) {
      // let newAry = this.unique(a)
      let newAry = [...new Set(a)]

      let index = newAry.indexOf(b)
      console.log(newAry.indexOf(b))
      newAry.splice(index, 1)
      console.log(2222)
      console.log(newAry.indexOf(b))
      this.menuList = newAry
    },
    // 权限菜单变化
    handleCheckChange(data, checked) {
      checked && data.children === undefined && this.menuList.push(data.id)
      !checked &&
        data.children === undefined &&
        this.deleteData(this.menuList, data.id)
      console.log(this.menuList)
      // this.rolePermission()
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
.roleManage .right .addBut,
.roleManage .leftMenu .addBut,
.roleManage .leftMenu .editBut,
.roleManage .leftMenu .delBut
  color: #ffffff;
  margin 20px 4px
  padding: 9px 10px;
.roleManage .right .addBut,
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
  padding 20px 0
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
