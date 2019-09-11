<template>
    <div class="menuManage">
      <div class="leftMenu">
        <el-button class="addBut" type="primary" @click="addDialog = true">添加</el-button>
        <el-button class="delBut" type="primary" @click="pitchOn2() && (deleteDialog = true)">删除</el-button>
        <div class="menuList">
          <!--<el-select v-model="backEnd" popper-class='leftselect' placeholder="后端">
            <el-option
              v-for="item in backEndList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="frontEnd" popper-class='leftselect' placeholder="前端">
            <el-option
              v-for="item in frontEndList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <label v-for="(item,index) in leftMenu" :key="index">
              <el-submenu :index="item.menuId">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.name}}</span>
                </template>
                <label v-for="(item2,index) in item.items" :key="index">
                  <el-menu-item :index="item2.menuId">{{item2.name}}</el-menu-item>
                </label>
              </el-submenu>
            </label>
          </el-menu>
        <!--  <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>前台</span>
              </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
                <el-submenu index="1-4-1">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">后台</span>
            </el-menu-item>
          </el-menu>
          <el-menu class="el-menu-vertical-demo" @select="handleOpen" :collapse="isCollapse">
            <label v-for="(item,index) in listNav" :key="index">
              <label v-for="(itemR,indexR) in item.extopts" :key="indexR">
                <label v-for="(iconitem2,iconIndex2) in (indexR).match(/(\S*)@@/)" :key="iconIndex2">
                  <label v-if="iconIndex2 > 0">
                    <el-menu-item :url="item.url" :index=iconitem2 v-if="item.items.length == 0">
                      <label v-for="(iconitem1,iconIndex1) in (indexR).match(/@@(\S*)/)" :key="iconIndex1">
                        <label v-if="iconIndex1 > 0">
                          <i :class=iconitem1></i>
                        </label>
                      </label>
                      <span slot="title">{{ item.text}}{{iconitem2}}</span>
                    </el-menu-item>
                    <el-submenu :index=iconitem2 v-else>
                      <template slot="title">
                        <label v-for="(iconitem3,iconIndex3) in (indexR).match(/@@(\S*)/)" :key="iconIndex3">
                          <label v-if="iconIndex3 > 0">
                            <i :class=iconitem3></i>
                          </label>
                        </label>
                        <span slot="title" v-show="false">{{ item.text}}{{iconitem2}}111</span>
                      </template>
                      <label v-for="(item1,index1) in item.items" :key="index1">
                        <label v-for="(itemR1,indexR1) in item1.extopts" :key="indexR1">
                          <el-menu-item :url="item1.url" :index=indexR1 v-if="item1.items.length == 0">{{item1.text}}{{indexR1}}</el-menu-item>
                          <el-submenu :index=indexR1 v-else>
                            <template slot="title">{{item1.text}}{{indexR1}}</template>
                            <label v-for="(item2,index2) in item1.items" :key="index2">
                              <label v-for="(itemR2,indexR2) in item2.extopts" :key="indexR2">
                                <el-menu-item :url="item2.url" :index=indexR2>{{item2.text}}{{indexR2}}</el-menu-item>
                              </label>
                            </label>
                          </el-submenu>
                        </label>
                      </label>
                    </el-submenu>
                  </label>
                </label>
              </label>
            </label>
          </el-menu>-->
        </div>
      </div>
      <div class="right">
        <div class="coat1">
          <div class="coat2">
            <div class="from">
              <el-form ref="form" :model="form" status-icon :rules="rules" :hide-required-asterisk = 'asterisk' label-width="50%" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="上级" prop="higherUp">
                  <el-input v-model="form.higherUp"></el-input>
                </el-form-item>
                <el-form-item label="所属模块" prop="isModule">
                  <el-select v-model="form.isModule" popper-class='fromselect'>
                    <el-option v-for="item in isModuleList"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="后台样式" prop="backStyle">
                  <el-input v-model="form.backStyle"></el-input>
                </el-form-item>
                <el-form-item label="前台样式" prop="frontStyle">
                  <el-input v-model="form.frontStyle"></el-input>
                </el-form-item>
                <el-form-item label="链接地址" prop="chainedAddress">
                  <el-input v-model="form.chainedAddress"></el-input>
                </el-form-item>
                <el-form-item label="权限跟路径" prop="powerPath">
                  <el-input v-model="form.powerPath"></el-input>
                </el-form-item>
                <el-form-item label="排序下级" prop="sortSubordinate">
                  <el-button type="primary">为下级设置编号</el-button>
                </el-form-item>
                <el-form-item label="调整顺序" prop="adjustSort">
                  <el-button type="primary">上移</el-button><el-button type="primary">下移</el-button>
                </el-form-item>
              </el-form>
              <el-button class="sureBut" type="primary">确定</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog">
        <!--添加-->
        <fly-dialog title="添加用户" :show.sync="addDialog" :width="'660px'">
          <div class="from">
            <el-form ref="form" :model="form" status-icon :rules="rules" :hide-required-asterisk = 'asterisk' label-width="50%" class="demo-ruleForm">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="上级" prop="higherUp">
                <el-input v-model="form.higherUp"></el-input>
              </el-form-item>
              <el-form-item label="所属模块" prop="isModule">
                <el-select v-model="form.isModule" popper-class='fromselect'>
                  <el-option v-for="item in isModuleList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="后台样式" prop="backStyle">
                <el-input v-model="form.backStyle"></el-input>
              </el-form-item>
              <el-form-item label="前台样式" prop="frontStyle">
                <el-input v-model="form.frontStyle"></el-input>
              </el-form-item>
              <el-form-item label="链接地址" prop="chainedAddress">
                <el-input v-model="form.chainedAddress"></el-input>
              </el-form-item>
              <el-form-item label="权限跟路径" prop="powerPath">
                <el-input v-model="form.powerPath"></el-input>
              </el-form-item>
              <el-form-item label="排序下级" prop="sortSubordinate">
                <el-button type="primary">为下级设置编号</el-button>
              </el-form-item>
              <el-form-item label="调整顺序" prop="adjustSort">
                <el-button type="primary">上移</el-button><el-button type="primary">下移</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="butCoat">
            <el-button class="canBut" @click="addDialog = false">取 消</el-button>
            <el-button class="okBut" type="primary" @click="addMenu('form')">确 定</el-button>
          </div>
        </fly-dialog>
        <!--删除-->
        <fly-dialog title="删除" :show.sync="deleteDialog">
          <span class="content">确定删除？</span>
          <div class="butCoat">
            <el-button class="canBut" @click="deleteDialog = false">取 消</el-button>
            <el-button class="okBut" type="primary" @click="deleteMenu()">确 定</el-button>
          </div>
        </fly-dialog>
      </div>
    </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
