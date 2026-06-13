// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the database specified in MONGO_INITDB_DATABASE
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

// Create additional users if needed
// db.createUser({
//   user: "app_user",
//   pwd: "app_password",
//   roles: [
//     { role: "readWrite", db: "mydb" },
//     { role: "dbAdmin", db: "mydb" }
//   ]
// });

// Create sample collections
// db.createCollection("users");
// db.createCollection("products");

// Create indexes for better performance
// db.users.createIndex({ "email": 1 }, { unique: true });
// db.products.createIndex({ "name": "text" });

print("MongoDB initialization completed successfully!");
