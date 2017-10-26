var b = {
  "issues": [{
    "fields": {
      "status": {
        "id": "200",
        "name": "Backlog"
      }
    }
  }, {
    "fields": {
      "status": {
        "id": "202",
        "name": "close"
      }
    }
  }, {
    "fields": {
      "status": {
        "id": "201",
        "name": "close"
      }
    }
  }]
};

var counts = b.issues.reduce((p, c) => {
  var name = c.fields.status.name;
  if (!p.hasOwnProperty(name)) {
    p[name] = 0;
  }
  p[name]++;
  return p;
}, {});

console.log(counts);

var countsExtended = Object.keys(counts).map(k => {
  return {name: k, count: counts[k]}; });

console.log(countsExtended);