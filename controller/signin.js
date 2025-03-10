const handleSignin = (req, res, db, bcrypt) => {
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      if (!data.length) {
        return res.status(400).json("Wrong credentials");
      }
      bcrypt.compare(req.body.password, data[0].hash, function (err, result) {
        if (result) {
          return db.select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then((user) => res.json(user[0]))
            .catch((err) => res.status(400).json("Unable to get user"));
        } else {
          return res.status(400).json('Wrong credentials')
        }
      });
    })
    .catch((err) => res.status(400).json("Wrong credentials"));
}

module.exports = {
    handleSignin: handleSignin,
}