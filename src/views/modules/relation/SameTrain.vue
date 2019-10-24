<template>
  <div>
    <fly-dialog
      title="详细信息"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <div class="container">
        <header>
          {{ trainData && trainData[0].name }} -
          {{ trainData && trainData[1].name }}
        </header>
        <el-table :data="trainData" :span-method="objectSpanMethod" border>
          <el-table-column prop="path" label=""></el-table-column>
          <el-table-column prop="seatNo" label="座位号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="toolNumber" label="班次"> </el-table-column>
          <el-table-column
            prop="carriageNumber"
            label="车厢/机舱号"
          ></el-table-column>
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
      trainData: null,
    }
  },
  methods: {
    init(res) {
      this.visible = true
      const trainData = []
      for (let i = 0; i < res.length; i++) {
        trainData.push({
          path: `${res[i].travelRecord1.startStation} - ${
            res[i].travelRecord1.destination
          }`,
          seatNo: res[i].travelRecord1.seatNumber,
          name: res[i].travelRecord1.personName,
          toolNumber: res[i].travelRecord1.toolNumber,
          carriageNumber: res[i].travelRecord1.carriageNumber,
        })
        trainData.push({
          path: `${res[i].travelRecord2.startStation} - ${
            res[i].travelRecord2.destination
          }`,
          seatNo: res[i].travelRecord2.seatNumber,
          name: res[i].travelRecord2.personName,
          toolNumber: res[i].travelRecord2.toolNumber,
          carriageNumber: res[i].travelRecord2.carriageNumber,
        })
      }
      this.trainData = trainData
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
