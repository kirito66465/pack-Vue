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
            type="index"
            :index="indexMethod"
            width="100">
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
            :filters="[{ text: '中通', value: '中通' }
                      , { text: '申通', value: '申通' }
                      , { text: '圆通', value: '圆通' }
                      , { text: '京东', value: '京东' }
                      , { text: '顺丰', value: '顺丰' }
                      , { text: '韵达', value: '韵达' }
                      , { text: '天天', value: '天天' }
                      , { text: 'EMS', value: 'EMS' }]"
            column-key="org"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.org === '中通' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.org}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="所在驿站"
            prop="addr"
            width="150"
            :filters="[{ text: '中苑', value: '中苑' }, { text: '西苑', value: '西苑' }, { text: '北苑', value: '北苑' }]"
            column-key="addr"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.addr === '中苑' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.addr}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="取件码"
            prop="code"
            width="200">
          </el-table-column>
          <el-table-column
            label="快递状态"
            prop="status"
            width="150"
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
                @keyup.enter.native="searchHandler"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
		name: "UserAllPack",
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
        orgFilter: '',
        addrFilter: ''
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
        this.getPacks(this.orgFilter, this.addrFilter)
      },
      // 单条记录删除
      handleDelete(index, row) {
        console.log(index, row)
        const _this = this
        this.$confirm('将删除此件快递, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = new URLSearchParams()
          param.append('id', _this.tableData[index].id)
          let token = localStorage.getItem('token')
          param.append('token', token)
          _this.$axios({
            method: 'post',
            url: _this.baseUrl + '/pack/deletePack',
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
                  message: '删除失败！',
                  type: 'warning'
                })
              } else if (response.data === 'do success') {
                _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '删除成功!'
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
      // 搜索
      searchHandler() {
        this.$message({
          showClose: true,
          type: 'info',
          message: '暂未实现！'
        })
      },
      // 条件过滤
      handleFilter(filters) {
        if (filters.addr !== undefined) {
          this.addrFilter = filters.addr
          console.log("addr: " + this.addrFilter)
        }
        if (filters.org !== undefined) {
          this.orgFilter = filters.org
          console.log("org: " + this.orgFilter)
        }
        this.getPacks(this.orgFilter, this.addrFilter)
      },
      // 快递状态过滤
      filterStatus(value, row) {
        return row.status === value
      },
      getPacks(org, addr) {
        let param = new URLSearchParams()
        let token = localStorage.getItem("token")
        let jsonParam = {
          "currentPage" : this.currentPage,
          "pageSize" : this.pageSize,
          "token" : token,
          "org" : org,
          "addr" : addr
        }
        param.append('json', JSON.stringify(jsonParam))
        const _this = this
        console.log("准备发出请求")
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/pack/getUserPackByPage',
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
      }
    },
    created() {
		  this.getPacks("", "")
    },
    mounted() {
      // this.getPacks()
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
