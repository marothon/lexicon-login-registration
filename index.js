
//Setup
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
    // Validate
    allInputsHaveValues(e.target)
});

document.querySelector('form#login').addEventListener('submit', (e) => {
    e.preventDefault();
});

function allInputsHaveValues(formElement){
    let valid = true; 
    let data = new FormData(formElement);
    for (const [name, value] of data) {
        if(value === ''){
            valid = false;
            informUser(formElement, name, `This input is mandatory!`);
        }
    }
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