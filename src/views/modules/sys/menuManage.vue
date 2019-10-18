<template>
  <div class="menuManage">
    <div class="leftMenu">
      <el-button class="addBut" type="primary" @click="addDialog = true"
        >添加</el-button
      >
      <el-button
        class="delBut"
        type="primary"
        @click="pitchOn2() && (deleteDialog = true)"
        >删除</el-button
      >
      <div class="menuList">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          active-text-color="#ffd04b"
          :unique-opened="uniqueOpened"
          @open="handleOpen"
          @close="handleClose"
        >
          <label
            v-for="(item, index) in leftMenu"
            @click="
              addInfo(item)
              menuActive = index
            "
            :key="index"
          >
            <el-submenu
              :index="item.menuId"
              :class="{ active: menuActive == index }"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <label
                v-for="(item2, index2) in item.items"
                :key="index2"
                @click.stop="addInfo(item2, item)"
              >
                <el-menu-item :index="item2.menuId">
                  <template slot="title">
                    <span>{{ item2.name }}</span>
                  </template>
                  <label v-if="item2.items.length > 0">
                    <label
                      v-for="(item3, index3) in item2.items.list"
                      :key="index3"
                      @click.stop="addInfo(item3, item2)"
                    >
                      <el-menu-item :index="item3.menuId">
                        {{ item3.name }}
                      </el-menu-item>
                    </label>
                  </label>
                </el-menu-item>
              </label>
            </el-submenu>
          </label>
        </el-menu>
      </div>
    </div>
    <div class="right">
      <div class="coat1">
        <div class="coat2">
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
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="上级" prop="higherUp">
                <el-select
                  @change="change"
                  v-model="form.higherUp"
                  popper-class="fromselect"
                >
                  <el-option
                    v-for="item in isModuleList2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属模块" prop="isModule">
                <el-select v-model="form.isModule" popper-class="fromselect">
                  <el-option
                    v-for="item in isModuleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
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
                <el-button type="primary">上移</el-button
                ><el-button type="primary">下移</el-button>
              </el-form-item>
            </el-form>
            <el-button
              class="sureBut"
              @click="editorMenu('form')"
              type="primary"
              >确定</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="dialog">
      <!--添加-->
      <fly-dialog title="添加菜单" :show.sync="addDialog" :width="'660px'">
        <div class="from">
          <el-form
            ref="form2"
            :model="form2"
            status-icon
            :rules="rules"
            :hide-required-asterisk="asterisk"
            label-width="50%"
            class="demo-ruleForm"
          >
            <el-form-item label="名称" prop="name">
              <el-input v-model="form2.name"></el-input>
            </el-form-item>
            <el-form-item label="前后台" prop="higherUp">
              <el-select
                @change="change"
                v-model="form2.higherUp"
                popper-class="fromselect"
              >
                <el-option
                  v-for="item in isModuleList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="父级" prop="isModule">
              <el-select v-model="form2.isModule" popper-class="fromselect">
                <el-option
                  v-for="(item, index) in isModuleList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="后台样式" prop="backStyle">
              <el-input v-model="form2.backStyle"></el-input>
            </el-form-item>
            <el-form-item label="前台样式" prop="frontStyle">
              <el-input v-model="form2.frontStyle"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="chainedAddress">
              <el-input v-model="form2.chainedAddress"></el-input>
            </el-form-item>
            <el-form-item label="权限跟路径" prop="powerPath">
              <el-input v-model="form2.powerPath"></el-input>
            </el-form-item>
            <!--<el-form-item label="排序下级" prop="sortSubordinate">-->
            <!--<el-button type="primary">为下级设置编号</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="调整顺序" prop="adjustSort">-->
            <!--<el-button type="primary">上移</el-button-->
            <!--&gt;<el-button type="primary">下移</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
            <!--&lt;!&ndash;<el-button type="primary">确定</el-button>&ndash;&gt;-->
            <!--</el-form-item>-->
          </el-form>
        </div>
        <div class="butCoat">
          <el-button class="canBut" @click="addDialog = false">取 消</el-button>
          <el-button class="okBut" type="primary" @click="addMenu('form2')"
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
          <el-button class="okBut" type="primary" @click="deleteMenu()"
            >确 定</el-button
          >
        </div>
      </fly-dialog>
    </div>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
