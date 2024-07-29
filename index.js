
//Setup
let usersInStorage = localStorage.getItem('users')
let users = JSON.parse(usersInStorage == 'undefined' ? '[]' : usersInStorage);

document.querySelector('h3#login').addEventListener('click', (e) => {
    document.querySelector('h3#register').classList.remove('active');
    document.querySelector('form#register').classList.remove('active');
    document.querySelector('form#login').classList.add('active');
    e.target.classList.add('active');
});
document.querySelector('h3#register').addEventListener('click', (e) => {
    document.querySelector('h3#login').classList.remove('active');
    document.querySelector('form#login').classList.remove('active');
    document.querySelector('form#register').classList.add('active');
    e.target.classList.add('active');
});

document.querySelector('form#register').addEventListener('submit', (e) => {
    e.preventDefault();

   if(allInputsHaveValues(e.target)  && passwordWasConfirmed(e.target)){
        let user = storeUserData(new FormData(e.target));
        loginUser(user);
   }
});

document.querySelector('form#login').addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let username = data.get('username');
    let password = data.get('password');
    let user = getUser(username, password);
    if(user){
        loginUser(user);
    }else{
        highlightInvalidInput(e.target, 'username');
        informUser(e.target, 'password', 'Incorrect username or password!');
    }       

});

function passwordWasConfirmed(formElement){
    let data = new FormData(formElement);
    if(! (data.get('password') === data.get('confirm-password'))){
        informUser(formElement, 'confirm-password', 'Password does not match!');
        return false;
    }
    return true;
}

function allInputsHaveValues(formElement){
    let valid = true; 
    let data = new FormData(formElement);
    for (const [name, value] of data) {
        if(value === ''){
            valid = false;
            informUser(formElement, name, `This input is mandatory!`);
        }
    }
    return valid;
}

function informUser(formElement, name, warning){
    highlightInvalidInput(formElement, name);
    let elemToInsertAfter = formElement.querySelector(`input[name="${name}"]`);
    if(elemToInsertAfter.parentElement.classList.contains('label-wrapper')){
        elemToInsertAfter = elemToInsertAfter.parentElement;
    }
    elemToInsertAfter.insertAdjacentHTML('afterend', `<aside id="warning-${name}" class="warning">${warning}</aside>`);
}

function highlightInvalidInput(formElement, inputName){
    formElement.querySelector(`input[name="${inputName}"]`).classList.add('invalid');
    formElement.querySelector(`input[name="${inputName}"]`).addEventListener('focus', (e) => {
        e.target.classList.remove('invalid');
        formElement.querySelector(`aside.warning#warning-${inputName}`).remove();
    }, {once: true});
}

function storeUserData(formData){
    let user = {
        name: formData.get('name'),
        username: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password') //Top worst-practice ever
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    console.log(users);
    return user;
}

// Amazing login functionality. Such wow.
function getUser(username, password){
    return structuredClone(users.filter( (user) => user.username == username && user.password == password ))[0];
}

function loginUser(user){
    document.querySelector('.login-wrapper').innerHTML = `<h1>Welcome ${user.name}!</h1>`;
}