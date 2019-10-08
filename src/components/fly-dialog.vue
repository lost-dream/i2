<template>
  <el-dialog
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :before-close="handleClose"
    :width="width"
    :close-on-click-modal="flag"
    :modal-append-to-body="flag"
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
  components: {},
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
  },
  data() {
    return {
      flag: false,
      visible: this.show,
    }
  },
  computed: {},
  watch: {
    show() {
      this.visible = this.show
    },
  },
  methods: {
    handleClose() {
      this.$emit('beforeCloseDialog')
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped></style>
