/**
 * Server 类，对 rest 接口进行封装
 * 使用例如：
 * servers.getUser(function () {
 *
 * });
 */

(function (window) {

    var url = {
        user: defines.baseApi + '/restconnect/customer/status'+'?___store='+defines.baseLang,
        login: defines.baseApi + '/restconnect/customer/login'+'?___store='+defines.baseLang,
        logout: defines.baseApi + '/customer/account/logout'+'?___store='+defines.baseLang,
        menus: defines.baseApi + '/restconnect/?cmd=menu'+'&___store='+defines.baseLang,
        products: defines.baseApi + '/restconnect/?cmd=%s&limit=%s&page=%s'+'&___store='+defines.baseLang,
        products_search: defines.baseApi + '/restconnect/search/?q=%s'+'&___store='+defines.baseLang,
        product_detail: defines.baseWeb + '/catalog/product/view/id/%s'+'&___store='+defines.baseLang, //这个是直接详情页面
        product_rest: defines.baseApi + '/restconnect/products/getproductdetail/productid/%s'+'?___store='+defines.baseLang,
        product_img: defines.baseSite + '/api/rest/products/%s/images/'+'?___store='+defines.baseLang,
        product_attr: defines.baseApi + '/restconnect/products/getcustomeattr/productid/%s'+'?___store='+defines.baseLang, //开发中
        product_option: defines.baseApi + '/restconnect/products/getcustomoption/productid/%s'+'?___store='+defines.baseLang,
        cart_add: defines.baseApi + '/restconnect/cart/add/'+'?___store='+defines.baseLang,	//直接post到这个接口就返回参数
        cart_get_qty: defines.baseApi + '/restconnect/cart/getQty'+'?___store='+defines.baseLang,	//直接post到这个接口就返回参数
    };

    window.servers = {};

    servers.getUser = function (callback) {
        $.getJSON(url.user).done(callback).fail(error);
    };

    servers.login = function (username, password, callback) {
        $.getJSON(url.login, {
            username: username,
            password: password
        }, callback).fail(function () {
            alert('Please check the Username or Password!');
        });		
    };

    servers.logout = function (callback) {
        $.get(url.logout, callback).fail(error);
    };

    servers.getMenus = function (callback) {
        $.getJSON(url.menus, callback).fail(error);
    };

    servers.getProducts = function (page, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.products, page.cmd, defines.productsLimit, page.num),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductsSearch = function (q, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.products_search, q),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
		
    };

    servers.getProductDetail = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_detail, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
		console.write('response log');
		console.log(response);
    };

    servers.getProductRest = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_rest, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductImg = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_img, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductAttr = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_attr, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductOption = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_option, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };
	
    servers.cartAdd = function (para, callback) {	
		$.ajax({
			type: 'POST',
			url: sprintf(url.cart_add),
			data: para,
			dataType: 'json',
			success: callback,
			error: error
		});
	};
	
    servers.cartGetQty = function (callback) {	
		$.ajax({
			type: 'get',
			url: sprintf(url.cart_get_qty),
			dataType: 'json',
			success: callback,
			error: error
		});
	};

    // 统一处理 API 请求错误
    function error(err) {
        console.log(err);
    }
})(window);