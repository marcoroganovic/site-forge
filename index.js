var express = require("express"),
    bodyParser = require("body-parser"),
    app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var components = ["header", "hero", "content", "footer"];

app.get("/", (req, res) => {
  res.render("index", {
    components: components
  });
});


app.listen(PORT, () => {
  console.log("server running on port 3000");
}); 
