/**
 * 常用工具方法
 */

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
};

let sessionStoragedata = {};
/**
 * 存储sessionStorage
 */
export const setSessionStorage = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
    }
    if(sessionStorage){
        sessionStorage.setItem(name, content);
    }else{
        sessionStoragedata[name]=content;
    }

}

/**
 * 获取sessionStorage
 */
export const getSessionStorage = name => {
	if (!name) return;
    if(sessionStorage){
        return  sessionStorage.getItem(name);
    }else{
        return  sessionStoragedata[name];
    }
};

/**
 * 删除sessionStorage
 */
export const removeSessionStorage = name => {
    if (!name) return;
    if(sessionStorage){
        sessionStorage.removeItem(name);
    }else{
        delete  sessionStoragedata[name];
    }
};

/**
 * 判断是对象否为空
 * @param object
 * @returns {boolean}
 */
export const isEmptyObject = object =>{
    if(object==null){
        return true;
    }
    if(JSON.stringify(object)=='{}'){
        return  true;
    }
    if(JSON.stringify(object)=='"{}"'){
        return  true;
    }
    return false;
};

/**
 * date对象格式化
 * 调用：
 const time1 = new Date().Format("yyyy-MM-dd");
 const time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

