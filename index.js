
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