console.log('client side javascript is loaded!')




const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message1.textContent='loading.....'
    message2.textContent=''
    fetch('http://localhost:4000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent=data.error
            }
           else{
            message1.textContent=data.locations
            message2.textContent=data.geocode
           }
           console.log(data.locations)
           console.log(data.geocode)
        })
    })
})