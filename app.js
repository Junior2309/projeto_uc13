const express = require('express'); //deixar padrão que o servidor web inicie automaticamente//

const app = express();

app.get("/", function(req, res){
    res.write("Hello Word!");
    res.end();
});

app.listen(8080);

