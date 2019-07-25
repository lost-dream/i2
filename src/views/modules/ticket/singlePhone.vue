<template>
  <div class="container">
    <div class="title">
      <h3>单话单分析</h3>
    </div>
    <div class="select">
      <el-select v-model="select.caseName"
                 filterable
                 placeholder="案件名称">
        <el-option v-for="item in cases"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="select.phone"
                 filterable
                 placeholder="电话号码">
        <el-option v-for="item in phoneList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="nav">
      <el-tabs v-model="activeName"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/singlePhone/soonLate">最早最晚分析</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/singlePhone/periodAll">分时段分析</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/newPhone">连续时段分析</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/newPhone">不同时段分析</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/newPhone">通话分析</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/newPhone">通话详情分析</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/newPhone">号码归属分析</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/newPhone">手机轨迹</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/newPhone">移动设备分析</router-link>
          </span>
        </el-tab-pane>
        <el-tab-pane><span slot="label"><i class="el-icon-view"></i>
            <router-link to="/ticket/newPhone">一周号码频次</router-link>
          </span>
        </el-tab-pane>
      </el-tabs>

    </div>
    <div class="mainContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
      activeName: 'first',
      cases: [{
        value: '双十一',
        label: '双十一'
      }, {
        value: '双十二',
        label: '双十二'
      }],
      phoneList: [
        {
          value: '13111111111',
          label: '13111111111'
        }, {
          value: '15111111111',
          label: '15111111111'
        }
      ],
      select: {
        phone: '',
        caseName: ''
      }
    };
  },
  methods: {
    handleClick (tab, event) {
    }
  }
}
</script>
<style lang="stylus" scoped>
.container
  width 1200px
  margin 0 auto
  padding 60px
.container .title
  position absolute
  top -20px
  font-size 24px
.select
  margin 10px 0
  margin-left 20px
a
  color #909399
a:focus, a:hover
  color #e58627
</style>
