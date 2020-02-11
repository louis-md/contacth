const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () =>
  console.log(`Connected to MongoDB at: ${process.env.MONGO_URI}`)
);

mongoose.connection.on("error", () =>
  console.log("Error connecting to MongoDB")
);
