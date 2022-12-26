// DOM items
let santaName = document.querySelector('#santaName'),
    reciverName = document.querySelector('#reciverName'),
    newSantaWrapper = document.querySelector('#newSantaWrapper'),
    newSantaInput = document.querySelector('#newSantaInput'),
    newSantaAdd = document.querySelector('#newSantaAdd'),
    santasList = document.querySelector('#santasList'),
    nextBtn = document.querySelector('#next');

let santas = new Set(),
    recivers = new Array();

function removeSanta(name) {
    santas.delete(name);
    updateSantasList();
}

function addSanta(name) {
    santas.add(name);
    updateSantasList();
}

function updateSantasList() {
    document.querySelectorAll('.santa-unit').forEach((e) => {
        e.remove();
    })
    santas.forEach((e) => {
        santasList.insertAdjacentHTML('beforeend', `<div class="santa-unit"><p>${e}</p><button onclick="removeSanta('${e}')">×</button></div>`);
    })
}

function generateSantasTargets() {
    santas = [...santas].sort((a, b) => 0.5 - Math.random());
    let santaShift = Math.random() * (santas.length - 1) + 1;
    console.log(santaShift);
    
    recivers = [...santas];
    recivers = recivers.splice(-santaShift).concat(recivers);
    console.log(santas, recivers);
    
}


newSantaInput.addEventListener('keydown', (key) => {
    if (newSantaInput.value != '' && key.code == 'Enter') {
        addSanta(newSantaInput.value);
        newSantaInput.value = '';
        newSantaInput.focus();
    }
})

newSantaAdd.onclick = () => {
    if (newSantaInput.value != '') {
        addSanta(newSantaInput.value);
        newSantaInput.value = '';
        newSantaInput.focus();
    }
}

let stadia = 0,
    santaIndex = 0;

nextBtn.onclick = () => {
    if (stadia == 0) {
        if (santas.size > 2) {
            generateSantasTargets();
            stadia = 1;
            newSantaWrapper.remove();
            santasList.remove();
            santaName.innerHTML = 'Секретный список Сант сгенерирован.';
            reciverName.innerHTML = 'Начни, чтобы увидеть первого Санту.';
            nextBtn.innerHTML = 'Начать';
        }
    }
    else if (stadia == 1) {
        stadia = 2;
        santaName.innerHTML = `Сейчас Санта - ${santas[santaIndex]}`;
        santaName.style.color = 'rgb(255, 138, 138)';
        reciverName.innerHTML = 'Никому не подсматривать!';
        reciverName.style.color = 'rgb(255, 255, 255)';
        nextBtn.innerHTML = 'Посмотреть';
        if (santaIndex == santas.length) {
            santaName.innerHTML = 'Вот и всё!';
            reciverName.innerHTML = 'Удачи в поисках подарков.';
            nextBtn.remove();
        }
    }
    else if (stadia == 2) {
        stadia = 1;
        santaName.innerHTML = `Сейчас Санта - ${santas[santaIndex]}`;
        santaName.style.color = 'rgb(255, 255, 255)';
        reciverName.innerHTML = `Ты Санта для ${recivers[santaIndex]}`;
        reciverName.style.color = 'rgb(255, 138, 138)';
        nextBtn.innerHTML = 'Следующий Санта';
        santaIndex++;
    }
}