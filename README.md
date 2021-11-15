# High-School-DB

Site-ul consta in 3 pagini diferite: (cu cate un route pentru fiecare dintre ele)
-pagina principala
-pagina clasei
-pagina elevului

Baza de date impreuna cu fiecare tabel sunt create automata daca nu exista deja.
Baza de date este normalizata pentru a nu exista redundante.

Clasele sunt generate automat de la 9A pana la 12E.
Elevii pot fi generati automat, dar apar unele probleme, de acceea dupa ce o clasa este generata cel mai bine este sa se adauge fiecare elev in parte folosind butonul de adaugare elevi.
Notele trebuie introduse manual in pagina fiecarui elev.

Exista si posibilitatea de a adauga manual o clasa/elevi (insereazaInclasa() si insereazaElevi()).

Functiile fetch*() sunt pentru a afisa clasa/notele. Structura lor este asemanatoare:
-din tabelele din baza de date selectez numai campurile de care am nevoie
-verifica daca rezultatul nu e null(ex: o clasa nu are elevi sau un elev nu are note) si in caz ca este completez cu null la toate informatiile, alfel afisez toate informatiile
-in final trimit rezultatul la fisierul .ejs corespunzator

Functiile sterge/insereaza elev sunt apelate cand este apasat butonul corespunzator.

Toate informatiile pe care le obtin din baza de date sunt trimise si preluare de catre fron-end cu ajutorul ejs. Astfel, functiile de fetch*() trimit cate un obiect care mai apoi este preluat de o variabila din ejs si afisat corespunzator.