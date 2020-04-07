let wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.append(wrapper);

wrapper.insertAdjacentHTML('afterbegin', '<textarea class="input" autofocus></textarea>');
wrapper.insertAdjacentHTML('beforeend', '<div class="keybord-area"></div>');
wrapper.insertAdjacentHTML('beforeend', '<p class="instruction">Переключение языка ввода виртуальной клавиатуры происходит одновременным нажатием клавиш LeftShift и LeftCtrl на физической клавиатуре. Клавиатура была сделана в системе MacOs.</p>');

let keybordArea = document.querySelector('.keybord-area');
let inputArea = document.querySelector('.input');


// массив английской раскладки символов lowercase 
const englishLowercase = [
    ['§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
    ['&#8677', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']','&#8626'],
    ['&#8682', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\'],
    ['&#8679', '`', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#8679'],
    ['ctrl', 'alt', 'cmd', ' ', 'cmd', 'alt', '&#9666', '&#9662', '&#9662', '&#9656']
];

const englishUppercase = [
    '±', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '&#8592',
    '&#8677', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}','&#8626',
    '&#8682', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|',
    '&#8679', '~', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '&#8679',
    'ctrl', 'alt', 'cmd', ' ', 'cmd', 'alt', '&#9666', '&#9662', '&#9662', '&#9656'
];

const russianLowercase = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592',
    '&#8677', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '&#8626',
    '&#8682', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\',
    '&#8679', ']', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#8679',
    'ctrl', 'alt', 'cmd', ' ', 'cmd', 'alt', '&#9666', '&#9662', '&#9662', '&#9656'
];

const russianUppercase = [
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '&#8592',
    '&#8677', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '&#8626',
    '&#8682', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '/',
    '&#8679', '[', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '&#8679',
    'ctrl', 'alt', 'cmd', ' ', 'cmd', 'alt', '&#9666', '&#9662', '&#9662', '&#9656'
];


// массив кодов физической клавиатуры
const keyCodeList = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
                      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Enter',
                      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash',
                      'ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
                      'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'
];


// перебор элементов массива символов, генерация элементов DOM, перевод englishLowercase в одномерный массив

let englishLowercaseList = [];

for (let j = 0; j < englishLowercase.length; j++){
    let keybordRow = document.createElement('div');
    keybordRow.classList.add('keybord-row')
    keybordArea.append(keybordRow);

    for (let i=0; i < englishLowercase[j].length; i++){
        let key = document.createElement('span');
        key.classList.add('key');
        keybordRow.append(key);
        englishLowercaseList.push(englishLowercase[j][i])
    }

}

// создание коллекции элементов DOM клавиши и объявление функциональных клавиш и присвоение стилей им:

let keys = document.querySelectorAll('span');

// функция заполнения клавиш символами

function fillKeys (symbols){
    for(let i = 0; i < keys.length; i++){
        keys[i].innerHTML = symbols[i];
    }
}

// сохранение раскладки в localStorage

let lang
let languageStorage;
let language = JSON.parse(localStorage.getItem(lang));

if (!language){
    fillKeys(englishLowercaseList)
} else {
    fillKeys(language);
}

let tab = keys[14];
let capsLock = keys[28];
let shiftLeft = keys[41];
let shiftRight = keys[53];
let ctrlLeft = keys[54];
let altLeft = keys[55];
let altRight = keys[59];
let cmdLeft = keys[56];
let cmdRight = keys[58];
let space = keys[57];
let arrLeft = keys[60];
let arrRight = keys[63];
let arrDown = keys[62];
let arrUp = keys[61];
let enter = keys[27];
let backspace = keys[13];

space.classList.add('space');
arrLeft.classList.add('arrow');
arrLeft.classList.add('arrowLeft');
arrLeft.classList.add('functional');
arrRight.classList.add('arrow');
arrRight.classList.add('arrowRight');
arrRight.classList.add('functional');
arrDown.classList.add('arrow');
arrDown.classList.add('arrowDown');
arrDown.classList.add('functional');
arrUp.classList.add('arrow');
arrUp.classList.add('arrowUp');
arrUp.classList.add('functional');
backspace.classList.add('backspace');
backspace.classList.add('functional');
enter.classList.add('enter');
enter.classList.add('functional');
tab.classList.add('tab');
tab.classList.add('functional');
capsLock.classList.add('capsLock');
capsLock.classList.add('functional');
shiftLeft.classList.add('shiftLeft');
shiftLeft.classList.add('functional');
shiftRight.classList.add('shiftRight');
shiftRight.classList.add('functional');
ctrlLeft.classList.add('ctrlLeft');
ctrlLeft.classList.add('functional');
altLeft.classList.add('altLeft');
altLeft.classList.add('functional');
altRight.classList.add('altRight');
altRight.classList.add('functional');
cmdLeft.classList.add('cmdLeft');
cmdLeft.classList.add('functional');
cmdRight.classList.add('cmdRight');
cmdRight.classList.add('functional');


// реализация подсветки виртуальных клавиш при нажатии физических, и переключение раскладки клавиатуры