import { getMenu, editorMenu, addMenu, delMenu } from '@/api/system'
import Cookies from 'js-cookie'
export default {
  name: 'menuManage',
  components: {
    FlyDialog,
  },
  data() {
    return {
      uniqueOpened: true,
      asterisk: true, // 影响*号
      addDialog: false,
      deleteDialog: false,
      isOKId: '',
      menuActive: 0,
      form: {
        name: '',
        higherUp: '',
        isModule: '2',
        backStyle: '',
        frontStyle: '',
        chainedAddress: '',
        powerPath: '',
        sortSubordinate: '',
        adjustSort: '',
      },
      form2: {
        name: '',
        higherUp: '',
        isModule: '',
        backStyle: '',
        frontStyle: '',
        chainedAddress: '',
        powerPath: '',
        sortSubordinate: '',
        adjustSort: '',
      },
      backEnd: '1',
      frontEnd: '1',
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        higherUp: [{ required: true, message: '上级', trigger: 'blur' }],
        isModule: [
          { required: true, message: '请选择所属模块', trigger: 'blur' },
        ],
        chainedAddress: [
          { required: true, message: '请输入链接地址', trigger: 'blur' },
        ],
        powerPath: [
          { required: true, message: '请输入权限跟路径', trigger: 'blur' },
        ],
      },
      backEndList: [
        {
          value: '1',
          label: '后台',
        },
        {
          value: '2',
          label: '用户管理',
        },
        {
          value: '3',
          label: '菜单管理',
        },
        {
          value: '4',
          label: '角色管理',
        },
        {
          value: '5',
          label: '机构管理',
        },
      ],
      frontEndList: [
        {
          value: '1',
          label: '前台',
        },
        {
          value: '2',
          label: 'i2',
        },
        {
          value: '3',
          label: '话单分析',
        },
        {
          value: '4',
          label: '关系分析',
        },
        {
          value: '5',
          label: '时空分析',
        },
        {
          value: '6',
          label: '联案分析',
        },
      ],
      leftMenu: [
        // {
        //   name: '前台',
        //   menuId: '1',
        //   list: [
        //     {
        //       name: 'i2',
        //       menuId: '1-1',
        //       info: {
        //         name: '111',
        //         higherUp: '444',
        //         isModule: '2',
        //         backStyle: '',
        //         frontStyle: '',
        //         chainedAddress: '#',
        //         powerPath: '#',
        //         sortSubordinate: '111',
        //         adjustSort: '111',
        //       },
        //       items: [],
        //     },
        //     {
        //       name: '话单分析',
        //       menuId: '1-2',
        //       info: {
        //         name: '111',
        //         higherUp: '444',
        //         isModule: '2',
        //         backStyle: '',
        //         frontStyle: '',
        //         chainedAddress: '#',
        //         powerPath: '#',
        //         sortSubordinate: '111',
        //         adjustSort: '111',
        //       },
        //       items: [],
        //     },
        //     {
        //       name: '关系分析',
        //       menuId: '1-3',
        //       items: [],
        //     },
        //     {
        //       name: '时空分析',
        //       menuId: '1-4',
        //       items: [],
        //     },
        //     {
        //       name: '联案分析',
        //       menuId: '1-5',
        //       items: [],
        //     },
        //   ],
        // },
        // {
        //   name: '后台',
        //   menuId: '2',
        //   list: [
        //     {
        //       name: '用户管理',
        //       menuId: '2-1',
        //       info: {
        //         name: '111',
        //         higherUp: '444',
        //         isModule: '2',
        //         backStyle: '',
        //         frontStyle: '',
        //         chainedAddress: '#',
        //         powerPath: '#',
        //         sortSubordinate: '111',
        //         adjustSort: '111',
        //       },
        //       items: [],
        //     },
        //     {
        //       name: '菜单管理',
        //       menuId: '2-2',
        //       items: [],
        //     },
        //     {
        //       name: '角色管理',
        //       menuId: '2-3',
        //       items: [],
        //     },
        //     {
        //       name: '机构管理',
        //       menuId: '2-4',
        //       items: [],
        //     },
        //   ],
        // },
      ],
      // listNav: [
      //   {
      //     name: 'dldt',
      //     text: '地理地图',
      //     url: 'http://10.156.121.38:9000/gwUap',
      //     extopts: { '/dldt@@el-icon-location': '' },
      //     items: [],
      //     outter: false,
      //   },
      //   {
      //     name: 'jccx',
      //     text: '基础查询',
      //     url: 'http://10.156.121.38:9000/gwUap',
      //     extopts: { '/jccx@@el-icon-search': '' },
      //     items: [
      //       {
      //         name: 'cxdw',
      //         text: '查询定位',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/cxdw': '' },
      //         items: [
      //           {
      //             name: 'dwcx',
      //             text: '定位查询',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/dwcx': '' },
      //             items: [],
      //             outter: false,
      //           },
      //           {
      //             name: 'dlzhcx',
      //             text: '电缆综合查询',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/dlzhcx': '' },
      //             items: [],
      //             outter: false,
      //           },
      //           {
      //             name: 'scfzsszhcx',
      //             text: '生产辅助设施综合查询',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/scfzsszhcx': '' },
      //             items: [],
      //             outter: false,
      //           },
      //           {
      //             name: 'tdzhcx',
      //             text: '通道综合查询',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/tdzhcx': '' },
      //             items: [],
      //             outter: false,
      //           },
      //           {
      //             name: 'tdnxcx',
      //             text: '通道年限查询',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/tdnxcx': '' },
      //             items: [],
      //             outter: false,
      //           },
      //           {
      //             name: 'jhcx',
      //             text: '几何查询',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/jhcx': '' },
      //             items: [],
      //             outter: false,
      //           },
      //         ],
      //         outter: false,
      //       },
      //       {
      //         name: 'dlzycxfx',
      //         text: '电缆资源查询分析',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/dlzycxfx': '' },
      //         items: [
      //           {
      //             name: 'dlmspmcx',
      //             text: '电缆埋设剖面查询',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/dlmspmcx': '' },
      //             items: [],
      //             outter: false,
      //           },
      //           {
      //             name: 'dljpmtcx',
      //             text: '电缆井剖面图查询',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/dljpmtcx': '' },
      //             items: [],
      //             outter: false,
      //           },
      //         ],
      //         outter: false,
      //       },
      //       {
      //         name: 'txsc',
      //         text: '图形输出',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/txsc': '' },
      //         items: [
      //           {
      //             name: 'dqtfdy',
      //             text: '当前图幅打印',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/dqtfdy': '' },
      //             items: [],
      //             outter: false,
      //           },
      //           {
      //             name: 'lkdy',
      //             text: '拉框打印',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: { '/lkdy': '' },
      //             items: [],
      //             outter: false,
      //           },
      //         ],
      //         outter: false,
      //       },
      //     ],
      //     outter: false,
      //   },
      //   {
      //     name: 'ywgl',
      //     text: '业务管理',
      //     url: 'http://10.156.121.38:9000/gwUap',
      //     extopts: { '/ywgl@@el-icon-tickets': '' },
      //     items: [
      //       {
      //         name: 'zzbd',
      //         text: '政治保电',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/zzbd': '' },
      //         items: [
      //           {
      //             name: 'bdrwd',
      //             text: '保电任务单',
      //             url: 'http://10.156.121.38:9000/gwUap',
      //             extopts: {
      //               '/BusinessManagement/politicalProtection/protectTacks/protectTack':
      //                 '',
      //             },
      //             items: [],
      //             outter: false,
      //           },
      //         ],
      //         outter: false,
      //       },
      //       {
      //         name: 'gzt',
      //         text: '工作台',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/gzt': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'dmgl',
      //         text: '断面管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/dmgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'jhgl',
      //         text: '计划管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/jhgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'xsjcgl',
      //         text: '巡视检测管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/xsjcgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'yhgl',
      //         text: '隐患管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/yhgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'fxgk',
      //         text: '风险管控',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/fxgk': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'qxgl',
      //         text: '缺陷管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/qxgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'gzgl',
      //         text: '故障管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/gzgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'yxztpj',
      //         text: '运行状态评价',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/yxztpj': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'gcjsgl',
      //         text: '工程建设管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/gcjsgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //     ],
      //     outter: false,
      //   },
      //   {
      //     name: 'jkzz',
      //     text: '监控主站',
      //     url: 'http://10.156.121.38:9000/gwUap/Monitoring',
      //     extopts: { '/jkzz@@el-icon-view': '' },
      //     items: [],
      //     outter: false,
      //   },
      //   {
      //     name: 'znxj',
      //     text: '智能巡检',
      //     url: 'http://10.156.121.38:9000/gwUap',
      //     extopts: { '/Polling@@el-icon-sort': '' },
      //     items: [],
      //     outter: false,
      //   },
      //   {
      //     name: 'tjfx',
      //     text: '统计分析',
      //     url: 'http://10.156.121.38:9000/gwUap/Statistics',
      //     extopts: { '/tjfx@@el-icon-edit': '' },
      //     items: [],
      //     outter: false,
      //   },
      //   {
      //     name: 'zhxx',
      //     text: '综合信息',
      //     url: 'http://10.156.121.38:9000/gwUap/Synthesize',
      //     extopts: { '/zhxx@@el-icon-document': '' },
      //     items: [],
      //     outter: false,
      //   },
      //   {
      //     name: 'zbkb',
      //     text: '指标看板',
      //     url: 'http://10.156.121.38:9000/gwUap/Board',
      //     extopts: { '/zbkb@@el-icon-news': '' },
      //     items: [],
      //     outter: false,
      //   },
      //   {
      //     name: 'ztt',
      //     text: '专题图',
      //     url: 'http://10.156.121.38:9000/gwUap',
      //     extopts: { '/ztt@@el-icon-picture-outline': '' },
      //     items: [
      //       {
      //         name: 'jkfb',
      //         text: '监控分布',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/jkfb': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'jkgj',
      //         text: '监控警告',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/jkgj': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'tdzyl',
      //         text: '通道占用率',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/tdzyl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'tdfj',
      //         text: '通道分级',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/tdfj': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'gcjsgl',
      //         text: '工程建设管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/gcjsgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //       {
      //         name: 'yhgl',
      //         text: '隐患管理',
      //         url: 'http://10.156.121.38:9000/gwUap',
      //         extopts: { '/yhgl': '' },
      //         items: [],
      //         outter: false,
      //       },
      //     ],
      //   },
      // ],
      isModuleList2: [
        {
          value: 1,
          label: '前台',
        },
        {
          value: 2,
          label: '后台',
        },
      ],
      isModuleList: [
        {
          value: '1',
          label: '前台',
        },
        {
          value: '2',
          label: 'i2',
        },
        {
          value: '3',
          label: '话单分析',
        },
        {
          value: '4',
          label: '关系分析',
        },
        {
          value: '5',
          label: '时空分析',
        },
        {
          value: '6',
          label: '联案分析',
        },
      ],
    }
  },
  methods: {
    change(val) {
      console.log(val)
      console.log(Cookies.get('ac_token'))
      console.log(Cookies.get('user_info'))
      this.isModules(val)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 点击菜单添加信息
    addInfo(info, ...args) {
      // console.log(JSON.parse(JSON.stringify(info)));
      this.form = JSON.parse(JSON.stringify(info)).info
      this.isOKId = JSON.parse(JSON.stringify(info)).info.id
      if (args.length > 0) {
        console.log(this.form.higherUp)
        this.form.higherUp = JSON.parse(JSON.stringify(args[0])).name
      }
    },

    // 菜单封装
    meunData(a, b) {
      let lists = {}
      let list = []

      a.forEach((item, index) => {
        if (item.list.length > 1) {
          lists = {
            name: item.name,
            info: {
              id: item.id,
              createBy: item.createBy,
              createTime: item.createTime,
              name: item.name,
              higherUp: item.parentId,
              isModule: item.module,
              backStyle: item.style,
              frontStyle: item.style,
              chainedAddress: item.path,
              powerPath: 'sys',
              sortSubordinate: item.status,
              adjustSort: item.sortOrder,
            },
            items: this.meunData(item.list, `${b}${index + 1}`),
          }
          list.push(lists)
          console.log(2222)
          console.log(list)
        } else {
          /* lists = {
            name: item.name,
            info: {
              id: item.id,
              createBy: item.createBy,
              createTime: item.createTime,
              name: item.name,
              higherUp: item.parentId,
              isModule: item.module,
              backStyle: item.style,
              frontStyle: item.style,
              chainedAddress: item.path,
              powerPath: 'sys',
              sortSubordinate: item.status,
              adjustSort: item.sortOrder,
            },
            items: this.meunData(item.list, `${b}${index + 1}`),
          } */
          list.menuId = `${b}${index + 1}`
          list.items = []
          list.push(lists)
          console.log(3333)
          console.log(list)
        }
      })
      return list
    },

    // 判断是否选择菜单
    pitchOn2() {
      let isPitchOn = false
      this.isOKId !== ''
        ? (isPitchOn = true)
        : this.$message.error('请至少选择一条数据!')
      return isPitchOn
    },
    // 添加菜单
    addMenu(formName) {
      const $THIS = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 添加菜单
          addMenu({
            userId: Cookies.get('userId'),
            name: this.form2.name,
            module: this.form2.higherUp,
            parentId: this.form2.isModule,
            style: this.form2.backStyle,
            icon: '',
            path: this.form2.chainedAddress,
            url: this.form2.powerPath,
            accessToken: Cookies.get('ac_token'),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              $THIS.$message({
                message: '添加菜单成功！!',
                type: 'success',
              })
            } else {
              this.$message({
                message: '添加菜单失败!',
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

    // 编辑菜单
    editorMenu(formName) {
      const $THIS = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          editorMenu({
            userId: Cookies.get('userId'),
            id: $THIS.form.id,
            name: $THIS.form.name,
            parentId: $THIS.form.higherUp,
            module: $THIS.form.isModule,
            style: $THIS.form.backStyle,
            icon: '',
            path: $THIS.form.chainedAddress,
            url: $THIS.form.powerPath,
            accessToken: Cookies.get('ac_token'),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              $THIS.$message({
                message: '编辑菜单成功！!',
                type: 'success',
              })
            } else {
              this.$message({
                message: '编辑菜单失败!',
                type: 'error',
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    isModules(higherUp) {
      let isModuleList2 = []
      console.log(this.leftMenu[higherUp])
      this.leftMenu[higherUp - 1].list.forEach(item => {
        let moduleVal = {}
        moduleVal.value = item.info.id
        moduleVal.label = item.info.name
        isModuleList2.push(moduleVal)
      })
      this.isModuleList = isModuleList2
      console.log(this.isModuleList)
    },
    // 删除菜单
    deleteMenu() {
      const $THIS = this
      // 添加菜单
      delMenu({
        id: this.isOKId,
        accessToken: Cookies.get('ac_token'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          $THIS.$message({
            message: '删除菜单成功！!',
            type: 'success',
          })
        } else {
          this.$message({
            message: '删除菜单失败!',
            type: 'error',
          })
        }
        this.deleteDialog = false
        $THIS.initMenu()
      })
    },
  },
  mounted() {
    const $THIS = this
    ;(async function initMenu() {
      // 获取前台目录 module 1
      await getMenu({
        module: 1,
        parentId: 0,
        accessToken: Cookies.get('ac_token'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          console.log(data)
          // list.list[0].info = {
          //   name: '111',
          //   higherUp: '444',
          //   isModule: '2',
          //   backStyle: '',
          //   frontStyle: '',
          //   chainedAddress: '#',
          //   powerPath: '#',
          //   sortSubordinate: '111',
          //   adjustSort: '111',
          // }

          // list.list.map((value, index) => {
          //   console.log(value, index)
          //   value.info = {
          //     name: '111',
          //     higherUp: '444',
          //     isModule: '2',
          //     backStyle: '',
          //     frontStyle: '',
          //     chainedAddress: '#',
          //     powerPath: '#',
          //     sortSubordinate: '111',
          //     adjustSort: '111',
          //   }
          //
          //   value.menuId = `1-${index + 1}`
          //   value.items = []
          // })
          // let list ={}
          // let info ={}
          let lists = {}
          let list = []
          console.log(1111111111)
          console.log($THIS.meunData(data.data, `1-${0 + 1}`))
          console.log(1111111111)
          /* data.data.forEach((item, index) => {
            lists = {
              name: item.name,
              info: {
                id: item.id,
                createBy: item.createBy,
                createTime: item.createTime,
                name: item.name,
                higherUp: item.parentId,
                isModule: item.module,
                backStyle: item.style,
                frontStyle: item.style,
                chainedAddress: item.path,
                powerPath: 'sys',
                sortSubordinate: item.status,
                adjustSort: item.sortOrder,
              },
              items: this.meunData(item.list, `1-${index + 1}`),
            }
            list.menuId = `1-${index + 1}`
            list.items = []
            list.push(lists)
          }) */

          let menus = {}
          menus.menuId = '1' // 区分前后台目录标识(element-ui规定必须是string)
          menus.name = '前台'
          menus.items = list
          $THIS.leftMenu.push(menus)
          console.log(menus)
        }
      })
      // 获取后台目录 module 2
      await getMenu({
        module: 2,
        parentId: 0,
        accessToken: Cookies.get('ac_token'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          let lists = {}
          let list = []
          data.data[0].list.forEach((item, index) => {
            lists = {
              name: item.name,
              info: {
                id: item.id,
                createBy: item.createBy,
                createTime: item.createTime,
                name: item.name,
                higherUp: item.parentId,
                isModule: item.module,
                backStyle: item.style,
                frontStyle: item.style,
                chainedAddress: item.path,
                powerPath: 'sys',
                sortSubordinate: item.status,
                adjustSort: item.sortOrder,
              },
              items: [],
            }
            list.menuId = `2-${index + 1}`
            list.items = []
            list.push(lists)
          })

          let menus = {}
          menus.menuId = '2' // 区分前后台目录标识(element-ui规定必须是string)
          menus.name = '后台'
          menus.list = list
          $THIS.leftMenu.push(menus)
          console.log($THIS.leftMenu)
        }
      })
    })()
  },
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
  color #ffffff
  margin 20px 14px
  padding 9px 15px
.menuManage .leftMenu .addBut
  background-color: rgba(70, 125, 68, 1);
  border: 1px solid rgba(70, 125, 68, 1);
.menuManage .leftMenu .delBut
  background-color: #7f3237;
  border: 1px solid #7f3237;
.menuList
 width 180px
 overflow hidden
.menuList >>>.active
 background-color rgba(44, 239, 255, 0.4)
.menuList >>>.el-submenu__title
 color #ffffff
 border-bottom 1px solid #0d3644
.menuList >>>.el-submenu__title i
 color #ffffff
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
