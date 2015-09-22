var fs = require('fs');
var fixed = require('fixed');
var arinc_spec = require('../arinc/spec');

var commandLineArgs = require("command-line-args");
 
var cli = commandLineArgs([
    { name: "verbose", alias: "v", type: Boolean },
    { name: "filter", type: String, multiple: true, defaultOption: true },
    { name: "section", type: String, multiple: true },
    { name: "stats", type: Boolean },
]);
var options = cli.parse();
console.log(JSON.stringify(options));

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  //output: process.stdout
  terminal: false,
});

var recordtype = {
  section_field: 4,
  sections: {
    'D': {
      sub_section_field1: 5,
      sub_sections: {
        ' ': {
          name: 'VHF Navaid (PV)',
          spec: arinc_spec.vordme,
        },
        'B': {
          name: 'NDB Navaid (DB)',
          spec: arinc_spec.ndb,
        },
      },
    },
    'E': {
      sub_section_field1: 5,
      sub_sections: {
      'A': {
          name: 'Enroute Waypoint (EA)',
          spec: arinc_spec.wp,
        },
      'M': {
          name: 'Enroute Airway Marker (EM)',
          spec: undefined, // TODO
        },
      },
    },
    'P': {
      sub_section_field1: 5,
      sub_section_field2: 12,
      sub_sections: {
        'A': {
          name: 'Airport (PA)',
          spec: arinc_spec.aprt, // TODO
        }, /*
        'B': {
          name: 'Airport Gates (PB)',
          spec: undefined, // TODO
        }, */
        'C': {
          name: 'Terminal Waypoints (PC)',
          spec: arinc_spec.wp,
        }, /*
        'D': {
          name: 'Airport Standard Instrument Departures (SIDs) (PD)',
          spec: undefined, // TODO
        },
        'E': {
          name: 'Airport Standard Terminal Arrival Routes (STARs) (PE)',
          spec: undefined, // TODO
        },
        'F': {
          name: 'Airport Approaches (PF)',
          spec: undefined, // TODO
        }, */
        'G': {
          name: 'Airport Runway (PG)',
          spec: arinc_spec.rwy,
        },
        'V': {
          name: 'Airport Comm (PV)',
          spec: arinc_spec.aprt_com,
        },/*
        'N': {
          name: 'Airport and Heliport Terminal NDB (PN)',
          spec: undefined, // TODO
        },
        'I': {
          name: 'Airport and Heliport Localizer/Glide Slope (PI)',
          spec: undefined, // TODO
        },
        'K': {
          name: 'Airport TAA (Terminal Arrival Altitude) (PK)',
          spec: undefined, // TODO
        },
        'L': {
          name: 'Heliport MLS (PL)',
          spec: undefined, // TODO
        },
        'M': {
          name: 'Airport and Heliport Marker/Locator Marker (PM)',
          spec: undefined, // TODO
        },*/
        'N': {
          name: 'Airport Terminal NDB (PN)',
          spec: arinc_spec.ndb,
        }, /*
        'P': {
          name: 'Heliport Path Point (PP)',
          spec: undefined, // TODO
        },
        'R': {
          name: 'Flight Planning Arrival/Departure (PR)',
          spec: undefined, // TODO
        },
        'S': {
          name: 'Airport MSA (Minimum Sector Altitude) (PS)',
          spec: undefined, // TODO
        },
        'T': {
          name: 'GNSS Landing System (GNSS) (PT)',
          spec: undefined, // TODO
        }, */
      },
    },
    'U': {
      sub_section_field1: 5,
      sub_sections: {
        'C': {
          name: 'Controlled Airspace (UC)',
          spec: arinc_spec.as_ctl,
        },
        'R': {
          name: 'Restrictive Airspace (UR)',
          spec: arinc_spec.as_res,
        },
        'F': {
          name: 'FIR/UIR (UF)',
          spec: arinc_spec.fir_uir,
        }
      },
    },

    'H': { // Helicopter
      //ignore: true,
      sub_section_field1: 5,
      sub_section_field2: 12,
      sub_sections: {
        'A': {
          name: 'Heliport (HA)',
          spec: undefined, // TODO
        },
        'V': {
          name: 'Heliport Comm (HV)',
          spec: undefined, // TODO
        },
      }
    }
  }
}

var found = {};

var unknown = {};

rl.on('line', function(line) {
  var lt =  line[0];
  if (lt != 'S') {
    console.log("Ignoring invalid line: " + line);
    return;
  }
  var sid = line[recordtype.section_field];
  var stype = recordtype.sections[sid];
  if (stype && !stype.ignore) {
    var ssid = line[stype.sub_section_field1];
    if (ssid == ' ' && stype.sub_section_field2)
      ssid = line[stype.sub_section_field2];
    var sstype = recordtype.sections[sid].sub_sections[ssid];
    if (sstype) {
      // console.log(sid + ssid);
      if (!sstype.spec) {
        console.log("INFO: unknown type: "+sid+ssid);
        return;
      }
      var f = new fixed(sstype.spec[1]);
      var parsed = f.parse(line);
      var match = 1;
      if (options.section) {
        match = 0;
        for (var i in options.section) {
          if (sid+ssid == options.section[i])
              match = 1;
        }
      }
      if (options.filter) {
        for (var i in options.filter) {
          var f = options.filter[i].split("=");
          if (parsed[f[0]] != f[1]) { // no match?
            match = 0;
          }
        }
      }
      if (match) {
        if (options.verbose) {
          console.log(JSON.stringify(parsed));
        } else {
          console.log(line);
        }
        found[sid + ssid] = found[sid + ssid] ? found[sid + ssid] + 1: 1;
      }
      // if (sid + ssid == "PA")
      //  console.log(line);
    } else {
      console.log("INFO: Sub-Section unknown: " + sid + ssid +": "+line);
      unknown[sid + ssid] = unknown[sid + ssid] ? unknown[sid + ssid] + 1: 1;
    }
  } else if (!stype) {
    console.log("INFO: Section unknown: " + sid);
  }
});

rl.on('close', function() {
  if (options.stats) {
    console.log(JSON.stringify(found));
    console.log(JSON.stringify(unknown));
  }
})
