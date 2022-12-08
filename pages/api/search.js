import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    var results = []
    if (req.method === 'POST'){
        const {searchText,genre} = superjson.parse(req.body)
        if (genre === 0 & searchText !== ''){
            results = await prisma.movie.findMany({
                where:{
                    title:{contains: searchText}
                },
                select:{
                    id:true,
                    poster:true,
                    title:true
                }
            })  
        }else if(searchText === '' & genre !== 0){
            results = await prisma.movie.findMany({
                where:{
                    genres:{some:{id:parseInt(genre)}}
                },
                select:{
                    id:true,
                    poster:true,
                    title:true
                }
            })  
        }else if(searchText !== '' & genre !== 0){
            results = await prisma.movie.findMany({
                where:{
                    title:{contains: searchText},
                    genres:{some:{id:parseInt(genre)}}
                },
                select:{
                    id:true,
                    poster:true,
                    title:true
                }
            })     
        }else{
            results = ['hello']
        }
    }
    res.status(200)
    res.json({Results:results})
}