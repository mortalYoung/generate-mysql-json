const Crawler = require("crawler");
const fs = require("fs");

const generateKeywords = () => {
  const c = new Crawler({
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const $table = $("table.ws-table-all.notranslate");
        const tmp = [];
        $table.children().each((idx, ele) => {
          // skip table head
          if (idx) {
            const keyword = $(ele).children("td").first();
            const description = $(ele).children("td").last();
            tmp[idx - 1] = {
              keyword: $(keyword).text(),
              description: $(description).text(),
            };
          }
        });

        fs.writeFileSync("./keywords.json", JSON.stringify(tmp, null, 2));
      }
      done();
    },
  });

  c.queue("https://www.w3schools.com/sql/sql_ref_keywords.asp");
};

const generateFunctions = () => {
  const c = new Crawler({
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const $table = $("table.ws-table-all.notranslate");
        const tmp = [];
        $table.each((_, table) => {
          $(table)
            .children()
            .each((idx, ele) => {
              // skip table head
              if (idx) {
                const keyword = $(ele).children("td").first();
                const description = $(ele).children("td").last();
                tmp.push({
                  keyword: $(keyword).text(),
                  description: $(description).text(),
                });
              }
            });
        });
        fs.writeFileSync("./functions.json", JSON.stringify(tmp, null, 2));
      }
      done();
    },
  });

  c.queue("https://www.w3schools.com/sql/sql_ref_mysql.asp");
};

// generateKeywords();

// generateFunctions();
