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
        $html = $('html'),
        $workItems = $('.work-item');

    /**
     * Private Methods
     */
    var _toggleWorkItems = function (scrollTop) {
        console.log('toggle work items');
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
        delay = delay || 50;

        if (delay) {
            if (timeout) {
                clearTimeout(timeout);
            }

            return setTimeout(callback, delay);
        }
    };
    var _bindEvents = function () {
        var timeout;
        $document.on('scroll', function (e) {
            var scrollTop = $document.scrollTop();

            timeout = _debounce(function () {
                _toggleWorkItems(scrollTop);
            }, timeout);
        });
    };
    var _loadWebFonts = function (callback) {
        try {
            WebFont.load({
                'google':   {
                    'families': ['Arvo', 'Titillium Web']
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