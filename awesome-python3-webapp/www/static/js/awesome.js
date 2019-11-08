
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
        }
    })
})