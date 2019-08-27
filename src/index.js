/*
 Задание 1:

    Объясните, для чего предназначена и каким образом работает следующая функция:
 */
function bind(method, context) {

    var args = Array.prototype.slice.call(arguments, 2);
    
    return function() {
        var a = args.concat(Array.prototype.slice.call(arguments, 0));

        return method.apply(context, a);
    }
}

/*
 Задание 2:

    Напишите код функции reversePrint(), которая выведет значения переданного
    ей односвязного списка в обратном порядке (4, 3, 2, 1).
    Для вывода значений используйте функцию console.log().
    Можете предложить больше одного варианта реализации,
    в таком случае сравните и опишите плюсы и минусы каждого варианта.

    var someList = {
        value: 2,
        next: {
            value: 1,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

    reversePrint(someList);

 */

function reversePrint(list) {

    if (list.next) {
        reversePrint(list.next);
    }

    return list.value;
}

export {
    bind,
    reversePrint
}

