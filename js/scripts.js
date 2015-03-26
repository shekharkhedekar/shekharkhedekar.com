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
    var _toggleWorkItems = function (scrollTop) {
        // Set scrollTop if not passed
        scrollTop = scrollTop || $document.scrollTop();

        var buffer = 100,
            pageBottom = scrollTop + windowHeight - buffer;

        $workItems.each(function (i) {
            var $self = $(this),
                offsetTop = $self.offset().top;

            if (offsetTop < pageBottom && !$self.is('.visible')) {
                $self.addClass('visible');
            } else if (offsetTop >= pageBottom && $self.is('.visible')) {
                $self.removeClass('visible');
            }
        });
    };
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
    var _bindEvents = function () {
        var timeout;
        $document.on('scroll', _onScroll);
        $('.sk-intro-down-arrow').on('click', _scrollToWork);
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
        _loadWebFonts(function () {
            _toggleWorkItems();
            _bindEvents();
        });
    };

    /**
     * DOCUMENT READY
     */
    $(document).ready(_init);
})();