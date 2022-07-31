<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary"> {{ '导出表格' }}</el-button>
        <el-button type="success" @click="excelImport">{{ '导入表格' }}</el-button>
      </div>
    </el-card>

    <!-- table -->
    <el-card>
      <el-table :data="tableData">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="联系方式" />
        <el-table-column prop="status" label="角色">
          <template #default="scope">
            <el-tag size="mini"> {{ scope.row.role.title }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="开通时间">
          <template #default="scope">
            <span>{{ $filters.dateFilter(scope.row.openTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary">Edit</el-button>
            <el-button size="small" type="info">Edit</el-button>
            <el-button size="small" type="danger">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination layout="prev, pager, next" :total="total" />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserManageList } from '@/api/user-manage';
import { useRouter } from 'vue-router';

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
  console.log('result', result)
}
getListData()


// excelImport
const router = useRouter()
const excelImport = ()=>{
  router.push('/user/import')
}
</script>

<style lang="scss" scoped>
</style>
