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
            label="收件人"
            prop="perName"
            width="150">
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
          <el-table-column
            label="取件时间"
            prop="end"
            width="200">
          </el-table-column>
          <el-table-column
            label="签收人"
            prop="pick"
            width="100">
          </el-table-column>
          <el-table-column
            align="right"
            width="300">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入签收人关键字搜索"
                @keyup.enter.native="searchPacks" />
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
		name: "AdminIsPack",
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
      // 快递所属公司过滤
      filterOrg(value, row) {
        return row.org === value
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
          url: _this.baseUrl + '/pack/getAdminIsPick/' + _this.currentPage,
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
