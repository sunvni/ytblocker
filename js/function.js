
window.onload = loadRules

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('jsAddBtn').addEventListener('click', () => {
        addItem();
        loadRules();
    })
    showMore.addEventListener("click", function () {
        if (jsDomain.className == "active") {
            jsDomain.className = ""
            jsRedirect.className = ""
        } else {
            jsDomain.className = "active"
            jsRedirect.className = "active"
        }
    })
})

function removeRule(index) {
    let data = localStorage.getItem('rules');

    let urlList = JSON.parse(data);

    if (urlList.length < 1) {
        return
    }

    urlList.splice(index, 1)
    saveRule(urlList)
}

function addItem() {
    let jsQuery = document.querySelector('#jsQuery').value
    let jsDomain = document.querySelector('#jsDomain').value
    let jsRedirect = document.querySelector('#jsRedirect').value



    let rule = {
        "priority": 1,
        "action": {
            "type": "redirect",
            "redirect": {
                "url": jsRedirect
            }
        },
        "condition": {
            "urlFilter": jsQuery,
            "domains": [
                jsDomain
            ],
            "resourceTypes": [
                "main_frame"
            ]
        }
    }

    let data = localStorage.getItem('rules');

    let rules = JSON.parse(data) || [];

    rules.push(rule);

    saveRule(rules)
}


function loadRules() {
    let data = localStorage.getItem('rules');

    let rules = JSON.parse(data) || [];

    jsUrlList.innerHTML = rules.map((item, index) => {
        return `
            <li><p>${item.condition.urlFilter}</p><span class="remove" data-index="${index}">x</span></li>
            `
    }).join('\n')

    let elements = document.getElementsByClassName('remove')

    for (let el of elements) {
        el.addEventListener('click', function (e) {
            let target = e.target
            let index = target.dataset['index']
            removeRule(index)
            loadRules()
        })
    }
}

function saveRule(rules) {
    localStorage.setItem('rules', JSON.stringify(rules))
}
