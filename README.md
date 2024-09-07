## Тестовое задание:
Создать страницу для отображения всех доступных продуктов, используя Django и шаблоны.

### Пояснения моей работы:
1) В корневом каталоге шаблонов находится HTML-файл, который использует Django шаблонизатор (templates/catalog/products_list.html). Основные элементы:
**Подключение стилей и скриптов:**
Bootstrap: Подключен для стилизации с помощью CSS-фреймворка.
Пользовательский CSS: Файл products_list.css для дополнительных стилей.
jQuery: Для динамического взаимодействия с элементами на странице.
Пользовательский JS: Файл products_list.js для функциональности.

**Кнопка "Наверх" и прелоадер:**

1) Кнопка "Наверх" для быстрой навигации к верху страницы.
2) Прелоадер отображается до полной загрузки контента.

**Список продуктов:**

1) Используется цикл {% for %} для отображения продуктов.
2) Каждый продукт отображается в виде карточки с изображением, названием, описанием и ценой.
3) Активные продукты: У них есть кнопка "Удалить", которая открывает модальное окно подтверждения удаления.
4) Неактивные продукты: На карточке отображается надпись "Нет в наличии", и кнопка удаления отсутствует.

**Модальное окно:**
Для подтверждения удаления продукта. Содержит кнопки "Да" и "Нет" для подтверждения или отмены действия.

**Фильтрация и сортировка:**
Выпадающий список для выбора критерия сортировки (по названию или цене).


### products_list.css
**Общие стили**
1) body: Устанавливает базовый шрифт, фон и отступы.
2) header, footer: Задает фон, цвет текста и выравнивание для заголовка и подвала.
**Фильтры**
1) .filters: Выравнивание элементов фильтра и стилизация селектов.
**Сетка продуктов**
1) .products-grid: Использует CSS Grid для адаптивного размещения продуктов.
**Карточка продукта**
1) .product-card: Стиль для карточек продуктов с тенями и переходами.
2) .product-card.inactive: Для неактивных продуктов (заблокировано, полупрозрачность).
.status: Стиль для текста "Нет в наличии".
**Сообщение "Нет продуктов"**
*.no-products: Стиль для сообщения при отсутствии продуктов.*
**Модальное окно**
.modal, .modal-content: Стиль для модального окна и его содержимого с эффектом затемнения и кнопками.
**Прелоадер**
#preloader, .spinner: Стиль и анимация прелоадера.
**Адаптивность**
Медиа-запросы для изменения количества колонок в зависимости от ширины экрана.
**Кнопка "Наверх"**
#scroll-top: Стиль для кнопки "Наверх", но без функциональности.

### Описание JavaScript
*Переменная productIdToDelete:*

Хранит ID продукта, который нужно удалить.
Открытие модального окна:

При нажатии на кнопку удаления (.delete-button), устанавливается ID продукта и показывается модальное окно подтверждения (#confirmation-modal).
Закрытие модального окна:

*Модальное окно закрывается при нажатии на кнопку закрытия (.close-button) или кнопку отмены удаления (#cancel-delete).
При закрытии модального окна ID продукта сбрасывается.*
Подтверждение удаления:

При нажатии на кнопку подтверждения удаления (#confirm-delete), отправляется AJAX-запрос на сервер для удаления продукта.
Если запрос успешен, карточка продукта анимированно исчезает из DOM.
Если запрос неудачен, выводится сообщение об ошибке.

*Сортировка продуктов:*

При изменении параметра сортировки (#sort-by), продукты сортируются по цене или названию и обновляются на странице.
Удаление спиннера при полной загрузке страницы:

*При загрузке страницы спиннер (#preloader) исчезает с анимацией и затем полностью удаляется из DOM.*

### Скриншоты работы
![Скриншот](project/main-page-test.png)
**Страница отсортирована по названию:**
![Скриншот 2](project/main-page-sort.png)
**Футер**
![Скриншот 3](project/main-page-footer.png)
**Адаптив:**
![Скриншот адаптив](project/adaptive.png)

