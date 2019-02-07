/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let cloned = [];

    for (let i = 0; i < array.length; i++) {
        cloned.push(fn(array[i], i, array));
    }

    return cloned;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {

    let cloned=array,
        res;

    if (initial !== undefined) {
        res=initial;
        for (let i = 0; i < cloned.length; i++) {
            res=fn(res, cloned[i], i, cloned);
        }
    } else {
        res=cloned[0];
        for (let i = 1; i < cloned.length; i++) {
            res=fn(res, cloned[i], i, cloned);
        }
    }

    return res;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    let keysObj = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            keysObj.push(key.toUpperCase());
        }
    }

    return keysObj;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {

    let len =array.length,
        cloned = [],
        begin,
        end;

    if (from === undefined && to === undefined) {
        return array;
    }

    if (to === undefined || to > len) {
        end = len;
    } else {
        end = to < 0 ? (len + to) : to;
    }

    if (from > len) {
        return cloned;
    }

    if (len+from<0) {
        begin = 0;
    } else {
        begin = from < 0 ? (len + from) : from;
    }

    for (let i = begin; i < end; i++) {
        cloned.push(array[i]);
    }

    return cloned;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value*value;
            
            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
