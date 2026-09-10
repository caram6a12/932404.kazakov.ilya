var volumes = [70, 80, 90, 100, 110, 75, 105];

// ввод имени и приветствие
var name = prompt('Как вас зовут?');
alert('Привет, ' + name + '!');// всплывающее окно

//поиск максимума
function findMax(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// функция фильтрации
function filterLoud(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > 90) {
            result.push(arr[i]); // push в конец массива
        }
    }
    return result;
}

// функция суммы
function findSum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

var average = findSum(volumes) / volumes.length;//средняя громкость
var loud = filterLoud(volumes);//количество громких
alert('Средняя громкость – ' + average + ' дБ, ' + loud.length + ' треков – громкие');// их вывод

// цикл 
var quiet = [];
for (var i = 0; i < volumes.length; i++) {
    if (volumes[i] <= 75) {
        quiet.push(volumes[i]);
    }
}

console.log('Тихих треков: ' + quiet.length);
console.log('Их средняя громкость: ' + (findSum(quiet) / quiet.length) + ' дБ');

// доп - если максимум 105 дБ
if (findMax(volumes) >= 105) {
    console.log('Такая громкость может повредить слух – используйте наушники с ограничением');
}
