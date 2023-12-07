import styles from '../styles/notification.module.css'
import CheckmarkImage from '../../images/checkmark.svg';
import DeleteImage from '../../images/delete.png';
export function renderTodos(todos) {
    const renderedItemArray = todos.map(function (todo) {
        const className = todo.completed ? 'completed' : ''
        const completionClass = todo.completed ? 'checked' : ''
        return `
            <li data-id="${todo.id}" class="${className}">
                <span class="custom-checkbox">
                    <img class="check" src="${CheckmarkImage}" width="22" height="22"></img>
                    <input class="real-checkbox" type="checkbox" ${completionClass} />
                </span>
                <label>${todo.text}</label>
                <span class="delete"><img class="delete" src="${DeleteImage}" /></span>
            </li>
        `
    })
    document.querySelector('.todo-list').innerHTML = renderedItemArray.join('')
}

export function clearNewTodoInput() {
    document.querySelector('.new-todo').value = ''
    showNotification()
}

export function getTodoId(element) {
    return parseInt(
        element.dataset.id
        || element.parentNode.dataset.id
        || element.parentNode.parentNode.dataset.id
    , 10)
}

function showNotification() {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('alert', 'alert-success', 'position-absolute', 'bottom-0', styles.notification);
    notificationElement.setAttribute('role', 'alert');
    notificationElement.innerHTML = 'New Todo list item added.';
    document.body.appendChild(notificationElement);

    setTimeout(function () {
        const notificationElement = document.querySelector(`.${styles.notification}`)
        notificationElement.parentNode.removeChild(notificationElement)
    }, 112000)
}