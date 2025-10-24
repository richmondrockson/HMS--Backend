import db from "../config/db.js";

// ✅ Get all admissions
export const getAllAdmissions = (req, res) => {
  const sql = ` SELECT a.admission_id, a.patient_id, p.first_firstname
                AS patient_first_name, p.last_name AS patient_last_name, 
                a.admission_date, a.service, a.primary_diagnosis 
   FROM admissions a
   JOIN patients p on a.patient_id = p.patient_id
   ORDER BY a.admission_date DESC`;
  db.query =
    (sql,
    (results, err) => {
      if (err) {
        console.err("Error fetching admissions", err);
        return res.status(500).json({ error: "Datbase error" });
      }
      return res.json(results);
    });
};

// ✅ Get a single admission by ID
export const getAdmissionById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM admissions WHERE admission_id = ?";
  db.query =
    (sql,
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching admission:", err);
        res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0)
        return res.status(404).json({ message: "Admission not found" });

      return res.json(results[0]);
    });
};

// ✅ Add a new admission
export const addAdmission = (req, res) => {
  const { patient_id, admission_date, service, primary_diagnosis } = req.body;

  if (!patient_id || !admission_date || !service || !primary_diagnosis) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO admissions (patient_id, admission_date, service, primary_diagnosis)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [patient_id, admission_date, service, primary_diagnosis],
    (err, results) => {
      if (err) {
        console.error("Error adding admission:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(201).json({
        message: "Admission added successfully",
        id: results.insertId,
      });
    }
  );
};

// ✅ Update an admission
export const updateAdmission = (req, res) => {
  const { id } = req.params;
  const { patient_id, admission_date, service, primary_diagnosis } = req.body;

  const sql = `
    UPDATE admissions
    SET patient_id = ?, admission_date = ?, service = ?, primary_diagnosis = ?
    WHERE admission_id = ?
  `;

  db.query(
    sql,
    [patient_id, admission_date, service, primary_diagnosis, id],
    (err, results) => {
      if (err) {
        console.error("Error updating admission:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.json({ message: "Admission updated successfully" });
    }
  );
};

// ✅ Delete an admission
export const deleteAdmission = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM admissions WHERE admission_id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error deleting admission:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({ message: "Admission deleted successfully" });
  });
};
