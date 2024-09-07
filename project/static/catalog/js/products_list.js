$(document).ready(function() {
    let productIdToDelete = null;

    // Открытие модального окна при нажатии на кнопку удаления
    $('.delete-button').on('click', function() {
        productIdToDelete = $(this).data('id');
        $('#confirmation-modal').fadeIn();
    });

    // Закрытие модального окна
    $('.close-button, #cancel-delete').on('click', function() {
        $('#confirmation-modal').fadeOut();
        productIdToDelete = null;
    });

    // Подтверждение удаления
    $('#confirm-delete').on('click', function() {
        if (productIdToDelete) {
            $.ajax({
                url: `/catalog/${productIdToDelete}/`,
                type: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                success: function(response) {
                    if (response.success) {
                        $(`.delete-button[data-id="${productIdToDelete}"]`).closest('.product-card').fadeOut(400, function() {
                            $(this).remove(); // Удаление карточки из DOM после анимации
                        });
                        productIdToDelete = null;
                        $('#confirmation-modal').fadeOut();
                    } else {
                        alert('Ошибка при удалении продукта.');
                    }
                },
                error: function() {
                    alert('Ошибка при удалении продукта.');
                }
            });
        }
    });

    // Функция для получения CSRF токена
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Фильтрация продуктов по категории
    $('#category-filter').on('change', function() {
        const selectedCategory = $(this).val();
        $('.product-card').each(function() {
            const productCategory = $(this).data('category');
            if (!selectedCategory || selectedCategory == productCategory) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    });

    // Сортировка продуктов
    $('#sort-by').on('change', function() {
        const sortBy = $(this).val();
        const productsGrid = $('.products-grid');
        const products = $('.product-card').get();

        products.sort(function(a, b) {
            const aVal = $(a).find('h2').text().toLowerCase();
            const bVal = $(b).find('h2').text().toLowerCase();
            if (sortBy === 'price') {
                const aPrice = parseFloat($(a).find('.price').text().replace('$', ''));
                const bPrice = parseFloat($(b).find('.price').text().replace('$', ''));
                return aPrice - bPrice;
            } else {
                if (aVal < bVal) return -1;
                if (aVal > bVal) return 1;
                return 0;
            }
        });

        $.each(products, function(idx, product) {
            productsGrid.append(product);
        });
    });

    // Удаление спиннера при полной загрузке страницы
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove(); // Полностью удаляет спиннер после исчезновения
        });
    });
});
