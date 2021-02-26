<template>
	<div>
    <div class="block">
      <div>
        <el-table
          ref="filterTable"
          :data="tableData"
          @filter-change="handleFilter"
          stripe
          style="width: 100%"
          height="750">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="寄件人姓名: ">
                  <span>{{ props.row.from_name }}</span>
                </el-form-item>
                <el-form-item label="寄件人联系方式: ">
                  <span>{{ props.row.from_tel }}</span>
                </el-form-item>
                <el-form-item label="寄件人地址: ">
                  <span>{{ props.row.from_addr }}</span>
                </el-form-item>
                <el-form-item label="收件人姓名: ">
                  <span>{{ props.row.to_name }}</span>
                </el-form-item>
                <el-form-item label="收件人联系方式: ">
                  <span>{{ props.row.to_tel }}</span>
                </el-form-item>
                <el-form-item label="收件人地址: ">
                  <span>{{ props.row.to_addr }}</span>
                </el-form-item>
                <el-form-item label="运费: ￥">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="快递单号: ">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="快递公司: ">
                  <span>{{ props.row.org }}</span>
                </el-form-item>
                <el-form-item label="快递状态: ">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
                <el-form-item label="时间戳: ">
                  <span>{{ props.row.dt }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!-- 未展开时显示内容 -->
          <el-table-column
            type="index"
            :index="indexMethod"
            width="50">
          </el-table-column>
          <el-table-column
            type="selection"
            width="70">
          </el-table-column>
          <el-table-column
            label="收件人"
            prop="to_name"
            width="150">
          </el-table-column>
          <el-table-column
            label="运费（￥）"
            prop="price"
            width="150">
          </el-table-column>
          <el-table-column
            label="快递单号"
            prop="id"
            width="200">
          </el-table-column>
          <el-table-column
            label="快递公司"
            prop="org"
            width="200"
            :filters="[{ text: '中通', value: '中通' }
                      , { text: '韵达', value: '韵达' }
                      , { text: 'EMS', value: 'EMS' }]"
            column-key="org"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.org === '中通' ? 'primary' : 'success'"
                disable-transitions>{{ scope.row.org }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="快递状态"
            prop="status"
            width="100"
            :filters="[{ text: '已提交', value: '已提交' }
              , { text: '已确认', value: '已确认' }
              , { text: '已支付', value: '已支付' }
              , { text: '已发出', value: '已发出' }]"
            column-key="status"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '已提交' ? 'primary' : 'success'"
                disable-transitions>{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="时间戳"
            prop="dt"
            width="250">
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <!-- 支付 -->
              <el-tooltip class="item" effect="dark" content="支付" placement="top">
                <el-button
                  size="medium"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handlePay(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </template>
            <template slot="header" slot-scope="scope">
              <!-- 取消 -->
              <el-tooltip class="item" effect="dark" content="取消" placement="top">
                <el-button
                  size="medium"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="cancelSelection"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            width="300">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :hide-on-single-page="value"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
	import Constant from "../pub/Constant"
  export default {
		name: "UserSendList",
    data() {
      return {
        baseUrl: Constant.data.baseUrl,
        currentPage: 1,       // 默认当前页，第一页
        total: 21,            // 总记录条数
        pageSize: 10,         // 每一页的记录条数
        search: '',
        tableData: [{
          from_name: '严晨',
          from_tel: '13305193691',
          from_addr: '中苑',
          to_name: '王杰',
          to_tel: '17751773079',
          to_addr: '',
          price: 10,
          id: '75422907315890',
          org: '中通',
          status: '已提交',
          dt: '2021-01-05 16:45:00',
        }],
        orgFilter: '',
        statusFilter: ''
      }
    },
    methods: {
		  // 获取每页记录条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      // 获取当前页数
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.getPacks(this.orgFilter, this.statusFilter)
      },
      // 支付寄件
      handlePay(index, row) {
        console.log(index, row)
        const _this = this
        if (_this.tableData[index].status === '已确认') {
          let msg = '将支付' + _this.tableData[index].price + '元运费, 是否继续?'
          _this.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = new URLSearchParams()
            let token = sessionStorage.getItem("token")
            param.append('id', _this.tableData[index].id)
            param.append('token', token)
            _this.$axios({
              method: 'put',
              url: _this.baseUrl + '/send/pay',
              data: param
            })
              .then(function (response) {
                console.log(response.data)
                if (response.data === 'please login to operate') {
                  _this.$notify({
                    showClose: true,
                    title: '警告',
                    message: '登录状态失效，请重新登录！',
                    type: 'warning'
                  })
                  _this.$router.push('/loginAndRegister')
                } else if (response.data === 'do fail') {
                  _this.$notify({
                    showClose: true,
                    title: '警告',
                    message: '支付失败！',
                    type: 'warning'
                  })
                } else {
                  _this.$message({
                    showClose: true,
                    type: 'success',
                    message: '支付成功!'
                  })
                  let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
                  _this.$router.push(NewPage)
                  _this.$router.go(-1)
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
            _this.$message({
              showClose: true,
              type: 'info',
              message: '已取消支付'
            })
          })
        } else if (_this.tableData[index].status === '已支付' || _this.tableData[index].status === '已发出') {
          _this.$message({
            showClose: true,
            message: '该寄件已支付!',
            type: 'warning'
          })
        } else if (_this.tableData[index].status === '已提交') {
          _this.$message({
            showClose: true,
            message: '请等待驿站管理员确认后再支付!',
            type: 'warning'
          })
        }
      },
      // 取消寄件
      handleCancel(ids, count) {
        const _this = this
        if (count > 0) {
          _this.$notify.error({
            showClose: true,
            title: '错误',
            message: '有 ' + count + ' 件寄件已发出，无法取消！'
          })
        }
        this.$confirm('将取消选中的寄件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = new URLSearchParams()
          let token = sessionStorage.getItem("token")
          param.append('ids', ids)
          param.append('token', token)
          _this.$axios({
            method: 'delete',
            url: _this.baseUrl + '/send/cancel',
            data: param
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data === 'please login to operate') {
                _this.$notify({
                  showClose: true,
                  title: '警告',
                  message: '登录状态失效，请重新登录！',
                  type: 'warning'
                })
                _this.$router.push('/loginAndRegister')
              } else if (response.data === 'do fail') {
                _this.$notify({
                  showClose: true,
                  title: '警告',
                  message: '取消失败！',
                  type: 'warning'
                })
              } else {
                _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '取消成功!'
                })
                let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
                _this.$router.push(NewPage)
                _this.$router.go(-1)
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
            message: '已取消删除'
          })
        })
      },
      // 条件过滤
      handleFilter(filters) {
        if (filters.org !== undefined) {
          this.orgFilter = filters.org
          console.log("org: " + this.orgFilter)
        }
        if (filters.status !== undefined) {
          this.statusFilter = filters.status
          console.log("status: " + this.statusFilter)
        }
        this.getPacks(this.orgFilter, this.statusFilter)
      },
      // 获取寄件结果集
      getPacks(org, status) {
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        let jsonParam = {
          "currentPage" : this.currentPage,
          "pageSize" : this.pageSize,
          "token" : token,
          "org" : org,
          "status" : status
        }
        param.append('json', JSON.stringify(jsonParam))
        const _this = this
        console.log("准备发出请求")
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/send/getSendByUser',
          data: param
        })
          .then(function (response) {
            console.log("收到响应")
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
              _this.total = response.data.result.total
              _this.tableData = response.data.result.list
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
      // 分页处理
      indexMethod(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1
      },
      // 处理取消多选
      cancelSelection() {
        const _this = this
        if (this.$refs.filterTable.selection.length === 0) {
          this.$message({
            showClose: true,
            type: 'info',
            message: '请选择！'
          })
        } else {
          let ids = ''
          let count = 0
          for (let i = 0; i < _this.$refs.filterTable.selection.length; i++) {
            ids += _this.$refs.filterTable.selection[i].id + ','
            ids += _this.$refs.filterTable.selection[i].id + ','
            if (_this.$refs.filterTable.selection[i].status === '已发出') {
              count++
            }
          }
          this.handleCancel(ids, count)
        }
      }
    },
    created() {
		  this.getPacks("", "")
    },
    mounted() {

    },
    updated() {

    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
    font-weight: bold;
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
