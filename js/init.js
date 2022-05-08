document.querySelector('checkbox').addEventListener('CheckboxStateChange', function() {
    if (this.checked) {
        chrome.storage.local.set({ "extension-is-active": true });
    } else {
        chrome.storage.local.set({ "extension-is-active": false });
    }

    chrome.storage.local.get(['extension-is-active'], function(result) {
        if (result.key) {
            document.onkeydown = checkKey;
        }
    });
});

saveUserDecision();





function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '39') {
        if (!document.getElementById('search-mm-btn')) {
            addBlockButton()
        }
    } else if (e.keyCode == '66') {
        blockAccount()
    }

}

function saveUserDecision() {
    chrome.storage.local.get(['extension-is-active'], function(result) {
        if (result.key == null) {
            chrome.storage.local.set({ "extension-is-active": false });
        }
    });


    chrome.storage.local.get(['extension-is-active'], function(result) {
        if (result.key) {
            document.getElementById('checkbox').checked = true;
        } else {
            document.getElementById('checkbox').checked = false;
        }
    });


}


function addBlockButton() {
    var btn = document.createElement("input");
    btn.value = "Block";
    btn.id = "search-mm-btn";
    btn.type = "button";
    btn.data = "feed-follow"
    document.querySelector(".tiktok-7l7okx-DivInfoContainer.ec62sd0").appendChild(btn);
    let button = document.getElementById("search-mm-btn");
    button.classList.add("ec62sd6")
    button.classList.add("tiktok-5xuix8-Button-StyledFollowButton")
    button.classList.add("ehk74z00")
    button.style = "margin-left:5px"
    button.addEventListener("click", function(e) {
        blockAccount()
    })
}

function blockAccount() {
    let user = document.getElementsByClassName("tiktok-1r8gltq-SpanUniqueId ec62sd1")[0].textContent
    let url = 'https://www.tiktok.com/@' + user;
    var userProfileTab = window.open(url, '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=, height=, visible=none', '');

    userProfileTab.addEventListener('load', function() {
        userProfileTab.blur();
        userProfileTab.simulateMouseover();
    }, true);

}

function simulateMouseover() {
    var event = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window,
    });
    var myTarget = document.querySelector(".tiktok-jzplnh-DivMoreActions.e1pq4u0v6");
    myTarget.dispatchEvent(event)
    mouseOverBehaviour();

}

function mouseOverBehaviour() {
    myElement = document.querySelector(".tiktok-jzplnh-DivMoreActions.e1pq4u0v6");
    document.getElementsByClassName('tiktok-51xc1n-DivActionItem ezky0yn2')[0].click()
    setTimeout(document.getElementsByClassName('ex1lhrj4 tiktok-10ecx0o-Button-StyledButtonBlock ehk74z00')[0].click(), 500);
    setTimeout(function() { window.close(); }, 2000);

}