<template>
    <div>
        <span class="user">欢迎，{{ userCard }}</span>
    </div>
</template>

<script>
    import {userInfo} from "@/api/api";
	export default {
		name: 'Banner',
		data() {
			return {
				userCard: 'none'
			}
		},
		methods: {
			async getUserInfo(){
				let currentUrl = document.URL;
				const qqId = currentUrl.split('?')[1].split('=')[1];
				const info = await userInfo({qqId:qqId});
				this.userCard = info[0].card;
            }
        },
        created() {
			this.getUserInfo();
		}
	}
</script>

<style scoped>
    .user{
        font-weight: bold;
        font-size: 20px;
        display: block;
        margin-left: 30px;
    }
</style>
