<template>
    <div>
        <loading :isshow="showLoading"></loading>
        <el-form :model="stayhomeform" ref="stayhomeform">
    <el-form-item label="所属分类">
            <el-select v-model="stayhomeform.cid" placeholder="请选择">
                <el-option
                        v-for="item in categorys"
                        :key="item.cid"
                        :label="item.cname"
                        :value="item.cid">
                </el-option>
            </el-select>
    </el-form-item>
    <el-form-item label="民宿名称">
        <el-input v-model="stayhomeform.sname"></el-input>
    </el-form-item>
    <el-form-item label="民宿描述">
        <el-input type="textarea" v-model="stayhomeform.sdesc"></el-input>
    </el-form-item>
    <el-form-item label="民宿标签">
        <el-input v-model="stayhomeform.stag"></el-input>
    </el-form-item>
    <el-form-item label="民宿评分">
        <el-input v-model="stayhomeform.score"></el-input>
    </el-form-item>
    <el-form-item label="民宿价格">
        <el-input v-model="stayhomeform.sprice"></el-input>
    </el-form-item>
            <el-form-item label="民宿省份">
             <el-select v-model="stayhomeform.sprovince">
                  <el-option v-for="(item,index) in province" :key="index" :value="item"
                             :label="item"></el-option>
             </el-select>
            </el-form-item>
    <el-form-item label="民宿城市">

        <el-select v-model="stayhomeform.scity">
            <el-option v-for="(item,index) in cityList" :key="index" :value="item"
                       :label="item"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="民宿区域">
        <el-select v-model="stayhomeform.sarea">
            <el-option v-for="(item,index) in areaList" :key="index" :value="item"
                       :label="item"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="民宿地址">
        <el-input v-model="stayhomeform.saddress"></el-input>
    </el-form-item>
    <el-form-item label="民宿缩略图">

    </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        :show-file-list="false"
                        :on-success="handleThumbSuccess"
                        :before-upload="handleThumbBeforeupload"
                       >
                    <img v-if="stayhomeform.sthumb" :src="IMGURL+stayhomeform.sthumb"
                         class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp
                        文件，且不超过200kb，最佳比例1:1</div>
                </el-upload>
            </el-form-item>
    <el-form-item label="民宿轮播图">
    </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        list-type="picture-card"
                        :show-file-list="true"
                        :on-exceed="handleExceed"
                        :on-success="handleBannerSuccess"
                         multiple
                        :limit="5"
                        :on-remove="handleBannerRemove"
                        :on-preview="handleBannerPreview"
                >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp
                        文件，且不超过200kb，最佳比例1:1,最多上传5张</div>
                </el-upload>

            </el-form-item>
    <el-form-item label="民宿详情">
    </el-form-item>
            <el-form-item>
       <div id="sdetail" ref="sdetail">
       </div>
            </el-form-item>
    <el-form-item label="入驻须知">
    </el-form-item>
            <el-form-item>
                <rich-text @rich-change="setSnotice" formfield="snotice"></rich-text>
            </el-form-item>
    <el-form-item>
     <el-button type="primary" @click="handleSubmit">提交</el-button>
    </el-form-item>
