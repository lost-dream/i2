<template>
  <div>
    <fly-dialog
      title="详细信息"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <div class="container">
        <header>
          {{ planeData && planeData[0].name }} -
          {{ planeData && planeData[1].name }}
        </header>
        <el-table :data="planeData" :span-method="objectSpanMethod" border>
          <el-table-column prop="path" label=""></el-table-column>
          <el-table-column prop="seatNo" label="座位号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="toolNumber" label="班次"> </el-table-column>
          <el-table-column
            prop="travelClass"
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
      planeData: null,
    }
  },
  methods: {
    init(res) {
      this.visible = true
      const planeData = []
      for (let i = 0; i < res.length; i++) {
        planeData.push({
          path: `${res[i].travelRecord1.startStation} - ${
            res[i].travelRecord1.destination
          }`,
          seatNo: res[i].travelRecord1.seatNumber,
          name: res[i].travelRecord1.personName,
          toolNumber: res[i].travelRecord1.toolNumber,
          travelClass: res[i].travelRecord1.travelClass,
        })
        planeData.push({
          path: `${res[i].travelRecord2.startStation} - ${
            res[i].travelRecord2.destination
          }`,
          seatNo: res[i].travelRecord2.seatNumber,
          name: res[i].travelRecord2.personName,
          toolNumber: res[i].travelRecord2.toolNumber,
          travelClass: res[i].travelRecord2.travelClass,
        })
      }
      this.planeData = planeData
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
