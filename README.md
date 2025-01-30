# Strona Internetowa koła naukowego AGH - 3 AXES
Strona wykonana na zaliczenie projektu z Wprowadzenia do Aplikacji Internetowych oraz na prośbę członków kółka naukowego.  \
Twórcy strony: Grzegorz Rybiński, Michał Ryz

## Set-up
W celu uruchomienia projektu na swoim urządzeniu musisz zainstalować program MySQL na swój komputer, dodać ścieżkę folderu bin do PATH-a w zmiennych środowiskowych, a następnie wykonać następujące kroki w terminalu: \
1. **mysql -u root -p**
2. jeśli jeszcze nie masz stworzonej bazy:  **CREATE DATABASE 3axes_db;**
3. **mysql -u root -p 3axes_db < 3axes_db.sql** - plik 3axes_db.sql znajduje się w plikach projektu
4. usataw to samo hasło dostępu do bazy: \
    ALTER USER 'root'@'localhost' IDENTIFIED BY 'avXwYdiEYN7V1ri';  \
    FLUSH PRIVILEGES; <br>

Po skonfigurowania bazy należy pobrać plik gmail_cert.crt i wgrać go do zaufanych certyfikatów SSL na swoim urządzeniu:
1. Otwórz Menedżer certyfikatów: Naciśnij Win + R, wpisz certmgr.msc i naciśnij Enter.
2. W oknie Menedżera certyfikatów przejdź do folderu Zaufane główne urzędy certyfikacji.
3. Kliknij prawym przyciskiem myszy na Certyfikaty i wybierz Wszystkie zadania > Importuj.
4. Postępuj zgodnie z kreatorem, aby zaimportować pobrany certyfikat.
5. Upewnij się, że certyfikat jest dodany do Zaufane główne urzędy certyfikacji.

## Struktura projektu
Projekt składa się z kilku głównych części:
### 1. Frontend:
Projekt jest napisany we frameworku React, w folderze ./src/components znajdują się pliki z komponentami użytymi do zbudowania strony. Główny plik App.tsx jest w folderze ./src. Styl projektu jest ustawiany w ./src/App.css. Poza głównymi zakładkami (Home, About us, Projects, Contact) można przejść do zakładki /admin w której po zalogowaniu istnieje możliwość zarządzania projektami. 
### 2. Backend:
Strona jest zarządzana przez plik server.js napisany przy użyciu Express-a. Plik zarządza enpointami i żądaniami przesłanymi z frontendu. Obsługuje odczytywanie,zapisywanie i edycję projektów znajdujących się w bazie oraz połączenie z pocztą dzięki czemu można wysyłać wiadomości e-mail przez formularz kontaktowy.
### 3. Tłumaczenia:
Na stronie znajduje się guzik służący do przełączenia języka strona z Angielskiego na Polski i odwrotnie. Do tłumaczenia została użyta biblioteka _react-i18next_. W folderze src dodany został plik konfiguracyjny i18n.js oraz folder locales w którym znajdują się tłumaczenia konkretnych fragmentów strony na oba języki.
### 4. Pliki:
Większość informacji znajduje się w dodanej wcześniej bazie danych jednak znajdują się tam tylko lokalizacji plików na serwerze, zdjęcia projektów znajdują się w folderze uploads, natomiast zdjęcia użyte np jako tło strony w folderze głównym projektu(3axes)

## Wykorzystane Języki, Biblioteki Technologie
+ TypeScript
+ JavaScript
+ Css
+ React
+ express
+ AOS
+ i18n
+ bcrypt
+ multer
+ nodemailer
+ JWT
+ MySQL
+ Npm React Gallery

