const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector ('#list');

button.addEventListener('click', function(){
    if (input.value.trim() !== ''){
    const entry = document.createElement('li');
    entry.textContent = input.value + ' ';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.addEventListener('click', function(){
    list.removeChild(entry);
    input.focus();
    });

    entry.appendChild(deleteButton);
    list.appendChild(entry);
        
    input.value='';
    }
    input.focus();
});

