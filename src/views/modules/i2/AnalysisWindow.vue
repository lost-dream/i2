<template>
  <fly-dialog
    :title="'关系挖掘'"
    width="500px"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mode-add-update">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
      >
        <el-form-item label="关系类型">
          <el-checkbox-group v-model="dataForm.checkList">
            <el-checkbox
              v-for="(item, index) of relationTypeList"
              :label="item.type"
              :key="index"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
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
import { Node } from './js/entity/Node'
export default {
  components: {
    FlyDialog,
  },
  props: {},
  data() {
    return {
      visible: false,
      node: [],
      relationTypeList: [],
      dataForm: {
        checkList: [],
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(node) {
      this.node = node
      this.$api
        .getAllRelationType()
        .then(({ data }) => {
          if (data && data.code === 200) {
            this.relationTypeList = data.result.map(item => {
              return {
                type: item.type,
                name: item.name,
              }
            })
          }
        })
        .then(() => {
          this.visible = true
        })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          let obj = {
            keyword: this.node.keyword,
            param: this.dataForm.checkList.join(','),
            userName: JSON.parse(this.$Cookies.get('user_info')).username,
          }
          this.$api.nodeDigRelation(obj).then(({ data }) => {
            if (data && data.code === 200) {
              if (!data.result.nodes || data.result.nodes.length === 0) {
                this.$message({
                  message: '没有查询到关系数据！',
                  type: 'error',
                  duration: 1500,
                })
                return false
              }
              let nodesList = data.result.nodes.map(item => {
                return new Node(item, this.global.network, this.global.nodes)
              })
              for (let i = 0; i < nodesList.length; i++) {
                if (this.global.nodes.getIds().indexOf(nodesList[i].id) < 0) {
                  this.global.nodes.add(nodesList[i])
                }
              }

              let edges = data.result.edges
              edges.map(value => {
                value.step = Number(value.from.toString() + value.to.toString())
                value.str = value.label
                value.label = ''
              })

              let edgesList = []

              for (let item1 of edges) {
                let flag = true
                for (let item2 of edgesList) {
                  if (item1.step === item2.step) {
                    flag = false
                    item2.str = item2.str + '/' + item1.str
                  }
                }
                if (flag) {
                  edgesList.push(item1)
                }
              }

              const getCount = (arr, value) =>
                arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0)

              for (let item of edgesList) {
                const arr = item.str && item.str.split('/')
                const arr2 = [...new Set(arr)]
                const resArr = []

                arr2.forEach(value => {
                  resArr.push({
                    value: value,
                    count: getCount(arr, value),
                  })
                })
                resArr.forEach(value => {
                  item.label += `${value.value}${
                    value.count > 1 ? `(${value.count})/` : '/'
                  }`
                })
                item.label = item.label.slice(0, -1)
              }

              for (let j = 0; j < edgesList.length; j++) {
                if (this.global.edges.getIds().indexOf(edgesList[j].id) < 0) {
                  this.global.edges.add(edgesList[j])
                }
              }
              this.dataForm.checkList = []
              this.global.network.unselectAll()
              this.visible = false
            }
          })
        }
      })
    },
    /**
     * 保存或者修改关系
     */
    saveOrUpdateGx() {
      console.log(this.edge)
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
>>>.el-checkbox
  color #fff
  font-weight 500
  font-size 14px
  cursor pointer
  -moz-user-select none
  -webkit-user-select none
  -ms-user-select none
  user-select none
  margin-right 30px
.mode-add-update
  padding 10px
>>>.el-form-item__label
  color: #ffffff
</style>
