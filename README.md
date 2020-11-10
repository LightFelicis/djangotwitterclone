# djangotwitterclone
Do postawienia aplikacji wymagane jest:
```
npm
django w wersji sensownie nowej (3.1)
```


Żeby uruchomić, proszę najpierw uruchomić środowisko wirtualne.

```
source /ŚCIEŻKA/DO/ŚRODOWISKA/bin/activate
```

Następnie w katalogu ```frontend``` proszę wywołać
polecenie

```
npm install
npm run build
```

Aby uruchomić serwer, proszę wywołać polecenie

```
python ./manage.py migrate
python ./manage.py runserver
```

