<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="货架:">
          <el-select v-model="formInline.shelf" placeholder="请选择货架" clearable filterable>
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="层数:">
          <el-select v-model="formInline.layer" placeholder="请选择层数" clearable filterable>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPacks">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @keyup.enter.native="searchHandler"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            @click="pickSelection">取件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="block">
      <div>
        <el-table
          ref="filterTable"
          :data="tableData"
          stripe
          style="width: 100%"
          height="750">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="快递单号: ">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="快递公司: ">
                  <span>{{ props.row.org }}</span>
                </el-form-item>
                <el-form-item label="收件人: ">
                  <span>{{ props.row.per_name }}</span>
                </el-form-item>
                <el-form-item label="收件手机号: ">
                  <span>{{ props.row.per_tel }}</span>
                </el-form-item>
                <el-form-item label="取件码: ">
                  <span>{{ props.row.code }}</span>
                </el-form-item>
                <el-form-item label="入站时间: ">
                  <span>{{ props.row.start }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!-- 未展开时显示内容 -->
          <el-table-column
            fixed
            type="index"
            :index="indexMethod"
            width="50">
          </el-table-column>
          <el-table-column
            type="selection"
            width="70">
          </el-table-column>
          <el-table-column
            label="快递单号"
            prop="id"
            width="200">
          </el-table-column>
          <el-table-column
            label="快递公司"
            prop="org"
            width="100"
            :filters="filters"
            :filter-method="filterOrg"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.org === '中通' ? 'primary' : 'success'"
                disable-transitions>{{ scope.row.org }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="收件人"
            prop="per_name"
            width="100">
          </el-table-column>
          <el-table-column
            label="收件手机号"
            prop="per_tel"
            width="200">
          </el-table-column>
          <el-table-column
            label="取件码"
            prop="code"
            width="150">
          </el-table-column>
          <el-table-column
            label="入站时间"
            prop="start"
            width="200">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import Constant from "../pub/Constant"
  export default {
    name: "AdminShelf",
    data() {
      return {
        baseUrl: Constant.data.baseUrl,
        search: '',
        tableData: [{
          id: '12987122',
          org: '中通',
          per_name: 'user1',
          per_tel: '12345678900',
          code: '1-1-16',
          start: '2020-12-28 10:24:00',
        }, {
          id: '12987123',
          org: '中通',
          per_name: 'user2',
          per_tel: '12345678901',
          code: '1-1-17',
          start: '2020-12-28 10:25:00',
        }],
        filters: [],
        formInline: {
          shelf: '1-',
          layer: '1'
        },
        options1: [{
          label: '1',
          value: '1-'
        }, {
          label: '2',
          value: '2-'
        }, {
          label: '3',
          value: '3-'
        }, {
          label: '4',
          value: '4-'
        }, {
          label: '5',
          value: '5-'
        }, {
          label: '6',
          value: '6-'
        }, {
          label: '7',
          value: '7-'
        }, {
          label: '8',
          value: '8-'
        }, {
          label: '9',
          value: '9-'
        }, {
          label: '10',
          value: '10-'
        }, {
          label: '11',
          value: '11-'
        }, {
          label: '12',
          value: '12-'
        }, {
          label: '13',
          value: '13-'
        }, {
          label: '14',
          value: '14-'
        }, {
          label: '15',
          value: '15-'
        }, {
          label: '16',
          value: '16-'
        }, {
          label: '17',
          value: '17-'
        }, {
          label: '18',
          value: '18-'
        }, {
          label: '19',
          value: '19-'
        }, {
          label: '20',
          value: '20-'
        }],
        options2: [{
          label: '1',
          value: '1'
        }, {
          label: '2',
          value: '2'
        }, {
          label: '3',
          value: '3'
        }, {
          label: '4',
          value: '4'
        }, {
          label: '5',
          value: '5'
        }, {
          label: '6',
          value: '6'
        }]
      }
    },
    methods: {
      // 取件
      handlePick(ids) {
        const _this = this
        this.$confirm('将取件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = new URLSearchParams()
          let token = sessionStorage.getItem("token")
          param.append('ids', ids)
          param.append('token', token)
          _this.$axios({
            method: 'put',
            url: _this.baseUrl + '/pack/pickPackByAdmin',
            data: param
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data === 'pick up the package success') {
                _this.$message({
                  showClose: true,
                  message: '取件成功！',
                  type: 'success'
                })
                let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
                _this.$router.push(NewPage)
                _this.$router.go(-1)
              } else if (response.data === 'pick up the package fail') {
                _this.$notify({
                  showClose: true,
                  title: '警告',
                  message: '取件失败！',
                  type: 'warning'
                })
              } else if (response.data === 'please login to operate') {
                _this.$notify({
                  showClose: true,
                  title: '警告',
                  message: '请在登录状态操作!',
                  type: 'warning'
                })
                _this.$router.push('/LoginAndRegister')
              } else {
                _this.$message({
                  showClose: true,
                  message: response.data,
                  type: 'warning'
                })
              }
            })
            .catch(function (error) {
              console.log(error)
              _this.$notify.error({
                showClose: true,
                title: '错误',
                message: '服务器出错啦！'
              })
            })
        }).catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '已取消取件'
          })
        })
      },
      // 搜索
      searchHandler() {
        this.$message({
          showClose: true,
          type: 'info',
          message: '暂未实现！'
        })
      },
      // 快递所属公司过滤
      filterOrg(value, row) {
        return row.org === value
      },
      // 获取货架快递结果集
      getPacks() {
        const _this = this
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        let choice = this.formInline.shelf + this.formInline.layer
        console.log("货架: " + choice)
        param.append('token', token)
        param.append('shelf', choice)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/pack/getShelfPack',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.fail === 'get info fail') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '登录状态失效，请重新登录！',
                type: 'warning'
              })
              _this.$router.push('/loginAndRegister')
            } else {
              _this.tableData = response.data.packs
            }
          })
          .catch(function (error) {
            console.log(error)
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      // 索引处理
      indexMethod(index) {
        return index + 1
      },
      // 设置快递公司筛选选项
      setFilters() {
        const _this = this
        let card = sessionStorage.getItem("card")
        if (card === '2101') {
          _this.filters = [{ text: '中通', value: '中通' }
            , { text: '申通', value: '申通' }
            , { text: '圆通', value: '圆通' }]
        } else if (card === '2102') {
          _this.filters = [{ text: '京东', value: '京东' }
            , { text: '顺丰', value: '顺丰' }
            , { text: '韵达', value: '韵达' }]
        } else {
          _this.filters = [{ text: '天天', value: '天天' }
            , { text: 'EMS', value: 'EMS' }]
        }
      },
      // 处理取件多选
      pickSelection() {
        const _this = this
        if (this.$refs.filterTable.selection.length === 0) {
          this.$message({
            showClose: true,
            type: 'info',
            message: '请选择！'
          })
        } else {
          let ids = ''
          for (let i = 0; i < _this.$refs.filterTable.selection.length; i++) {
            ids += _this.$refs.filterTable.selection[i].id + ','
          }
          this.handlePick(ids)
        }
      },
    },
    created() {
      this.setFilters()
      this.getPacks()
    },
    mounted() {
      this.setFilters()
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
