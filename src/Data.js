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

    const fetch = async  () => {

        let notices = []

        for await ( let row of originData ){
            let response = await GetNoticeNews( row.endpoint , row.sources )
            
            notices.push(response.articles[0])
            notices.push(response.articles[1])
         
        }
        return notices
    }
    

    return fetch()
}

module.exports.GetNotices   =  GetNotices
module.exports.GetDataCountriesInfected =  GetDataCountriesInfected


