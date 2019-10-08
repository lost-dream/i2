<template>
  <div class="mod-count">
    <div class="title tab-title">
      <span>节点(9)</span>
    </div>
    <div class="tab-content">
      <ul>
        <li>
          <label class="slider-desc">
            <span class="text-ellipsis">人员</span>
            <span class="fr">2</span>
          </label>
          <el-progress
            class="custom-slider"
            :percentage="50"
            :show-text="false"
          ></el-progress>
        </li>
        <li>
          <label class="slider-desc">
            <span class="text-ellipsis">男</span>
            <span class="fr">2</span>
          </label>
          <el-progress
            class="custom-slider"
            :percentage="30"
            :show-text="false"
          ></el-progress>
        </li>
        <li>
          <label class="slider-desc">
            <span class="text-ellipsis">驾驶证</span>
            <span class="fr">2</span>
          </label>
          <el-progress
            class="custom-slider"
            :percentage="80"
            :show-text="false"
          ></el-progress>
        </li>
      </ul>
    </div>
    <div class="title tab-title">
      <span>关系(9)</span>
    </div>
    <div class="tab-content">
      <ul>
        <li>
          <label class="slider-desc">
            <span class="text-ellipsis">同户</span>
            <span class="fr">2</span>
          </label>
          <el-progress
            class="custom-slider"
            :percentage="50"
            :show-text="false"
          ></el-progress>
        </li>
        <li>
          <label class="slider-desc">
            <span class="text-ellipsis">拥有驾照</span>
            <span class="fr">2</span>
          </label>
          <el-progress
            class="custom-slider"
            :percentage="30"
            :show-text="false"
          ></el-progress>
        </li>
        <li>
          <label class="slider-desc">
            <span class="text-ellipsis">所有车辆</span>
            <span class="fr">2</span>
          </label>
          <el-progress
            class="custom-slider"
            :percentage="80"
            :show-text="false"
          ></el-progress>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.mod-count
  ul>li
    height 30px
    line-height 30px
.slider-desc
  display inline-block
  width 33.3%
  vertical-align middle
  padding-right 5px
  color #fff
.custom-slider
  display inline-block
  width 66.7%
>>>.el-progress-bar__inner
  background #C58E64
</style>
