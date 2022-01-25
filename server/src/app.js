const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cors = require('cors')
const xlsx = require('xlsx')
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.post('/api',async(req,res) => {

    const {country} = req.body

    console.log(country)

    if(!country){
        return res.json({status:false,data:[]})
    }

    if(country == 'Select Country'){
        return res.json({status:false,data:[]})
    } 

    // 1.reded file
    const file = xlsx.readFile('covid_data.xlsx')

    // 2.sheets of files 
    const sheets = file.SheetNames

    // 3.reading the sheets of file and get all rows in sheet
    const temp = xlsx.utils.sheet_to_json(file.Sheets[sheets])

    //4.filtering the required Country data
    const countryData = temp.filter(element => element.COUNTRY_NAME == country)

   res.json({status:true,data:countryData[0]})

})


app.listen(port,console.log(`server running at http://localhost:${port}`))














 // let data      = await fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise')

    // const data1 = await data.json()
    // const data2 = await hospatals.json()
    // console.log(data1.data.total)
    // console.log(data2.data.medicalColleges[0])