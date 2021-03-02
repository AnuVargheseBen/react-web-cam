

* The code is completely built in react and typescript in front end and node.js in backend.
* Make use of express,axios,rest-api,nodemailer,html-pdf for backend services.
* The front-end is designed with react-webcam in Typescript.

## Setup
Clone this project. It have server and client part.
```bash
git clone https://anuvarghese1395@bitbucket.org/mieterengelgmbh/camera-challenge.git
```

#### Install dependency
```bash
npm install
```

#### Configuring environment variables
```bash
cp .env.example .env
# then configure variables according to you.
```
If the domain is Gmail enable [allow access](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Oz_tEIDJpsoljhn7l2X9rITFhWJJO7rtr9mKVemQfaxE7JEOVAuuLs_npkcXoW6THDVvovnhYKb)

#### To start server and client together
```bash
npm run start:all
```
You can access client [http://localhost:3000/](http://localhost:3000/)  
Server will up on http://localhost:3333/  

## Tested environment
* Node v12.16.3
* Chrome browser
* Not tested in mobile
* OS Windows 10

## What next?
* UX/UI improvements
* Add unit test
* Determine pdf image dimensions  from pdf format (A4/letter)
* Improvements on typescript(new to typescript)