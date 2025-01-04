import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"; 

const fastify = Fastify({   
               
    logger: {            
         transport: {target: "pino-pretty"}
      }
});

fastify.get('/',{}, async function () { 
    return {message: "Hello world!"}
})


const signals = ["SIGINT" ,"SIGTERM"]; 
signals.forEach((signal) => { 
    process.on(signal, async ()=>{  
        await fastify.close(); 
        process.exit(0); 
    })
}); 

/* route választó plugIn létrehozása*/
async function userRoutes(fastify: FastifyInstance){ /* 
    Elvár: 
    Egy fastify példányt
    */

    fastify.post('/',{ // a regisztráláskor a "prefix"-ben fogom megadni a végpont elérési útját, ezért itt csak "/" van 
        handler: async (request:FastifyRequest<{ 
            Body: {
                name: string,
                age: number,
            }
        }>,reply: FastifyReply)=>{
            
            const body = request.body;  
            console.log({body})
            return reply.code(201)      
                        .send(body)     
        }
    }
    )
    fastify.log.info("User api ready.")
}
/* route választó plugIn regisztrálása*/
fastify.register(userRoutes, {prefix:'/api/users'})


/*Fastyfy szerver indítása:*/
async function main() {
    await fastify.listen({
      port: 3000,   // port
      host: "0.0.0.0", // IP cím (alapértelmezett localhost felülírása, hogy ne csak ott legyen elérhető)
    });
  }

  main();