const Guardian = require('guardian-js');
const fs = require('fs');
var json2csv = require('json2csv').parse;

const apiKey = '072461b6-1122-4528-9a66-71b880557b7a'
const guardian = new Guardian(apiKey, false);
var company = "facebook"
guardian.content.search(company, {
    tag: 'technology/'+company,
    fromDate: '2013-02-02',
    toDate: '2018-02-07'

  }).then(data => {
      let data_body = data.body;
      let jsonData = JSON.parse(data_body);
      let pages = jsonData.response.pages;
      let results = jsonData.response.results;
      for (each of results){
        var csvData = [
        each['webPublicationDate'], 
         each['webTitle']
        ]
        //var writeData = json2csv(csvData) + '\n'
        fs.appendFileSync(company+".csv", csvData + '\n')
      }
      for (i=2; i<=pages; i++){
        guardian.content.search(company, {
            tag: 'technology/'+company,
            fromDate: '2013-02-02',
            toDate: '2018-02-07',
            page: i
        
          }).then(data => {
              let data_body = data.body;
              let jsonData = JSON.parse(data_body);
              let results = jsonData.response.results;
              for (each of results){
                var csvData = [
                each['webPublicationDate'], 
                 each['webTitle']
                ]
                //var writeData = json2csv(csvData) + '\n'
                fs.appendFileSync(company+".csv", csvData + '\n')
              }})
      }
    })