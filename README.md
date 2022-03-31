# Rastmobile Task
Projenin sadece back-end kısmı yapılmıştır. RESTful standartları gözetilerek geliştirilmiştir.
## Kurulum
```
npm install
```
komutu ile gerekli paketleri kuruyoruz.
```
app/config/db.config.js
```
içindeki ilgili alanları düzenledikten sonra DB alanıyla aynı isimde bir veritabanı oluşturulmalı.

```
node server.js
```
koutuyla çalıştırılabilir. 8080 portu dolu olabileceğinden 8081 portu üzerinden çalışmaktadır.