import Fastify, { FastifyReply, FastifyRequest } from "fastify"; // Importáljuk a Fastify factory funkciót

const fastify = Fastify({   // példányosítjuk (szokták még app-nak hívni is)
    logger: true,           // opciók közül az automatikus loggolást kérjük a default beállítással
    // logger: {            // az automatikus loggolást egyedi beállításokkal kérjük
    //     transport: {target: "pino-pretty"}
    //  }
});

fastify.get('/',{}, async function () { // új route-ot kell hozzáadni
    return {message: "Hello world!"}
})

/*Az alkalmazás megszakítása*/
const signals = ["SIGINT" ,"SIGTERM"]; /*
SIGINT: Ez a jel a terminálban az alkalmazás megszakítására (pl. Ctrl+C-vel) 
küldött jel.
SIGTERM: Ez a jel az alkalmazás szabályos leállítására használt jel, például amikor 
egy rendszertisztító folyamat (kill) küld egy alapértelmezett leállító jelet.
*/
signals.forEach((signal) => { 
    process.on(signal, async ()=>{  /*
        A process.on metódussal egy eseménykezelőt adunk az adott jelhez (SIGINT vagy SIGTERM),
         hogy az alkalmazás bizonyos műveleteket végezzen, amikor ezek a jelek érkeznek.
        */
        await fastify.close(); // leállítja a Fastify szervert, minden aktív kapcsolatot lezár, az erőforrásokat felszabadítja.
        process.exit(0); // az alkalmazás normál, hibamentes leállását kezdeményezi. Ezután a Node.js futás megszűnik.
    })
}); 

fastify.post('/api/users',{
    handler: async (request:FastifyRequest<{ // akkor futtatja a Fastify, ha érkezik egy POST kérés
        Body: {
            name: string,
            age: number,
        }
    }>,reply: FastifyReply)=>{
        
        const body = request.body;  // A kliens által küldött kérés törzsét (body) eltárolja a body változóban.
        console.log({body})
        return reply.code(201)      // Beállítja a válasz HTTP státuszkódját 201-re (created)
                    .send(body)     // A válasz törzsébe beírja a body tartalmát
    }
}
)

/*Fastyfy szerver indítása:*/
async function main() {
    await fastify.listen({
      port: 3000,   // port
      host: "0.0.0.0", // IP cím (alapértelmezett localhost felülírása, hogy ne csak ott legyen elérhető)
    });
  }

  main();