const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, resp, next)=>{
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +  '\n', (err)=>{
    if(err){
      console.log(err);
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+ '/public'));


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('ScreamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, resp)=>{
  // resp.send('<h1 style="color:red;">Hello Ibrokhim!</h1>');
  resp.render('Home.hbs', {
    pageTitle: 'Home Page',
    owner: 'Ibrokhim',
  });
});

app.get('/about', (req, resp)=>{
   resp.render('about.hbs', {
     pageTitle: 'About Page',
   });
});

app.get('/bad', (req, resp)=>{
  resp.send({
    error:'Bad request',
    code:404,
    message: 'No such page found',
    furtherActions: 'Type page name correctly and refresh your browser'
  });
});


app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});
