<template>
    <div class="upload-excel">
        <div class="btn-upload">
            <el-button :loading="loading" type="primary" @click="handleUpload">上传表格</el-button>
        </div>
        <input ref="excelUploadInput" 
        type="file"  
        class="excel_upload_input"
        accept=".xlsx,.xls"
        @change="handleChange"
        />

        <!-- 拖拽 -->
        <div class="drop"
        @drop.stop.prevent="handleDrop"
        @dragover.stop.prevent="handleDragover"
        @dragenter.stop.prevent="hanldeDragover"
        >
            <i class="el-icon-upload"></i>
            <span>拖入文件</span>
        </div>
    </div>
</template>


<script setup>
import  { ref, defineProps } from 'vue'
import XLSX from 'xlsx'

const props = defineProps({
    // 上传之前的回调
    beforeUpload:Function,
    // 上传成功的回调
    onSuccess:Function
})

// 点击上传触发

const loading = ref(false) 
const excelUploadInput = ref(null)

const handleUpload = ()=>{
    excelUploadInput.value.click()
}

const handleChange = (e)=>{
    const files =  e.target.files
    const rawFile = files[0]
    if(!rawFile) return 
    upload(rawFile)
}

// 触发上传事件
const upload = rawFile => {
    excelUploadInput.value.value  = null
    // 如果用户没有指定上传前回调的话
    if(!props.beforeUpload) {
        readData(rawFile)
        return 
    }
    // 用户指定了上传前的回调，那么只有返回为true的时候才会执行对应操作
    const before = props.beforeUpload(rawFile)
    if(before){
        readData(rawFile)
    }
}


// 读取数据
const readData = rawFile =>{
    loading.value = true
    return  new Promise((resolve,reject)=>{
        const reader = new FileReader()
        // 读取操作完成
        reader.onload = e =>{
            // 1.获取到解析后到数据
            const data = e.target.result
            // 2.利用XLSX 对数据进行解析
            const workbook = XLSX.read(data,{type: 'array'})
            // 3.获取第一张表格名称
            const firstSheetName = workbook.SheetNames[0]
            // 4.读取sheet1 (第一章表格里面的数据)
            const workSheet = workbook.Sheets[firstSheetName]
            // 5.解析数据表头
            const header = getHeaderRow(workSheet)
            // 6.解析数据体
            const results = XLSX.utils.sheet_to_json(workSheet)
            // 7.传入解析之后的数据，
            generateData({header,results})
            // 8.处理loading
            loading.value  = false
            // 9.成功回调
            resolve()
        }

        reader.readAsArrayBuffer(rawFile)

    })
}

// 更具导入内容，生成数据
const generateData = excelData =>{
    props.onSuccess && props.onSuccess(excelData)
}


// 解析表头方法
const getHeaderRow = sheet =>{
    const headers = []
    const range = XLSX.utils.decode_range(sheet['!ref'])
    let C
    const R = range.s.r
    for(C = range.s.r; C <= range.e.c; ++C){
        const cell = sheet[XLSX.utils.encode_cell({c:C,r:R})]
        let hdr = 'UNKNOWN' + C
        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
    }
    return headers
}


</script>


<style lang="scss" scoped>
.upload-excel{
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .excel_upload_input{
        display: none;
        z-index: -9999;
    }
    .btn-upload,
    .drop{
        border: 1px dashed #bbb;
        width: 350px;
        height: 160px;
        text-align: center;
        line-height: 160px;
    }
    .drop{
        line-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #bbb;
        i{
            font-size: 60px;
            display: block;
        }
    }
}

</style>