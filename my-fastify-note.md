# Web Server Concepts and Examples
https://www.youtube.com/watch?v=9J1nJOivdyw
## What does a web server do? Mit csinál egy webszerver?
It is listeneing on a port for a request sent via a transport protocol, and returns a response, containing the requested resource.
 
Egy porton figyel egy kérésre, amelyet egy transzfer protokollon keresztül küldenek, majd választ küld vissza, amely tartalmazza a kért erőforrást.

### Listening on a port
 #### http://127.0.0.1 
 A webfejlesztésben ezt "localhost"-nak nevezzük.

Ez egy speciális tartománynév, amely az aktuális gépre utal, és általában a fejlesztés során használatos a helyi webszerver elérésére. Az "127.0.0.1" az IPv4-es címe a localhostnak.
Kell még egy hálózati (network) port, amelyet az operációs rendszer üzemeltet. Ebből 65535 van, ezért ki kell jelölni, hogy melyiken folyjon a kommunikáció (melyiket figyelje a szerver).
Alapértelmezetten a a http:// protokollhoz a 80-as port tartozik (http://127.0.0.1:80/), míg a https://-hez a 443-as, tehát ezeken keresi a böngésző az adatot, ha csak a 127.0.0.1-et írjuk be.

### ... for a Request sent via a Transport Protocol
Http request felépítése:
~~~
GET /orders/123 HTTP/1.1 
Host: 127.0.0.1:8000
User-Agent: Manual-Http-Request
Accept: text/html
~~~
Az 1 sor a request line. Ez szóközzel elválasztva 3 részből áll, melyek rendre:
* CRUD_operátor  
* végpont_címe
* http_verzió
A további sorok az első üres sorig alkotják a HEADERS-t, ami key-value párokból áll, és további információkat közöl a kéréssel kapcsolatban.
* Host: A célzott szerver címe.
* User-Agent: A kliens szoftverének típusa és verziója.
* Accept: A kliens által elfogadható válaszformátumok.

Törzs (Body):
Csak bizonyos módszereknél van (pl. POST, PUT). Tartalmazhat adatokat, például űrlapmezőket, JSON-t vagy fájlokat. Egy üres sor kihagyása után következik a HEADERS után.
~~~
POST /submit-form HTTP/1.1
Host: www.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 27

username=test&password=123
~~~
 Ekkor meg kell adni a body adattípusát, ami most Content-Type: application/x-www-form-urlencoded , ezért a legutolsó sorbam található a body, amit key-value párokként értelmez a szerver, és ugyanúgy működik, mint egy query (mert urlencoded). Kötelező még az adat hossza, ami itt Content-Length: 27. Itt stringet küldenek a body-ban ami alapján tudja a szerver, így a hossz karakterszám, amiből kiderül, hogy hol a vége az üzenetnek. Ha ha a body tartalma egy fájl, akkor azt tudja a szerver ebből, hogy mekkora a mérete byte-ban, így fel tud készülni a fogadásra is.

 #### A TCP-rőL:\
 A HTTP kapcsolat a TCP (Transmission Control Protocol) kapcsolatra épül. A TCP létrehozza a kapcsolatot a kommunikáló felek között a "háromutas kézfogás" (three-way handshake) segítségével. Ez biztosítja, hogy a kapcsolat megbízható legyen, mielőtt adatokat küldenek. A nagyobb adatok kisebb csomagokra (szegmensekre) bontódnak, amelyeket külön-külön küldenek, majd a célállomáson újra összeállítanak.
 A TCP biztosítja, hogy a HTTP-adatok helyesen és teljesen érkezzenek meg a kliens és a szerver között. 
 
### ..Returns a response, containing the requested resource

