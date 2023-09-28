const ldb = require("../Utils/connection");
const db = ldb.promise();

const getRamdata = async (req, res) => {
  try {
    const response = await db.query(`select * from ramdata limit 1`);

    let ldata = response[0][0];
    let lpor = (parseFloat(ldata.used) * 100) / parseFloat(ldata.total);

    let lres = [{ totalram: (lpor.toFixed(2)).toString() }];

    res.json({
      status: true,
      resouerce: lres,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

module.exports = { getRamdata };