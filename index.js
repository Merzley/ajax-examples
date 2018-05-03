//1. Самый простой AJAX запрос. PHP возвращает просто строку текста
$('#ajax-simple-text').click(function(){
    $.ajax({
        url: '/simple-text.php' //URL, по которому будет сделан запрос
    }).done(function(dataFromPHP){
        //Сюда мы попадаем, если запрос завершен успешно
        //Все что PHP должен был вывести в браузер при классическом обращении через адресную строку браузера
        //(текст, HTML, всё что угодно), будет прочитано JavaScript-ом и помещено в переменную dataFromPHP.
        //Далее мы можем свободно работать с этими данными.
        //В данном примере PHP выводит просто строку текста. Ничего лучше не придумалось,
        //чем просто показать её alert-ом
        alert(dataFromPHP);
    }).fail(function(){
        //Сюда мы попадаем, если по каким-то причинам запрос прошел не успешно
        alert('Не удалось произвести запрос')
    });
});

//2. Отправляем параметры, которые будут доступны в PHP, и формируем ответ на основании этих параметров
$('#ajax-send-params').click(function(){
    //Читаем данные, которые должны быть переданы в запросе, из инпутов
    var param1 = $('#param-1').val();
    var param2 = $('#param-2').val();

    $.ajax({
        //Обращаю внимание, что URL указан тот же, что и для отправки формы классическим образом
        url: '/with-params.php',
        data: {
            //Сюда помещаются параметры, которые должны быть переданы PHP
            'PARAM_1': param1,
            'PARAM_2': param2
        }
    }).done(function(dataFromPHP){
        //С данными, полученными через AJAX мы можем делать что угодно.
        //В том числе динамически изменять текущую страницу на основании этих данных.
        //Для примера, выведем результат запроса прямо на текущую страницу
        var newBlock = $('<div>');
        newBlock.text(dataFromPHP);

        $('#send-params-block').append(newBlock);
    }).fail(function(){
        alert('Не удалось произвести запрос')
    });
});

// 3. Через AJAX можно получать готовый HTML для добавления на страницу
var htmlNextProductNum = 1;
$('#ajax-get-html').click(function(){
    $.ajax({
        url: '/return_html.php',
        data: {
            'NEXT_PRODUCT_NUM': htmlNextProductNum
        }
    }).done(function(dataFromPHP){
        //Скрипт return_html.php возвращает уже готовый HTML, который можно динамически добавить на страницу.
        //Собственно, именно это и сделаем.
        $('#get-html').append(dataFromPHP);

        //Меняем параметр, который будет передаваться PHP, чтобы в следующий раз получить другие данные
        htmlNextProductNum += 4;
        $('#ajax-get-html').text('Получить ЕЩЁ HTML');
    }).fail(function(){
        alert('Не удалось произвести запрос')
    });
});

// 4. Вместо HTML через AJAX можно получать данные, упакованные в JavaScript (JSON) объект,
// а HTML генерировать уже на месте
var jsonNextProductNum = 1;
$('#ajax-get-json-object').click(function(){
    $.ajax({
        url: '/return_json_object.php',
        data: {
            'NEXT_PRODUCT_NUM': jsonNextProductNum
        },
        dataType: 'json' //параметр, говорящий, что результат надо преобразовать в нативный JavaScript объект
    }).done(function(dataFromPHP){
        //Поскольку указан dataType: 'json', а PHP возвращает JSON строку,
        //полученные данные будут преобразованы из строки в нативный JavaScript объект.
        //Этот объект, как всегда, находится в переменной dataFromPHP.
        //Мы знаем, что PHP возвращает вот такую структуру данных:
        // [{'NAME', 'DESCRIPTION'},{'NAME', 'DESCRIPTION'},...]
        //Поэтому то, что находится в переменной dataFromPHP можно представить, как если бы мы в JavaScript написали
        // var dataFromPHP = [
        //     {'NAME': 'Product 1', 'DESCRIPTION': 'Description 1'},
        //     {'NAME': 'Product 2', 'DESCRIPTION': 'Description 2'},
        //     ...
        // ];
        //На основании этого динамически формируем HTML.

        var jqContainer = $('<div style="clear: both"></div>');

        //обходим полученный из PHP массив, и на каждой итерации создаем HTML для каждого отдельного продукта
        for (var key in dataFromPHP) if (dataFromPHP.hasOwnProperty(key)){
            var currentProduct = dataFromPHP[key];

            var jqProduct = $(
                '<div style="border: 1px solid black; float: left; margin: 0 2px 4px 2px">' +
                    currentProduct.NAME +
                   '<br>' +
                    currentProduct.DESCRIPTION +
                '</div>'
            );

            jqContainer.append(jqProduct);
        }

        $('#get-json-object').append(jqContainer);

        //Меняем параметр, который будет передаваться PHP, чтобы в следующий раз получить другие данные
        jsonNextProductNum += 4;
        $('#ajax-get-json-object').text('Получить ЕЩЁ объекты');
    }).fail(function(){
        alert('Не удалось произвести запрос')
    });
});