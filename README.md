# REST service

## Enklaste sättet
För att köra den här lösningen så används tomcat 10.0.7 (windows), enklast är att bara ladda ner tomcat katalogen och köra:  
tomcat\bin\startup.bat

## Hämta tomcat från källan
För att manuellt installera så hämtas samma version från https://tomcat.apache.org/download-10.cgi  
Ingen förändring är gjort i standardkonfigurationen

## Kopiera mina webapps färdigkompilerade
Kopiera 2st webapps från mitt git repository  
tomcat\webapps\backend  
tomcat\webapps\frontend

## Kompilera mina webapps
Om kompilering av mina java filer ska göras manuellt istället så behöver man org.json, finns på http://www.java2s.com/Code/Jar/o/Downloadorgjsonjar.htm  
Jag valde att lägga den i tomcat\lib  
  
javac BusinessCard.java  
javac BusinessCards.java  
javac -cp .;"<path_to_tomcat>\tomcat\lib\*" BusinessCardRest.java  
  
Lägg skapade class filer i tomcat\webapps\backend  
  
Katalogen tomcat\webapps\frontend innehåller bara index.html, main.js, style.css som bara behöver kopieras från mitt repository  

## Komma åt backend och frontend
Backend: http://localhost:8080/backend/BusinessCards/  
Frontend: http://localhost:8080/frontend/