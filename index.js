const puppeteer = require("puppeteer");
const fs = require("fs");
var mysql = require('mysql');
const { DATE, NEWDATE } = require("mysql/lib/protocol/constants/types");

// var con = mysql.createConnection({
//   host: "45.252.250.11",
//   user: "owtrjssx_chikiet8",
//   password: "@hikiet88",
//   database: "owtrjssx_vietlot"
// });
var con  = mysql.createPool({
  connectionLimit : 10,
  acquireTimeout  : 10000,
  host: "45.252.250.11",
  user: "owtrjssx_chikiet8",
  password: "@hikiet88",
  database: "owtrjssx_vietlot"
});

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "test"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   let ketqua = '["04","05","09","11","12","18","19","20","21","24","33","38","41","43","44","48","54","68","76","77"]';
//   var sql = "INSERT INTO vietlot (Kyso, Ketqua) VALUES ('1', "+JSON.stringify(ketqua)+")";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
// con.connect(function(err) {
//     if (err) throw err;
    console.log("Connected!");
(async () => {
  var sql1 = "SELECT * FROM Vietlot ORDER BY id DESC LIMIT 1";
  let i = 0;
  await con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log(Object.values(JSON.parse(JSON.stringify(result)))[0].Kyso);
    x = Object.values(JSON.parse(JSON.stringify(result)))[0].Kyso;
  });
 const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  i =Number(x)+1;
  let j = i+1
//81320
//await page.waitForTimeout(10000);
 for(;;)
 {
   if(i<j)
   {
            await page.goto(`https://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/view-detail-keno-result?id=00${i}`);
            const songs = await page.evaluate(() => {
              let items = document.querySelectorAll(".bong_tron");
              let links = [];
              items.forEach(item => {
                links.push(item.innerText);
              });
              return links;
            });
            console.log(songs);
            if(songs.length>0)
            {
            //  await page.waitForTimeout(10000);
              let ketqua = JSON.stringify(songs);
              let Ngay = '2022-21-01';
              var sql = `INSERT INTO Vietlot (Kyso, Ketqua) VALUES (${i}, ${JSON.stringify(ketqua)})`;
              await con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(i+"record inserted");
              });
              i++;
              j++
            }
          else console.log("Chua So");
    // await page.waitForTimeout(10000);
  }
}
//await page.waitForTimeout(1000);
//   }
 // await browser.close();
})
(); 
//  });