export default {
  name: 'menuManage',
  components: {
    FlyDialog
  },
  data () {
    return {
      asterisk: true, // 影响*号
      addDialog: false,
      deleteDialog: false,
      form: {
        name: '',
        higherUp: '',
        isModule: '2',
        backStyle: '',
        frontStyle: '',
        chainedAddress: '',
        powerPath: '',
        sortSubordinate: '',
        adjustSort: ''
      },
      backEnd: '1',
      frontEnd: '1',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        higherUp: [
          { required: true, message: '上级', trigger: 'blur' }
        ],
        isModule: [
          { required: true, message: '请选择所属模块', trigger: 'blur' }
        ],
        chainedAddress: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        powerPath: [
          { required: true, message: '请输入权限跟路径', trigger: 'blur' }
        ]
      },
      backEndList: [
        {
          value: '1',
          label: '后台'
        }, {
          value: '2',
          label: '用户管理'
        }, {
          value: '3',
          label: '菜单管理'
        }, {
          value: '4',
          label: '角色管理'
        }, {
          value: '5',
          label: '机构管理'
        }
      ],
      frontEndList: [
        {
          value: '1',
          label: '前台'
        }, {
          value: '2',
          label: 'i2'
        }, {
          value: '3',
          label: '话单分析'
        }, {
          value: '4',
          label: '关系分析'
        }, {
          value: '5',
          label: '时空分析'
        }, {
          value: '6',
          label: '联案分析'
        }
      ],
      leftMenu: [
        {
          name: '前台',
          menuId: '1',
          items: [
            {
              name: 'i2',
              menuId: '1-1',
              items: []
            },
            {
              name: '话单分析',
              menuId: '1-2',
              items: []
            },
            {
              name: '关系分析',
              menuId: '1-3',
              items: []
            },
            {
              name: '时空分析',
              menuId: '1-4',
              items: []
            },
            {
              name: '联案分析',
              menuId: '1-5',
              items: []
            }
          ]
        },
        {
          name: '后台',
          menuId: '2',
          items: [
            {
              name: '用户管理',
              menuId: '2-1',
              items: []
            },
            {
              name: '菜单管理',
              menuId: '2-2',
              items: []
            },
            {
              name: '角色管理',
              menuId: '2-3',
              items: []
            },
            {
              name: '机构管理',
              menuId: '2-4',
              items: []
            }
          ]
        }
      ],
      listNav: [
        {
          name: 'dldt',
          text: '地理地图',
          url: 'http://10.156.121.38:9000/gwUap',
          extopts: { '/dldt@@el-icon-location': '' },
          items: [],
          outter: false
        },
        {
          name: 'jccx',
          text: '基础查询',
          url: 'http://10.156.121.38:9000/gwUap',
          extopts: { '/jccx@@el-icon-search': '' },
          items: [
            {
              name: 'cxdw',
              text: '查询定位',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/cxdw': '' },
              items: [
                {
                  name: 'dwcx',
                  text: '定位查询',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/dwcx': '' },
                  items: [],
                  outter: false
                },
                {
                  name: 'dlzhcx',
                  text: '电缆综合查询',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/dlzhcx': '' },
                  items: [],
                  outter: false
                },
                {
                  name: 'scfzsszhcx',
                  text: '生产辅助设施综合查询',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/scfzsszhcx': '' },
                  items: [],
                  outter: false
                },
                {
                  name: 'tdzhcx',
                  text: '通道综合查询',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/tdzhcx': '' },
                  items: [],
                  outter: false
                },
                {
                  name: 'tdnxcx',
                  text: '通道年限查询',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/tdnxcx': '' },
                  items: [],
                  outter: false
                },
                {
                  name: 'jhcx',
                  text: '几何查询',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/jhcx': '' },
                  items: [],
                  outter: false
                }
              ],
              outter: false
            },
            {
              name: 'dlzycxfx',
              text: '电缆资源查询分析',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/dlzycxfx': '' },
              items: [
                {
                  name: 'dlmspmcx',
                  text: '电缆埋设剖面查询',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/dlmspmcx': '' },
                  items: [],
                  outter: false
                },
                {
                  name: 'dljpmtcx',
                  text: '电缆井剖面图查询',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/dljpmtcx': '' },
                  items: [],
                  outter: false
                }
              ],
              outter: false
            },
            {
              name: 'txsc',
              text: '图形输出',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/txsc': '' },
              items: [
                {
                  name: 'dqtfdy',
                  text: '当前图幅打印',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/dqtfdy': '' },
                  items: [],
                  outter: false
                },
                {
                  name: 'lkdy',
                  text: '拉框打印',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: { '/lkdy': '' },
                  items: [],
                  outter: false
                }
              ],
              outter: false
            }
          ],
          outter: false
        },
        {
          name: 'ywgl',
          text: '业务管理',
          url: 'http://10.156.121.38:9000/gwUap',
          extopts: { '/ywgl@@el-icon-tickets': '' },
          items: [
            {
              name: 'zzbd',
              text: '政治保电',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/zzbd': '' },
              items: [
                {
                  name: 'bdrwd',
                  text: '保电任务单',
                  url: 'http://10.156.121.38:9000/gwUap',
                  extopts: {
                    '/BusinessManagement/politicalProtection/protectTacks/protectTack':
                      ''
                  },
                  items: [],
                  outter: false
                }
              ],
              outter: false
            },
            {
              name: 'gzt',
              text: '工作台',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/gzt': '' },
              items: [],
              outter: false
            },
            {
              name: 'dmgl',
              text: '断面管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/dmgl': '' },
              items: [],
              outter: false
            },
            {
              name: 'jhgl',
              text: '计划管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/jhgl': '' },
              items: [],
              outter: false
            },
            {
              name: 'xsjcgl',
              text: '巡视检测管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/xsjcgl': '' },
              items: [],
              outter: false
            },
            {
              name: 'yhgl',
              text: '隐患管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/yhgl': '' },
              items: [],
              outter: false
            },
            {
              name: 'fxgk',
              text: '风险管控',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/fxgk': '' },
              items: [],
              outter: false
            },
            {
              name: 'qxgl',
              text: '缺陷管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/qxgl': '' },
              items: [],
              outter: false
            },
            {
              name: 'gzgl',
              text: '故障管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/gzgl': '' },
              items: [],
              outter: false
            },
            {
              name: 'yxztpj',
              text: '运行状态评价',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/yxztpj': '' },
              items: [],
              outter: false
            },
            {
              name: 'gcjsgl',
              text: '工程建设管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/gcjsgl': '' },
              items: [],
              outter: false
            }
          ],
          outter: false
        },
        {
          name: 'jkzz',
          text: '监控主站',
          url: 'http://10.156.121.38:9000/gwUap/Monitoring',
          extopts: { '/jkzz@@el-icon-view': '' },
          items: [],
          outter: false
        },
        {
          name: 'znxj',
          text: '智能巡检',
          url: 'http://10.156.121.38:9000/gwUap',
          extopts: { '/Polling@@el-icon-sort': '' },
          items: [],
          outter: false
        },
        {
          name: 'tjfx',
          text: '统计分析',
          url: 'http://10.156.121.38:9000/gwUap/Statistics',
          extopts: { '/tjfx@@el-icon-edit': '' },
          items: [],
          outter: false
        },
        {
          name: 'zhxx',
          text: '综合信息',
          url: 'http://10.156.121.38:9000/gwUap/Synthesize',
          extopts: { '/zhxx@@el-icon-document': '' },
          items: [],
          outter: false
        },
        {
          name: 'zbkb',
          text: '指标看板',
          url: 'http://10.156.121.38:9000/gwUap/Board',
          extopts: { '/zbkb@@el-icon-news': '' },
          items: [],
          outter: false
        },
        {
          name: 'ztt',
          text: '专题图',
          url: 'http://10.156.121.38:9000/gwUap',
          extopts: { '/ztt@@el-icon-picture-outline': '' },
          items: [
            {
              name: 'jkfb',
              text: '监控分布',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/jkfb': '' },
              items: [],
              outter: false
            },
            {
              name: 'jkgj',
              text: '监控警告',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/jkgj': '' },
              items: [],
              outter: false
            },
            {
              name: 'tdzyl',
              text: '通道占用率',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/tdzyl': '' },
              items: [],
              outter: false
            },
            {
              name: 'tdfj',
              text: '通道分级',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/tdfj': '' },
              items: [],
              outter: false
            },
            {
              name: 'gcjsgl',
              text: '工程建设管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/gcjsgl': '' },
              items: [],
              outter: false
            },
            {
              name: 'yhgl',
              text: '隐患管理',
              url: 'http://10.156.121.38:9000/gwUap',
              extopts: { '/yhgl': '' },
              items: [],
              outter: false
            }
          ]
        }
      ],
      isModuleList: [
        {
          value: '1',
          label: '前台'
        }, {
          value: '2',
          label: 'i2'
        }, {
          value: '3',
          label: '话单分析'
        }, {
          value: '4',
          label: '关系分析'
        }, {
          value: '5',
          label: '时空分析'
        }, {
          value: '6',
          label: '联案分析'
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    // 判断是否选择菜单
    pitchOn2 () {
      // let isPitchOn = false
      let isPitchOn = true
      // this.multipleSelection.length > 0 ? isPitchOn = true : this.$message.error('请至少选择一条数据!')
      return isPitchOn
    },
    // 添加菜单
    addMenu (formName) {
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
    // 删除菜单
    deleteMenu () {
      this.deleteDialog = false
    }
  }
}
</script>

<style lang="stylus" scoped>

  .menuManage .leftMenu
    float left
  .menuManage .leftMenu
   width: 239px;
   height: 971px;
   background-color rgba(44, 239, 255, 0.2)
   overflow hidden
   padding 0 30px
  .menuManage .leftMenu .addBut,
  .menuManage .leftMenu .delBut
    color: #ffffff;
    margin 20px 14px
    padding: 9px 15px;
  .menuManage .leftMenu .addBut
    background-color: rgba(70, 125, 68, 1);
    border: 1px solid rgba(70, 125, 68, 1);
  .menuManage .leftMenu .delBut
    background-color: #7f3237;
    border: 1px solid #7f3237;
  .menuList
   width 180px
   overflow hidden
  .menuList >>>.el-submenu__title
   color #ffffff
   border-bottom 1px solid #0d3644
  .menuList >>>.el-submenu__title:hover,
  .menuList >>>.el-submenu .el-menu-item:hover
   background-color rgba(44, 239, 255, 0.4)
  .menuList >>>.el-menu
   border-right: none 1px;
   background-color rgba(44, 239, 255, 0.4)
  .menuList >>>.el-submenu .el-menu-item
   border-bottom 1px solid #0d3644
   background-color #187d8e
   color: #ffffff;
  .right
   width 1200px
   margin 0 auto
   position relative
  .from
    width 600px
    height auto
    margin 0 auto
  .menuManage
     .el-form-item
       height 40px
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

     .dialog
       .el-button {
         background-color: rgba(44, 239, 255, 0.3);
         border: 1px solid rgba(44, 239, 255, 0.3);
         color: #ffffff;
         padding: 9px 20px;
         margin-left: 1px;
       }
</style>
<style lang="stylus">
  .menuManage .coat2 .el-form-item__label
    background-color rgba(44, 239, 255, 0.4)
    color: #ffffff;

  .menuManage .coat2 .el-input__inner {
    border-radius: 0px;
    background-color: rgba(44, 239, 255, 0.2);
    border: 1px none #DCDFE6;
    color: #ffffff;
    margin-left: 1px;
  }

  .menuManage .coat2 .el-form-item {
    margin-bottom: 1px;
  }

  .menuManage .coat2 .el-form-item__error {
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
  .menuManage .coat2 .el-button {
    background-color: rgba(44, 239, 255, 0.3);
    border: 1px solid rgba(44, 239, 255, 0.3);
    color: #ffffff;
    padding: 9px 20px;
    margin-left: 1px;
  }
  .menuManage .coat2 .el-select {
    width 100%
  }
  .sureBut
    display block!important
    margin 30px auto!important
    text-align center!important
 /* .fromselect {
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
  .leftselect {
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
     }*/
</style>
