<template>
    <div id="app">
        <el-container>
            <el-header>
                <Banner/>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="16" align="center">
                        <UserPool/>
                    </el-col>
                    <el-col :span="8" align="center">
                        <AttackPool/>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer class="footer flex-col-center flex-row-center">
                <a href="https://github.com/YunhaoFan">@Fumino</a>
            </el-footer>
        </el-container>

    </div>
</template>

<script>
	import Banner from './components/Banner.vue'
	import UserPool from "./components/UserPool";
	import AttackPool from "./components/AttackPool";

	export default {
		name: 'App',
		components: {
			AttackPool,
			UserPool,
			Banner
		}
	}
</script>

<style>
    @import "assets/css/init.css";
    @import "assets/css/global.css";

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
