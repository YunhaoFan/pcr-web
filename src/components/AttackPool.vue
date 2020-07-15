<template>
    <div class="container-full-width">
        <el-card class="card-half">
            <div slot="header" class="clearfix">
                <span class="card-title">总刀数共 <b>{{this.total}} 刀</b>，当日剩余刀池：
                    <b>{{this.leftPool}}刀</b>
                </span>
            </div>
            <span class="left-pool" v-for="(leftNum,groupName) in attackPool" :key="groupName">
                {{groupName}}:<b>{{leftNum}}</b>刀
            </span>
            <el-button @click="showOrderDialog">
                点此进行排刀
            </el-button>
        </el-card>
        <el-dialog
                :visible.sync="dialogVisible"
                :before-close="closeDialog"
                title="排刀数据录入">
            <el-form ref="currentStatus" :model="currentStatus" label-width="200px" label-position="left">
                <el-form-item label="当前周目">
                    <el-input v-model="currentStatus.season" placeholder="请输入当前周目(数字)"></el-input>
                </el-form-item>
                <el-form-item label="一王预留血量(单位:万)">
                    <el-input v-model="currentStatus.boss1Left"></el-input>
                </el-form-item>
                <el-form-item label="二王预留血量(单位:万)">
                    <el-input v-model="currentStatus.boss2Left"></el-input>
                </el-form-item>
                <el-form-item label="三王预留血量(单位:万)">
                    <el-input v-model="currentStatus.boss3Left"></el-input>
                </el-form-item>
                <el-form-item label="四王预留血量(单位:万)">
                    <el-input v-model="currentStatus.boss4Left"></el-input>
                </el-form-item>
                <el-form-item label="五预留血量(单位:万)">
                    <el-input v-model="currentStatus.boss5Left"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
	import {attackPool} from "../api/api";

	export default {
		name: "AttackPool",
		data() {
			return {
				attackPool: {},
				leftPool: 0,
				total: 0,
				dialogVisible: false,
                currentStatus:{
					season:'',
                    boss1Left:0,
                    boss2Left:0,
                    boss3Left:0,
                    boss4Left:0,
                    boss5Left:0
                }
			}
		},
		methods: {
			async getAttackPool() {
				const pool = await attackPool();
				this.attackPool = pool.attackPool;
				this.total = pool.total;
				for (let i in this.attackPool) {
					this.leftPool += this.attackPool[i]
				}
			},
			showOrderDialog() {
				this.dialogVisible = true;
			},
			closeDialog() {
				this.dialogVisible = false;
			}
		},
		created() {
			this.getAttackPool();
		}
	}
</script>

<style scoped>
    .card-half {
        margin-top: 40px;
        width: 90%;
    }

    .card-title {
        font-weight: bold;
    }

    .clearfix:before, .clearfix:after {
        display: table;
        content: "";
    }

    .left-pool {
        display: block;
        margin: 10px 0 10px 0;
        font-size: 15px;
    }
</style>
