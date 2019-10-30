<template>
  <div class="importNode">
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :on-change="handleChange"
      :on-remove="handleRemove"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传json文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import { Node } from './js/entity/Node'
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleChange(file) {
      let _this = this
      var name = file.name // 读取选中文件的文件名
      var size = file.size // 读取选中文件的大小
      console.log('文件名:' + name + '大小:' + size)

      var reader = new FileReader() // 这是核心,读取操作就是由它完成.
      reader.readAsText(file.raw) // 读取文件的内容,也可以读取文件的URL
      reader.onload = function() {
        // 当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
        let jsonObj = JSON.parse(this.result)
        let edgesList = jsonObj.edges
        let nodesList = jsonObj.nodes.map(item => {
          return new Node(item, _this.global.network, _this.global.nodes)
        })
        for (let i = 0; i < nodesList.length; i++) {
          if (_this.global.nodes.getIds().indexOf(nodesList[i].id) < 0) {
            _this.global.nodes.add(nodesList[i])
          }
        }
        for (var j = 0; j < edgesList.length; j++) {
          if (_this.global.edges.getIds().indexOf(edgesList[j].id) < 0) {
            _this.global.edges.add(edgesList[j])
          }
        }
      }
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped>
>>>.el-upload__tip
  font-size 12px
  color #e7e8ec
  margin-top 7px
>>>.el-upload-list__item-name
  color #dddfe3
  display block
  margin-right 40px
  overflow hidden
  padding-left 4px
  text-overflow ellipsis
  -webkit-transition color 0.3s
  transition color 0.3s
  white-space nowrap
>>>.el-upload-list__item:hover
  background-color #F5F7FA
  .el-upload-list__item-name
    color #17b3a3
.importNode
  padding 10px
  color #e7e8ec
</style>
