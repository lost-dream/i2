<template>
  <div>
    <fly-dialog
      title="详细信息"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <div class="container">
        <header>
          {{ internetData && internetData[0].name }} -
          {{ internetData && internetData[1].name }}
        </header>
        <el-table :data="internetData" :span-method="objectSpanMethod" border>
          <el-table-column prop="name" label=""></el-table-column>
          <el-table-column prop="computerNo" label="座位号"></el-table-column>
          <el-table-column prop="personName" label="姓名"></el-table-column>
          <el-table-column prop="checkIn" label="上机时间"></el-table-column>
          <el-table-column prop="checkOut" label="下机时间"></el-table-column>
        </el-table>
      </div>
    </fly-dialog>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
export default {
  components: { FlyDialog },
  props: {},
  data() {
    return {
      visible: false,
      internetData: null,
    }
  },
  methods: {
    init(res) {
      this.visible = true
      const internetData = []
      for (let i = 0; i < res.length; i++) {
        internetData.push({
          name: res[i].internetCafe.name,
          computerNo: res[i].internetCafeRecord1.computerNo,
          personName: res[i].internetCafeRecord1.personName,
          checkIn: res[i].internetCafeRecord1.checkIn,
          checkOut: res[i].internetCafeRecord1.checkOut,
        })
        internetData.push({
          name: res[i].internetCafe.name,
          computerNo: res[i].internetCafeRecord2.computerNo,
          personName: res[i].internetCafeRecord2.personName,
          checkIn: res[i].internetCafeRecord2.checkIn,
          checkOut: res[i].internetCafeRecord2.checkOut,
        })
      }
      this.internetData = internetData
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colSpan: 0,
          }
        }
      }
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped></style>
