<template>
    <div>
        <el-row>
            <span class="user">欢迎，{{ userCard }}</span>
        </el-row>
        <el-row class="mt-20">
            <el-col :span="12" class="flex-col-center" style="height: 30px">
                <span class="poolInfo">当前默认刀池为：<b>{{attackPool}}</b>，当前默认box为：<b>{{attackBox}}</b></span>
            </el-col>
            <el-col :span="6" class="flex-col-center" style="height: 30px">
                <el-button @click="showDialog" size="small">点此更改默认刀池</el-button>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="visibleDialog"
                   :before-close="closeDialog"
                   title="更改默认刀池">
            <el-form label-position="left" :model="attackPoolForm" ref="attackPool">
                <el-form-item label="BOX1" label-width="100px">
                    <el-input v-model="attackPoolForm.box1" placeholder="请输入BOX名称"></el-input>
                </el-form-item>
                <el-form-item label="BOX2" label-width="100px">
                    <el-input v-model="attackPoolForm.box2" placeholder="请输入BOX名称"></el-input>
                </el-form-item>
                <el-form-item label="BOX3" label-width="100px">
                    <el-input v-model="attackPoolForm.box3" placeholder="请输入BOX名称"></el-input>
                </el-form-item>
                <el-form-item label="BOX4" label-width="100px">
                    <el-input v-model="attackPoolForm.box4" placeholder="请输入BOX名称"></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-button @click="saveAttackPool" class="confirm-button">保存</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
	import {userInfo, defaultPool, getPoolAndBox} from "../api/api";

	export default {
		name: 'Banner',
		data() {
			return {
				userCard: 'none',
				defaultAttackPool: '',
				defaultAttackBox: '',
				visibleDialog: false,
				attackPoolForm: {
					box1: '',
					box2: '',
					box3: '',
					box4: ''
				},
				attackBoxForm: {
					box1: '',
					box2: '',
					box3: ''
				},
                attackPool:'',
                attackBox:''
			}
		},
		methods: {
			async getUserInfo() {
				let currentUrl = document.URL;
				const qqId = currentUrl.split('?')[1].split('=')[1];
				const info = await userInfo({qqId: qqId});
				this.userCard = info[0].card;
			},
			showDialog() {
				this.visibleDialog = true;
			},
			closeDialog() {
				this.visibleDialog = false;
			},
			async saveAttackPool() {
				try {
					const resData = await defaultPool(this.attackPoolForm);
					if (resData.errorCode == 0) {
						this.$message({
							type: 'success',
							message: '保存成功！'
						});
						this.closeDialog();
                        this.poolAndBox();
					}
				} catch (e) {
					this.$message({
						type: 'error',
						message: '出大问题！'
					})
					console.log(e)
				}
			},
			async poolAndBox() {
				const poolBox = await getPoolAndBox();
				this.attackPool = poolBox.pool;
				this.attackBox = poolBox.box;
				const attackPoolArr = this.attackPool.split(',');
				const attackBoxArr = this.attackBox.split(',');
				let countPool = 0;
				let countBox = 0;
				for (let key in this.attackBoxForm) {
					this.attackBoxForm[key] = attackBoxArr[countBox];
					countBox++
				}
				for (let key in this.attackPoolForm) {
					this.attackPoolForm[key] = attackPoolArr[countPool];
					countPool++
				}
			}
		},
		created() {
			this.getUserInfo();
			this.poolAndBox();
		}
	}
</script>

<style scoped>
    .user {
        font-weight: bold;
        font-size: 20px;
        display: block;
        margin-left: 30px;
    }

    .poolInfo {
        font-size: 15px;
        display: inline-block;
        margin-left: 30px;
    }

    .confirm-button {
        width: 100px;
    }
</style>
