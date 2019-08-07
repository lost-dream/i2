<template>
    <div class="timespace">
        <div class="tsimg">
            <img src="../../../assets/img/qiuxing.png" alt="">
        </div>
        <div class="tsimp">
            <el-form ref="form" :model="form" status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item label="身份证号" prop="idNumber">
                    <el-input v-model="form.idNumber"></el-input>
                </el-form-item>
                <el-form-item prop="newPass">
                    <el-date-picker
                            v-model="start"
                            type="date"
                            placeholder="选择开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="sureBut" type="primary" @click="onSubmit('form');see='depict'">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "timespace"
    }
</script>

<style scoped>

</style>
