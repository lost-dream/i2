<template>
  <div>
    <fly-dialog
      title="详情"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
      >dff
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
    }
  },
  computed: {},
  methods: {
    init(res) {
      this.visible = true
      console.log(res)
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped></style>
