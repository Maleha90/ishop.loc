$(function() {
    CKEDITOR.replace('editor1');

})

$('.delete').click(function() {
    var res = confirm('Подтвердите действие');
    if (!res) return false;
})

$('.nav-item a').each(function() {
    let location = window.location.protocol + '//' + window.location.host + window.location.pathname;
    let link = this.href;
    if (link == location) {
        $(this).parent().addClass('active');
        $(this).closest('.treeview').addClass('active');
    }
});
// Сброс фильтров кнопки
$('#reset-filter').click(function() {
    $('#filter input[type=radio]').prop('checked', false);
    return false;
})

// Select2

$(document).ready(function() {
    $(".select2").select2({
        placeholder: "Начните вводить наименование товара",
        //minimumInputLength: 2
        cache: true,
        ajax: {
            url: adminpath + "/product/related-product",
            delay: 250,
            dataType: 'json',
            data: function(params) {
                return {
                    q: params.term,
                    page: params.page
                };
            },
            processResults: function(data, params) {
                return {
                    results: data.items,
                };
            },
        },
    });
})

//Загрузка картинок на сервер.
if ($('div').is('#single')) {
    var buttonSingle = $("#single"),
        buttonMulti = $("#multi"),
        file;
}

if (buttonSingle) {
    new AjaxUpload(buttonSingle, {
        action: adminpath + buttonSingle.data('url') + "?upload=1",
        data: { name: buttonSingle.data('name') },
        name: buttonSingle.data('name'),
        onSubmit: function(file, ext) {
            if (!(ext && /^(jpg|png|jpeg|gif)$/i.test(ext))) {
                alert('Ошибка! Разрешены только картинки');
                return false;
            }
            buttonSingle.closest('.file-upload').find('.overlay').css({ 'display': 'block' });

        },
        onComplete: function(file, response) {
            setTimeout(function() {
                buttonSingle.closest('.file-upload').find('.overlay').css({ 'display': 'none' });

                response = JSON.parse(response);
                $('.' + buttonSingle.data('name')).html('<img src="/images/' + response.file + '" style="max-height: 150px;">');
            }, 1000);
        }
    });
}

if (buttonMulti) {
    new AjaxUpload(buttonMulti, {
        action: adminpath + buttonMulti.data('url') + "?upload=1",
        data: { name: buttonMulti.data('name') },
        name: buttonMulti.data('name'),
        onSubmit: function(file, ext) {
            if (!(ext && /^(jpg|png|jpeg|gif)$/i.test(ext))) {
                alert('Ошибка! Разрешены только картинки');
                return false;
            }
            buttonMulti.closest('.file-upload').find('.overlay').css({ 'display': 'block' });

        },
        onComplete: function(file, response) {
            setTimeout(function() {
                buttonMulti.closest('.file-upload').find('.overlay').css({ 'display': 'none' });

                response = JSON.parse(response);
                $('.' + buttonMulti.data('name')).append('<img src="/images/' + response.file + '" style="max-height: 150px;">');
            }, 1000);
        }
    });
}

//Удаление картинок галлереи
$('.del-item').on('click', function() {
    var res = confirm('Подтвердите действие');
    if (!res) return false;
    var $this = $(this),
        id = $this.data('id'),
        src = $this.data('src');
    $.ajax({
        url: adminpath + '/product/delete-gallery',
        data: { id: id, src: src },
        type: 'POST',
        beforeSend: function() {
            $this.closest('.file-upload').find('.overlay').css({ 'display': 'block' });
        },
        success: function(res) {
            setTimeout(function() {
                $this.closest('.file-upload').find('.overlay').css({ 'display': 'none' });
                if (res == 1) {
                    $this.fadeOut();
                }
            }, 1000);
        },
        error: function() {
            setTimeout(function() {
                $this.closest('.file-upload').find('.overlay').css({ 'display': 'none' });
                alert('Ошибка');
            }, 1000);
        }
    });
});

$('#add').on('submit', function() {
    if (!isNumeric($('#category_id').val())) {
        alert('Выберите категорию');
        return false;
    }
});

function isNumeric(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
}