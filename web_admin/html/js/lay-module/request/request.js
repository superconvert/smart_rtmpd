/**
 * date: 2021/05/29
 * author: Tom tang
 * version: 1.0
 * description: 请求封装支持 post get put
 */
layui.define(["jquery"], function(exports) {
    var $ = layui.jquery,
        baseUrl = sessionStorage.getItem('baseUrl'); // 服务器基地址

    var request = {

        /**
         * 初始化
         */
        init: function() {
            $.ajaxSetup({
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token') // 全局设置ajax token
                }
            });
            // sessionStorage.setItem('baseUrl', baseUrl); // 全局缓存服务器基地址
        },

        /**
         * post
         * @param options
         */
        post: function(options) {
            var config = Object.assign({
                url: '',
                contentType: 'application/json',
                dataType: 'json',
                data: {},
                cache: true,
                processData: false,
                async: true,
                type: 'post',
                success: function(res) {},
                error: function() {}
            }, options, {
                data: JSON.stringify(options.data),
                url: baseUrl + options.url
            });

            $.ajax(config);
        },

        /**
         * get
         * @param options
         */
        get: function(options) {
            var config = Object.assign({
                url: '',
                contentType: 'application/json',
                dataType: 'json',
                data: {},
                cache: true,
                processData: false,
                async: true,
                type: 'get',
                success: function(res) {},
                error: function() {}
            }, options, {
                data: JSON.stringify(options.data),
                url: baseUrl + options.url
            });

            $.ajax(config);
        },

        /**
         * put
         * @param options
         */
        put: function(options) {
            var config = Object.assign({
                url: '',
                contentType: 'application/json',
                dataType: 'json',
                data: {},
                cache: true,
                processData: false,
                async: true,
                type: 'put',
                success: function(res) {},
                error: function() {}
            }, options, {
                data: JSON.stringify(options.data),
                url: baseUrl + options.url
            });

            $.ajax(config);
        },

        /**
         * upload
         * @param options
         */
         upload: function(options) {
            var config = Object.assign({
                url: '',
                dataType: 'json',
                data: {},
                cache: false,
                processData: false,
                contentType: false,
                async: true,
                type: 'post',
                success: function(res) {},
                error: function() {}
            }, options, {
                url: baseUrl + options.url
            });

            $.ajax(config);
        },

    };

    request.init(); // 初始化

    exports("request", request);
});