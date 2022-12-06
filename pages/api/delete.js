import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    if (req.method === 'POST'){
        const {id} = superjson.parse(req.body)
        const deletedCast = await prisma.cast.delete({
            where: {
              id:id,
            },
        })
        res.status(200).json(deletedCast)
    }
}