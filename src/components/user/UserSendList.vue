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
            width="250">
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
            :filters="[{ text: '已提交', value: '已提交' }, { text: '已取件', value: '已取件' }, { text: '已发出', value: '已发出' }]"
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
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handlePick(scope.$index, scope.row)">取件</el-button>
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
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "UserSendList",
    data() {
      return {
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
      // 单条记录编辑
      handlePick(index, row) {
        console.log(index, row)
      },
      // 单条记录删除
      handleDelete(index, row) {
        console.log(index, row)
        this.$confirm('将删除此件快递, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '已取消删除'
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
          url: 'http://localhost:8080/send/getSendByUser/' + _this.currentPage,
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
      }
    },
    created() {
		  this.getPacks()
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
