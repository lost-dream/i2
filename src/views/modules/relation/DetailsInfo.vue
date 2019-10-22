<template>
  <div>
    <component v-bind:is="curComponet" :ref="curRef"></component>
  </div>
</template>

<script>
import SameHotel from './SameHotel'
import SameRoom from './SameRoom'
import SamePlane from './SamePlane'
import SameTrain from './SameTrain'
import SameCoach from './SameCoach'
import SameInternetCafe from './SameInternetCafe'
import SameHousehold from './SameHousehold'
import SameCase from './SameCase'
import SamePrisonRoom from './SamePrisonRoom'
import HaveCar from './HaveCar'
import HaveDrivingLicense from './HaveDrivingLicense'
export default {
  components: {
    SameHotel,
    SameRoom,
    SamePlane,
    SameTrain,
    SameCoach,
    SameInternetCafe,
    SameHousehold,
    SameCase,
    SamePrisonRoom,
    HaveCar,
    HaveDrivingLicense,
  },
  props: {},
  data() {
    return {
      curComponet: '',
      curRef: '',
      relationType: [],
    }
  },
  computed: {},
  methods: {
    init(res, type) {
      this.visible = true
      console.log(res)
      console.log(type)
      this.curComponet = type || ''
      if (type === 'SameHotel') {
        this.curRef = 'SameHotel' || ''
        this.$nextTick(() => {
          this.$refs.SameHotel.init(res)
        })
      } else if (type === 'SameRoom') {
        this.curRef = 'SameRoom' || ''
        this.$nextTick(() => {
          this.$refs.SameRoom.init(res)
        })
      } else if (type === 'SamePlane') {
        this.curRef = 'SamePlane' || ''
        this.$nextTick(() => {
          this.$refs.SamePlane.init(res)
        })
      } else if (type === 'SameTrain') {
        this.curRef = 'SameTrain' || ''
        this.$nextTick(() => {
          this.$refs.SameTrain.init(res)
        })
      } else if (type === 'SameCoach') {
        this.curRef = 'SameCoach' || ''
        this.$nextTick(() => {
          this.$refs.SameCoach.init(res)
        })
      } else if (type === 'SameInternetCafe') {
        this.curRef = 'SameInternetCafe' || ''
        this.$nextTick(() => {
          this.$refs.SameInternetCafe.init(res)
        })
      } else if (type === 'SameHousehold') {
        this.curRef = 'SameHousehold' || ''
        this.$nextTick(() => {
          this.$refs.SameHousehold.init(res)
        })
      } else if (type === 'SameCase') {
        this.curRef = 'SameCase' || ''
        this.$nextTick(() => {
          this.$refs.SameCase.init(res)
        })
      } else if (type === 'SamePrisonRoom') {
        this.curRef = 'SamePrisonRoom' || ''
        this.$nextTick(() => {
          this.$refs.SamePrisonRoom.init(res)
        })
      } else if (type === 'HaveCar') {
        this.curRef = 'HaveCar' || ''
        this.$nextTick(() => {
          this.$refs.HaveCar.init(res)
        })
      } else if (type === 'HaveDrivingLicense') {
        this.curRef = 'HaveDrivingLicense' || ''
        this.$nextTick(() => {
          this.$refs.HaveDrivingLicense.init(res)
        })
      }
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped></style>
