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
                <el-form-item label="快递单号: ">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="快递公司: ">
                  <span>{{ props.row.org }}</span>
                </el-form-item>
                <el-form-item label="收件人: ">
                  <span>{{ props.row.perName }}</span>
                </el-form-item>
                <el-form-item label="收件手机号: ">
                  <span>{{ props.row.perTel }}</span>
                </el-form-item>
                <el-form-item label="收件地址: ">
                  <span>{{ props.row.perAddr }}</span>
                </el-form-item>
                <el-form-item label="所在驿站: ">
                  <span>{{ props.row.addr }}</span>
                </el-form-item>
                <el-form-item label="取件码: ">
                  <span>{{ props.row.code }}</span>
                </el-form-item>
                <el-form-item label="驿站联系人: ">
                  <span>{{ props.row.contName }}</span>
                </el-form-item>
                <el-form-item label="驿站联系方式: ">
                  <span>{{ props.row.contTel }}</span>
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
            type="selection"
            width="70">
          </el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod"
            width="100">
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
            :filters="filters"
            column-key="org"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.org === '中通' ? 'primary' : 'success'"
                disable-transitions>{{ scope.row.org }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="收件人"
            prop="perName"
            width="200">
          </el-table-column>
          <el-table-column
            label="取件码"
            prop="code"
            width="150">
          </el-table-column>
          <el-table-column
            label="快递状态"
            prop="status"
            width="150"
            :filters="[{ text: '未取出', value: 1 }, { text: '无取件码', value: -1 }]"
            column-key="status"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '已取件' ? 'primary' : 'success'"
                disable-transitions>{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="200">
            <template slot="header" slot-scope="scope">
              <!-- 取件 -->
              <el-tooltip class="item" effect="dark" content="取件" placement="top">
                <el-button
                  size="medium"
                  type="success"
                  icon="el-icon-edit"
                  circle
                  @click="pickSelection"></el-button>
              </el-tooltip>
              <!-- 邮件通知 -->
              <el-tooltip class="item" effect="dark" content="邮件通知" placement="top">
                <el-button
                  size="medium"
                  type="info"
                  icon="el-icon-message"
                  circle
                  @click="noticeSelection"></el-button>
              </el-tooltip>
              <!-- 导出下载 -->
              <el-tooltip class="item" effect="dark" content="导出为 Excel" placement="top">
                <el-button
                  size="medium"
                  type="primary"
                  icon="el-icon-download"
                  circle
                  @click="getExcel('no')"></el-button>
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
                placeholder="输入关键字搜索"
                @keyup.enter.native="searchHandler"/>
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
          perName: 'user1',
          perTel: '12345678900',
          perAddr: '中苑',
          addr: '中苑',
          code: '1-1-16',
          contName: '中苑快递员',
          contTel: '12345678910',
          status: '未取件',
          start: '2020-12-28 10:24:00',
          end: '',
          pick: ''
        }],
        filters: [],
        orgFilter: ''
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
        this.getPacks(this.orgFilter)
      },
      // 邮件通知
      handleNotice(ids) {
        const _this = this
        this.$confirm('将邮件通知收件人快递已到站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = new URLSearchParams()
          let token = sessionStorage.getItem("token")
          param.append('ids', ids)
          param.append('token', token)
          const loading = this.$loading({
            lock: true,
            text: '发送邮件通知中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          _this.$axios({
            method: 'post',
            url: _this.baseUrl + '/mail/notice',
            data: param
          })
            .then(function (response) {
              loading.close()
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
                _this.$router.push('/login-register')
              } else {
                _this.$message({
                  showClose: true,
                  message: response.data.result,
                  type: 'warning'
                })
              }
            })
            .catch(function (error) {
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
          const loading = this.$loading({
            lock: true,
            text: '正在取件中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          _this.$axios({
            method: 'put',
            url: _this.baseUrl + '/pack/pick-by-admin',
            data: param
          })
            .then(function (response) {
              loading.close()
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
                _this.$router.push('/login-register')
              } else {
                _this.$message({
                  showClose: true,
                  message: response.data,
                  type: 'warning'
                })
              }
            })
            .catch(function (error) {
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
        this.getPacks(this.orgFilter, this.statusFilter)
      },
      // 快递所属公司过滤
      handleFilter(filters) {
        if (filters.org !== undefined) {
          this.orgFilter = filters.org
        }
        if (filters.status !== undefined) {
          this.statusFilter = filters.status
        }
        this.getPacks(this.orgFilter, this.statusFilter)
      },
      // 获取未取快递结果集
      getPacks(org, status) {
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        let jsonParam = {
          "currentPage" : this.currentPage,
          "pageSize" : this.pageSize,
          "token" : token,
          "org" : org,
          "status" : status,
          "search" : this.search
        }
        param.append('json', JSON.stringify(jsonParam))
        const _this = this
        const loading = this.$loading({
          lock: true,
          text: '正在获取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/pack/admin-no-pack',
          data: param
        })
          .then(function (response) {
            loading.close()
            if (response.data.fail === 'get info fail') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '登录状态失效，请重新登录！',
                type: 'warning'
              })
              _this.$router.push('/login-register')
            } else {
              _this.total = response.data.pack_result.total
              _this.tableData = response.data.pack_result.list
            }
          })
          .catch(function (error) {
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      // 索引处理
      indexMethod(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1
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
      // 处理邮件通知多选
      noticeSelection() {
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
          this.handleNotice(ids)
        }
      },
      // 获取 Excel 输出流并下载到本地
      getExcel(type) {
        const _this = this
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        param.append('token', token)
        param.append('type', type)
        const loading = this.$loading({
          lock: true,
          text: '正在导出中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/excel',
          data: param,
          responseType: 'blob'
        })
          .then(function (response) {
            let name = sessionStorage.getItem('name')
            let time = _this.getCurrentTime()
            let fileName = name + "-" + time + "-" + type + ".xlsx"
            _this.download(response.data, fileName)
            loading.close()
          })
      },
      // 下载 blob 类型数据到本地
      download(data, filename) {
        // var blob = new Blob([data], {type: 'application/vnd.ms-excel'})接收的是blob，若接收的是文件流，需要转化一下
        if (typeof window.chrome !== 'undefined') {
          // Chrome version
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(data);
          link.download = filename;
          link.click();
        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
          // IE version
          let blob = new Blob([data], {type: 'application/force-download'});
          window.navigator.msSaveBlob(blob, filename);
        } else {
          // Firefox version
          let file = new File([data], filename, {type: 'application/force-download'});
          window.open(URL.createObjectURL(file));
        }
      },
      // 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
      getCurrentTime() {
        let date = new Date()                             // 当前时间
        let month = this.zeroFill(date.getMonth() + 1)  // 月
        let day = this.zeroFill(date.getDate())            // 日
        let hour = this.zeroFill(date.getHours())          // 时
        let minute = this.zeroFill(date.getMinutes())      // 分
        let second = this.zeroFill(date.getSeconds())      // 秒
        // 当前时间
        return date.getFullYear() + month + day + hour + minute + second
      },
      // 补零
      zeroFill(i){
        if (i >= 0 && i <= 9) {
          return "0" + i
        } else {
          return i
        }
      }
    },
    created() {
      this.setFilters()
      this.getPacks("", 2)
    },
    mounted() {
      this.setFilters()
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
