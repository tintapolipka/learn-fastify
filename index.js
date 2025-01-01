/*
https://fastify.dev/docs/v5.2.x/Guides/Getting-Started/
*/

import Fastify from "fastify";

const fastify = Fastify({
    logger: true
})

const PORT = 443

fastify.get('/',(request,reply)=>{
    reply.send(
        {message: `Hello from port ${PORT}!`}
    )
})

fastify.listen({port:PORT}, (err,adress)=>{
 if(err){
    fastify.log.error(err)
    process.exit(1)
 }
})