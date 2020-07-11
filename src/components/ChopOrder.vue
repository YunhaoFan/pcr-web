<template>
    <div class="chop-info">
        <span class="discription">说明：当日未出的刀记为<span class="font-red">红色</span></span>
        <el-table :data="memberList" class="info-table" :cell-style="cellStyle">
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
    </div>

</template>

<script>
	import {boxInfo} from "../api/api";

	export default {
		name: "ChopOrder",
		data() {
			return {
				memberList: []
			}
		},
		methods: {
			async getBoxList(){
				try {
					const userInfo = await boxInfo();
					this.memberList = userInfo;
				} catch (e) {
                    console.log('get user info err!');
				}
			},
            cellStyle({ row, column, rowIndex, columnIndex }){
				if (columnIndex==3||columnIndex==4||columnIndex==5
                    &&row!==null&&column!==null&&rowIndex!==null){
					return 'color:red;font-weight:bold'
                } else {
					return ''
                }
            }
		},
        created(){
			this.getBoxList();
        }
	}
</script>

<style scoped>
    .chop-info{
        margin-top: 40px;
    }
    .font-red{
        font-weight: bold;
        color: red;
    }
    .discription{
        display: block;
        margin-left: 30px;
    }
    .info-table{
        width: 50%;
    }
</style>
