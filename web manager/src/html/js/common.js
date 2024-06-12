
(function(win) {
    let lang = {
        render: function (options) {
            let that = this;

            that.config = Object.assign({
                lang: '',
                form: '',
                callback: null
            }, options);

            if (that.config.lang) {
                that.set(that.config.lang);
                return;
            }
            
            let oldLang = localStorage.getItem('lang');
            // console.log('oldLang=', oldLang);
            if (oldLang) {
                that.set(oldLang);
                return;
            }
        
            let lang = jQuery.i18n.browserLang();
            if (lang === 'zh-CN') {
                that.set('zh');
            } else {
                that.set('en');
            }
            // console.log('lang=', jQuery.i18n.browserLang());
                
            // console.log('common.js');
        },
        set: function(lang) {
            console.log('lang=', lang);
            let that = this;
            let config = that.config;
            $('.lang-text').text($('.btn-lang-' + lang).text());
        
            jQuery.i18n.properties({
                name: 'common',
                path: config.form === 'index' ? 'lang/' : config.form === 'table' ? '../../lang/' : '../lang/',
                mode: 'map',
                language: lang,
                callback: function () {
                    that.map = jQuery.i18n.map;
                    config.callback && config.callback();

                    let insertEle = $(".i18n");

                    // console.log('jQuery.i18n=', jQuery.i18n);
        
                    // console.log('lang=', jQuery.i18n.browserLang())
        
                    insertEle.each(function() {
                        // console.log('data-lang=', $(this).attr('data-lang'));
                        let text = jQuery.i18n.prop($(this).attr('data-lang'));
                        // console.log('text=', text);
                        let mark = lang === 'zh' ? '#' : '@';
                
                        $(this).html(text);
                    });
                }
            });
        },
        config: {},
        map: {}
    }

    win.lang = lang;
})(window);