</el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogPreviewImg" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import {SUCCESS,URL,IMGURL} from "../../../lib/base";
    import loading from "../../../components/loading/loading";
    import instance from "../../../http/http";
    import RichText from "../../../components/rich-text/RichText";
    import E from 'wangeditor';
    import city from "../../../lib/city";
    export default {
        name: "Stayhomeadd",
        components:{
            loading,
            RichText
        },
        data(){
            return {
                IMGURL,
                uploadurl:URL+'/admin/upload/index',
                showLoading:false,
                categorys:[],
                stayhomeform:{
                    sname:'',
                    sdesc:'',
                    sthumb:'',
                    sprice:'',
                    stag:'',
                    sprovince:'',
                    scity:'',
                    sarea:'',
                    saddress:'',
                    sbanner:'',
                    snotice:'',
                    sdetail:'',
                    cid:'',
                    score:''
                },
                bannerArr:[],
                dialogPreviewImg: '',
                dialogVisible: false,
                city,
                province:[],
            }
        },
        computed:{
             cityList(){
                 let cityList=[];
                 let current=this.city.find(ele=>ele.name===this.stayhomeform.sprovince);
                 if (current){
                      cityList=current.city.map(ele=>ele.name);
                 }
                 return cityList;
             },
            areaList(){
                let area=[];
                let current=this.city.find(ele=>ele.name===this.stayhomeform.sprovince);
                if (current){
                    let city=current.city.find(ele=>ele.name===this.stayhomeform.scity);
                    if (city){
                        area=city.area;
                    }
                }
               return area;
            }
        },
        methods:{
            initCategory(){
                this.showLoading=true;
                instance('/admin/category/indexall').then(res=>{
                    if (res.code===SUCCESS){
                        this.showLoading=false;
                        this.categorys=res.data;
                    }
                }).catch(()=>{

                })
            },
            //缩略图上传
            handleThumbSuccess(res){
                if (res.code===SUCCESS){
                     this.stayhomeform.sthumb=res.imgpath;
                }
                console.log(res);
            },
            handleThumbBeforeupload(file){
                let {size,type}=file;
                let uploadMaxSize=200 * 1024;
                let uploadType=['image/jpg','image/png','image/webp','image/jpeg'];
                let sizeFlag=true,typeFlag=true;
                sizeFlag=size<uploadMaxSize;
                typeFlag=uploadType.some(ele=>ele==type);
                if (!typeFlag){
                    this.$message.error('上传图片只能是JPG,PNG,WEBP,JPEG格式!')
                }
                if (!sizeFlag){
                    this.$message.error('上传图片大小不能超过200KB!');
                }
                return sizeFlag && typeFlag;
            },
            //轮播上传  sbanner=img1,img2,
            handleBannerSuccess(res){
                this.bannerArr.push(res.imgpath);
                this.stayhomeform.sbanner=this.bannerArr.join(',');
            },
            handleBannerRemove(file){
                let url=file.response.imgpath
                this.bannerArr=this.bannerArr.filter(ele=>ele!=url)
                this.stayhomeform.sbanner=this.bannerArr.join(',');
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleBannerPreview(file){
                 let url=this.IMGURL+ file.response.imgpath;
                 this.dialogPreviewImg=url;
                 this.dialogVisible=true;
            },
            initRichText(){
                var that=this;
                let edit= new E(this.$refs.sdetail);
                edit.customConfig.menus=[
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'table',  // 表格
                    'undo',  // 撤销
                    'redo'  // 重复
                ]
                edit.customConfig.uploadImgShowBase64=true;
                edit.customConfig.showLinkImg=false;
                edit.customConfig.uploadImgSever=this.uploadurl;
                edit.customConfig.uploadFileName='file';
                edit.customConfig.onchange=(html)=>{
                    this.stayhomeform.sdetail=html;
                }
                edit.customConfig.uploadImgHooks={
                    customInsert:function (insertImg,result){
                        insertImg(that.IMGURL+result.imgpath);
                    }
                }
                edit.create();
                edit.txt.html('<p>用JS设置的内容</p>')
            },
        //    父子组件通信snotice
            setSnotice(field,html){
                this.stayhomeform[field]=html;
            },
            setProvince(){
              this.province= this.city.map(ele=>ele.name);
            },

            handleSubmit(){
                let data=this.stayhomeform;
                instance.post('/api/stayhome',data).then(res=>{
                    if (res.status==200 && res.code==SUCCESS){
                        if (res.data){
                            this.$message.success(res.msg)
                        }
                    }
                }).catch(res=>{
                    this.$message.error(res.msg)
                })
                this.$router.push({name:'stayhomeindex'})
                this.$message({
                    message: '添加民宿成功',
                    type: 'success'
                });
            }
        },

        mounted() {
            this.setProvince();
            this.initCategory();
            this.initRichText();
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>