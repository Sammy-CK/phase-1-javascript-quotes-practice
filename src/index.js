const ulForQuote = document.querySelector('#quote-list') //ul containing quotes

const form = document.querySelector('#new-quote-form') //form for new quote

const newQuote = document.querySelector('#new-quote') // new quote text submission

const newAuthor = document.querySelector('#author') // new author text input


//adding new quote
form.addEventListener('submit',addQuote)



//adds quote
function addQuote(){
    // add it to json server
        fetch('http://localhost:3000/quotes',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Accept : "application/json"
        },
        body : JSON.stringify({
            quote : newQuote.value,
            author : newAuthor.value
        })
    
        })
    
     //add the new quote on screen 
        ulForQuote.innerHTML = ''
    
    //display all quotes including the added ones
        showAllQuotes();   
    }
//end of addQuote function




//fetching all quote data
function showAllQuotes(){
fetch('http://localhost:3000/quotes?_embed=likes')
.then(resp => resp.json())
.then(data => {console.log(data)
// Individual quote data
    data.forEach(overallQuote => {
 
//actual quote data to be on screen
    const li = document.createElement('li')
    li.classList.add('quote-card')
    ulForQuote.appendChild(li)

    const blockquote = document.createElement('blockquote')
    blockquote.classList.add('blockquote')
    li.appendChild(blockquote)

    const p = document.createElement('p')
    p.classList.add('mb-0');
    p.innerText = overallQuote.quote
    blockquote.appendChild(p)

    const footer = document.createElement('footer')
    footer.classList.add('blockquote-footer')
    footer.innerText = overallQuote.author
    blockquote.appendChild(footer)

    const br = document.createElement('br')
    blockquote.appendChild(br)



    const buttonLike = document.createElement('button')
    buttonLike.classList.add('btn-success')
    buttonLike.innerText=`Likes:`

// deleting quote 
 buttonLike.addEventListener('click', deleteQuote)





//deletes Quote
 function deleteQuote() {
    fetch('http://localhost:3000/likes',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Accept : "application/json"
        },
        body : JSON.stringify({
            quoteId: overallQuote.id,
            createdAt : Date(),
            likes : 0
        })
    })
    .then(response => response.json())
    .then(dataz => {
        likeNoSpan.innerText = dataz.likes
        console.log(dataz.likes)


    })
 }
//end of deleteQuote function



    blockquote.appendChild(buttonLike)

    const likeNoSpan = document.createElement('span')

    buttonLike.appendChild(likeNoSpan)

    const buttonDelete = document.createElement('button')
    buttonDelete.classList.add('btn-danger')
    buttonDelete.innerText = `Delete`

//delete button deletes the quote

buttonDelete.addEventListener('click',() => {
    fetch(`http://localhost:3000/quotes/${overallQuote.id}`,{
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            Accept : "application/json"
        }
    })
 //delete the new quote on screen    
 ulForQuote.innerHTML = ''

 //display all quotes excluding the deleted ones
     showAllQuotes();
 
})
//end

    blockquote.appendChild(buttonDelete)

})
})
}

//wait for page to load
document.addEventListener('DOMContentLoaded',showAllQuotes)