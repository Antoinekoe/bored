import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { dataGet: result, errorStatus: false });
  } catch (error) {
    res.render("index.ejs", {
      error: error.message,
      errorStatus: true,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const resultForm = await axios.get(
      "https://bored-api.appbrewery.com/filter?type=" +
        req.body.type +
        "&participants=" +
        req.body.participants
    );
    const resultFormData = resultForm.data;
    res.render("index.ejs", { dataPost: resultFormData, errorStatus: false });
  } catch (error) {
    res.render("index.ejs", {
      errorStatus: true,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
