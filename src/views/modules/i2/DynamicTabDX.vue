<template>
  <div class="mod-dynamictab">
    <el-collapse accordion>
      <el-collapse-item title="找车模型" name="1">
        <div class="form-panel">
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="80px"
          >
            <el-form-item label="车牌号">
              <el-input
                v-model="dataForm.carnum"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="型号">
              <el-input v-model="dataForm.carxh" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="颜色">
              <el-input
                v-model="dataForm.carcolor"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dataFormSubmit('Car')"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="找案模型" name="2">
        <div class="form-panel">
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="80px"
          >
            <el-form-item label="案件编号">
              <el-input
                v-model="dataForm.case_no"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="案件名称">
              <el-input
                v-model="dataForm.case_name"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="案发位置">
              <el-input
                v-model="dataForm.location"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="案发时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="dataForm.case_time"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dataFormSubmit('Case')"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="找人模型" name="3">
        <div class="form-panel">
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="60px"
          >
            <el-form-item label="证件号">
              <el-input
                v-model="dataForm.idNumber"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="dataForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="dataForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-col :span="24">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dataForm.beginDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="24">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dataForm.end"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dataFormSubmit('Person')"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { Node } from './js/entity/Node'
export default {
  components: {},
  props: {
    currId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeName: '1',
      node: {},
      nodeItemKeyword: '', // 选中的节点的keyword
      dataForm: {
        carnum: null,
        carxh: null,
        carcolor: null,
        idNumber: null,
        name: null,
        beginDate: null,
        end: null,
        case_no: null,
        case_name: null,
        location: null,
        case_time: null,
        sex: '1',
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(nodeId) {
      let arr = [nodeId] || this.global.network.getSelectedNodes()
      if (arr.length > 1) {
        this.$message.error({
          message: '只能选择一个节点作为定向分析',
        })
        return
      }
      const id = arr[0][0]
      this.nodeItemKeyword = this.global.nodes.get(id).keyword
    },
    dataFormSubmit(modelType) {
      let param = {
        keyword: this.nodeItemKeyword,
        modelType: modelType,
        model: {},
      }
      if (modelType === 'Car') {
        param.model = {
          carNumber: this.dataForm.carnum,
          model: this.dataForm.carxh,
          color: this.dataForm.carcolor,
        }
      } else if (modelType === 'Case') {
        param.model = {
          caseNo: this.dataForm.case_no,
          caseName: this.dataForm.case_name,
          location: this.dataForm.location,
          caseTime: this.dataForm.case_time,
        }
      } else if (modelType === 'Person') {
        param.model = {
          idNumber: this.dataForm.idNumber,
          name: this.dataForm.name,
          sex: this.dataForm.sex,
          beginDate: this.dataForm.beginDate,
          end: this.dataForm.end,
        }
      }
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$api.directionalAnalyse(param).then(({ data }) => {
            if (data && data.code === 200) {
              if (!data.result.nodes || data.result.nodes.length === 0) {
                this.$message({
                  message: '没有查询到关系数据！',
                  type: 'error',
                  duration: 1500,
                })
                return false
              }
              let edgesList = data.result.edges
              let nodesList = data.result.nodes.map(item => {
                return new Node(item, this.global.network, this.global.nodes)
              })
              for (let i = 0; i < nodesList.length; i++) {
                if (this.global.nodes.getIds().indexOf(nodesList[i].id) < 0) {
                  this.global.nodes.add(nodesList[i])
                }
              }
              for (var j = 0; j < edgesList.length; j++) {
                if (this.global.edges.getIds().indexOf(edgesList[j].id) < 0) {
                  this.global.edges.add(edgesList[j])
                }
              }
            }
          })
        }
      })
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped>
.mod-dynamictab
  padding 10px
.form-panel
  padding 10px
  background #11646e
>>>.el-collapse-item__header
  display -webkit-box
  display -ms-flexbox
  display flex
  -webkit-box-align center
  -ms-flex-align center
  align-items center
  height 48px
  line-height 48px
  background-color rgba(27, 128, 141, 0.7)
  color #ecedf0
  padding-left 10px
  cursor pointer
  border-bottom 1px solid #EBEEF5
  font-size 13px
  font-weight 500
  -webkit-transition border-bottom-color 0.3s
  transition border-bottom-color 0.3s
  outline 0
>>>.el-collapse-item__wrap
  will-change height
  background-color #11646e
  overflow hidden
  -webkit-box-sizing border-box
  box-sizing border-box
  border-bottom 1px solid none
>>>.el-radio
  color #dadee6
  cursor pointer
  margin-right 30px
>>>.el-form-item__label
  color: #eeeff2
>>>.el-input__inner
  color #eeeff2
  background: transparent
</style>
