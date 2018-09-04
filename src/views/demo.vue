
<template>
    <div>
      <el-upload  :action="UploadUrl()"  :on-success="UploadSuccess" :file-list="fileList">
        <el-button size="small" type="primary" >点击上传</el-button>
     </el-upload>

 
    </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods:{
    UploadUrl:function(){
        return "返回需要上传的地址";     
    }   
}  
  }
</script>