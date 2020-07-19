<template>
    <div>
        <el-row>
            <span class="user">欢迎，{{ userCard }}</span>
        </el-row>
        <el-row class="mt-20">
            <el-col :span="12" class="flex-col-center" style="height: 30px">
                <span class="poolInfo">当前默认刀池为：<b>{{attackPool}}</b>，当前默认box为：<b>{{attackBox}}</b></span>
            </el-col>
            <el-col :span="3" class="flex-col-center" style="height: 30px">
                <el-button @click="showDialog" size="small">点此更改默认刀池</el-button>
            </el-col>
            <el-col :span="3" class="flex-col-center" style="height: 30px">
                <el-button @click="showBoxDialog" size="small">点此更改默认BOX</el-button>
            </el-col>
            <el-col :span="3" class="flex-col-center" style="height: 30px">
                <el-button @click="initEverything" size="small">初始化所有数据</el-button>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="visibleDialog"
                   :before-close="closeDialog"
                   title="更改默认刀池(更改后须重新更改默认BOX)">
            <el-form label-position="left" :model="attackPoolForm" ref="attackPoolForm">
                <el-form-item label="BOX1" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-input v-model="attackPoolForm.box1" placeholder="请输入BOX名称"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入对应伤害值(W)" class="damageInputBox"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="BOX2" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-input v-model="attackPoolForm.box2" placeholder="请输入BOX名称"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入对应伤害值(W)" class="damageInputBox"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="BOX3" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-input v-model="attackPoolForm.box3" placeholder="请输入BOX名称"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入对应伤害值(W)" class="damageInputBox"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="BOX4" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-input v-model="attackPoolForm.box4" placeholder="请输入BOX名称"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入对应伤害值(W)" class="damageInputBox"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item align="center">
                    <el-button @click="saveAttackPool" class="confirm-button">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                :visible.sync="visibleBoxDialog"
                :before-close="closeBoxDialog"
                title="更改默认BOX"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <el-form label-position="left" :model="attackBoxForm" ref="attackBoxForm">
                <el-form-item label="BOX1" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-select v-model="attackBoxForm.box1" placeholder="请选择BOX1">
                                <el-option v-for="item in choiceBox"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <span>伤害</span>
                        </el-col>

                    </el-row>
                </el-form-item>

                <el-form-item label="BOX2" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-select v-model="attackBoxForm.box2" placeholder="请选择BOX2">
                                <el-option v-for="item in choiceBox"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <span>伤害</span>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="BOX3" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-select v-model="attackBoxForm.box3" placeholder="请选择BOX3">
                                <el-option v-for="item in choiceBox"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <span>伤害</span>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item align="center">
                    <el-button @click="saveBoxPool" class="confirm-button">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
	import {userInfo, defaultPool, getPoolAndBox, defaultBox, initAll} from "../api/api";
	import {Event} from "../utils/eventBus";

	export default {
		name: 'Banner',
		data() {
			return {
				userCard: 'none',
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
				// 字符串格式
				attackPool: '',
				attackBox: '',
				visibleBoxDialog: false,
				// box更改选项
				choiceBox: []
			}
		},
		methods: {
			// 获取用户信息 用于banner信息
			async getUserInfo() {
				let currentUrl = document.URL;
				const qqId = currentUrl.split('?')[1].split('=')[1];
				const info = await userInfo({qqId: qqId});
				this.userCard = info[0].card;
			},
			// 显示默认刀池对话框
			showDialog() {
				this.visibleDialog = true;
			},
			// 关闭默认刀池对话框
			closeDialog() {
				this.visibleDialog = false;
			},
			// 显示默认box对话框
			showBoxDialog() {
				this.visibleBoxDialog = true;
			},
			// 关闭默认box对话框
			closeBoxDialog() {
				this.visibleBoxDialog = false;
			},
			// 保存默认刀池->关闭对话框->更新默认刀池信息->重新设置默认box
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
						this.showBoxDialog();
					}
				} catch (e) {
					this.$message({
						type: 'error',
						message: '出大问题！'
					});
					console.log(e)
				}
			},
			// 保存默认box->关闭对话框->更新刀池和box信息
			async saveBoxPool() {
				try {
					const resData = await defaultBox(this.attackBoxForm);
					if (resData.errorCode == 0) {
						this.$message({
							type: 'success',
							message: '保存成功！'
						});
						this.closeBoxDialog();
						this.poolAndBox();
						Event.$emit('refreshUserPool')
					}
				} catch (e) {
					this.$message({
						type: 'error',
						message: '出大问题！'
					});
					console.log(e)
				}
			},
			// 获取刀池和box信息
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
				let choiceBoxCopy = [];
				for (let key in this.attackPoolForm) {
					this.attackPoolForm[key] = attackPoolArr[countPool];
					choiceBoxCopy.push({label: attackPoolArr[countPool], value: attackPoolArr[countPool]});
					countPool++
				}
				this.choiceBox = choiceBoxCopy
			},
			// 初始化所有东西
			async initEverything() {
				try {
					const resData = await initAll();
					if (resData.errorCode == 0) {
						this.$message({
							type: 'success',
							message: '初始化数据成功！'
						});
						// 更新所有数据
						Event.$emit('refreshUserPool');
						this.poolAndBox();
					}
				} catch (e) {
					this.$message({
						type: 'error',
						message: '出大问题！'
					});
					console.log(e);
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

    .damageInputBox{
        margin-left: 30px;
    }
</style>
