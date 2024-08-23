const db = require("../config/db");

class School {
  static async addSchool(name, address, latitude, longitude) {
    const [result] = await db.execute(
      `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
      [name, address, latitude, longitude]
    );
    return result.insertId;
  }

  static async getAllSchools() {
    const [rows] = await db.query("SELECT * FROM schools");
    return rows;
  }
}

module.exports = School;
