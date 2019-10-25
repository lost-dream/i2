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
    <div class="body-content">
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
