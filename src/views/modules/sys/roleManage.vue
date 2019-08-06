<template>
    <div class="roleManage">
      <div class="leftMenu">
        <el-button class="addBut" type="primary">添加</el-button>
        <el-button class="editBut" type="primary">编辑</el-button>
        <el-button class="delBut" type="primary">删除</el-button>
        <div class="menuList">
          <table border="1" cellspacing="1">
            <tr v-for="(item, index) in roleList" :key="index">
              <td class="tal_tit">{{item.name}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="right">
        <div class="coat1">
        <div class="coat2">
          <div class="menuRes">
            <div class="title"><span>菜单资源</span></div>
            <el-tree
              :data="data"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'roleManage',
  data () {
    return {
      roleList: [
        { name: '管理员' },
        { name: '超级管理员' },
        { name: '游客' }
      ],
      data: [
        {
          id: 1,
          label: '前端',
          children: [
            {
              id: 2,
              label: 'i2'
            }, {
              id: 3,
              label: '话单分析'
            }, {
              id: 4,
              label: '关系分析'
            }, {
              id: 5,
              label: '时空分析'
            }, {
              id: 6,
              label: '联案分析'
            }
          ]
        }, {
          id: 2,
          label: '后端',
          children: [{
            id: 7,
            label: '用户管理'
          }, {
            id: 8,
            label: '菜单管理'
          }, {
            id: 9,
            label: '角色管理'
          }, {
            id: 10,
            label: '机构管理'
          }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

  .roleManage .leftMenu
    float left
  .roleManage .leftMenu
    width: 239px;
    height: 971px;
    background-color rgba(44, 239, 255, 0.2)
    overflow hidden
    padding 0 30px
  .roleManage .leftMenu .addBut,
  .roleManage .leftMenu .editBut,
  .roleManage .leftMenu .delBut
    color: #ffffff;
    margin 20px 4px
    padding: 9px 10px;
  .roleManage .leftMenu .addBut,
  .roleManage .leftMenu .editBut
    background-color: rgba(70, 125, 68, 1);
    border: 1px solid rgba(70, 125, 68, 1);
  .roleManage .leftMenu .delBut
    background-color: #7f3237;
    border: 1px solid #7f3237;
  .menuList
    width 180px
    overflow hidden
  .roleManage .leftMenu table
    width 100%
    margin 0 auto
    color #ffffff
    /*border-collapse collapse*/
    border 5px solid transparent
  .roleManage .leftMenu td
    /*border 1px solid transparent*/
    height: 34px;
    padding 0 15px
    background-color: rgba(44, 239, 255, 0.2)
  .roleManage .leftMenu table .tal_tit
    background-color: rgba(44, 239, 255, 0.4)
    text-align center
  .right
    width 1200px
    margin 0 auto
    position relative
  .right .coat1
    width 1200px
    position relative
    top 0
    left 0
    right 0
    bottom 0
    margin 0 auto
    background-color rgba(44, 239, 255, 0.1)
    padding 20px
  .right .coat2
    width 1160px
    margin-top 18px
    margin-bottom 20px
    padding 20px 15px 20px 15px
    position relative
    top 0
    left 0
    right 0
    bottom 0
    margin 0 auto
    background-color rgba(44, 239, 255, 0.1)
  .right .coat2 .title
    padding 10px 20px
    margin-bottom 5px
    color #ffffff
    background-color rgba(44, 239, 255, 0.1)
  .right .coat2 .el-tree
    color #ffffff
    background-color rgba(44, 239, 255, 0.1)
  .right .coat2 >>> .el-tree-node__content:hover
    background-color rgba(44, 239, 255, 0.1)
  .right .coat2 >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content
    background-color rgba(44, 239, 255, 0)
  .right .coat2 >>> .el-checkbox__input.is-checked .el-checkbox__inner,
  .right .coat2 >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner
    background-color rgba(44, 239, 255, 0)
    border-color #ffffff
  .right .coat2 >>> .el-checkbox__inner
    margin-right 5px
    margin-right 5px
    background-color rgba(44, 239, 255, 0)
    border-color #ffffff

</style>
<style lang="stylus">
  .fromselect {
    background-color: rgba(19, 81, 93, 1)!important;
    border: 1px solid rgba(19, 81, 93, 1);
    border-radius: 5px;
    .el-select-dropdown {
    }
    .el-select-dropdown__item {
      background-color: rgba(19, 81, 93, 1);
      color: #ffffff;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
      background-color: rgba(24, 123, 135, 1);
      color: #ffffff;
    }
    .el-select-dropdown__item.selected {
      color: #ffffff;
    }
  }
</style>
