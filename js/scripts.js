/**
 * shekharkhedekar.com
 * est. 8/25/14
 */

(function () {
    /**
     * Private Variables
     */
    var $document = $(document),
        $window = $(window),
        windowHeight = $window.height(),
        $htmlBody = $('html, body'),
        $workItems = $('.work-item');

    /**
     * Private Methods
     */
    var _debounce = function (callback, timeout, delay) {
        delay = delay || 20;

        if (delay) {
            if (timeout) {
                clearTimeout(timeout);
            }

            return setTimeout(callback, delay);
        }
    };
    var _onScroll = function (e) {
        var scrollTop = $document.scrollTop();

        // TODO
    };
    var _scrollToWork = function (e) {
        $htmlBody.animate({
            scrollTop: $window.height()
        }, 218, 'linear');
    };
    var _expandSection = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $target = $(e.target);
        var $expander = $target.closest('.sk-expander');

        $expander.find('.sk-expander-content').toggleClass('expanded');
        $expander.find('.sk-expander-title').toggleClass('sk-square-minus');
    };
    var _bindEvents = function () {
        $document.on('scroll', _onScroll);
        $(document).on('click', '.sk-intro-down-arrow', _scrollToWork);
        $(document).on('click', '.sk-expander-title', _expandSection);
    };
    var _setIntroBG = function () {
        var rand = 1 + Math.round(Math.random() * 9);

        $('#sk-intro').css('background-image', 'url(css/img/' + rand + '.jpg)');
    };
    var _loadWebFonts = function (callback) {
        try {
            WebFont.load({
                'google':   {
                    'families': ['Arvo', 'Source Sans Pro']
                },
                'active':   callback,
                'inactive': callback
            });
        } catch (e) {
            // Could not load web font library - simulate by adding class to HTML
            console.error('Error loading web fonts.');
            //$html.addClass('wf-active');
            typeof callback === 'function' && callback.call();
        }
    };
    var _init = function () {
        _setIntroBG();
        _bindEvents();
        _loadWebFonts(function () {});
    };

    /**
     * DOCUMENT READY
     */
    $(document).ready(_init);
})();