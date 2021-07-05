# REST service

## JAVA_HOME och jdk
Systemvariablen JAVA_HOME måste finnas som pekar mot jdk installation  
Jag har använt mig av OpenJDK 16.0.1 från https://docs.microsoft.com/en-us/java/openjdk/download  

## Enklaste sättet
För att köra den här lösningen så används tomcat 10.0.7 (windows), enklast är att bara ladda ner tomcat katalogen och köra:  
tomcat\bin\startup.bat  

## Hämta tomcat från källan
För att manuellt installera så hämtas samma version från https://tomcat.apache.org/download-10.cgi  
Ingen förändring är gjord i standardkonfigurationen

## Kopiera mina webapps färdigkompilerade
Kopiera 2st webapps från mitt git repository till egen tomcat installation  
tomcat\webapps\backend  
tomcat\webapps\frontend

## Kompilera mina webapps
Om kompilering av mina java filer ska göras manuellt istället så behöver man org.json, finns på http://www.java2s.com/Code/Jar/o/Downloadorgjsonjar.htm  
Jag valde att lägga den i tomcat\lib  
  
javac BusinessCard.java  
javac BusinessCards.java  
javac -cp .;"<path_to_tomcat>\tomcat\lib\*" BusinessCardRest.java  
  
Lägg skapade class filer i tomcat\webapps\backend\WEB-INF\classes   
  
Katalogen tomcat\webapps\frontend innehåller bara index.html, main.js, style.css som bara behöver kopieras från mitt repository  

## Komma åt backend och frontend
Backend: http://localhost:8080/backend/BusinessCards/  
Frontend: http://localhost:8080/frontend/