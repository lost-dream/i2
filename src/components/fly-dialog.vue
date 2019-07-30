<template>
  <el-dialog
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    width="620px"
  >
    <div class="body-content">
      <div class="fly-dialog-title">
        <span>{{title}}</span>
      </div>
      <div class="fly-dialog-body">
        <template>
          <slot></slot>
        </template>
      </div>
    </div>
     <slot name="ft" slot="footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: this.show
    }
  },
  computed: {},
  watch: {
    show () {
      this.visible = this.show
    }
  },
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="stylus" scoped></style>
