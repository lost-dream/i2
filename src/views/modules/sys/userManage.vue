<template>
  <div id="userManage">
    <div class="coat1">
      <div class="coat2">
        <div class="operateMenu">
          <ul class="clearfix">
            <li @click="addDialog = true">添加</li>
            <li @click="editDialog = true">编辑</li>
            <li @click="lookUser()">查看</li>
            <li @click="pitchOn2() && (deleteDialog = true)">删除</li>
            <li @click="importDialog = true">导入</li>
            <li @click="exportDialog = true">导出</li>
            <li @click="pitchOn () && (startDialog = true)">启用</li>
            <li @click="pitchOn () && (stopDialog = true)">停用</li>
            <li @click="pitchOn () && (resetPassDialog = true)">重置密码</li>
            <li @click="pitchOn () && (resetAnswerDialog = true)">重置回答</li>
            <li @click="flush()">刷新</li>
          </ul>
        </div>
        <div class="fgx"></div>
        <div class="criteria">
          <el-form ref="criteria" :model="criteria" status-icon class="demo-ruleForm">
            <el-form-item>
              <el-input v-model="criteria.user" placeholder="登录名（输入)"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="criteria.name" placeholder="姓名（输入）"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="criteria.status" popper-class='fromselect' placeholder="请选择状态">
                <el-option v-for="item in statusList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="criteria.section" popper-class='fromselect' placeholder="请选择部门">
                <el-option v-for="item in sectionList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="criteria.userGroup" popper-class='fromselect' placeholder="请选择用户组">
                <el-option v-for="item in userGroupList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="seekBut" type="primary" @click="isSeek()">搜索</el-button>
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
                    @selection-change="handleSelectionChange">
              <el-table-column
                      type="selection"
                      width="50">
              </el-table-column>
              <el-table-column
                      prop="user"
                      label="登录名"
                      width="100">
              </el-table-column>
              <el-table-column
                      prop="user"
                      label="姓名"
                      width="100">
              </el-table-column>
              <el-table-column
                      prop="section"
                      label="部门"
                      width="110">
              </el-table-column>
              <el-table-column
                      prop="userGroup"
                      label="用户组"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="lastLoginDate"
                      label="最后登录时间"
                      width="180"
                      show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                      prop="loginType"
                      label="登录类型"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="status"
                      label="状态"
                      width="100">
              </el-table-column>
              <el-table-column
                      prop="policeKind"
                      label="警种类别"
                      width="100">
              </el-table-column>
              <el-table-column
                      prop="reportedSection"
                      label="上报部门">
              </el-table-column>
            </el-table>
          </div>

        </div>
        <div class="dialog">
          <!--添加-->
          <!--<el-dialog
                  title="添加用户"
                  :visible.sync="addDialog"
                  width="35%"
                  :before-close="handleClose">
            <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
              <el-form-item label="登陆账号" prop="user">
                <el-input v-model="form.user"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="section">
                <el-select v-model="form.section" placeholder="请选择部门">
                  <el-option v-for="item in sectionList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户组" prop="userGroup">
                <el-select v-model="form.userGroup" placeholder="请选择用户组">
                  <el-option v-for="item in userGroupList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="登录类型" prop="loginType">
                <el-select v-model="form.loginType" placeholder="请选择登录类型">
                  <el-option v-for="item in loginTypeList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option v-for="item in statusList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="警种类别" prop="policeKind">
                <el-select v-model="form.policeKind" placeholder="请选择警种类别">
                  <el-option v-for="item in policeKindList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上报部门" prop="reportedSection">
                <el-select v-model="form.reportedSection" placeholder="请选择上报部门">
                  <el-option v-for="item in reportedSectionList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addUser('form')">确 定</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog
                  title="添加用户"
                  :show.sync="addDialog"
          >
            <el-form ref="form" :model="form" status-icon :rules="rules" :hide-required-asterisk='asterisk'
                     label-width="49%" class="demo-ruleForm">
              <el-form-item label="登陆账号" prop="user">
                <el-input v-model="form.user"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="section">
                <el-select v-model="form.section" popper-class='fromselect' placeholder="请选择部门">
                  <el-option v-for="item in sectionList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户组" prop="userGroup">
                <el-select v-model="form.userGroup" popper-class='fromselect' placeholder="请选择用户组">
                  <el-option v-for="item in userGroupList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="登录类型" prop="loginType">
                <el-select v-model="form.loginType" popper-class='fromselect' placeholder="请选择登录类型">
                  <el-option v-for="item in loginTypeList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" popper-class='fromselect' placeholder="请选择状态">
                  <el-option v-for="item in statusList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="警种类别" prop="policeKind">
                <el-select v-model="form.policeKind" popper-class='fromselect' placeholder="请选择警种类别">
                  <el-option v-for="item in policeKindList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上报部门" prop="reportedSection">
                <el-select v-model="form.reportedSection" popper-class='fromselect' placeholder="请选择上报部门">
                  <el-option v-for="item in reportedSectionList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="butCoat">
              <el-button class="canBut" @click="addDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="addUser('form')">确 定</el-button>
            </div>
           <!-- <span
                    slot="ft"
                    class="dialog-footer"
            >
    <el-button class="canBut" @click="addDialog = false">取 消</el-button>
    <el-button class="okBut" type="primary" @click="addUser('form')">确 定</el-button>
    </span>-->
          </fly-dialog>
          <!--编辑-->
          <!--<el-dialog
                  title="编辑用户"
                  :visible.sync="editDialog"
                  width="35%"
                  :close-on-click-modal="modal"
                  :modal-append-to-body="modal"
                  :before-close="handleClose">
            <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
              <el-form-item label="登陆账号" prop="user">
                <el-input v-model="form.user"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="section">
                <el-select v-model="form.section" placeholder="请选择部门">
                  <el-option v-for="item in sectionList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户组" prop="userGroup">
                <el-select v-model="form.userGroup" placeholder="请选择用户组">
                  <el-option v-for="item in userGroupList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="登录类型" prop="loginType">
                <el-select v-model="form.loginType" placeholder="请选择登录类型">
                  <el-option v-for="item in loginTypeList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option v-for="item in statusList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="警种类别" prop="policeKind">
                <el-select v-model="form.policeKind" placeholder="请选择警种类别">
                  <el-option v-for="item in policeKindList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上报部门" prop="reportedSection">
                <el-select v-model="form.reportedSection" placeholder="请选择上报部门">
                  <el-option v-for="item in reportedSectionList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button class="canBut" @click="editDialog = false">取 消</el-button>
    <el-button class="okBut" type="primary" @click="editUser('form')">确 定</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog
                  title="编辑用户"
                  :show.sync="editDialog"
          >
            <el-form ref="form" :model="form" status-icon :hide-required-asterisk='asterisk' :rules="rules" label-width="120px" class="demo-ruleForm">
              <el-form-item label="登陆账号" prop="user">
                <el-input v-model="form.user"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="section">
                <el-select v-model="form.section" popper-class='fromselect' placeholder="请选择部门">
                  <el-option v-for="item in sectionList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户组" prop="userGroup">
                <el-select v-model="form.userGroup" popper-class='fromselect' placeholder="请选择用户组">
                  <el-option v-for="item in userGroupList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="登录类型" prop="loginType">
                <el-select v-model="form.loginType" popper-class='fromselect' placeholder="请选择登录类型">
                  <el-option v-for="item in loginTypeList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" popper-class='fromselect' placeholder="请选择状态">
                  <el-option v-for="item in statusList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="警种类别" prop="policeKind">
                <el-select v-model="form.policeKind" popper-class='fromselect' placeholder="请选择警种类别">
                  <el-option v-for="item in policeKindList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上报部门" prop="reportedSection">
                <el-select v-model="form.reportedSection" popper-class='fromselect' placeholder="请选择上报部门">
                  <el-option v-for="item in reportedSectionList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="butCoat">
              <el-button class="canBut" @click="editDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="editUser('form')">确 定</el-button>
            </div>
          </fly-dialog>
          <!--查看-->
          <!--<el-dialog
                  title="查看用户详情"
                  :visible.sync="lookDialog"
                  width="35%"
                  :before-close="handleClose">
            <div>
              <span>登陆账号:</span>
              <span>{{lookInfo.user}}</span>
            </div>
            <div>
              <span>姓名:</span>
              <span>{{lookInfo.name}}</span>
            </div>
            <div>
              <span>部门:</span>
              <span>{{lookInfo.section}}</span>
            </div>
            <div>
              <span>用户组:</span>
              <span>{{lookInfo.userGroup}}</span>
            </div>
            <div>
              <span>登录类型:</span>
              <span>{{lookInfo.loginType}}</span>
            </div>
            <div>
              <span>状态:</span>
              <span>{{lookInfo.status}}</span>
            </div>
            <div>
              <span>警种类别:</span>
              <span>{{lookInfo.policeKind}}</span>
            </div>
            <div>
              <span>登陆账号:</span>
              <span>{{lookInfo.user}}</span>
            </div>
            <div>
              <span>上报部门:</span>
              <span>{{lookInfo.reportedSection}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="lookDialog = false">关   闭</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog title="查看用户详情" :show.sync="lookDialog">
            <div>
              <span>登陆账号:</span>
              <span>{{lookInfo.user}}</span>
            </div>
            <div>
              <span>姓名:</span>
              <span>{{lookInfo.name}}</span>
            </div>
            <div>
              <span>部门:</span>
              <span>{{lookInfo.section}}</span>
            </div>
            <div>
              <span>用户组:</span>
              <span>{{lookInfo.userGroup}}</span>
            </div>
            <div>
              <span>登录类型:</span>
              <span>{{lookInfo.loginType}}</span>
            </div>
            <div>
              <span>状态:</span>
              <span>{{lookInfo.status}}</span>
            </div>
            <div>
              <span>警种类别:</span>
              <span>{{lookInfo.policeKind}}</span>
            </div>
            <div>
              <span>登陆账号:</span>
              <span>{{lookInfo.user}}</span>
            </div>
            <div>
              <span>上报部门:</span>
              <span>{{lookInfo.reportedSection}}</span>
            </div>
            <div class="butCoat">
              <el-button class="canBut" @click="lookDialog = false">取 消</el-button>
            </div>
          </fly-dialog>
          <!--删除-->
          <!--<el-dialog
                  title="删除"
                  :visible.sync="deleteDialog"
                  width="30%"
                  :before-close="handleClose">
            <span>确定删除？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialog = false">取 消</el-button>
    <el-button type="primary" @click="deleteUser()">确 定</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog title="删除" :show.sync="deleteDialog">
              <span class="content">确定删除？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="deleteDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="deleteUser()">确 定</el-button>
            </div>
          </fly-dialog>
          <!--导入-->
          <!-- <el-dialog
                   title="导入"
                   :visible.sync="importDialog"
                   width="30%"
                   :before-close="handleClose">
             <span>导入</span>
             <el-upload
                     class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :file-list="fileList2"
                     accept=".xls, .xlsx"
                     list-type="picture">
               <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
             </el-upload>
             <span slot="footer" class="dialog-footer">
     <el-button @click="importDialog = false">取 消</el-button>
     <el-button type="primary" @click="importUser()">确 定</el-button>
   </span>
           </el-dialog>-->
          <fly-dialog title="导入" :show.sync="importDialog">
            <span class="content">导入</span>
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    accept=".xls, .xlsx"
                    list-type="picture">
              <el-button class="impBut" size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
            </el-upload>
            <div class="butCoat">
              <el-button class="canBut" @click="importDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="importUser()">确 定</el-button>
            </div>
          </fly-dialog>
          <!--导出-->
          <!--<el-dialog
                  title="导出"
                  :visible.sync="exportDialog"
                  width="30%"
                  :before-close="handleClose">
            <span>导出</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="exportDialog = false">取 消</el-button>
    <el-button type="primary" @click="exportUser()">确 定</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog title="导出" :show.sync="exportDialog">
            <span class="content">导出</span>
            <div class="butCoat">
              <el-button class="canBut" @click="exportDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="exportUser()">确 定</el-button>
            </div>
          </fly-dialog>
          <!--启用-->
          <!--<el-dialog
                  title="启用"
                  :visible.sync="startDialog"
                  width="30%"
                  :before-close="handleClose">
            <span>确定启用该用户？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="startDialog = false">取 消</el-button>
    <el-button type="primary" @click="startUser()">确 定</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog title="启用" :show.sync="startDialog">
            <span class="content">确定启用该用户？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="startDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="startUser()">确 定</el-button>
            </div>
          </fly-dialog>
          <!--停用-->
          <!--<el-dialog
                  title="停用"
                  :visible.sync="stopDialog"
                  width="30%"
                  :before-close="handleClose">
            <span>确定停用该用户？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="stopDialog = false">取 消</el-button>
    <el-button type="primary" @click="stopUser()">确 定</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog title="停用" :show.sync="stopDialog">
            <span class="content">确定停用该用户？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="stopDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="stopUser()">确 定</el-button>
            </div>
          </fly-dialog>
          <!--重置密码-->
          <!--<el-dialog
                  title="重置密码"
                  :visible.sync="resetPassDialog"
                  width="30%"
                  :before-close="handleClose">
            <span>确定重置该用户密码？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="resetPassDialog = false">取 消</el-button>
    <el-button type="primary" @click="resetPassUser()">确 定</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog title="重置密码" :show.sync="resetPassDialog">
            <span class="content">确定重置该用户密码？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="resetPassDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="resetPassUser()">确 定</el-button>
            </div>
          </fly-dialog>
          <!--重置回答-->
          <!--<el-dialog
                  title="重置回答"
                  :visible.sync="resetAnswerDialog"
                  width="30%"
                  :before-close="handleClose">
            <span>确定重置该用户回答？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="resetAnswerDialog = false">取 消</el-button>
    <el-button type="primary" @click="resetAnswerUser()">确 定</el-button>
  </span>
          </el-dialog>-->
          <fly-dialog title="重置回答" :show.sync="resetAnswerDialog">
            <span class="content">确定重置该用户回答？</span>
            <div class="butCoat">
              <el-button class="canBut" @click="resetAnswerDialog = false">取 消</el-button>
              <el-button class="okBut" type="primary" @click="resetAnswerUser()">确 定</el-button>
            </div>
          </fly-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FlyDialog from '@/components/fly-dialog'

  export default {
  name: 'userManage',
    components: {
      FlyDialog
    },
  data () {
    return {
      modal: false,
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
        name: '',
        section: '',
        userGroup: '',
        loginType: '',
        status: '',
        policeKind: '',
        reportedSection: ''
      },
      criteria: {
        user: '',
        name: '',
        section: '',
        userGroup: '',
        status: ''
      },
      lookInfo: {
        user: '6666',
        name: '',
        section: '',
        userGroup: '',
        loginType: '',
        status: '',
        policeKind: '',
        reportedSection: ''
      },
      userList: [
        {
          user: 'admin',
          name: '王国维',
          section: '四川省公安厅',
          userGroup: '管理员',
          lastLoginDate: '2019-07-08 15:57:40',
          loginType: '账号登录',
          status: '启用',
          policeKind: '刑侦',
          reportedSection: ''
        }, {
          user: 'admin',
          name: '王国维',
          section: '四川省公安厅',
          userGroup: '管理员',
          lastLoginDate: '2019-07-08 15:57:40',
          loginType: '账号登录',
          status: '启用',
          policeKind: '刑侦',
          reportedSection: ''
        }, {
          user: 'admin',
          name: '王国维',
          section: '四川省公安厅',
          userGroup: '管理员',
          lastLoginDate: '2019-07-08 15:57:40',
          loginType: '账号登录',
          status: '启用',
          policeKind: '刑侦',
          reportedSection: ''
        }, {
          user: 'admin',
          name: '王国维',
          section: '四川省公安厅',
          userGroup: '管理员',
          lastLoginDate: '2019-07-08 15:57:40',
          loginType: '账号登录',
          status: '启用',
          policeKind: '刑侦',
          reportedSection: ''
        }
      ],
      fileList2: [],
      rules: {
        user: [
          { required: true, message: '请输入登陆账号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        section: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        userGroup: [
          { required: true, message: '请选择用户组', trigger: 'blur' }
        ],
        lastLoginDate: [
          { required: true, message: '请选择最后登录时间', trigger: 'blur' }
        ],
        loginType: [
          { required: true, message: '请选择登录类型', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择登录状态', trigger: 'blur' }
        ],
        policeKind: [
          { required: true, message: '请选择警种类别', trigger: 'blur' }
        ],
        reportedSection: [
          { required: true, message: '请选择上报部门', trigger: 'blur' }
        ]
      },
      sectionList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      userGroupList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      loginTypeList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      statusList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      policeKindList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      reportedSectionList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      multipleSelection: []
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    // 添加用户
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.addDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑用户
    editUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.editDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 判断是否只选择一个用户
    pitchOn () {
      let isPitchOn = false
      this.multipleSelection.length === 1 ? isPitchOn = true : this.$message.error('请选择一条数据!')
      return isPitchOn
    },
    // 判断是否选择用户
    pitchOn2 () {
      let isPitchOn = false
      this.multipleSelection.length > 0 ? isPitchOn = true : this.$message.error('请至少选择一条数据!')
      return isPitchOn
    },
    // 查看用户
    lookUser () {
      if (this.pitchOn()) {
        this.lookInfo = this.multipleSelection[0]
        this.lookDialog = true
      }
    },
    // 删除用户
    deleteUser () {
      this.deleteDialog = false
    },
    // 刷新
    flush () {
      this.$message({
        message: '刷新成功',
        type: 'success'
      })
    },
    // 导入
    importUser () {
      this.importDialog = false
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    // 导出
    exportUser () {
      this.exportDialog = false
    },
    // 启用
    startUser () {
      this.startDialog = false
    },
    // 停用
    stopUser () {
      this.stopDialog = false
    },
    // 重置密码
    resetPassUser () {
      this.resetPassDialog = false
    },
    // 重置回答
    resetAnswerUser () {
      this.resetAnswerDialog = false
    },
    // 搜索
    isSeek () {
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(val)
    }

  }
}
</script>

<style lang="stylus" scoped>
  #userManage
    margin 0 auto
    position relative
    ul
      display inline-block
    ul li
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

    .criteria,
    .dialog
      .el-form-item
        /*width 180px*/
        display inline-block
        margin-right 8px
      .seekBut
        color: #ffffff;
        margin 20px 14px
        padding: 9px 15px;
        background-color: rgba(70, 125, 68, 1);
        border: 1px solid rgba(70, 125, 68, 1);
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

    .userList >>>
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
      .organTable
       .el-table td,
       .el-table th.is-leaf
         border: 1px solid #143d4b!important;
       .el-table--border::after,
       .el-table--group::after,
       .el-table::before
         background-color transparent;

</style>
<style lang="stylus">
  .coat1
    width 1200px
    position relative
    top 0
    left 0
    right 0
    bottom 0
    margin 0 auto
    background-color rgba(44, 239, 255, 0.1)
    padding 20px
  .coat2
    width 1160px
    margin-top 18px
    margin-bottom 20px
    padding 20px 15px 20px 15px
    position relative
    top 0
    left 0
    right 0
    bottom 0
    margin 0 auto
    background-color rgba(44, 239, 255, 0.1)
  .dialog
    .el-dialog
      /*background: rgba(44, 239, 255, 0.5)!important*/
      background: #083438 !important
      top 30%
    .butCoat
      text-align center
    .impBut {
      background-color: rgba(44, 239, 255, 0.3);
      border: 1px solid rgba(44, 239, 255, 0.3);
      color: #ffffff;
      padding: 9px 20px;
      margin-left: 1px;
    }
    .canBut,
    .okBut
      color: #ffffff
      margin 20px 14px
      padding: 9px 15px

    .okBut
      background-color: rgba(70, 125, 68, 1)
      border: 1px solid rgba(70, 125, 68, 1)

    .canBut
      background-color: #7f3237
      border: 1px solid #7f3237

    .el-form
      width 300px
      height auto
      margin 30px auto
    .el-dialog .el-dialog__body .body-content
      background-color rgba(44, 239, 255, 0.2)

    .el-form-item__label
      background-color rgba(44, 239, 255, 0.4)
      color: #ffffff;

    .el-input__inner {
      border-radius: 0px;
      background-color: rgba(44, 239, 255, 0.2);
      border: 1px none #DCDFE6;
      color: #ffffff;
      margin-left: 1px;
    }

    .el-form-item {
      margin 0 auto
      margin-bottom: 1px;
      width 295px!important
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
</style>
