<template>
    <div>
        <loading :isshow="isShow"></loading>
        <el-form inline :model="search">
            <el-form-item label="所属分类"></el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="search.sname"></el-input>
            </el-form-item>
            <el-form-item label="民宿城市">
                <el-input v-model="search.scity"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <div v-if="stayhome.length">
            <el-table :data="stayhome">
                <el-table-column label="ID" prop="sid"></el-table-column>
                <el-table-column label="名称" prop="sname"></el-table-column>
                <el-table-column label="描述" prop="sdesc"></el-table-column>
                <el-table-column label="价格" prop="sprice"></el-table-column>
                <el-table-column label="特色" prop="stag">
                    <template slot-scope="scope">
                        <el-button v-for="item in scope.row.stag" :key="item">
                            {{item}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="位置" >
                    <template slot-scope="scope">
                        <span>{{scope.row.sprovince}}省{{scope.row.scity}}市{{scope.row.sarea}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="缩略图" prop="sthumb">
                    <template slot-scope="scope">
                        <img style="width: 100%;height: 100%;" :src="scope.row.sthumb"
                             alt="">
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="ctime">
                    <template slot-scope="scope">
                        <span>{{scope.row.ctime | formateTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">

                         <router-link
                                 :to="{name:'stayhomeedit',params:{id:scope.row.sid}}">
                             <el-button>编辑</el-button></router-link>

                        <el-button>删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import loading from "../../../components/loading/loading";
    import instance from "../../../http/http";
    import {IMGURL} from "../../../lib/base";
    import {categoryIndex} from "../../../http/category";

    export default {
        name: "Stayhomeindex",
        data(){
            return{
                categorys:[],
                isShow:false,
                search:{sname:'',scity:'',cid:''},
                paginate: {limit:5,page:1},
                stayhome:[],
                total:0,
                IMGURL
            }
        },
        components:{
            loading
        },
        methods:{
            initStayhome(){
                this.isShow=true;
                let params = Object.assign({},this.search,this.paginate)
                instance.get('/api/stayhome',{
                    params
                }).then(res=>{
                    this.isShow=false;
                    if (res.data){
                        let data=res.data;
                        // data[0].sthumb=IMGURL+''
                         data.map(ele=>{
                            ele.stag=ele.stag.split(/,|，/);
                            ele.sthumb=IMGURL+ele.sthumb;
                            // let date=new Date(ele.ctime*1000);
                            // ele.ctime= [date.getFullYear(),date.getMonth()+1,date.getDate()]
                            return ele;
                        })
                        this.stayhome=res.data;
                        this.total=res.total
                    }else {
                        this.$message.success("暂无数据")
                    }
                }).catch(()=>{

                })
                this.isShow=false
            },
            initCategory(){
                this.isShow=true;
                categoryIndex().then(res=>{
                    this.categorys=res.data
                }).catch()
            }
        },
        filters: {

        },
        mounted() {
            this.initCategory()
            this.initStayhome()
        }
    }
</script>

<style scoped>

</style>