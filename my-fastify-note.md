# Web Server Concepts and Examples
https://www.youtube.com/watch?v=9J1nJOivdyw
## What does a web server do?
It is listeneing on a port for a request sent via a transport protocol, and returns a response, containing the requested resource.
 
Egy porton figyel egy kérésre, amelyet egy transzfer protokollon keresztül küldenek, majd választ küld vissza, amely tartalmazza a kért erőforrást.

### Listening on a port
 #### http://127.0.0.1 
 A webfejlesztésben ezt "localhost"-nak nevezzük.

Ez egy speciális tartománynév, amely az aktuális gépre utal, és általában a fejlesztés során használatos a helyi webszerver elérésére. Az "127.0.0.1" az IPv4-es címe a localhostnak.
Ez egy hálózati (network) port, amelyet az operációs rendszer üzemeltet. Ebből 65535 van, ezért ki kell jelölni, hogy melyiken folyjon a kommunikáció (melyiket figyelje a szerver).
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
 Ekkor meg kell adni a body adattípusát, ami most Content-Type: application/x-www-form-urlencoded , ezért a legutolsó sornam található body, key-value párokként értelmez a szerver, és ugyanúgy működik, mint egy query (urlencoded). Kötelező még az adat hossza, ami itt Content-Length: 27. Itt stringet küldenek a body-ban ami alapján tudja a szerver, hogy, hogy hol a vége az üzenetnek. Ha ha a body fájl, akkor azt tudja a szerver ebből, hogy mekkora a mérete byte-ban, így fel tud készülni a fogadásra is.

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