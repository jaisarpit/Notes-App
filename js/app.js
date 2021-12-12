console.log('this a note app');
showNotes();
//if user add a note ,add it to the local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById('addtext');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes)
    }
    let myObj ={
        title:addtitle.value,
        text:addtxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addtxt.value = '';
    addtitle.value = '';
    console.log(notesObj);
    showNotes();
})
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">

                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}"onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `There is nothing to show use 'add note' section above to add notes`
    }
}

//function to delete a note

function deletenote(index){
    console.log('i am deleting',index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes)
    }   
    notesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

//for searching

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    console.log('event is fired', inputVal);
    let notecards = document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display ="block";
        }
        else{
            element.style.display ="none";

        }
    }) 
    
})
