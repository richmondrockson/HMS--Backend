import db from "../config/db.js";

// ✅ Get all providers
export const getProviders = (req, res) => {
  const sql = "SELECT * FROM providers";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching providers:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// ✅ Get a single provider by ID
export const getProviderById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM providers WHERE provider_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching provider:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0)
      return res.status(404).json({ message: "Provider not found" });
    res.json(results[0]);
  });
};

// ✅ Add a new provider
export const addProvider = (req, res) => {
  const {
    first_name,
    last_name,
    email_address,
    phone_number,
    provider_specialty,
    date_joined,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email_address ||
    !phone_number ||
    !provider_specialty ||
    !date_joined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO providers 
    (first_name, last_name, email_address, phone_number, provider_specialty, date_joined)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      first_name,
      last_name,
      email_address,
      phone_number,
      provider_specialty,
      date_joined,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding provider:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res
        .status(201)
        .json({ message: "Provider added successfully", id: result.insertId });
    }
  );
};

// ✅ Update a provider
export const updateProvider = (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email_address,
    phone_number,
    provider_specialty,
    date_joined,
  } = req.body;

  const sql = `
    UPDATE providers
    SET first_name = ?, last_name = ?, email_address = ?, phone_number = ?, 
        provider_specialty = ?, date_joined = ?
    WHERE provider_id = ?
  `;

  db.query(
    sql,
    [
      first_name,
      last_name,
      email_address,
      phone_number,
      provider_specialty,
      date_joined,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating provider:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Provider not found" });
      res.json({ message: "Provider updated successfully" });
    }
  );
};

// ✅ Delete a provider
export const deleteProvider = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM providers WHERE provider_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting provider:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Provider not found" });
    res.json({ message: "Provider deleted successfully" });
  });
};
