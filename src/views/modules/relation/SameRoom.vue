<template>
  <div>
    <fly-dialog
      title="详细信息"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <div class="container">
        <header>
          {{ roomData && roomData[0].name }} -
          {{ roomData && roomData[1].name }}
        </header>
        <el-table :data="roomData" :span-method="objectSpanMethod" border>
          <el-table-column prop="hotelName" label="酒店名"></el-table-column>
          <el-table-column prop="roomNo" label="房间号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="checkIn" label="入住时间"> </el-table-column>
          <el-table-column prop="checkOut" label="离开时间"> </el-table-column>
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
      roomData: null,
    }
  },
  computed: {},
  methods: {
    init(res) {
      this.visible = true
      const roomData = []
      for (let i = 0; i < res.length; i++) {
        roomData.push({
          hotelName: res[i].hotel.name,
          roomNo: res[i].accommodation1.roomNo,
          name: res[i].accommodation1.personName,
          checkIn: res[i].accommodation1.checkIn,
          checkOut: res[i].accommodation1.checkOut,
        })
        roomData.push({
          hotelName: res[i].hotel.name,
          roomNo: res[i].accommodation2.roomNo,
          name: res[i].accommodation2.personName,
          checkIn: res[i].accommodation2.checkIn,
          checkOut: res[i].accommodation2.checkOut,
        })
      }
      this.roomData = roomData
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
