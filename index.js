var xmlStream = require('xml-stream');

var fs = require('fs');
var fixed = require('fixed');
var unidecode = require('unidecode');
var merge = require('object-mapper').merge;

var arinc_spec = require('./arinc/spec');

var file_in = 'ofmdata/merged.xml';
//var file_in = 'ofmdata/lsas.xml';
//var file_in = 'ofmdata/lovv.xml';
//var file_in = 'ofmdata/ed.xml';
var file_out = "out.txt";

var out_stream = fs.createWriteStream(file_out);

// before running out of record ids, reset (as in example file)
var maxRecIdBeforReset = 80000;


function fwidth(v, width) {
	var x = v.toString();
	while (x.length < width) {
		x = '0' + x;
	}
	return x;
}

function lat2arinc(val) {
	var res = '';
	if (val && val.length > 0) {
		var x = val[val.length - 1];
		var v = val.substring(0, val.length - 1);
		if (!isNaN(parseFloat(x))) { // gml syntax
			x = val < 0 ? 'S' : 'N';
			v = Math.abs(val);
		}
		var f = parseFloat(v);
		if (f) {
			var inms = Math.round(f * 60 * 60 * 100);
			var ms = inms % 100;
			var s = Math.floor(inms / 100) % 60;
			var m = Math.floor(inms / 100 / 60) % 60;
			var d = Math.floor(inms / 100 / 60 / 60);
			res = x + fwidth(d, 2) + fwidth(m, 2) + fwidth(s, 2) + fwidth(ms, 2);
		}
	}
	else {
		console.log("WARNING: lat2arinc empty value");
	}
	return res;
}

function long2arinc(val) {
	var res = '';
	if (val && val.length > 0) {
		var x = val[val.length - 1];
		var v = val.substring(0, val.length - 1);
		if (!isNaN(parseFloat(x))) { // gml syntax
			x = val < 0 ? 'W' : 'E';
			v = Math.abs(val);
		}
		var f = parseFloat(v);
		if (f) {
			var inms = Math.round(f * 60 * 60 * 100);
			var ms = inms % 100;
			var s = Math.floor(inms / 100) % 60;
			var m = Math.floor(inms / 100 / 60) % 60;
			var d = Math.floor(inms / 100 / 60 / 60);
			res = x + fwidth(d, 3) + fwidth(m, 2) + fwidth(s, 2) + fwidth(ms, 2);
		}
	}
	else {
		console.log("WARNING: long2arinc empty value");
	}
	return res;
}

function str2arinc(val, maxlen) {
	var val = val == undefined ? '' : val;
	return unidecode(val).toUpperCase().substring(0, maxlen ? maxlen : 30);
	// TODO remove special chars
}

function decl2arinc(val) {
    
    if (val == undefined) {
            val = 0;
    }

	return (val < 0 ? 'W' : 'E') + fwidth(Math.round(val * 10), 4);
}

function convertUnit(val, fromUnit, toUnit) {
	var x = parseFloat(val);
	if (isNaN(x) || val == undefined)
		return undefined;
	if (fromUnit == toUnit)
		return x;
	if (fromUnit == 'M' && toUnit == 'FT') {
		return Math.round(x * 3.2808);
	}
	if (fromUnit == 'FL' && toUnit == 'FT') {
		return x * 100;
	}
	if (fromUnit == 'KHZ' && toUnit == 'MHZ') {
		return Math.round(x / 1000);
	}
	throw new Error("Invalid conversion from " + fromUnit + " to " + toUnit);
}

