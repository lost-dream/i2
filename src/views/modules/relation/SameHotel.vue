<template>
  <div>
    <fly-dialog
      title="详细信息"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <div class="container">
        <header>
          {{ hotelData && hotelData[0].name }} -
          {{ hotelData && hotelData[1].name }}
        </header>
        <el-table :data="hotelData" :span-method="spanMethod" border>
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
  data() {
    return {
      visible: false,
      hotelData: null,
    }
  },
  methods: {
    init(res) {
      this.visible = true
      const hotelMsg = []
      for (let i = 0; i < res.length; i++) {
        hotelMsg.push({
          hotelName: res[i].hotel.name,
          roomNo: res[i].accommodation1.roomNo,
          name: res[i].accommodation1.personName,
          checkIn: res[i].accommodation1.checkIn,
          checkOut: res[i].accommodation1.checkOut,
        })
        hotelMsg.push({
          hotelName: res[i].hotel.name,
          roomNo: res[i].accommodation2.roomNo,
          name: res[i].accommodation2.personName,
          checkIn: res[i].accommodation2.checkIn,
          checkOut: res[i].accommodation2.checkOut,
        })
      }
      this.hotelData = hotelMsg
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
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
}
</script>
