import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export default async (req,res)=>{
    if(req.method === 'POST'){
        const {name,text,rating,movieId} = superjson.parse(req.body)
        const review = await prisma.review.create({
            data:{
                reviewer_name:name,
                review_text:text,
                review_rating:parseInt(rating),
                movie:{connect:{id:movieId}}
            },
        })
        console.log(review)
        res.status(200).json(review)
    }
}