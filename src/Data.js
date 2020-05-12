const axios =  require('axios') 

const GetDataCountriesInfected = async () => {

    const url   =  'https://pomber.github.io/covid19/timeseries.json'
    const data  =  await axios.get(url)
    return data.data
}

const GetNoticeNews = async ( endpoint , sources ) => {
    const url   =  'https://newsapi.org/v2/' + endpoint + '?' + sources + '&apiKey=5e2d5cf387554d43a6d80b3f57478ec2'
    const data  =  await axios.get(url)
    return data.data
}

const GetWeather = async ( ) => {
    const url   =  'http://api.meteored.cl/index.php?api_lang=cl&localidad=18578&affiliate_id=4b8k2pp4kocq&v=3.0'
    const data  =  await axios.get(url)
    return data.data
}



const originData = [
    {   
        name     : 'cnn-español' ,
        endpoint : 'top-headlines' ,
        sources  : 'sources=cnn-es'
    },
    {   
        name     : 'theclinic' ,
        endpoint : 'everything' ,
        sources  : 'domains=theclinic.cl'
    },
    {   
        name     : 'hipertetual' ,
        endpoint : 'everything' ,
        sources  : 'domains=hipertextual.com&q=coronavirus'
    }
]

const GetNotices = async ( ) => {

    const notices = await getDataNotice()

    return ReOrderNotice( notices ) 
}

const ReOrderNotice = (notices) => {

    const keys = Object.keys( notices )
    const keysReOrder = keys.sort( () =>  Math.random() - 0.5 ) 

    const newOrderNotices = keysReOrder.map( ( data ) => notices[data]  )

    return newOrderNotices
}

function getDataNotice  () {

    const noticesQuantity = [0,1]

    const fetch = async  () => {
        let notices = []
        for await ( let row of originData ){
            let response = await GetNoticeNews( row.endpoint , row.sources )
            noticesQuantity.map( i => {
                response.articles[i].dateFormat =  dateFormat( response.articles[i].publishedAt )
                response.articles[i].lyrics     =  response.articles[i].author.substr(0,1).toUpperCase()
                notices.push(response.articles[i])
            })
        }
        return notices
    }
    return fetch()
}


const months = [
    'Enero'   , 
    'Febrero' ,
    'Marzo' ,
    'Abril' ,
    'Mayo'  ,
    'Junio' , 
    'Julio' ,
    'Agosto'     ,
    'Septiembre' ,
    'Octubre'    ,
    'Noviembre'  ,
    'Diciembre'
]

const dateFormat = ( date) => {

    const year = date.substr(0 , 4)
    const monthInt = parseInt( date.substr(5 , 2) )
    const month = months[monthInt-1]
    const day = date.substr(8 , 2)    

    return month + ' ' +  day + ', ' + year  
}

module.exports.GetNotices   =  GetNotices
module.exports.GetDataCountriesInfected =  GetDataCountriesInfected
module.exports.GetWeather =  GetWeather


