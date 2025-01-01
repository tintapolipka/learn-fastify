/*
https://fastify.dev/docs/v5.2.x/Guides/Getting-Started/
*/

import Fastify from "fastify";

const fastify = Fastify({
    logger: true
})

fastify.get('/',(request,reply)=>{
    reply.send(
        {message: "hello world!"}
    )
})

fastify.listen({port:3300}, (err,adress)=>{
 if(err){
    fastify.log.error(err)
    process.exit(1)
 }
})