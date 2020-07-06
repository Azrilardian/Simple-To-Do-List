function list() {
    const ListValue = document.querySelector('.add input');
    const btnAdd = document.querySelector('.add button');
    const listContainer = document.querySelector('.list-container');

    btnAdd.addEventListener('click', add);
    ListValue.addEventListener('keyup', e => {
        if (e.keyCode == 13) add();
    });

    function add() {
        if (ListValue.value == "") return;
        else {
            createList();
            changePlaceholderText(ListValue);
            ListValue.value = '';
        }
    }

    const createList = () => {
        const div = document.createElement('div');
        div.classList.add('list', 'loading');
        div.innerHTML = listElement();
        listContainer.appendChild(div);
        setTimeout(() => {
            div.classList.remove('loading');
        }, 600)
    }

    const changePlaceholderText = input => input.setAttribute('placeholder', 'Apa kegiatan selanjutnya ?');

    function documentListener() {
        const removeAlert = document.querySelector('.remove-list-alert');
        const editAlert = document.querySelector('.edit-list-alert');
        const textArea = document.querySelector('.edit-list-alert textarea');
        const deleteBtn = document.querySelector('button#delete');
        const cancelDeleteBtn = document.querySelector('button#no');
        document.addEventListener('click', e => {
            if (e.target.classList.contains('remove')) {
                clickEffect(e.target);
                showRemoveAlert(removeAlert);
                cekOption(e.target, removeAlert, deleteBtn, cancelDeleteBtn, removeList);
            } else if (e.target.classList.contains('edit')) {
                clickEffect(e.target);
                showEditAlert(e.target, editAlert, textArea);
                textArea.focus();
            }
        });
    };
    documentListener();

    const removeList = target => {
        const list = target.parentElement.parentElement;
        list.remove();
    };
    const showRemoveAlert = el => el.classList.add('active');
    const hideRemoveAlert = el => el.classList.remove('active');

    const showEditAlert = (target, el, textArea) => {
        let targetValue = target.parentElement.previousElementSibling;
        const saveEditBtn = document.querySelector('button#save');
        const cancelEditBtn = document.querySelector('button#cancel');
        const getInput = e => e.textContent = textArea.value;
        textArea.value = targetValue.textContent;
        el.classList.add('active');
        cekOption(target, el, saveEditBtn, cancelEditBtn, getInput, targetValue);
    };

    const cekOption = (target, el, trueBtn, falseBtn, callback, targetValue) => {
        trueBtn.addEventListener('click', () => {
            clickEffect(target);
            trueBtn.id == 'delete' ? callback(target) : callback(targetValue);
            hideRemoveAlert(el);
        });
        falseBtn.addEventListener('click', () => {
            clickEffect(target);
            hideRemoveAlert(el)
        });
    };

    const listElement = () => {
        return `<p>${ListValue.value}</p>
        <div class="button">
        <button class="edit"><i class="fas fa-pen"></i></button>
        <button class="remove"><i class="fas fa-trash"></i></button>
        </div>`
    };

    const clickEffect = target => {
        target.style.opacity = '.7';
        setTimeout(() => { target.style.opacity = '1' }, 100);
    };

}
list();