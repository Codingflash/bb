<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="分类名称">
                <el-input v-model="search.cname" placeholder="分类名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearch">搜索</el-button>
            </el-form-item>
        </el-form>
      <el-table :data="categories">
          <el-table-column prop="cid" label="ID"></el-table-column>
          <el-table-column prop="cname" label="分类名称"></el-table-column>
          <el-table-column prop="cdesc" label="分类描述"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button
                          size="mini"
                          @click="handleEdit(scope.row.cid)">编辑</el-button>
                  <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.row.cid)">删除
                  </el-button>
              </template>
          </el-table-column>
      </el-table>
        <div class="paginate">
            <el-pagination
                    :total="total" :page-size.sync="paginate.limit"
                     :current-page.sync="paginate.page"
                       layout="total,prev,pager,next,jumper"
                       @current-change="handlerCurrentPageChange"
                        >

            </el-pagination>
        </div>


    </div>
</template>

<script>
    /*
    *前台： 查看符合指定条件下某一页若干条数据
    *后台：数据 总数
    * */
    import {URL,SUCCESS} from '../../../lib/base';
    import axios from 'axios'
    export default {
        name: "Index",
        data(){
            return {
                //搜索条件
                search:{cname:''},
            //    分页
                paginate:{
                    page:1,
                    limit:3
                },
                categories:[],
                total:0
            }
        },
        methods:{
            initCategory(){
                let url=URL+'/admin/category/index';
                let token=sessionStorage.getItem('token');
                let params=Object.assign({},this.paginate,this.search);
                axios({
                    method:'GET',
                    url,
                    params,
                    headers:{
                        token
                    }
                }).then(res=>{
                 if ( res.status && res.data.code===SUCCESS){
                     if (res.data.data){
                         this.categories=res.data.data;
                         this.total=res.data.total;
                     }else{
                         this.$message.info(res.data.total);
                     }

                 }
                }).catch(()=>{

                })
            },
            handlerCurrentPageChange(val) {
                this.paginate.page = val;
                this.initCategory()
            },
            handlerSearch(){
                this.paginate.page=1;
                this.initCategory();
            },
            handleEdit(cid){
                this.$router.push({path:'/categoryedit',query:{cid}} )
            },
            handleDelete(cid){
                let url=URL+'/admin/category/delete';
                let token=sessionStorage.getItem('token');
                axios({
                    method: 'GET',
                    url,
                    params:{cid},
                    headers:{
                        token
                    }
                }).then(res=>{
                    if (res.status===200 && res.data.code===SUCCESS){
                        console.log('aaaaaaaaaaa');
                        console.log(this.$router)
                        this.$router.push({path:'/'})
                    }

                }).catch((res)=>{
                    console.log(res.data.msg)
                })
            }

        },
        mounted() {
            this.initCategory();
        }
    }
</script>

<style scoped>
.paginate{
    position: absolute;
    left: 40%;
    bottom: 30%;
}
</style>