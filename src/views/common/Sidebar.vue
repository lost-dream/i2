<template>
  <aside
    :ref="type"
    :id="type"
    class="sidebar"
    :class="'sidebar-' + sidebarSkin"
  >
    <div class="sidebar-inner">
      <template>
        <slot></slot>
      </template>
    </div>
  </aside>
</template>

<script>
export default {
  components: {},
  props: {
    type: String,
  },
  data() {
    return {
      sidebarSkin: 'green',
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped></style>
