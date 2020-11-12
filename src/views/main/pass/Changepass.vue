<template>
<el-form :model="passform"  ref="passform" :rules="passrules">
    <el-form-item label="旧密码" prop="oldpass">
        <el-input v-model="passform.oldpass" placeholder="请输入原来密码"
                  auto-complete="off" ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newpass">
        <el-input v-model="passform.newpass" placeholder="请输入新密码"
                  ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="newpassagain">
        <el-input v-model="passform.newpassagain" placeholder="再次确认密码"
                  ></el-input>
    </el-form-item>
    <el-form-item><el-button type="primary" @click="handlerSubmit('passform')">确认
    </el-button></el-form-item>
</el-form>
</template>

<script>
    import {SUCCESS,URL} from "../../../lib/base";

    export default {
        name: "Changepass",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.passform.newpassagain !== '') {
                        this.$refs.passform.validateField('newpassagain');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passform.newpass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passform: {
                    oldpass: '',
                    newpass: '',
                    newpassagain: ''
                },
                passrules: {
                    oldpass: [
                        {required: true, message: '请输入旧密码', trigger: 'change'},
                    ],
                    newpass: [
                        {
                            validator: validatePass,
                            trigger: 'blur',
                            required: true,
                            message: '请输入新密码',
                        }
                    ],
                    newpassagain: [
                        {
                            validator: validatePass2,
                            trigger: 'blur',
                            required: true,

                        }
                    ]
                }


            }
        },
        methods: {
            handlerSubmit(formname) {
                let url = URL + '/admin/login/updatepass';
                let token = sessionStorage.getItem('token');
                this.$http({
                    method: 'POST',
                    url,
                    data: this.passform,
                    headers: {
                        token
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.code == SUCCESS) {
                        this.$message.success(res.data.msg);
                        sessionStorage.clear();
                        this.$router.push('/login');
                    }
                }).catch(() => {
                })
                this.$refs[formname].validate((valid) => {
                    if (valid) {
                        console.log('submit');
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

</style>