const ul = document.querySelector('.list__actions')
const form = document.querySelector('.form__authorization')
const add = document.querySelector('.list__submit')
const input = document.querySelector('.list__input')
const deleteAll = document.querySelector('.delete__all')
const cross = document.querySelectorAll('.cross')
const checkbox = document.querySelector('.checkbox')
const deleteComleted = document.querySelector('.delete__completed')
const panel = document.querySelector('.delete__panel')
const pencil = document.querySelector('.pencil')
let arrLS = JSON.parse(window.localStorage.getItem('Todo')) ?? []




// Отрисовка списка
function render(arr){
    ul.innerHTML =''
    if ( arr.length > 0) {
        arr.forEach(el => {
            const li = document.createElement('li')
            li.className = 'task__description'
            li.innerHTML = `
                <input type="checkbox" class="checkbox" ${(el.condition == true) ? 'checked' : ''} id="${el.id}">
                <p class="task">${el.task}</p>
                <div class="editing">
                <input type="image" src="./img/✏️.png" class="pencil">
                <input type="image" src="./img/🗑.png" class="cross">
                </div>
            `
            ul.append(li)
            form.classList.add('form__authorizationActive')
            panel.classList.remove('display__none')
            ul.classList.remove('display__none')
        });
    } else {
        panel.classList.add(`display__none`)
        ul.classList.add('display__none')
        form.classList.remove('form__authorizationActive')   
    }
    }


// Инпут
form.addEventListener('submit', ((evt) => {
    evt.preventDefault()
    const value = input.value
    if (value.trim() != '') {
        const id = Date.now()
        const obj = {'task': value, 'condition' : false, 'id' : id}
        arrLS.push(obj)
        window.localStorage.setItem('Todo', JSON.stringify(arrLS))
        input.value = ''
        render(arrLS)
    }
}))

render(arrLS)

function deleteAllHandler(){
    window.localStorage.clear()
    arrLS = []
    ul.innerHTML =''
    render(arrLS)
}


function deleteComletedHandler(){
    arrLS = arrLS.filter(el => el.condition != true)
    window.localStorage.setItem('Todo', JSON.stringify(arrLS))
    render(arrLS)
}


deleteAll.addEventListener('click', deleteAllHandler)

// Корзина
ul.addEventListener('click', (evt =>{
    if (evt.target.className == 'cross'){
        const target = evt.target.parentNode.parentNode.querySelector('.task').innerHTML
        arrLS.forEach(el =>{
            if (target == el.task){
                const index = arrLS.indexOf(el)
                arrLS.splice(index, 1)
                window.localStorage.setItem('Todo', JSON.stringify(arrLS))
                render(arrLS)
            }
        })
    }
}))

// Изменение записей
ul.addEventListener('click', (evt => {
    if (evt.target.className == 'pencil'){
        const target = evt.target.parentNode.parentNode.querySelector('.task').innerHTML
        let p = evt.target.parentNode.parentNode.querySelector('.task')
        const inputPencil = document.createElement('input')
        inputPencil.className = 'inputPencil'
        p.replaceWith(inputPencil)
        inputPencil.value = target
        const checkMark = document.createElement('input')
        checkMark.type = 'image'
        checkMark.src = './img/✅.png'
        checkMark.className = 'checkMark'
        let pen = evt.target.parentNode.querySelector('.pencil')
        pen.replaceWith(checkMark)
        checkMark.addEventListener('click', (evt =>{
            if (evt.target.className == 'checkMark'){
                const targetId = evt.target.parentNode.parentNode.querySelector('.checkbox').id
                if (inputPencil.value.trim() != ''){
                    arrLS.forEach(el => {
                        if(targetId == el.id){
                            el.task = inputPencil.value
                            window.localStorage.setItem('Todo', JSON.stringify(arrLS))
                        }
                    })
                }
            }
            render(arrLS)
        }))

    }
}))


// Обработка чекбоксов
ul.addEventListener('click', (evt => {
    if (evt.target.className == 'checkbox'){
        const target = evt.target.parentNode.querySelector('.task').innerHTML;
        arrLS.forEach(el => {
            if (target == el.task){
                const getCheckbox = el.id
                if (document.getElementById(getCheckbox).checked === true){
                    el.condition = true
                    window.localStorage.setItem('Todo', JSON.stringify(arrLS))
                } else {
                    el.condition = false
                    window.localStorage.setItem('Todo', JSON.stringify(arrLS))
                }
            }
        })
    }
}))

deleteComleted.addEventListener('click', deleteComletedHandler)




// Список появляется при нажатии и исчезает при нажатии на любое место по документу
// input.addEventListener(`input`, ()=>{
//     panel.classList.remove('display__none')
//     ul.classList.remove('display__none')
//     form.classList.add('form__authorizationActive')
// })
// document.addEventListener(`click`, () =>{
//     panel.classList.add(`display__none`)
//     ul.classList.add('display__none')
//     form.classList.remove('form__authorizationActive')
// })
// document.querySelector(`.main`).addEventListener(`click`, (event)=>{
//     event.stopPropagation();
// })