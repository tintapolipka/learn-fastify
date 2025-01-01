# Web Server Concepts and Examples
https://www.youtube.com/watch?v=9J1nJOivdyw
## What does a web server do?
It is listeneing on a port for a request, sent via a transport protocol, and returns a response, containing the requested resource.
 
Egy porton figyel egy kérésre, amelyet egy transzfer protokollon keresztül küldenek, majd választ küld vissza, amely tartalmazza a kért erőforrást.

### Listening on a port
 #### http://127.0.0.1 
 A webfejlesztésben ezt "localhost"-nak nevezzük.

Ez egy speciális tartománynév, amely az aktuális gépre utal, és általában a fejlesztés során használatos a helyi webszerver elérésére. Az "127.0.0.1" az IPv4-es címe a localhostnak.
Ez egy hálózati (network) port, amelyet az operációs rendszer üzemeltet. Ebből 65535 van, ezért ki kell jelölni, hogy melyiken folyjon a kommunikáció (melyiket figyelje a szerver).
Alapértelmezetten a a http:// protokollhoz a 80-as port tartozik (http://127.0.0.1:80/), míg a https://-hez a 443-as.