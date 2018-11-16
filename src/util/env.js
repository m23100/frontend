
let baseUrl =''
let imgBaseUrl = 'http://image.ruomengtv.com'
let pageSize = 10
let userAvatar ='/web/user/image_0436dbd25ea33d55b094ec7f5e6a515c.png'
if(process.env.NODE_ENV=='development'){
	baseUrl = 'http://dev.ruomengtv.com'
}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://www.ruomengtv.com'
}

export {
	baseUrl,
	imgBaseUrl,
	pageSize,
	userAvatar,
}