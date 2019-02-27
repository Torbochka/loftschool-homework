/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();

        req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        req.responseType = 'json';
        req.addEventListener('load', () => {
            if (req.status >= 400) {
                reject(new Error('Не удалось загрузить города'));
            } else {
                resolve(req.response.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
            }
        });

        req.send();
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase())
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить город" */
const errorBlock = homeworkContainer.querySelector('#error-block');
/* Кнопка с надписью "Повторить" */
const retry = homeworkContainer.querySelector('#retry');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let towns = loadTowns()
    .then(
        result => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
        
            return result;
        },
        () => {
            errorBlock.style.display = 'block';
            loadingBlock.style.display = 'none';
        }
    );

retry.addEventListener('click', () => {
    loadTowns()
        .then(
            result => {
                errorBlock.style.display = 'none';
                filterBlock.style.display = 'block';

                return result;
            },
            () => {
                errorBlock.style.display = 'block'; 
            }
        );
});

filterInput.addEventListener('keyup', () => {
    filterResult.innerHTML = '';

    if (filterInput.value) {
        towns.then(t => {
            const fragment = document.createDocumentFragment();

            t.forEach(el => {
                if (isMatching(el.name, filterInput.value)) {
                    const li = document.createElement('li');

                    li.textContent = el.name;
                    fragment.appendChild(li);
                }
            });
            filterResult.appendChild(fragment);
        });
    }

});

export {
    loadTowns,
    isMatching
};
