const http = require("http");
const app = require("./app");
const server = http.createServer(app);
require("./database/db");
const bcrypt = require("bcryptjs"); //import the database

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API documentation is running on http://localhost:${port}/docs`)

  const hashPassword = bcrypt.hashSync('admin', 10);
  let admin = {
    firstName: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: hashPassword,
    role: "admin",
  }
    //create a default admin
    const Admin = require("./models/adminModel");
    Admin.findOne({ email: admin.email })
        .then((result) => {
          if (!result) {
            Admin.create(admin)
                .then((result) => {
                  console.log("Default admin created");
                })
                .catch((err) => {
                  console.log(err);
                });
          }
        })
        .catch((err) => {
          console.log(err);
        });

    let category = {
        name: "category",
    }
    //create a default category
    const Category = require("./models/cateModel");
    Category.findOne({ name: category.name })
          .then((result) => {
            if (!result) {
              Category.create(category)
                  .then((result) => {
                    console.log("Default category created");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            }
          })
            .catch((err) => {
                console.log(err);
            });
});