function formatAltitude(v, uom, code) {
	// return {limit: 'value', unit: 'M'} unit M = MSL, A = AGL
	var invalid = undefined;
	var v = parseInt(v);
	
	if ((v == undefined) || isNaN(v)) {
		console.log("WARNING: formatAltitude, not a number:" + v + " " + uom + " for "+code);
		return invalid;
	}
	
	if (code == "HEI") {
		if (uom != 'FT' && uom != 'M') {
			console.log("WARNING: invalid uom: " + uom + " for "+code);
			return invalid;
		}
		if (v == 0) { // special case for GND
			return {limit: 'GND', unit: ''};
		}
		return {limit: fwidth(convertUnit(v, uom, 'FT'), 5), unit: 'A'};
	} else if (code == "ALT") {
		if (uom != 'FT' && uom != 'M') {
			console.log("WARNING: invalid uom: " + uom + " for "+code);
			return invalid;
		}
		return {limit: fwidth(convertUnit(v, uom, 'FT'), 5), unit: 'M'};
	} else if (code == "STD") {
		if (uom != 'FL') {
			console.log("WARNING: invalid uom: " + uom + " for "+code);
			return invalid;
		}
		if (v == 0) { // special case for MSL
			return {limit: 'MSL', unit:''};
		} else if (v >= 500)  { // special case for unlimited
			return {limit: 'UNLTD', unit:''};
		}
		return {limit: "FL" + fwidth(v, 3), unit: 'M'};	
	} else {
		console.log("WARNING: invalid alt code: "+code);
		return invalid;	
	}
}


function writeRecord(line) {
	out_stream.write(line);
}

// generates an arinc424 record
function generateAndWriteRecord(template, data, cont_nr) {
	if (cont_nr == undefined) {
		cont_nr = 0;
	}

	var ft = new fixed(template[cont_nr == 0 ? 1 : cont_nr]);
	data.cont_nr = cont_nr;
	var record = ft.generate(data);
	writeRecord(record);
}

function map_comm_type(ofm) {
	var map = {
		'ATIS': 'ATI',
		'INFO': 'INF', // AD Info frequency, UNI?, TODO
		'FIC': 'INF', // Flight *Information* Center
		'APP': 'APP',
		'TWR': 'TWR',
		'SMC': 'GND', // Surface movement control
	}
	var result = map[ofm];
	if (result)
		return result
	else {
		console.log("WARNING: Unknown comm type: " + ofm);
		return undefined;
	}
}

function map_comm_service(ofm) {
	var map = {
		//'ATIS': 'ATI',
		'INFO': 'S  ', // AD Info frequency, unicom, some map this also to INF, TODO
		'FIC': 'F  ', // Flight *Information* Center
		'ATIS':'   ',
		'APP' :'   ',
		'TWR': '   ',
		'SMC': '   ', // Surface movement control
	}
	var result = map[ofm];
	if (result)
		return result
	else {
		console.log("WARNING: Unknown comm service: " + ofm);
		return undefined;
	}
}

var current_record_nr = 1;

// write headers
generateAndWriteRecord(arinc_spec.header, {}, 1);
generateAndWriteRecord(arinc_spec.header, {}, 2);

// Cache Hack
var in_cache_stream = fs.createReadStream(file_in);
var xml1 = new xmlStream(in_cache_stream);
var xml_cache = [];

// Fill cache first
// Airport
xml1.on('updateElement: Ahp', function(data) {
	// add to cache
	xml_cache[data.AhpUid.$.mid] = data;
});

// Runway
xml1.on('updateElement: Rwy', function(data) {
	// add to cache
	xml_cache[data.RwyUid.$.mid] = data;
});

// Unit
xml1.on('updateElement: Uni', function(data) {
	// add to cache
	xml_cache[data.UniUid.$.mid] = data;
});

// Airspace with common geometry
xml1.collect("AdgUid");
xml1.on('updateElement: Adg', function(data) {
	for (var ase in data.AdgUid) {
		// write mid of AseUidSameExtent into cache as AdgMap:XXX
		xml_cache["AdgMap:" + data.AdgUid[ase].AseUid.$.mid] = data.AseUidSameExtent.$.mid;
	}
});

// Airspace
xml1.on('updateElement: Ase', function(data) {
	if (data.gmlPosList) {
		// gmlPosList record, add to cache
		xml_cache["gml:" + data.$.mid] = data;
	} else {
		// normal record, also cache
		xml_cache[data.AseUid.$.mid] = data;
	}
});

