//сохранение треков в localStorage
function saveState() {
    var tracks = [];
    var items = playlistList.querySelectorAll('li');  //все треки списка
    for (var i = 0; i < items.length; i++) {
        var title = items[i].querySelector('.track-title');
        var time = items[i].querySelector('.track-time');
        var fav = items[i].querySelector('.track-fav');
        tracks.push({
            title: title ? title.textContent : '',
            time: time ? time.textContent : '',
            fav: fav ? fav.checked : false
        });
    }
    try {
        localStorage.setItem('tracks', JSON.stringify(tracks));
    } catch (e) {
        console.log('Ошибка сохранения: ' + e.message);
    }
}

//создание li трека 
function createTrack(title, time, fav) {
    var li = document.createElement('li');

    var spanTitle = document.createElement('span'); 
    spanTitle.className = 'track-title';
    spanTitle.textContent = title;

    var spanTime = document.createElement('span'); 
    spanTime.className = 'track-time';
    spanTime.textContent = ' - ' + time;

    var favBox = document.createElement('input'); 
    favBox.type = 'checkbox';
    favBox.className = 'track-fav';
    favBox.checked = fav === true;
    favBox.title = 'Избранное';
    favBox.addEventListener('change', saveState);

    var delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.className = 'track-delete';
    delBtn.addEventListener('click', function () {
        li.remove();
        saveState();
    });

    li.appendChild(spanTitle);
    li.appendChild(spanTime);
    li.appendChild(favBox);
    li.appendChild(delBtn);
    return li;
}

//добавление трека
function addTrack() {
    var input = document.getElementById('track-name');
    var timeInput = document.getElementById('track-time');
    if (!input || !timeInput) { 
        console.log('Поля ввода не найдены');
        return;
    }
    var title = input.value.trim();
    var time = timeInput.value.trim();
    if (title === '') {
        alert('Введите название трека');
        return;
    }
    if (time === '') {
        time = '3:00';
    }
    var li = createTrack(title, time, false);
    playlistList.appendChild(li);//добавление в DOM
    input.value = '';
    timeInput.value = '';
    saveState();
}

//очистить весь плейлист
function clearAll() {
    var items = playlistList.querySelectorAll('li');
    for (var i = items.length - 1; i >= 0; i--) {
        items[i].remove();
    }
    saveState();
}

//скрыть/показать плейлист
function togglePlaylist() {
    var list = document.getElementById('playlist-list');
    var nameInput = document.getElementById('track-name');
    var timeInput = document.getElementById('track-time');
    if (!list || !nameInput || !timeInput) {
        return;
    }
    list.classList.toggle('hidden');
    nameInput.classList.toggle('hidden');
    timeInput.classList.toggle('hidden');
}

//переключить тему
function toggleTheme() {
    var body = document.body;
    body.classList.toggle('light-theme');
    try {
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
    } catch (e) {
        console.log('Ошибка сохранения темы: ' + e.message);
    }
}

//восстановить состояние при загрузке
function restoreState() {
    var list = document.getElementById('playlist-list');
    var nameInput = document.getElementById('track-name');
    var timeInput = document.getElementById('track-time');
    if (!list || !nameInput || !timeInput) {
        console.log('Плейлист не найден - восстановление пропущено');
        return;
    }
    try {
        var raw = localStorage.getItem('tracks');
        if (raw) {
            var tracks = JSON.parse(raw);
            for (var i = 0; i < tracks.length; i++) {
                list.appendChild(createTrack(tracks[i].title, (tracks[i].time || '').replace(/^ - /, ''), tracks[i].fav));
            }
        }
        var theme = localStorage.getItem('theme');
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        }
        if (localStorage.getItem('playlistHidden') === '1') {
            list.classList.add('hidden');
            nameInput.classList.add('hidden');
            timeInput.classList.add('hidden');

            var hideBtn = document.getElementById('hide-playlist');
            if (hideBtn) {
                hideBtn.textContent = 'Показать плейлист';
            }
        }
    } catch (e) {
        console.log('Ошибка восстановления: ' + e.message);
    }
}

var playlistList = document.getElementById('playlist-list');    
var addBtn = document.getElementById('add-track');                  
var clearBtn = document.getElementById('clear-tracks');          
var hideBtn = document.getElementById('hide-playlist');       
var themeBtn = document.getElementById('toggle-theme');

if (addBtn) {
    addBtn.addEventListener('click', addTrack);
} else {
    console.log('Кнопка добавить не найдена');
}
if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
} else {
    console.log('Кнопка очистить не найдена');
}
if (hideBtn) {
    hideBtn.addEventListener('click', function () {
        togglePlaylist();
        try {
            var list = document.getElementById('playlist-list');
            localStorage.setItem('playlistHidden', list.classList.contains('hidden') ? '1' : '0');
        } catch (e) { }
        hideBtn.textContent = list.classList.contains('hidden') ? 'Показать плейлист' : 'Скрыть плейлист';
    });
}
if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
} else {
    console.log('Кнопка темы не найдена');
}

restoreState();
