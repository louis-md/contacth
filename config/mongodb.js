const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/contacth', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () =>
  console.log(`Connected to MongoDB at: ${process.env.MONGO_URI}`)
);

mongoose.connection.on("error", () =>
  console.log("Error connecting to MongoDB")
);