document.addEventListener('keydown', function(event) {

    for (let i = 0; i < keys.length; i++){

        switch (event.code) {
            case keyCodeList[i]:
                keys[i].classList.add('key-press');
              break;
            }

    }

    if (event.code == 'ShiftLeft' && (event.ctrlKey || event.metaKey)) {

        if(keys[0].innerHTML === '§'){

                localStorage.clear();
                languageStorage = russianLowercase;

                localStorage.setItem(lang, JSON.stringify(languageStorage));
                language = JSON.parse(localStorage.getItem(lang));

                fillKeys(languageStorage);
            
        } else {

                localStorage.clear();
                languageStorage = englishLowercaseList;

                localStorage.setItem(lang, JSON.stringify(languageStorage));
                language = JSON.parse(localStorage.getItem(lang));

                fillKeys(languageStorage);
        }
      }

    if (event.code == 'ShiftLeft' || event.code == 'ShiftRight' || event.code == 'CapsLock'){
        if(keys[0].innerHTML === '§'){
            fillKeys(englishUppercase)
        } else {
            fillKeys(russianUppercase)
        }
    }
});

document.addEventListener('keyup', function(event) {
    for (let i = 0; i < keys.length; i++){

        switch (event.code) {
            case keyCodeList[i]:
                keys[i].classList.remove('key-press');
              break;
            }
    }

    if (event.code == 'ShiftLeft' || event.code == 'ShiftRight' || event.code == 'CapsLock'){
        if(keys[0].innerHTML === '±'){
            fillKeys(englishLowercaseList)
        } else {
            fillKeys(russianLowercase)
        }
    }
});

// реализация ввода символов при нажатии на виртуальную клавиатуру


keybordArea.addEventListener('click', virtualInput);

function virtualInput(event){
    
   

    let cursorPosition = inputArea.selectionStart;
  const cursorPositionEnd = inputArea.selectionEnd;
  const beforeText = inputArea.value.slice(0, cursorPosition);
  const afterText = inputArea.value.slice(cursorPosition);

  console.log(cursorPosition);

    if (event.target.tagName === 'SPAN' && event.target.classList.contains('functional') === false){
        inputArea.value += event.target.innerHTML
        cursorPosition += 1;
    }

    if (event.target.classList.contains('enter')) {
        inputArea.value = `${beforeText}\n${afterText}`;
        cursorPosition += 1;
    }

    if (event.target.classList.contains('tab')) {
        inputArea.value = `${beforeText}\t${afterText}`;
        cursorPosition += 1;
    }

    if (event.target.classList.contains('arrowUp')) {
        inputArea.value = `${beforeText}\u2191${afterText}`;
        cursorPosition += 1;
    }

    if (event.target.classList.contains('arrowDown')) {
        inputArea.value = `${beforeText}\u2193${afterText}`;
        cursorPosition += 1;
    }

    if (event.target.classList.contains('arrowLeft')) {
        inputArea.value = `${beforeText}\u2190${afterText}`;
        cursorPosition += 1;
    }

    if (event.target.classList.contains('arrowRight')) {
        inputArea.value = `${beforeText}\u2192${afterText}`;
        cursorPosition += 1;
    }

    if (event.target.classList.contains('backspace')) {
        if (cursorPositionEnd > cursorPosition) {
            inputArea.value = inputArea.value.slice(0, cursorPosition) + inputArea.value.slice(cursorPositionEnd);
          } else {
            inputArea.value = beforeText.slice(0, -1) + afterText;
            cursorPosition = cursorPosition > 0 ? cursorPosition - 1 : 0;
          }
    }

    inputArea.blur();
    inputArea.focus();
    inputArea.selectionStart = cursorPosition;
    inputArea.selectionEnd = cursorPosition;
}

keybordArea.addEventListener('mousedown', virtualPress);

function virtualPress(event) {

    if (event.target.classList.contains('capsLock')){
        if (event.target.classList.contains('key-press')){
            event.target.classList.remove('key-press')
            if(keys[0].innerHTML === '±'){
                fillKeys(englishLowercaseList)
            } else {
                fillKeys(russianLowercase)
            }
        } else {
            event.target.classList.add('key-press')
            if(keys[0].innerHTML === '§'){
                fillKeys(englishUppercase)
            } else {
                fillKeys(russianUppercase)
            }
        }
    } else
    if (event.target.classList.contains('shiftLeft') || event.target.classList.contains('shiftRight')){
        event.target.classList.add('key-press');
        if(keys[0].innerHTML === '§'){
            fillKeys(englishUppercase)
        } else {
            fillKeys(russianUppercase)
        }
    
    } else

    if (event.target.tagName === 'SPAN'){
        event.target.classList.add('key-press')
    }
}

keybordArea.addEventListener('mouseup', virtualRelease);

function virtualRelease(event) {

    if (event.target.classList.contains('shiftLeft') || event.target.classList.contains('shiftRight')){
        event.target.classList.remove('key-press');
        if(keys[0].innerHTML === '±'){
            fillKeys(englishLowercaseList)
        } else {
            fillKeys(russianLowercase)
        }
    
    } else

    if(event.target.tagName === 'SPAN'){
        if (event.target.classList.contains('capsLock')){
            return
        }
      event.target.classList.remove('key-press')
    }
    
}
