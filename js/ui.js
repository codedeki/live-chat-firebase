//render chat templates to the DOM
//clear list of chats (when room changes)

class ChatUI {
    constructor(list) {
        this.list = list;
    }
    clear() {
        this.list.innerHTML = ''; //clear html when called
    }

    render(data) { //output written text to the dom
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(), //formats date
            { addSuffix: true } // adds "ago"
        );
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div> 
            </li>
        `;
        this.list.innerHTML += html; //adding template to html
    }
}