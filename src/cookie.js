/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let isMatch = (full, chunk) => {
    return full.includes(chunk)
};

let isMatchChunks = (fn, chunk, ...arg) => {
    return [...arg].some(full => fn(full, chunk));
};

let getCookies = () => {
    let c = document.cookie;

    return c ? c.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {}) : {};
};

let createRow = (name, value) => {
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    let cell2 = document.createElement('td');
    let cell3 = document.createElement('td');
    let button = document.createElement('button');

    button.innerHTML = 'Удалить';
    button.setAttribute('name', 'delete');
    cell1.innerHTML = name;
    cell2.innerHTML = value;
    cell3.appendChild(button);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    return row;
};

filterNameInput.addEventListener('keyup', e => {
    listTable.innerHTML = '';
    let fragment = document.createDocumentFragment();

    Object.entries(getCookies()).forEach(([k, v]) => {
        if (isMatchChunks(isMatch, e.target.value, k, v)) {
            fragment.appendChild(createRow(k, v));
        }
    });

    listTable.appendChild(fragment);
});

document.addEventListener('DOMContentLoaded', () => {
    listTable.innerHTML = '';
    let fragment = document.createDocumentFragment();

    Object.entries(getCookies()).forEach(([k, v]) => {
        fragment.appendChild(createRow(k, v));
    });

    listTable.appendChild(fragment);
});

document.addEventListener('click', (e) => {
    let [name, value] = [addNameInput.value, addValueInput.value];
    let cookies = getCookies();

    if (e.target.name === 'delete') {
        let lastCookie = e.target.closest('tr').cells[0].innerHTML;

        e.target.closest('tr').remove();
        document.cookie = `${lastCookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        return;
    }

    if (e.target.id === addButton.id) {
        if (filterNameInput.value) {
            if (cookies.hasOwnProperty(name) && !isMatch(value, filterNameInput.value)) {
                document.cookie = `${name}=${value}`;
                for (const row of listTable.children) {
                    if (row.cells[0].innerHTML === name) {
                        row.remove();
                    }
                }
            } else if (isMatchChunks(isMatch, filterNameInput.value, name, value)) {
                document.cookie = `${name}=${value}`;
                listTable.appendChild(createRow(name, value));
            } else {
                document.cookie = `${name}=${value}`;
            }
        } else {
            if (cookies.hasOwnProperty(name)) {
                for (const row of listTable.children) {
                    if (row.cells[0].innerHTML === name) {
                        row.cells[1].innerHTML = value;
                    }
                }
            } else {
                document.cookie = `${name}=${value}`;
                listTable.appendChild(createRow(name, value));
            }
        }
    }
});
