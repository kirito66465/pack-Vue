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
                <el-form-item label="快递单号">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="快递公司">
                  <span>{{ props.row.org }}</span>
                </el-form-item>
                <el-form-item label="收件人">
                  <span>{{ props.row.per_name }}</span>
                </el-form-item>
                <el-form-item label="收件手机号">
                  <span>{{ props.row.per_tel }}</span>
                </el-form-item>
                <el-form-item label="收件地址">
                  <span>{{ props.row.per_addr }}</span>
                </el-form-item>
                <el-form-item label="所在驿站">
                  <span>{{ props.row.addr }}</span>
                </el-form-item>
                <el-form-item label="取件码">
                  <span>{{ props.row.code }}</span>
                </el-form-item>
                <el-form-item label="驿站联系人">
                  <span>{{ props.row.cont_name }}</span>
                </el-form-item>
                <el-form-item label="驿站联系方式">
                  <span>{{ props.row.cont_tel }}</span>
                </el-form-item>
                <el-form-item label="快递状态">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
                <el-form-item label="入站时间">
                  <span>{{ props.row.start }}</span>
                </el-form-item>
                <el-form-item label="取件时间">
                  <span>{{ props.row.end }}</span>
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
            :filters="[{ text: '中通', value: '中通' }, { text: '申通', value: '申通' }, { text: '圆通', value: '圆通' }]"
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
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
		name: "AdminAllPack",
    data() {
      return {
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
          end: ''
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
      handleEdit(index, row) {
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
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
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
        param.append('currentPage', this.currentPage)
        param.append('pageSize', this.pageSize)
        const _this = this
        console.log("准备发出请求")
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/pack/getAdminPacksByPage',
          // url: 'http://localhost:8080/pack/getPacksByAdmin'
          data: param
        })
          .then(function (response) {
            console.log("收到响应")
            console.log(response.data)
            _this.total = response.data.total
            _this.tableData = response.data.list
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      indexMethod(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1
      }
    },

    mounted() {
		  this.getPacks()
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
