
$(function() {
    console.log('Extends $form...')
    $.fn.extend({
        showFormError: function (err) {
            return this.each(function() {
                var $form = $(this)
                var $alert = $form && $form.find('.uk-alert-danger')
                fileName = err && err.data
                if (!$form.is('form')) {
                    console.error('Cannot call showFormError() on non-form object.')
                    return
                }
                $form.find('input').removeClass('uk-form-danger');
                $form.find('select').removeClass('uk-form-danger');
                $form.find('textarea').removeClass('uk-form-danger');
                if ($alert.length === 0) {
                    console.warn('Cannot find .uk-alert-danger element.');
                    return;
                }
                if (err) {
                    $alert.text(err.message ? err.message : (err.error ? err.error : err)).removeClass('uk-hidden').show();
                    if (($alert.offset().top - 60) < $(window).scrollTop()) {
                        $('html,body').animate({ scrollTop: $alert.offset().top - 60 });
                    }
                    if (fieldName) {
                        $form.find('[name=' + fieldName + ']').addClass('uk-form-danger');
                    }
                }
                else {
                    $alert.addClass('uk-hidden').hide();
                    $form.find('.uk-form-danger').removeClass('uk-form-danger');
                }
            })
        },
        postJSON: function(url, data, callback) {
            if (arguments.length === 2) {
                callback = data;
                data = {}
            }
            // 不用each应该也是可以的
            // return this.each(function() {
            //     var $form = $(this)
            //     // $form.showFormError()
            //     $form.showFormLoading(true)
            //     _httpJSON('POST', url, data, function (err, r) {
            //         if (err) {
            //             $form.showFormError(err)
            //             $form.showFormLoading(false)
            //         }
            //         callback && callback(err, r)
            //     })
            // })

            var $form = $(this)
            // $form.showFormError()
            $form.showFormLoading(true)
            _httpJSON('POST', url, data, function (err, r) {
                if (err) {
                    $form.showFormError(err)
                    $form.showFormLoading(false)
                }
                callback && callback(err, r)
            })
        },
        showFormLoading: function (isLoading) {
            return this.each(function () {
                var $form = $(this)
                var $submit = $form && $form.find('button[type=submit]')
                var $buttons = $form && $form.find('button')
                var $i = $submit && $submit.find('i')
                var iconClass = $i && $i.attr('class')
                if (! $form.is('form')) {
                    console.error('Cannot call showFormLoading() on non-form object.')
                    return
                }
                if (! iconClass || iconClass.indexOf('uk-icon') < 0) {
                    console.warn('Icon <i class="uk-icon-*" not found.')
                    return
                }
                if (isLoading) {
                    $buttons.attr('disabled', 'disabled')
                    $i && $i.addClass('uk-icon-spinner').addClass('uk-icon-spin')
                } else {
                    $buttons.removeAttr('disabled')
                    $i && $i.removeClass('uk-icon-spinner').removeClass('uk-icon-spin')
                }
            })
        }
    })
})

// ajax submit form:
function _httpJSON (method, url, data, callback) {
    var opt = {
        type: method,
        dataType: 'json'
    }
    if (method === 'GET') {
        opt.url = url + '?' + data
    }
    if (method ===  'POST') {
        opt.url = url
        opt.data = JSON.stringify(data || {})
        // opt.contentType = 'application/json'
        opt.contentType = 'application/json; charset=utf-8'
    }
    $.ajax(opt).done(function (r) {
        if (r && r.error) {
            return callback(r)
        }
        return callback(null, r)
    }).fail(function (jqXHR, textStatus) {
        return callback({'error': 'http_bad_response', 'data': '' + jqXHR.status, 'message': '网络好想出问题了(http' + jqXHR.status + ')'})
    })
}

function getJSON(url, data, callback) {
    if (arguments.length === 2) {
        callback = data
        data = {}
    }
    if (typeof(data) === 'object') {
        var arr = []
        $.each(data, function (k, v) {
            arr.push(k + '=' + encodeURIComponent(v))
        })
        data = arr.join('&')
    }
    _httpJSON('GET', url, data, callback)
}

function postJSON (url, data, callback) {
    if (arguments.length === 2) {
        callback = data
        data = {}
    }
    _httpJSON('POST', url, data, callback)
}

function _display_error ($obj, err) {
    if ($obj.is(':visible')) {
        $obj.hide()
    }
    var msg = err.message || String(err)
    var L = ['div class="uk-alert uk-alert-danger']
    L.push('<p>Error: ')
    L.push(msg)
    L.push('</p><p>Code: ')
    L.push(err.error || '500')
    L.push('</p></div>')
    $obj.html(L.join('')).slideDown()
}

function fatal (err) {
    _display_error($('#loading'), err)
}

// extends Vue
if (typeof(Vue) !== 'undefined') {
    Vue.filter('datetime', function (value) {
        var d = value
        if (typeof(value) === 'number') {
            d = new Date(value)
        }
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getHours() + '-' + d.getMinutes()
    })
}

if (!Number.prototype.toDateTime) {
    var replaces = {
        'yyyy': function (dt) {
            return dt.getFullYear().toString()
        },
        'yy': function (dt) {
            return (dt.getFullYear() % 100).toString()
        },
        'MM': function (dt) {
            var m = dt.getMonth() + 1
            return m < 10 ? '0' + m : m.toString()
        },
        'M': function (dt) {
            var m = dt.getMonth() + 1
            return m.toString()
        },
        'dd': function (dt) {
            var d = dt.getDate()
            return d.toString()
        },
        'd': function (dt) {
            var d = dt.getDate()
            return d.toString()
        },
        'hh': function (dt) {
            var h = dt.getHours()
            return h < 10 ? '0' + h : h.toString()
        },
        'h': function (dt) {
            var h = dt.getHours()
            return h.toString()
        },
        'mm': function (dt) {
            var m = dt.getMinutes()
            return m < 10 ? '0' + m : m.toString()
        },
        'm': function (dt) {
            var m = dt.getMinutes()
            return m.toString()
        },
        'ss': function (dt) {
            var s = dt.getSeconds()
            return s < 10 ? '0' + s : s.toString()
        },
        's': function (dt) {
            var s = dt.getSeconds()
            return s < 10 ? '0' + s : s.toString()
        },
        'a': function (dt) {
            var h = dt.getHours()
            return h < 12 ? 'AM': 'PM'
        }
    }
    var token = /([a-zA-Z]+)/
    Number.prototype.toDateTime = function (format) {
        var fmt = format || 'yyyy-MM-dd hh:mm:ss'
        var dt = new Date(this * 1000)
        var arr = fmt.split(token)
        for (var i = 0; i < arr.length; i ++) {
            var s = arr[i]
            if (s && s in replaces) {
                arr[i] = replaces[s](dt)
            }
        }
        return arr.join('')
    }
}

function parseQueryString () {
    var 
        q = location.search,
        r = {},
        i, pos, s, qs;
    if (q && q.charAt(0) === '?') {
        qs = q.substring(1).split('&')
        for (i = 0; i < qs.length; i ++) {
            s = qs[i]
            pos = s.indexOf('=')
            if (pos <= 0) {
                continue
            }
            r[s.substring(0, pos)] = decodeURIComponent(s.substring(pos + 1)).replace(/\+/g, ' ')
        }
    }
    return r
}

function gotoPage(i) {
    var r = parseQueryString()
    r.page = i
    location.assign('?' + $.param(r))
}

function refresh () {
    var
        t = new Date().getTime(),
        url = location.pathname;
    if (location.search) {
        url = url + location.search + '&t=' + t
    } else {
        url = url + '?t=' + t
    }
    location.assign(url)
}