const ldb = require("../Utils/connection");
const db = ldb.promise();

const getProcessF = async (req, res) => {
  try {
    const response = await db.query(`select * from cpudata limit 1`);

    const ldatastring = response[0][0].ldata;
    const lpE = (ldatastring.match(/(\"estado\"\: \"0\")/g) || []).length;
    const lpS = (ldatastring.match(/(\"estado\"\: \"1\")/g) || []).length;
    const lpS2 = (ldatastring.match(/(\"estado\"\: \"2\")/g) || []).length;
    const lpD = (ldatastring.match(/(\"estado\"\: \"4\")/g) || []).length;
    const lpZ = (ldatastring.match(/(\"estado\"\: \"32\")/g) || []).length;

    const ltotales = {
      pE: lpE.toString(),
      pS: (lpS + lpS2).toString(),
      pD: lpD.toString(),
      pZ: lpZ.toString(),
      pT: (lpE + lpS + lpS2 + lpD + lpZ).toString(),
    };

    let lmeh = JSON.parse(
      ldatastring
        .replace(/(\"usuario\"\: \"0\")/g, '"usuario": "root"')
        .replace(/(\"usuario\"\: \"1\")/g, '"usuario": "daemon"')
        .replace(/(\"usuario\"\: \"2\")/g, '"usuario": "bin"')
        .replace(/(\"usuario\"\: \"3\")/g, '"usuario": "sys"')
        .replace(/(\"usuario\"\: \"4\")/g, '"usuario": "sync"')
        .replace(/(\"usuario\"\: \"5\")/g, '"usuario": "games"')
        .replace(/(\"usuario\"\: \"6\")/g, '"usuario": "man"')
        .replace(/(\"usuario\"\: \"7\")/g, '"usuario": "lp"')
        .replace(/(\"usuario\"\: \"8\")/g, '"usuario": "mail"')
        .replace(/(\"usuario\"\: \"9\")/g, '"usuario": "news"')
        .replace(/(\"usuario\"\: \"10\")/g, '"usuario": "uucp"')
        .replace(/(\"usuario\"\: \"13\")/g, '"usuario": "proxy"')
        .replace(/(\"usuario\"\: \"33\")/g, '"usuario": "www-data"')
        .replace(/(\"usuario\"\: \"34\")/g, '"usuario": "backup"')
        .replace(/(\"usuario\"\: \"38\")/g, '"usuario": "list"')
        .replace(/(\"usuario\"\: \"39\")/g, '"usuario": "irc"')
        .replace(/(\"usuario\"\: \"41\")/g, '"usuario": "gnate"')
        .replace(/(\"usuario\"\: \"65534\")/g, '"usuario": "nobody"')
        .replace(/(\"usuario\"\: \"100\")/g, '"usuario": "systemd-network"')
        .replace(/(\"usuario\"\: \"101\")/g, '"usuario": "systemd-resolve"')
        .replace(/(\"usuario\"\: \"102\")/g, '"usuario": "systemd-timesync"')
        .replace(/(\"usuario\"\: \"103\")/g, '"usuario": "messagebus"')
        .replace(/(\"usuario\"\: \"104\")/g, '"usuario": "syslog"')
        .replace(/(\"usuario\"\: \"105\")/g, '"usuario": "_apt"')
        .replace(/(\"usuario\"\: \"106\")/g, '"usuario": "tss"')
        .replace(/(\"usuario\"\: \"107\")/g, '"usuario": "uuidd"')
        .replace(/(\"usuario\"\: \"108\")/g, '"usuario": "tcpdump"')
        .replace(/(\"usuario\"\: \"65534\")/g, '"usuario": "sshd"')
        .replace(/(\"usuario\"\: \"110\")/g, '"usuario": "landscape"')
        .replace(/(\"usuario\"\: \"111\")/g, '"usuario": "pollinate"')
        .replace(/(\"usuario\"\: \"112\")/g, '"usuario": "_chrony"')
        .replace(/(\"usuario\"\: \"999\")/g, '"usuario": "systemd-coredump"')
        .replace(/(\"usuario\"\: \"1000\")/g, '"usuario": "ubuntu"')
        .replace(/(\"usuario\"\: \"998\")/g, '"usuario": "lxd"')
        .replace(/(\"usuario\"\: \"1001\")/g, '"usuario": "palenciaaby"')
        .replace(/(\"estado\"\: \"0\")/g, '"estado": "R"')
        .replace(/(\"estado\"\: \"1\")/g, '"estado": "S"')
        .replace(/(\"estado\"\: \"2\")/g, '"estado": "D"')
        .replace(/(\"estado\"\: \"4\")/g, '"estado": "T"')
        .replace(/(\"estado\"\: \"32\")/g, '"estado": "Z"')
    );

    let lres = []
    lres.push(lmeh)
    lres.push(ltotales)

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

const getCpuUsage = async (req, res) => {
  try {
    const response = await db.query(`select * from cpuusage limit 1`);

    let ldata = JSON.parse(response[0][0].ldata.replace("cpu-load", "cpuload"));

    let lusr = ldata.sysstat.hosts[0].statistics[0].cpuload[0].usr;
    let lnice = ldata.sysstat.hosts[0].statistics[0].cpuload[0].nice;
    let lsys = ldata.sysstat.hosts[0].statistics[0].cpuload[0].sys;
    let liowait = ldata.sysstat.hosts[0].statistics[0].cpuload[0].iowait;
    let lirq = ldata.sysstat.hosts[0].statistics[0].cpuload[0].irq;
    let lsoft = ldata.sysstat.hosts[0].statistics[0].cpuload[0].soft;
    let lsteal = ldata.sysstat.hosts[0].statistics[0].cpuload[0].steal;
    let lguest = ldata.sysstat.hosts[0].statistics[0].cpuload[0].guest;
    let lgnice = ldata.sysstat.hosts[0].statistics[0].cpuload[0].gnice;
    let ltotal =
      lusr + lnice + lsys + liowait + lirq + lsoft + lsteal + lguest + lgnice;

    let lres = [
      {
        totalcpu: ltotal.toFixed(2).toString(),
      },
    ];

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

module.exports = { getProcessF, getCpuUsage };