<template>
  <div>
    <fly-dialog
      width="60%"
      title="数据缓存器"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <div class="mode-cachedata">
        <el-form class="filter-form">
          <el-form-item>
            <el-button
              type="primary"
              @click="addOrUpdateHandle()"
            >新增</el-button>
            <el-button
              type="primary"
              @click="addToCanvasHandle()"
              :disabled="dataListSelections.length <= 0"
            >添加至画布</el-button>
            <el-button
              type="primary"
              @click="moveOrCopyToFoder(0)"
              :disabled="dataListSelections.length <= 0"
            >移动</el-button>
            <el-button
              type="primary"
              @click="moveOrCopyToFoder(1)"
              :disabled="dataListSelections.length <= 0"
            >复制</el-button>
            <el-button
              type="danger"
              @click="deleteHandle()"
              :disabled="dataListSelections.length <= 0"
            >批量删除</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          :model="dataForm"
          ref="dataForm"
          @keyup.enter.native="getDataList()"
        >
          <el-form-item>
            <el-select
              v-model="dataForm.folderId"
              placeholder="文件夹"
            >
              <el-option
                label="请选择文件夹"
                value=""
              ></el-option>
              <el-option
                v-for="item in folderList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="dataForm.keywords"
              placeholder="关键字"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="dataForm.name"
              placeholder="名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchDataList()">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="dataList"
          height="255"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
        >
          <el-table-column
            type="selection"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="keywords"
            header-align="center"
            align="center"
            label="关键字"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            header-align="center"
            align="center"
            label="描述"
          >
          </el-table-column>
          <el-table-column
            prop="dataType"
            header-align="center"
            align="center"
            label="类型"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            header-align="center"
            align="center"
            label="修改时间"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="addOrUpdateHandle(scope.row.id)"
              >修改</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteHandle(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </fly-dialog>
    <!-- 添加 或 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="cacheDataAddOrUpdate"
      @refreshDataList="init"
    ></add-or-update>
    <!-- 移动 或 复制 -->
    <move-or-copy
      v-if="moveOrCopyVisible"
      ref="moveOrCopy"
      @refreshDataList="init"
    ></move-or-copy>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
import AddOrUpdate from './CacheDataAddOrUpdate'
import MoveOrCopy from './MoveOrCopy'
export default {
  components: {
    FlyDialog,
    AddOrUpdate,
    MoveOrCopy
  },
  props: {},
  data () {
    return {
      visible: false,
      addOrUpdateVisible: false,
      moveOrCopyVisible: false,
      folderList: [],
      dataForm: {
        keywords: '',
        name: '',
        folderId: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      dataListLoading: false
    }
  },
  computed: {
  },
  methods: {
    init () {
      this.$api.getAllFolderByUserName('10011').then(({ data }) => {
        let list = data && data.code === 200 ? data.result : [];
        let arr = [];
        for (let i in list) {
          arr.push({
            value: list[i].id,
            label: list[i].folderName
          })
        }
        this.folderList = arr;
      }).then(() => {
        this.visible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields();
        })
        this.getDataList();
      })
    },
    getDataList () {
      this.dataListLoading = true
      let params = {
        username: '10011'
      }
      this.$api.getAllCacheDataByUserName(params).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.result
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    searchDataList () {
      this.dataListLoading = true;
      let params = {
        username: '10011',
        ...this.dataForm
      }
      this.$api.dataCacheSearch(params).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.result.records;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      })
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val;
    },
    // 新增  /  修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true;
      this.visible = false;
      this.$nextTick(() => {
        this.$refs.cacheDataAddOrUpdate.init(id);
      })
    },
    // 添加至画布
    addToCanvasHandle () { },
    // 移动 或 复制至文件夹
    moveOrCopyToFoder (type) {
      this.moveOrCopyVisible = true;
      this.visible = false;
      this.$nextTick(() => {
        let ids = this.dataListSelections.map(item => {
          return item.id;
        })
        this.$refs.moveOrCopy.init(type, ids);
      })
    },
    // 批量删除
    deleteHandle () { }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="stylus" scoped>
>>>.el-input__inner
  color #fff !important
>>>.el-form--inline .el-form-item
  display inline-block
  margin-right 10px
  vertical-align top
  width 150px
.mode-cachedata
  padding 10px
.filter-form
  padding-bottom 10px
.el-table__body
  tr.hover-row>td
    background-color transparent !important
</style>
