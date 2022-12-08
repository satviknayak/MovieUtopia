import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    if(req.method === 'POST'){
        const {name,text,rating,movieId} = superjson.parse(req.body)
        const movie = await prisma.review.create({
            data:{
                reviewer_name:name,
                review_text:text,
                review_rating:rating,
                movie:{
                    connect:{id:movieId}
                }
            },
        })
        console.log(movie)
        res.status(200).json(movie)
    }
}