<template>
	<div>
    <div class="block">
      <div>
        <el-table
          ref="filterTable"
          :data="tableData"
          @filter-change="filterStatus"
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
            label="快递单号"
            prop="id"
            width="200">
          </el-table-column>
          <el-table-column
            label="快递公司"
            prop="org"
            width="150">
          </el-table-column>
          <el-table-column
            label="快递状态"
            prop="status"
            width="150"
            :filters="[{ text: '已提交', value: '已提交' }, { text: '已确认', value: '已确认' }
              , { text: '已支付', value: '已支付' }, { text: '已发出', value: '已发出' }]"
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
          <el-table-column
            align="right"
            width="300">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                @keyup.enter.native="searchHandler"/>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <!-- 确认 -->
              <el-tooltip class="item" effect="dark" content="确认" placement="top">
                <el-button
                  size="medium"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="confirmSelection"></el-button>
              </el-tooltip>
              <!-- 发出 -->
              <el-tooltip class="item" effect="dark" content="发出" placement="top">
                <el-button
                  size="medium"
                  type="success"
                  icon="el-icon-check"
                  circle
                  @click="outSelection"></el-button>
              </el-tooltip>
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
		name: "AdminCollection",
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
          id: '75422907315890',
          org: '中通',
          status: '已提交',
          dt: '2021-01-05 16:45:00',
        }],
        statusFilter: ''
      }
    },
    methods: {
		  // 获取每页记录条数
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
      },
      // 获取当前页数
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.getPacks(this.statusFilter)
      },
      // 寄件确认
      handleConfirm(ids, count) {
        const _this = this
        if (count > 0) {
          this.$message({
            showClose: true,
            message: '有' + count + '件寄件无法确认，因为其已确认!',
            type: 'warning'
          })
        }
        this.$confirm('将确认选中的寄件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = new URLSearchParams()
          let token = sessionStorage.getItem("token")
          // console.log('ids: ' + ids)
          param.append('ids', ids)
          param.append('token', token)
          _this.$axios({
            method: 'put',
            url: _this.baseUrl + '/send/confirm',
            data: param
          })
            .then(function (response) {
              // console.log(response.data)
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
                  message: '确认失败！',
                  type: 'warning'
                })
              } else if (response.data === 'do success') {
                _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '确认成功!'
                })
                let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
                _this.$router.push(NewPage)
                _this.$router.go(-1)
              }
            })
            .catch(function (error) {
              // console.log(error)
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
            message: '已取消确认'
          })
        })
      },
      // 寄件发出
      handleOut(ids, outCount, payCount) {
        const _this = this
        if (outCount > 0) {
          this.$message({
            showClose: true,
            message: '有' + outCount + '件寄件无法发出，因为其已发出!',
            type: 'warning'
          })
        }
        if (payCount > 0) {
          this.$message({
            showClose: true,
            message: '有' + payCount + '寄件寄件无法发出，请等待学生支付后再发出!',
            type: 'warning'
          })
        }
        this.$confirm('将发出选中的寄件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = new URLSearchParams()
          let token = sessionStorage.getItem("token")
          // console.log('ids: ' + ids)
          param.append('ids', ids)
          param.append('token', token)
          _this.$axios({
            method: 'put',
            url: _this.baseUrl + '/send/out',
            data: param
          })
            .then(function (response) {
              // console.log(response.data)
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
                  message: '发出失败！',
                  type: 'warning'
                })
              } else if (response.data === 'do success') {
                _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '发出成功!'
                })
                let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
                _this.$router.push(NewPage)
                _this.$router.go(-1)
              }
            })
            .catch(function (error) {
              // console.log(error)
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
            message: '已取消发出'
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
      // 快递状态过滤
      filterStatus(filters) {
        if (filters.status !== undefined) {
          this.statusFilter = filters.status
          // console.log("status: " + this.statusFilter)
        }
        this.getPacks(this.statusFilter)
      },
      // 获取寄件结果集
      getPacks(status) {
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        let jsonParam = {
          "currentPage" : this.currentPage,
          "pageSize" : this.pageSize,
          "token" : token,
          "status" : status
        }
        param.append('json', JSON.stringify(jsonParam))
        const _this = this
        // console.log("准备发出请求")
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/send/getSendByAdmin',
          data: param
        })
          .then(function (response) {
            // console.log("收到响应")
            // console.log(response.data)
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
            // console.log(error)
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
      // 处理确认多选
      confirmSelection() {
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
            if (_this.$refs.filterTable.selection[i].status === '已提交') {
              ids += _this.$refs.filterTable.selection[i].id + ','
            } else {
              count++
            }
          }
          this.handleConfirm(ids, count)
        }
      },
      // 处理发出多选
      outSelection() {
        const _this = this
        if (this.$refs.filterTable.selection.length === 0) {
          this.$message({
            showClose: true,
            type: 'info',
            message: '请选择！'
          })
        } else {
          let ids = ''
          let outCount = 0
          let payCount = 0
          for (let i = 0; i < _this.$refs.filterTable.selection.length; i++) {
            if (_this.$refs.filterTable.selection[i].status === '已发出') {
              outCount++
              continue
            }
            if (_this.$refs.filterTable.selection[i].status === '已提交' || _this.$refs.filterTable.selection[i].status === '已确认') {
              payCount++
              continue
            }
            ids += _this.$refs.filterTable.selection[i].id + ','
          }
          this.handleOut(ids, outCount, payCount)
        }
      }
    },
    created() {
		  this.getPacks("")
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
