
window.onload = loadList

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('jsAddBtn').addEventListener('click', () => {
        addItem();
        loadList();
    })
})

function removeItem(index) {
    let data = localStorage.getItem('url_list');

    let urlList = JSON.parse(data);

    if (urlList.length < 1) {
        return
    }

    urlList.splice(index, 1)
    saveList(urlList)
}

function addItem() {
    let newUrl = document.querySelector('#jsNewUrl').value

    document.querySelector('#jsNewUrl').value = ""

    let data = localStorage.getItem('url_list');

    let urlList = JSON.parse(data) || [];

    if (!~urlList.indexOf(newUrl)) {
        urlList.push(newUrl);
    }
    saveList(urlList)
}


function loadList() {
    let data = localStorage.getItem('url_list');

    let urlList = JSON.parse(data) || [];

    jsUrlList.innerHTML = urlList.map((item, index) => {
        return `
            <li><p>${item}</p><span class="remove" data-index="${index}">x</span></li>
            `
    }).join('\n')

    let elements = document.getElementsByClassName('remove')
    for (let el of elements) {
        el.addEventListener('click', function(e) {
            let target = e.target
            let index = target.dataset['index']
            removeItem(index)
            loadList()
        })
    }
}

function saveList(list) {
    localStorage.setItem('url_list', JSON.stringify(list))
}
