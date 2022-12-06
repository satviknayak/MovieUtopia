import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    if (req.method === 'POST'){
        const {id,name,photo,overview,dob,roles} = superjson.parse(req.body)
        const updatedCast = await prisma.cast.update({
            where: {
              id: id,
            },
            data: {
              name:name,
              overview:overview,
              roles:roles,
              dob:dob,
              photo:photo
            },
        })
        res.status(200).json(updatedCast)
    }
}