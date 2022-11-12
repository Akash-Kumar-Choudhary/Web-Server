//path is defult value
const path=require('path')

const hbs=require('hbs')
const express=require('express')
const geocode=require('../../weather-app/geocode.js')
const forcast=require('../../weather-app/utiles/forcast.js')
const app=express()
//define path for express confi
const publicdirectorypath=path.join(__dirname,'../public')
//resolve path and go to that path 
app.use(express.static(path.resolve(path.join(publicdirectorypath,'/temp/views'))))
console.log(path.join(publicdirectorypath,'/views'))
const viewspath=path.resolve(path.join(publicdirectorypath,'/temp/views'))
const partialspath=path.resolve(path.join(__dirname,'../public/temp/partial'))
app.set('views',viewspath)
app.set('view engine','hbs')

//setup static directory to serve
app.use(express.static(publicdirectorypath))
hbs.registerPartials(partialspath)

app.get('/',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'akash kumar'
        
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'akash kumar choudhary'
    })
})



app.get('/help',(req,res)=>{
    res.render('help',{
        title:'satyam lohiya',
        name:'satyam lohiya'
    })
})
app.get('/about',(req,res)=>{
    res.send('<h1>About</h1>')
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'unable to the address'
        })
    }
    forcast(req.query.address,(error,{lattitude,longitude,locations}={})=>{
        if(error) return res.send({error})
        geocode(lattitude,longitude,(error,geodata)=>{
            if(error) return res.send({error})
            
            res.send({
                geocode:geodata,locations,
                
                address:req.query.address


            })
        })
    })
})


app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'akash kumarchoudhary',
        errorMessage:'about not found'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'akash kumar choudhary',
        errorMessage:'helped article not found'
    })
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send({
        error:'you must provide an search term'
       })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'akash kumar choudhary',
        errorMessage:'page not found'
    })
})


// app.get('/help/*',(req,res)=>{
//     res.send('article not found')
// })

// app.get('*',(req,res)=>{
//     res.send('404 page')
// })

app.listen(4000,()=>{
    console.log('server is up on port 4000.')
})