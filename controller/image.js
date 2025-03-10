const imageHandle = (req, res, db) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json("ID is required");
    }
  
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        if (entries.length) {
          res.json(entries[0].entries);
        } else {
          res.status(400).json("User not found"); 
        }
      })
      .catch((err) => {
        console.error("Database error:", err);
        res.status(400).json("Unable to get entries"); // Sends response only once
      });
  }

  module.exports = {
    imageHandle
  }