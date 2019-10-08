<template>
  <div class="organManage">
    <div class="coat1">
      <div class="coat2">
        <div class="operateMenu">
          <ul class="clearfix">
            <li @click="addDialog = true">添加</li>
            <li @click="pitchOn() && (editDialog = true)">编辑</li>
            <li @click="importDialog = true">导入</li>
            <li @click="pitchOn2() && (deleteDialog = true)">删除</li>
            <li @click="flush()">刷新</li>
          </ul>
        </div>
        <div class="fgx"></div>
        <div class="organTable">
          <el-table :data="organData" style="width: 100%">
            <el-table-column prop="name" label="机构名称" width="225">
            </el-table-column>
            <el-table-column prop="code" label="机构编码" width="225">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="225">
            </el-table-column>
            <el-table-column prop="describe" label="描述"> </el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="225">
            </el-table-column>
          </el-table>
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
                <el-form-item label="机构编码" prop="desc">
                  <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="上级机构" prop="superior">
                  <el-select
                    v-model="form.superior"
                    popper-class="fromselect"
                    placeholder="请选择部门"
                  >
                    <el-option
                      v-for="item in superiorList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
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
              <el-button class="canBut" @click="addDialog = false"
                >取 消</el-button
              >
              <el-button class="okBut" type="primary" @click="addOrgan('form')"
                >确 定</el-button
              >
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
                <el-form-item label="机构名称" prop="name">
                  <el-input v-model="organInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="机构编码" prop="desc">
                  <el-input v-model="organInfo.desc"></el-input>
                </el-form-item>
                <el-form-item label="机构层级" prop="hierarchy">
                  <el-input v-model="organInfo.hierarchy"></el-input>
                </el-form-item>

                <el-form-item label="机构状态" prop="state">
                  <el-select
                    v-model="organInfo.state"
                    popper-class="fromselect"
                    placeholder="请选择部门"
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
                    v-model="organInfo.authNum"
                    placeholder="为大于0的整数"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="butCoat">
              <el-button class="canBut" @click="editDialog = false"
                >取 消</el-button
              >
              <el-button class="okBut" type="primary" @click="editOrgan('form')"
                >确 定</el-button
              >
            </div>
          </fly-dialog>
          <!--导入-->
          <fly-dialog title="导入机构" :show.sync="importDialog">
            <span class="content">导入</span>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              accept=".xls, .xlsx"
              list-type="picture"
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
              <el-button
                class="okBut"
                type="primary"
                @click="importOrgan('form')"
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
              <el-button class="okBut" type="primary" @click="deleteOrgan()"
                >确 定</el-button
              >
            </div>
          </fly-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlyDialog from "@/components/fly-dialog";
export default {
  name: "organManage",
  components: {
    FlyDialog
  },
  data() {
    return {
      asterisk: true,
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      importDialog: false,
      form: {
        name: "",
        code: "",
        superior: "",
        authNum: ""
      },
      organInfo: {
        name: "",
        code: "",
        hierarchy: "",
        state: 1,
        authNum: ""
      },
      stateList: [
        {
          value: 1,
          label: "正常"
        },
        {
          value: 2,
          label: "失效"
        }
      ],
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
      },
      superiorList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      organData: [
        {
          name: "四川省公安厅",
          code: 510000000000,
          status: "有效",
          describe: "客户讲几句话急急急",
          createDate: "2019-07-08 15:57:40"
        },
        {
          name: "四川省公安厅",
          code: 510000000000,
          status: "有效",
          describe: "客户讲几句话急急急",
          createDate: "2019-07-08 15:57:40"
        },
        {
          name: "四川省公安厅",
          code: 510000000000,
          status: "有效",
          describe: "客户讲几句话急急急",
          createDate: "2019-07-08 15:57:40"
        },
        {
          name: "四川省公安厅",
          code: 510000000000,
          status: "有效",
          describe: "客户讲几句话急急急",
          createDate: "2019-07-08 15:57:40"
        },
        {
          name: "四川省公安厅",
          code: 510000000000,
          status: "有效",
          describe: "客户讲几句话急急急",
          createDate: "2019-07-08 15:57:40"
        }
      ]
    };
  },
  methods: {
    // 判断是否只选择一个机构
    pitchOn() {
      // let isPitchOn = false
      let isPitchOn = true;
      // this.multipleSelection.length === 1 ? isPitchOn = true : this.$message.error('请选择一条数据!')
      return isPitchOn;
    },
    // 判断是否选择机构
    pitchOn2() {
      // let isPitchOn = false
      let isPitchOn = true;
      // this.multipleSelection.length > 0 ? isPitchOn = true : this.$message.error('请至少选择一条数据!')
      return isPitchOn;
    },
    // 添加机构
    addOrgan(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
        this.addDialog = false;
      });
    },
    // 编辑机构
    editOrgan(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.addDialog = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除机构
    deleteOrgan() {
      this.deleteDialog = false;
    },
    // 刷新
    flush() {
      this.$message({
        message: "刷新成功",
        type: "success"
      });
    },
    // 导入
    importOrgan() {
      this.importDialog = false;
    }
  }
};
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
<style lang="stylus"></style>
