/*const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    if (err) return res.status(400).json("Error hashing password");

    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => res.status(400).json("unable to register"));
  });
};

module.exports = {
  handleRegister: handleRegister,
};*/
const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    
    // Validate input fields
    if (!email || !name || !password) {
      return res.status(400).json("All fields are required");
    }
  
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        console.error("Hashing error:", err);
        return res.status(400).json("Error hashing password");
      }
  
      db.transaction(async (trx) => {
        try {
          const loginEmail = await trx("login")
            .insert({ hash: hash, email: email })
            .returning("email");
  
          const user = await trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            });
  
          await trx.commit();
          return res.json(user[0]); // ✅ Response sent only once
        } catch (error) {
          await trx.rollback();
          console.error("Registration error:", error);
          return res.status(400).json("Unable to register"); // ✅ Handles DB errors properly
        }
      });
    });
  };
  
  module.exports = {
    handleRegister,
  };