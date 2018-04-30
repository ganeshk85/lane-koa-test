const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(8080, '0.0.0.0', function() {  
    console.log("My APP is running...");
});