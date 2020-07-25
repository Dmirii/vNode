import './style.css';
import {isValid} from './utils';
import {Question} from './question';
import {getAuthForm} from './aut';
import {createModal} from './utils';
import {authWithEmailAndPassword} from './aut';


const form = document.getElementById('form');
const input = form.querySelector('#qinput');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');


window.addEventListener('load', Question.RenderList);
form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
})

function submitFormHandler(event){
    event.preventDefault();
    if(isValid(input.value)) {
       const question = {
           text: input.value.trim(),
           date: new Date().toJSON(),
       }
       submitBtn.disabled = "true";
       // async request to server 
       Question.create(question).then( () => {
        input.value='';
        input.className='';   
       })    
    }
}


function openModal(){
    createModal('Авториазция',getAuthForm());  
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler,{ once:true  })  
}

function authFormHandler(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    btn.disabled=true;
    authWithEmailAndPassword(email,password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then( () => btn.disabled = false)
  }

  function renderModalAfterAuth(content) {
        if(typeof content === 'string'){
            createModal('Ошибка', content);
        } else {
            createModal('Ответ БД',Question.listToHTML(content));
        }
    }