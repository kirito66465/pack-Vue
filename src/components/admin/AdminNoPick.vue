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
                <el-form-item label="收件地址: ">
                  <span>{{ props.row.per_addr }}</span>
                </el-form-item>
                <el-form-item label="所在驿站: ">
                  <span>{{ props.row.addr }}</span>
                </el-form-item>
                <el-form-item label="取件码: ">
                  <span>{{ props.row.code }}</span>
                </el-form-item>
                <el-form-item label="驿站联系人: ">
                  <span>{{ props.row.cont_name }}</span>
                </el-form-item>
                <el-form-item label="驿站联系方式: ">
                  <span>{{ props.row.cont_tel }}</span>
                </el-form-item>
                <el-form-item label="快递状态: ">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
                <el-form-item label="入站时间: ">
                  <span>{{ props.row.start }}</span>
                </el-form-item>
                <el-form-item label="取件时间: ">
                  <span>{{ props.row.end }}</span>
                </el-form-item>
                <el-form-item label="签收人: ">
                  <span>{{ props.row.pick }}</span>
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
            label="快递单号"
            prop="id"
            width="250">
          </el-table-column>
          <el-table-column
            label="快递公司"
            prop="org"
            width="200"
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
            label="收件人"
            prop="per_name"
            width="200">
          </el-table-column>
          <el-table-column
            label="取件码"
            prop="code"
            width="250">
          </el-table-column>
          <el-table-column
            label="快递状态"
            prop="status"
            width="100"
            :filters="[{ text: '已取出', value: '已取出' }, { text: '未取出', value: '未取出' }, { text: '无取件码', value: '无取件码' }]"
            :filter-method="filterStatus"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '已取件' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.status}}</el-tag>
            </template>
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
                type="danger"
                @click="handleNotice(scope.$index, scope.row)">邮件通知</el-button>
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
		name: "UserNoPick",
    data() {
      return {
        baseUrl: Constant.data.baseUrl,
        currentPage: 1,       // 默认当前页，第一页
        total: 21,            // 总记录条数
        pageSize: 10,         // 每一页的记录条数
        search: '',
        tableData: [{
          id: '12987122',
          org: '中通',
          per_name: 'user1',
          per_tel: '12345678900',
          per_addr: '中苑',
          addr: '中苑',
          code: '1-1-16',
          cont_name: '中苑快递员',
          cont_tel: '12345678910',
          status: '未取件',
          start: '2020-12-28 10:24:00',
          end: '',
          pick: ''
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
      // 单条记录短信通知
      handleNotice(index, row) {
        console.log(index, row)
        const _this = this
        this.$confirm('将邮件通知收件人此件快递已到站, 是否继续?', '提示', {
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
            url: _this.baseUrl + '/mail/notice',
            data: param
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data.result === 'do success') {
                _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '邮件通知成功!'
                })
              } else if (response.data.result === 'do fail') {
                _this.$notify({
                  showClose: true,
                  title: '错误',
                  message: '邮件通知失败！',
                  type: 'warning'
                })
              } else if (response.data.result === 'please login to operate') {
                _this.$notify({
                  showClose: true,
                  title: '警告',
                  message: '登录状态失效，请重新登录！',
                  type: 'warning'
                })
                _this.$router.push('/loginAndRegister')
              } else if (response.data.result === 'not exist') {
                _this.$message({
                  showClose: true,
                  message: '该用户未填写邮箱信息，无法邮件通知！',
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
            message: '已取消邮件通知'
          })
        })
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
          url: _this.baseUrl + '/pack/getAdminNoPick/' + _this.currentPage,
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
              _this.total = response.data.pack_result.total
              _this.tableData = response.data.pack_result.list
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
