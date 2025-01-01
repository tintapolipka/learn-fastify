/*
https://fastify.dev/docs/v5.2.x/Guides/Getting-Started/
*/

import Fastify from "fastify";

const fastify = Fastify({
    logger: true
})

const PORT = 555

fastify.get('/',(request,reply)=>{
    console.warn(request.query);
    const queryKeys = Object.keys(request.query)
    // reply.send(
    //     {message: `Hello from port ${PORT}!`}
    // )
    reply.type('text/html').send(`<!DOCTYPE html><HTML><p>Hello from port ${PORT}!</p><p>Your query keys are: ${queryKeys}!</p></HTML>`)
})

fastify.listen({port:PORT}, (err,adress)=>{
 if(err){
    fastify.log.error(err)
    process.exit(1)
 }
})