import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    if (req.method === 'POST'){
        const {id,title,overview,releaseDate,duration,category,trailer,poster,casts,genres} = superjson.parse(req.body)
        const updatedMovie = await prisma.movie.update({
            where: {
              id: id,
            },
            data: {
              title:title,
              overview:overview,
              release_date:releaseDate,
              duration:duration,
              category:category,
              trailer:trailer,
              poster:poster,
              casts:{set:casts},
              genres:{set:genres}
            },
        })
        res.status(200).json(updatedMovie)
    }
}