<template>
  <el-dialog
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :before-close="handleClose"
    :width="width"
    :close-on-click-modal="flag"
    :modal-append-to-body="flag2"
    :modal="modal"
  >
    <div
      class="body-content"
      :style="{
        paddingTop: title === '' ? '50px' : 0,
      }"
    >
      <div class="fly-dialog-title">
        <span>{{ title }}</span>
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
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '620px',
    },
    modal: {
      type: Boolean,
      default: true,
    },
    flag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      flag2: false,
      visible: this.show,
    }
  },
  watch: {
    show() {
      this.visible = this.show
    },
  },
  methods: {
    handleClose(done) {
      this.$emit('beforeCloseDialog')
      done()
    },
  },
}
</script>
<style scoped lang="stylus">
>>>.el-dialog
  background: #083438
.body-content
  width 100%
  min-height 130px
  padding 0 25px 25px
  border 1px solid #2cefff
  background rgba(44, 239, 255, 0.2)
  .fly-dialog-title
    color #fff
    font-size 16px
    text-align center
    line-height 50px
  .fly-dialog-body
    min-height 50px
</style>
