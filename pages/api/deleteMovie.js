import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    if (req.method === 'POST'){
        const {id} = superjson.parse(req.body)
        const deletedMovie = await prisma.movie.delete({
            where: {
              id:id,
            },
        })
        res.status(200).json(deletedMovie)
    }
}