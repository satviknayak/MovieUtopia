import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    if(req.method === 'POST'){
        const {name,photo,overview,dob,roles} = superjson.parse(req.body)
        const cast = await prisma.cast.create({
            data:{
                name:name,
                photo:photo,
                overview:overview,
                dob:dob,
                roles:roles
            },
        })
        res.status(200).json(cast)
    }
}