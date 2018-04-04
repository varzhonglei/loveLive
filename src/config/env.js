/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * 
 */

let baseUrl = 'http://localhost:3000/'; 

// let baseUrl = 'http://179357c9y4.iok.la:27823/';

// if (process.env.NODE_ENV == 'development') {
//     baseUrl = 'http://localhost:8000/';

// }else if ( process.env.NODE_ENV == 'production' ){
//     baseUrl = 'http://localhost:3000/';
// }

export { 
	baseUrl 
}