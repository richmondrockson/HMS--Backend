import db from "../config/db.js";

// ✅ Get all patients
export const getPatients = (req, res) => {
  const sql = "SELECT * FROM patients";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching patients:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// ✅ Get a single patient by ID
export const getPatientById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM patients WHERE patient_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ message: "Patient not found" });
    res.json(results[0]);
  });
};

// ✅ Add a new patient
export const addPatient = (req, res) => {
  const { first_name, last_name, date_of_birth, gender, language } = req.body;

  if (!first_name || !last_name || !date_of_birth || !gender || !language) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO patients (first_name, last_name, date_of_birth, gender, language)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [first_name, last_name, date_of_birth, gender, language],
    (err, result) => {
      if (err) {
        console.error("Error adding patient:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res
        .status(201)
        .json({ message: "Patient added successfully", id: result.insertId });
    }
  );
};

// ✅ Update a patient
export const updatePatient = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, date_of_birth, gender, language } = req.body;

  const sql = `
    UPDATE patients
    SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, language = ?
    WHERE patient_id = ?
  `;

  db.query(
    sql,
    [first_name, last_name, date_of_birth, gender, language, id],
    (err, result) => {
      if (err) {
        console.error("Error updating patient:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Patient not found" });
      res.json({ message: "Patient updated successfully" });
    }
  );
};

// ✅ Delete a patient
export const deletePatient = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM patients WHERE patient_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting patient:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient deleted successfully" });
  });
};