xml1.on("end", function() {

	var in_stream = fs.createReadStream(file_in);
	// Parse XML
	var xml = new xmlStream(in_stream);

	//// Waypoints
	// VOR  
	xml.on('updateElement: Vor', function(data) {
		try{
		if (isNaN(data.valFreq)){
			console.log("WARNING: VOR frequency " +  data.VorUid.codeId + " is NaN, ignoring.");
			return;
		}
			
			if (current_record_nr >= maxRecIdBeforReset) {
				current_record_nr = 1
			};	

		var arinc_data = {
			section: 'D', // NAVAID
			vor_ident: data.VorUid.codeId, // VOR identifier
			vor_icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
			cont_nr: 0,
			vor_freq: data.valFreq * 100, // VOR frequency
			navaid_class_type1: 'V',
			navaid_class_range: 'U', // TODO: range undefined
			navaid_class_addinfo: 'W', // TODO: no voice on frequency
			navaid_class_colocation: '', // no colocated facility
			vor_latitude: lat2arinc(data.VorUid.geoLat),
			vor_longitude: long2arinc(data.VorUid.geoLong),
			station_declination: decl2arinc(data.valMagDecl),
			merit: 1, // TODO: 0=Terminal, 1=Low, 2=High
			//freq_pro:, // TODO
			navaid_name: str2arinc(data.txtName),
			record_nr: current_record_nr++,
			cycle: 1, //TODO
		};
		if (data.codeType == 'DVOR') {
			arinc_data.navaid_class_type2 = 'D';
			arinc_data.dme_latitude = lat2arinc(data.VorUid.geoLat);
		    arinc_data.dme_longitude = long2arinc(data.VorUid.geoLong);
            arinc_data.dme_elevation = parseInt(data.valElev);
            if (isNaN(arinc_data.dme_elevation)) {
                console.log("WARNING: VOR dme_elevation missing. ignoring." + data.VorUid.codeId);
                return;
            }
		}

		generateAndWriteRecord(arinc_spec.vordme, arinc_data);
		}
			catch (err) {
			console.log("ERROR parsing VOR: " + err);
		}
	});

	// DME
	xml.on('updateElement: Dme', function(data) {
		try {
			if (isNaN(data.valFreq)) {
				console.log("WARNING: DME frequency " + data.DmeUid.codeId + " is NaN, ignoring.");
				return;
			}
			
			if (current_record_nr >= maxRecIdBeforReset) {
				current_record_nr = 1
			};	
			
			var arinc_data = {
				section: 'D', // NAVAID
				vor_ident: data.DmeUid.codeId, // DME identifier
				vor_icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
				cont_nr: 0,
				vor_freq: data.valFreq * 100, // VOR-equivalent frequency
				navaid_class_type1: '',
				navaid_class_type2: 'D',
				navaid_class_range: '', // TODO: range undefined
				navaid_class_addinfo: '', // no voice on frequency
				navaid_class_colocation: '', // no colocated facility
				dme_ident: data.DmeUid.codeId, // DME identifier
				dme_latitude: lat2arinc(data.DmeUid.geoLat),
				dme_longitude: long2arinc(data.DmeUid.geoLong),
				dme_elevation: parseInt(data.valElev),
				merit: 1, // TODO: 0=Terminal, 1=Low, 2=High
				//freq_pro:, // TODO
				navaid_name: str2arinc(data.txtName),
				record_nr: current_record_nr++,
				cycle: 1, //TODO
			};
			generateAndWriteRecord(arinc_spec.vordme, arinc_data);
		}
			catch (err) {
			console.log("ERROR parsing DME: " + err);
		}
	});

	// NDB
	xml.on('updateElement: Ndb', function (data) {
		try {
			
			if (current_record_nr >= maxRecIdBeforReset) {
				current_record_nr = 1
			};	

		var arinc_data = {
			section: 'D', // NAVAID
			sub_section: 'B', // NDB
			ndb_ident: data.NdbUid.codeId, // NDB identifier
			ndb_icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
			cont_nr: 0,
			ndb_freq: data.valFreq * 10, // Ndb frequency
			navaid_class_type1: 'H',
			navaid_class_type2: '',
			navaid_class_range: 'M', // TODO: range undefined
			navaid_class_addinfo: 'W', // no voice on frequency
			navaid_class_colocation: '', // no colocated facility
			ndb_latitude: lat2arinc(data.NdbUid.geoLat),
			ndb_longitude: long2arinc(data.NdbUid.geoLong),
			mag_variation: decl2arinc(data.valMagVar),
			merit: 1, // TODO: 0=Terminal, 1=Low, 2=High
			//freq_pro:, // TODO
			navaid_name: str2arinc(data.txtName),
			record_nr: current_record_nr++,
			cycle: 1, //TODO
		};
			generateAndWriteRecord(arinc_spec.ndb, arinc_data);
		}
			catch (err) {
			console.log("ERROR parsing NDB: " + err);
		}
	});

	// Designated Point / Reporting Points
          xml.on('updateElement: Dpn', function (data) {
              if ((data.codeType == 'VFR-RP') || (data.codeType == 'VFR-MRP'))
              {
                  try {

                      if (current_record_nr >= maxRecIdBeforReset) {
                          current_record_nr = 1
                      };

                      var ident = str2arinc(data.DpnUid.codeId, 5);
                      if (ident == "") {
                          console.log("INFO: waypoint has no ident: " + data.txtName)
                          ident = str2arinc(data.txtName, 5);
                      }
                      // Enroute Waypoints (EA) / Terminal Waypoint (PC)
                      var arinc_data = {
                          icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
                          ident: ident,
                          cont_nr: 0,
                          wpt_type: 'V', // TODO: all are VFR RP
                          latitude: lat2arinc(data.DpnUid.geoLat),
                          longitude: long2arinc(data.DpnUid.geoLong),
                          name: str2arinc(data.txtName),
                          record_nr: current_record_nr++,
                          cycle: 1, //TODO
                      };
                      if (data.AhpUid_codeId) { // Terminal WP
                          arinc_data.section = 'P';
                          arinc_data.sub_section_13 = 'C';
                          arinc_data.aprt_ident = data.AhpUid_codeId;
                          arinc_data.aprt_icao_code = data.$.xt_fir.substring(0, 2); // ICAO code
                      }
                      else { // Enroute Waypoint
                          arinc_data.section = 'E';
                          arinc_data.sub_section_6 = 'A';
                          arinc_data.aprt_ident = 'ENRT';
                          arinc_data.icao_code = data.$.xt_fir.substring(0, 2); // ICAO code
                      }
                      generateAndWriteRecord(arinc_spec.wp, arinc_data);
                      //console.log(JSON.stringify(data) + "\n\n");
                  }
                  catch (err) {
                      console.log("ERROR parsing Point: " + err);
                  }
         
              }
          });	

	// Airport
	xml.on('updateElement: Ahp', function (data) {
		
		try{
		// add to cache
		if (data.codeType != 'AD') {
			console.log("INFO: Skipping AD " + data.AhpUid.codeId + " type: " + data.codeType);
			return;
		}
		
		if (data.AhpUid.codeId.length != 4) {
			console.log("INFO: Skipping AD " + data.AhpUid.codeId + " code not 4 chars: " + data.AhpUid.codeId);
			return;
			}
			
			if (current_record_nr >= maxRecIdBeforReset) {
				current_record_nr = 1
			};	

		var arinc_data = {
			section: 'P', // Airport
			sub_section: 'A', // Airport
			name: str2arinc(data.txtName),
			ident: data.AhpUid.codeId, // identifier
			icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
			ifr: data.xt_TypeOfTraffic.Ifr == "" ? 'Y' : 'N',
			latitude: lat2arinc(data.geoLat),
			longitude: long2arinc(data.geoLong),
			mag_variation: decl2arinc(data.valMagVar),
			elevation: convertUnit(data.valElev, data.uomElev, 'FT'),
			record_nr: current_record_nr++,
			cycle: 1, //TODO
		};
			generateAndWriteRecord(arinc_spec.aprt, arinc_data);
       

        // also put frequency record, if available
            if (data.xt_addFreq != undefined) {
                freq = convertUnit(parseFloat(data.xt_addFreq), "MHZ", "MHZ");
                
                if (data && data.codeType == 'AD') {
                    var arinc_data = {
                        section: 'P', // Airport Comm
                        sub_section: 'V', // Airport Comm
                        ident: data.codeIcao, // identifier
                        icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
                        comm_type: map_comm_type('INFO'),
                        comm_freq: Math.round(freq * 1000),
                        freq_unit: 'V', // only VHF supported so far. TODO
                        service_ind: map_comm_service('INFO'),
                        modulation: 'A', // only AM supported
                        latitude: lat2arinc(data.geoLat),
                        longitude: long2arinc(data.geoLong),
                        mag_variation: decl2arinc(data.valMagVar),
                        elevation: convertUnit(data.valElev, data.uomElev, 'FT'),
                        callsign: str2arinc(data.codeIcao + ' INFO', 25),
                        record_nr: current_record_nr++,
                        cycle: 1, //TODO
                    };
                    
                    generateAndWriteRecord(arinc_spec.aprt_com, arinc_data);
                }
            }
            
                } catch(err) {
			console.log("ERROR parsing Airport: " + err);
		}
	});


	// Frequency
	xml.on('updateElement: Fqy', function (data) {
		
		try {
			
			if (current_record_nr >= maxRecIdBeforReset) {
				current_record_nr = 1
			};	
            

			if (!data.uomFreq) {
				console.log("WARNING: uomFreq missing. ignoring." + data.valFreqRec);
				return;
			}
			var freq = convertUnit(parseFloat(data.valFreqRec), data.uomFreq, "MHZ");
			if (freq < 30 || freq > 200) {
				console.log("WARNING: only VHF supported, ignoring.");
				return;
			}
			
			var uni = xml_cache[data.FqyUid.SerUid.UniUid.$.mid];
			if (!uni) {
				console.log("WARNING: frequency " + freq + " has no UNI, ignoring.");
			}
			
			if (isNaN(freq)) {
				console.log("WARNING: frequency " + freq + " is NaN, ignoring.");
				return;
			}
            
            if (uni.AhpUid.$ != undefined){
			var apt = xml_cache[uni.AhpUid.$.mid];
			
            if (apt && apt.codeType == 'AD') {
                var arinc_data = {
                    section: 'P', // Airport Comm
                    sub_section: 'V', // Airport Comm
                    ident: apt.AhpUid.codeId, // identifier
                    icao_code: apt.$.xt_fir.substring(0, 2), // ICAO code
                    comm_type: map_comm_type(data.FqyUid.SerUid.codeType),
                    comm_freq: Math.round(freq * 1000),
                    freq_unit: 'V', // only VHF supported so far. TODO
                    service_ind: map_comm_service(data.FqyUid.SerUid.codeType),
                    modulation: 'A', // only AM supported
                    latitude: lat2arinc(apt.geoLat),
                    longitude: long2arinc(apt.geoLong),
                    mag_variation: decl2arinc(apt.valMagVar),
                    elevation: convertUnit(apt.valElev, apt.uomElev, 'FT'),
                    callsign: str2arinc(data.Cdl.txtCallSign, 25),
                    record_nr: current_record_nr++,
                    cycle: 1, //TODO
                };
           
				generateAndWriteRecord(arinc_spec.aprt_com, arinc_data);
            }
        }
			else {
				console.log("WARNING: frequency " + freq + " has no real APT, ignoring.");
			}
		}
			catch (err) {
			console.log("ERROR parsing Frequency: " + err);
		}
	});


	// Runway
	xml.on('updateElement: Rdn', function (data) {
		
		
        try {
            

			
			if (current_record_nr >= maxRecIdBeforReset) {
				current_record_nr = 1
			};	

		var apt = xml_cache[data.RdnUid.RwyUid.AhpUid.$.mid];
		if (!apt) {
			console.log("WARNING: Skipping RWY of AD " + apt.AhpUid.codeId + " missing APT.");
			return;
            }
            
		if (apt.AhpUid.codeId.length != 4) {
			console.log("INFO: Skipping AD " + apt.AhpUid.codeId + " code not 4 chars: " + apt.AhpUid.codeId);
			return;
		}

		if (apt.codeType != 'AD') {
			console.log("INFO: Skipping RWY of AD " + apt.AhpUid.codeId + " type: " + apt.codeType);
			return;
		}
		
		var rwy = xml_cache[data.RdnUid.RwyUid.$.mid];
		if (!rwy) {
			console.log("WARNING: Skipping RWY of AD " + apt.AhpUid.codeId + " missing RWY.");
			return;
		}		

		if (lat2arinc(data.geoLat) == "" || long2arinc(data.geoLong) == "") {
			console.log("WARNING: missing threshold coordinates:"+ apt.AhpUid.codeId);
		}

		if (!rwy.uomDimRwy) {
			console.log("WARNING: invalid Rwy Dimensions, ignoring RWY "+  apt.AhpUid.codeId);
			return;
		}
			
		if (parseFloat(data.valTrueBrg) < 0) { data.valTrueBrg = parseFloat(data.valTrueBrg) + 360; }	
            
            if (data.valTrueBrg == 0) {
                console.log("WARNING: bearing is ZERO " + apt.AhpUid.codeId);
            }    

		var arinc_data = {
			section: 'P', // Runway
			sub_section: 'G', // Runway
			//name: str2arinc(data.RdnUid.txtDesig),
			aprt_ident: data.RdnUid.RwyUid.AhpUid.codeId, // identifier
			ident: 'RW' + str2arinc(data.RdnUid.txtDesig).substring(0, 3), //name
			icao_code: data.RdnUid.RwyUid.AhpUid.codeId.substring(0, 2), // ICAO code
				rwy_len: convertUnit(rwy.valLen, rwy.uomDimRwy, 'FT'),
				
				
				rwy_brg: Math.round(parseFloat(data.valTrueBrg) * 10),
				latitude: lat2arinc(data.geoLat),
				longitude: long2arinc(data.geoLong),
				elevation: convertUnit(apt.valElev, apt.uomElev, 'FT'),
				dsplcd_thr: convertUnit(data.xt_valDispTres, data.xt_uomDispTres, 'FT'),
				rwy_width: convertUnit(rwy.valWid, rwy.uomDimRwy, 'FT'),
				record_nr: current_record_nr++,
				cycle: 1, //TODO
		};
			generateAndWriteRecord(arinc_spec.rwy, arinc_data);

		}
		catch (err) {
			console.log("ERROR parsing Runway: " + err );
		}

	});


	// Airspace
	xml.on('updateElement: Ase', function (data) {
        try {
            
          // DEBUG
          //  if ((data.AseUid.$.mid == '7094')) {
          //      var z = 4;
          //  }
            
            
        
            
            
            switch (data.$.xt_fir) {
                case 'LOVV':
                    // exclude national parks (NRAs) in austria
                    if (data.AseUid.codeType == 'NRA') {
                        console.log("INFO: Filtering (ignoring) NRAs for region " + data.$.xt_fir);
                        return;
                    }
                    break;
               
                default:     
            } 
	 
			if (current_record_nr >= maxRecIdBeforReset) {
				current_record_nr = 1
			};	

		if (data.gmlPosList) {
			// gmlPosList record, ignore
			return;
		}
		if (!data.$ || !data.$.xt_fir) { // no FIR
			console.log("WARNING: skipping AS, no FIR: " + data.txtName);
			//return;
			data.$ = {xt_fir: "LOVV"}; //TODO, remove HACK!!!
		}
		
		var codeType = data.AseUid.codeType;
		var baseLayer = data; // baseLayer = self, by default
		
		// Class layer of airspace, fetch base layer
		if (codeType == "CLASS") {
			baseLayer = xml_cache[xml_cache["AdgMap:"+data.AseUid.$.mid]];
			if (!baseLayer) {
				console.log("WARNING: base layer of AS "+ data.txtName + " not found, ignoring.");
				return;
			}
			codeType = baseLayer.AseUid.codeType;
		}

		var lower = formatAltitude(data.valDistVerLower, data.uomDistVerLower, data.codeDistVerLower);
		var upper = formatAltitude(data.valDistVerUpper, data.uomDistVerUpper, data.codeDistVerUpper);
		
		// FIXUPs, TODO
        if (!upper) {
            console.log("WARNING: missing upper for " + data.txtName + ", ignoring");
        	return;
        }
		if (!lower) {
			console.log("WARNING: missing lower for " + data.txtName + ", ignoring");
			return;
            }
  
		//console.log(JSON.stringify(data) + "\n\n");
		var arinc_data = {
			icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
			name: str2arinc(codeType + ' ' + data.txtName), // added codetype in Name
																 // instead LOWW 3 -> LOWW 3 TM
			designator: str2arinc(data.txtName, 10), //TODO, missing designator field
			ident: str2arinc(data.txtName, 4), // TODO, for FIR/UIR only
			as_class: data.codeClass,
			appl_type: "T", // T = opening times, TODO??
			lower: lower.limit,
			lower_unit: lower.unit,
			upper: upper.limit,
			upper_unit: upper.unit,
			ctrl_agency: "", // TODO
			record_nr: current_record_nr++,
			seq_nr: 9, // TODO, HACK, start at 10, bug in some importers
			cycle: 1, //TODO
		};

		// record types:
		// FIR/UIR (UF)
		// Controlled airspace (UC) arinc_spec.as_ctl
		// *5.213 Controlled Airspace Type (ARSP TYPE)
		// *Field
		// A - Class C Airspace (Was ARSA within the USA).
		// C - Control Area, ICAO Designation (CTA).
		// M - Terminal Control Area, ICAO Designation (TMA or TCA).
		// R - Radar Zone or Radar Area (Was TRSA within the USA).
		// T - Class B Airspace (Was TCA with the USA).
		// Z - Class D Airspace within the USA, Control Zone, ICAO Designation (CTR).

		// Restrictive airspaces (UR) arinc_spec.as_res
		var as_types = {
			'D': {
				is_restricted: true,
				res_type: 'D',
			},
			'P': {
				is_restricted: true,
				res_type: 'P',
			},
			'R': {
				is_restricted: true,
				res_type: 'R',
			},
			'GLDR': {
				is_restricted: false,
				res_type: 'A',
			},
			'HPGLDR': {
				is_restricted: true,
				res_type: 'W',
			},
			'ACRO': {
				is_restricted: false,
				res_type: 'A',
			},
			'CTR': {
				is_controlled: true,
			//	cas_type: 'C', // TODO: for euronav test disabeld
				cas_type: 'M',
			},
			'TMA': {
				is_controlled: true,
				//cas_type: 'M', //TODO, check, other uses X
				cas_type: 'X',
			},
			'MTMA': {
					is_controlled: true,
					 cas_type: 'R', // TODO:
		
			},
			'CTA': {
				is_controlled: true,
			//	cas_type: 'C', // TODO: for euronav test disabeld
				cas_type: 'K',
			},
			'UTA': {
				is_controlled: false,
			//	cas_type: 'C', // TODO: for euronav test disabeld
				cas_type: 'X',
			},
			'TSA': {
				is_restricted: false,
				res_type: 'A',	
			},
			'TRA': {
				is_restricted: true,
				res_type: 'G',	
			},
			'TMZ': {
				is_restricted: false,
			//	cas_type: 'C', // TODO: for euronav test disabeld
				res_type: 'R',	
			},
			'RMZ': {
				is_restricted: false,
				res_type: 'R',			
			},
			'ATZ': {
				is_restricted: false,
				res_type: 'A',			
			},
			'MATZ': {
				is_restricted: false,
				res_type: 'D',				
			},
			'NRA': {
				is_restricted: true,
				res_type: 'P',
			},
			'CBA': {
				is_restricted: false,
				res_type: 'A',
			},
			'FIR': {
				is_firuir: true,
			},
			// non codetype airspace, e.g. Class E in Germany
			'': {
				is_controlled: true, // typical echo airspace
				cas_type: 'K',
			}
		};

		function get_as_field(astype, field) {
			var x = as_types[astype];
			if (x)
				return x[field]
			else {
				console.log("WARNING: get_as_field unknown airspace type: " + astype);

				return '';
			}
		}

		var spec = arinc_spec.as_ctl;

			if (get_as_field(codeType, "is_restricted")) {
				spec = arinc_spec.as_res;
				arinc_data.as_type = get_as_field(codeType, "res_type");
			}
			else if (get_as_field(codeType, "is_controlled")) {
				arinc_data.as_type = get_as_field(codeType, "cas_type");
				arinc_data.as_center = "LOXX"; // TODO, HACK, get center
				
				// Ignore controlled AS without class
				if (!data.codeClass || data.codeClass == '' || data.codeClass == ' ') {
					console.log("WARNING: AS has no code " + arinc_data.name + " ignoring.");
					return;
				}
			} else if (get_as_field(codeType, "is_firuir")) {
				spec = arinc_spec.fir_uir;
				arinc_data.fir_upper = upper.limit;
				arinc_data.uir_lower = upper.limit; // TODO
				arinc_data.uir_upper = 'UNLTD'; // TODO
			} else {
				arinc_data.as_type = 'X'; //TODO: unknown
				console.log("WARNING: Unknown airspace type: " + codeType + " for " + data.txtName + " ignoring.");
				return;

			}



		//console.log(data.RdnUid.RwyUid.AhpUid.codeId + " " + data.RdnUid.txtDesig + " " + data.xt_valDispTres + ":" + arinc_data.dsplcd_thr);
			var ase = xml_cache["gml:" + baseLayer.AseUid.$.mid];
			
			if (current_record_nr >= maxRecIdBeforReset) {
				current_record_nr = 1
			};

		if (ase) {
			var first = true;
			var gmlPosList = ase.gmlPosList.split(" ");
			for (var pos in gmlPosList) {
				var x = gmlPosList[pos].split(",");
				arinc_data.longitude = long2arinc(x[0]);
				arinc_data.latitude = lat2arinc(x[1]);
				arinc_data.seq_nr += 1; // TODO: overflow
				arinc_data.record_nr = current_record_nr++;
				if (arinc_data.seq_nr >= 10000) {
					console.log("WARNING: AS is too complex (more than 1000 elements) " + arinc_data.seq_nr + " for " + data.txtName + ", ignoring...");
				}
				else {

					// last record needs termination flag set
					if (pos == gmlPosList.length - 1) {
						arinc_data.boundary_via = 'GE'; // great circle, end
					}

					// first record needs additional info
					// add here, but only first
					if (first) {
						if (get_as_field(codeType, "is_firuir")) { // bah, only 1 record for FIR
							generateAndWriteRecord(spec, arinc_data, 0);
						} else {
							generateAndWriteRecord(spec, arinc_data, 1);
							generateAndWriteRecord(spec, arinc_data, 2);
						}
						// only first record contains all data, clear rest
						arinc_data.lower_unit = undefined;
						arinc_data.upper_unit = undefined;
						arinc_data.lower = undefined;
						arinc_data.upper = undefined;
						arinc_data.name = undefined;
						arinc_data.ctrl_agency = undefined;
						// fir/uir
						arinc_data.fir_upper = undefined;
						arinc_data.uir_lower = undefined;
						arinc_data.uir_upper = undefined;
					}
					else {
						generateAndWriteRecord(spec, arinc_data, 0);
					}
				}
				first = false;
			}
		}
		else {
			console.log("WARNING: ASE gml polygons not found for:" + data.txtName)
		}
	
		}
		catch (err) {
			console.log("ERROR parsing Airspace: " + err);
		}
			
		
		});

	xml.on('end', function(data) {
		console.log("done");
	});
})
