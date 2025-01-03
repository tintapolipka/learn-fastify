import Fastify from "fastify"; // Importáljuk a Fastify factory funkciót

const fastify = Fastify({   // példányosítjuk (szokták még app-nak hívni is)
    logger: true,           // opciók közül az automatikus loggolást kérjük a default beállítással
    // logger: {            // az automatikus loggolást egyedi beállításokkal kérjük
    //     transport: {target: "pino-pretty"}
    //  }
});

fastify.get('./', async function name() {
    return {message: "Hello world!"}
})