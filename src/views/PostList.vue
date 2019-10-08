<template>
  <div>
    <div class="bread">{{bread}}</div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="750">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="显示" width="60">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.open===1?'显示':'隐藏' }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="60">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.type===1?'文章':'视频'}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            :type="scope.row.open===1?'warning':'success'"
            @click="handleDelete(scope.$index, scope.row)"
          >{{scope.row.open===1?'隐藏':'显示'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="12"
      class="pagination"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 5
    };
  },
  methods: {
    handleEdit(index, row) {},
    handleDelete(index, row) {
      this.$axios({
        url: "/post_update/" + row.id,
        method: "post",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user") || "{}").token
        },
        data: {
          open: Number(!row.open)
        }
      }).then(res => {
        this.getList();
        console.log(this.tableData);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    //封装请求数据列表的方法
    getList() {
      this.$axios({
        url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      }).then(res => {
        const { data } = res.data;
        this.tableData = data;
      });
    }
  },
  computed: {
    bread() {
      const { matched } = this.$route;
      const arr = [];
      matched.forEach(v => {
        arr.push(v.meta);
      });
      return arr.join("/");
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
.bread {
  margin-bottom: 20px;
}
.pagination {
  position: absolute;
  bottom: 20px;
}
</style>