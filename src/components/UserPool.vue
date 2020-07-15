<template>
    <div class="container-full-width">
        <el-card class="card-half">
            <div slot="header" class="clearfix">
                <span><b>说明：</b>当日未出的刀记为<span class="font-red">红色</span></span>
            </div>
            <el-table :data="memberList" :cell-style="cellStyle" v-loading="loading">
                <el-table-column
                        prop="nickname"
                        label="昵称"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="qqId"
                        label="QQ号"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="card"
                        label="游戏ID"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="box1"
                        label="第一刀"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="box2"
                        label="第二刀"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="box3"
                        label="第三刀"
                        sortable
                        align="center">
                </el-table-column>
            </el-table>
        </el-card>
    </div>

</template>

<script>
	import {attackInfo, boxInfo} from "../api/api";

	export default {
		name: "ChopOrder",
		data() {
			return {
				memberList: [],
				attackInfo: [],
				unAttackPair: [],
				loading: true
			}
		},
		methods: {
			async getBoxList() {
				try {
					const userInfo = await boxInfo();
					this.memberList = userInfo;
				} catch (e) {
					console.log('get user info err!');
				}
			},
			cellStyle({row, column, rowIndex, columnIndex}) {
				if (this.unAttackPair.indexOf(rowIndex + '' + columnIndex) !== -1 && row !== null && column !== null) {
					return 'color:red;font-weight:bold'
				} else {
					return ''
				}
			},
			async getAttackInfo() {
				try {
					this.attackInfo = await attackInfo();
					const unAttackPair = [];
					this.attackInfo.forEach((value, index) => {
						if (value['box1status'] == 0) {
							unAttackPair.push(index + '' + 3);
						}
						if (value['box2status'] == 0) {
							unAttackPair.push(index + '' + 4);
						}
						if (value['box3status'] == 0) {
							unAttackPair.push(index + '' + 5);
						}
					});
					this.unAttackPair = unAttackPair;
					this.loading = false;
				} catch (e) {
					console.log('get attack info err!');
				}
			}
		},
		created() {
			this.getBoxList();
			this.getAttackInfo();
		}
	}
</script>

<style scoped>
    .card-half {
        margin-top: 40px;
        width: 90%;
    }

    .clearfix:before, .clearfix:after {
        display: table;
        content: "";
    }

    .font-red {
        font-weight: bold;
        color: red;
    }

</style>
