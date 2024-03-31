const ul = document.querySelector('.list__actions')
const form = document.querySelector('.form__authorization')
const add = document.querySelector('.list__submit')
const input = document.querySelector('.list__input')
const deleteAll = document.querySelector('.delete__all')
const cross = document.querySelectorAll('.cross')
const checkbox = document.querySelector('.checkbox')
const deleteComleted = document.querySelector('.delete__completed')
const panel = document.querySelector('.delete__panel')
let arrLS = JSON.parse(window.localStorage.getItem('Todo')) ?? []





function render(arr){
    ul.innerHTML =''
    arr.forEach(el => {
        const li = document.createElement('li')
        li.className = 'task__description'
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${(el.condition == true) ? 'checked' : ''} id="${el.id}">
            <p class="task">${el.task}</p>
            <input type="image" src="./img/❌.png" class="cross">
        `
        ul.append(li)
        
    });
}



form.addEventListener('submit', ((evt) => {
    evt.preventDefault()
    const value = input.value
    const id = Date.now()
    const obj = {'task': value, 'condition' : false, 'id' : id}
    arrLS.push(obj)
    window.localStorage.setItem('Todo', JSON.stringify(arrLS))
    render(arrLS)
}))

render(arrLS)

function deleteAllHandler(){
    window.localStorage.clear()
    arrLS = []
    ul.innerHTML =''
}


function deleteComletedHandler(){
    arrLS = arrLS.filter(el => el.condition != true)
    window.localStorage.setItem('Todo', JSON.stringify(arrLS))
    render(arrLS)
}


deleteAll.addEventListener('click', deleteAllHandler)


ul.addEventListener('click', (evt =>{
    if (evt.target.className == 'cross'){
        const target = evt.target.parentNode.querySelector('.task').innerHTML
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






input.addEventListener(`input`, ()=>{
    panel.classList.remove('display__none')
    ul.classList.remove('display__none')
    form.classList.add('form__authorizationActive')
})
document.addEventListener(`click`, () =>{
    panel.classList.add(`display__none`)
    ul.classList.add('display__none')
    form.classList.remove('form__authorizationActive')
})
document.querySelector(`.main`).addEventListener(`click`, (event)=>{
    event.stopPropagation();
})