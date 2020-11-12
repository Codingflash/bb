<template>
  <div class="login">
      <div class="login-content">
          <el-form :model="loginForm" ref="loginform" :rules="rules">
              <el-form-item label="用户名：" prop="username">
                  <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密  码：" prop="password">
                  <el-input type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item prop="">
                  <el-button type="primary" @click.prevent="submitForm">登录
                  </el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
    /*
    1 表单验证
    2 fetch  axios


    权限验证  前台
    路由前置守卫
    路由元信息
    登录成功后返回之前的页面  地址栏添加查询字符串
    * */
    import axios from 'axios';
    import {SUCCESS,URL} from "../lib/base";

    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 5, max: 9, message: '长度在 5 到 9 个字符', trigger: 'blur'}
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 5, max: 9, message: '长度在 5 到 9 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            submitForm() {
                this.$refs.loginform.validate((valid) => {
                    if (valid) {
                        // let url='http://localhost/phpcode/bb-admin/public/index.php'
                        axios.post(URL+'/admin/login/check',this.loginForm).then((res)=> {
                            console.log(res);
                            if (res.status === 200 && res.data.code === SUCCESS){
                                sessionStorage.setItem('token',res.data.token);
                                sessionStorage.setItem('user',JSON.stringify(res.data.user));
                                let redirect = this.$route.query.redirect || 'index';
                                this.$router.push({name:redirect})
                            }else {
                                this.$message.error(res.data.msg);
                            }
                        }).catch(function (error) {
                            console.log(error);
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
.login{
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    background: pink;
}
    .login>.login-content{
        width: 400px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        padding: 20px;
        border-radius: 5px;
    }
</style>