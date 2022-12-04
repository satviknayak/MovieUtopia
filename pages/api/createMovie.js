import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    if(req.method === 'POST'){
        const {title,overview,releaseDate,duration,category,trailer,poster} = superjson.parse(req.body)
        const movie = await prisma.movie.create({
            data:{
                title: title,
                overview:overview,
                release_date:releaseDate,
                duration:duration,
                category:category,
                trailer:trailer,
                poster:poster,
                ratings:'8.5'
            },
        })
        res.status(200).json(movie)
    }
}