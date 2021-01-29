<template>
	<div>
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
            width="150"
            :filters="filters"
            :filter-method="filterOrg"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.org === '中通' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.org}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="快递状态"
            prop="status"
            width="100"
            :filters="[{ text: '已提交', value: '已提交' }, { text: '已确认', value: '已确认' }
              , { text: '已支付', value: '已支付' }, { text: '已发出', value: '已发出' }]"
            :filter-method="filterStatus"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '已提交' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="时间戳"
            prop="dt"
            width="250">
          </el-table-column>
          <el-table-column
            align="right"
            width="400">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                @keyup.enter.native="searchPacks" />
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row)">确认</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleOut(scope.$index, scope.row)">发出</el-button>
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
          layout="total, prev, pager, next"
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
        filters: []
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
        this.getPacks()
      },
      // 单条记录确认
      handleConfirm(index, row) {
        console.log(index, row)
        const _this = this
        if (_this.tableData[index].status === '已提交') {
          let msg = '将确认此寄件, 是否继续?'
          _this.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = new URLSearchParams()
            let token = localStorage.getItem("token")
            param.append('id', _this.tableData[index].id)
            param.append('token', token)
            _this.$axios({
              method: 'post',
              url: _this.baseUrl + '/send/confirm',
              data: param
            })
              .then(function (response) {
                console.log(response.data)
                if (response.data.result === 'please login to operate') {
                  _this.$notify({
                    showClose: true,
                    title: '警告',
                    message: '登录状态失效，请重新登录！',
                    type: 'warning'
                  })
                  _this.$router.push('/loginAndRegister')
                } else if (response.data.result === 'do fail') {
                  _this.$notify({
                    showClose: true,
                    title: '警告',
                    message: '确认失败！',
                    type: 'warning'
                  })
                } else {
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
              message: '已取消确认'
            })
          })
        } else if (_this.tableData[index].status === '已确认' || _this.tableData[index].status === '已支付'
          || _this.tableData[index].status === '已发出') {
          _this.$message({
            showClose: true,
            message: '该寄件已确认!',
            type: 'warning'
          })
        }
      },
      // 单条记录发出
      handleOut(index, row) {
        console.log(index, row)
        const _this = this
        if (_this.tableData[index].status === '已支付') {
          let msg = '将确认此寄件, 是否继续?'
          _this.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = new URLSearchParams()
            let token = localStorage.getItem("token")
            param.append('id', _this.tableData[index].id)
            param.append('token', token)
            _this.$axios({
              method: 'post',
              url: _this.baseUrl + '/send/out',
              data: param
            })
              .then(function (response) {
                console.log(response.data)
                if (response.data.result === 'please login to operate') {
                  _this.$notify({
                    showClose: true,
                    title: '警告',
                    message: '登录状态失效，请重新登录！',
                    type: 'warning'
                  })
                  _this.$router.push('/loginAndRegister')
                } else if (response.data.result === 'do fail') {
                  _this.$notify({
                    showClose: true,
                    title: '警告',
                    message: '发出失败！',
                    type: 'warning'
                  })
                } else {
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
              message: '已取消发出'
            })
          })
        } else if (_this.tableData[index].status === '已发出') {
          _this.$message({
            showClose: true,
            message: '该寄件已发出!',
            type: 'warning'
          })
        } else if (_this.tableData[index].status === '已提交' || _this.tableData[index].status === '已确认') {
          _this.$message({
            showClose: true,
            message: '请等待用户支付后再发出!',
            type: 'warning'
          })
        }
      },
      // 快递所属公司过滤
      filterOrg(value, row) {
        return row.org === value
      },
      // 快递状态过滤
      filterStatus(value, row) {
        return row.status === value
      },
      getPacks() {
        let param = new URLSearchParams()
        let token = localStorage.getItem("token")
        param.append('currentPage', this.currentPage)
        param.append('pageSize', this.pageSize)
        param.append('token', token)
        const _this = this
        console.log("准备发出请求")
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/send/getSendByAdmin/' + _this.currentPage,
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
      indexMethod(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1
      },
      setFilters() {
        const _this = this
        let card = localStorage.getItem("card")
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
      searchPacks() {
        alert(this.search)
      }
    },
    created() {
		  this.setFilters()
		  this.getPacks()
    },
    mounted() {
      this.setFilters()
      this.getPacks()
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