A szerver által visszaküldött válasz hasonló szerkezetű a kéréshez.\
Első sora az Állapotsor (Status Line), szóközzel elválasztva az alábbiak rendre:
* HTTP-verzió: A protokoll verziója, például HTTP/1.1.
* Állapotkód: Egy háromjegyű szám, amely a válasz státuszát jelzi (pl. 200 a sikeres válaszokra, 404 a nem található hibára).
* Állapotüzenet: Rövid leírás az állapotkódról (pl. OK vagy Not Found

A második sortól az első üres sorig a Fejlécek (Headers):\
* Content-Type: A válasz törzsének formátuma (text/html, application/json, stb.).
* Content-Length: A válasz törzsének mérete bájtokban.
* Server: A szerver neve és verziója.
* Connection: A kapcsolat állapota (pl. keep-alive vagy close).
Törzs (Body):
Ez tartalmazza a tényleges adatot (pl. HTML, JSON, kép vagy egyéb tartalom), amelyet a kliens kérésére a szerver küld. A törzs hossza a Content-Length fejlécben megadott méret.
~~~
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 138

<!DOCTYPE html>
<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <h1>Welcome to my website!</h1>
        <p>This is a sample HTML response.</p>
    </body>
</html>

 ~~~

 #### Statikus vs dinamikus útválasztás (routing)
 Lényegében statikus egy egyszerű weblap/kép/stb. visszaadása a szerver által, míg dinamikus, ha a szerver állítja össze a választ, mint a php teszi.
 A statikus útválasztás (static routing) manuálisan (webfejlesztő által) konfigurált, fix útvonalakat használ, amely egyszerű, stabil, és kevés erőforrást igényel (nem kell számítást végeznia szerver gépnek), de nem skálázható(?), és hibatűrésre sem alkalmas. Ezzel szemben a dinamikus útválasztás (dynamic routing) automatikusan állítja be és frissíti az útvonalakat útválasztási protokollok (pl. OSPF, BGP) segítségével, ami rugalmasabb és jól skálázható, nagy hálózatokban ideális, azonban erőforrás-igényesebb, és összetettebb konfigurációt igényel. Statikus útvonalakat kisebb hálózatokban, dinamikusat pedig nagyobb, változó hálózatokban érdemes alkalmazni.

 # Fastify
 Egy backend keretrendszer (framework), ami node.js-re épül.

 Forrás:
 https://fastify.dev/docs/v5.2.x/Guides/Getting-Started/

 ## Routes
 The route methods will configure the endpoints of your application. You have two ways to declare a route with Fastify: the shorthand method and the full declaration.
 
 A route-ot az alábbi módon lehet deklarálni: 
 ### Full declaration:
 * method: CRUD és néhány extra lehet
 * url: az elérési út
 * schema: egy olyan objektum, ami meghatározza a kérés (request) és a válasz (response) formáját
 * handler: Ez a kezelőfüggvény, amely akkor fut le, amikor valaki GET kérést küld a / útvonalra. Két argumentuma van:
** request: A beérkező kérést tartalmazza, beleértve a query string paramétereket is.
** reply: A válaszküldéshez használható objektum.
 ~~~javascript
 fastify.route({
  method: 'GET', // Lehet: GET, HEAD, TRACE, DELETE, OPTIONS, PATCH, PUT, POST
  url: '/', //az aloldal ahol megjelenik
  schema: { // egy olyan objektum, ami meghatározza a kérés (request) és a válasz (response) formáját
    querystring: { // például: http://localhost:3000/?name=John&excitement=5
      type: 'object', //  A query string egy objektumként értelmezendő
      properties: { // a querynek az alábbi property-eit várjuk el:
        name: { type: 'string' },
        excitement: { type: 'integer' }
      }
    },
    response: {
      200: {    // Ha 200-as (OK) státuszkód akkor az adat ilyen legyen:
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
 ~~~
 
 ### Shorhand declaration
    Itt a full-hoz képest úgy van átrendezve a dolog, hogy a CRUD metódus lesz, aminek a paramétere az url (itt: path), és a handler funkció.
 * fastify.get(path, [options], handler) 
 * fastify.head(path, [options], handler) 
 * fastify.post(path, [options], handler) 
 * fastify.put(path, [options], handler) 
 * fastify.delete(path, [options], handler) 
 * fastify.options(path, [options], handler) 
 * fastify.patch(path, [options], handler)

 ~~~javascript
 const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}
fastify.get('/', opts, (request, reply) => {
  reply.send({ hello: 'world' })
})
 ~~~
### Url building (Url felépítés)
Az URL (uniform resource locator) statikus és dinamikus is lehet.\ 
A dinamikushoz használható a kettőspont annak jelzésére, hogy paraméter követezik.
~~~javascript
// parametric
fastify.get('/example/:userId', function (request, reply) {
  // az elérési út: oldalam.hu/example/12345
  // userId === '12345'
  const { userId } = request.params;
  // your code here
})
fastify.get('/example/:userId/:secretToken', function (request, reply) {
  // az elérési út: oldalam.hu/example/12345/abc.zHi
  // userId === '12345'
  // secretToken === 'abc.zHi'
  const { userId, secretToken } = request.params;
  // your code here
})
~~~
Bármit helyettesítő, "wildcard" karakter a csillag (*)
~~~javascript
fastify.get(
    '/example/*', // azt jelenti, hogy a Fastify az összes olyan útvonalat elfogadja, amely a /example/-al kezdődik, és utána bármilyen további rész következik. 
    function (request, reply) {
  const wildcard = request.params['*']; // így érhető el a wildcard által jelölt url részlet
  reply.send({ message: `You accessed: ${wildcard}` });
  // http://localhost:3000/example/test-path esetén: 
  // {"message": "You accessed: test-path"}
});

~~~
Opcionális lehet az utolsó paraméter, ha kérdőjellel írjuk be 
~~~javascript
fastify.get('/example/posts/:id?', function (request, reply) {
  const { id } = request.params;
  // your code here
})
~~~
https://fastify.dev/docs/v5.2.x/Reference/Routes/#async-await

### Async Await
A szinkron reply.send() mellett lehetésges aszinkron módon is visszaküldeni a választ.
~~~javascript
fastify.get('/', options, async function (request, reply) {
  const data = await getData()
  const processed = await processData(data)
  return processed
})
~~~

Használható a .send metódus is, de ehhez aszinkron működést kell biztosítani:

~~~javascript
fastify.get('/', options, async function (request, reply) {
  setImmediate(() => {
    reply.send({ hello: 'world' })
  })
  await reply
})

~~~
A setImmediate itt azt biztosítja, hogy a reply.send() hívás ne azonnal, hanem a Node.js eseményhurok következő fázisában történjen meg.
Ez hasznos lehet, ha a válaszküldés előtt valamilyen másik aszinkron műveletet szeretnél még lefuttatni, vagy ha biztosítani akarod, hogy az aktuális függvény további műveletei (ha vannak) befejeződjenek, mielőtt a válasz elküldésre kerül.

## Learn Just Enough Fastify to be Productive
  https://www.youtube.com/watch?v=ZHLB4StAqPM&t=459s

  ### Egy Fastify szerver felépítése:

  ~~~typescript
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

fastify.post('api/users',{
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
  ~~~