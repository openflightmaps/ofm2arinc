var xmlStream = require('xml-stream');
var fs = require('fs');
var fixed = require('fixed');
var unidecode = require('unidecode');

var file_in = 'ofmdata/lsas.xml';
//var file_in = 'ofmdata/lovv.xml';
//var file_in = 'ofmdata/ed.xml';
var file_out = "out.txt";

var out_stream = fs.createWriteStream(file_out);
var in_stream = fs.createReadStream(file_in);
var xml = new xmlStream(in_stream);

var xml_cache = [];

var arinc_spec_vordme = {
	length: 132,
	fields: [{
		key: 'record_type',
		type: 'string',
		length: 1,
		startingPosition: 1,
		defaultValue: 'S'
	}, {
		key: 'area',
		type: 'string',
		length: 3,
		startingPosition: 2,
		defaultValue: 'EUR'
	}, {
		key: 'section',
		type: 'string',
		length: 1,
		startingPosition: 5
	}, {
		key: 'sub_section',
		type: 'string',
		length: 1,
		startingPosition: 6
	}, {
		key: 'arpt_ident',
		type: 'string',
		length: 4,
		startingPosition: 7
	}, {
		key: 'icao_code',
		type: 'string',
		length: 2,
		startingPosition: 11
	}, {
		key: 'vor_ident',
		type: 'string',
		length: 4,
		startingPosition: 14
	}, {
		key: 'vor_icao_code',
		type: 'string',
		length: 2,
		startingPosition: 20
	}, {
		key: 'cont_nr',
		type: 'integer',
		length: 1,
		startingPosition: 22
	}, {
		key: 'vor_freq',
		type: 'integer',
		length: 5,
		startingPosition: 23
	}, {
		key: 'navaid_class_type1',
		type: 'string',
		length: 1,
		startingPosition: 28
	}, {
		key: 'navaid_class_type2',
		type: 'string',
		length: 1,
		startingPosition: 29
	}, {
		key: 'navaid_class_range',
		type: 'string',
		length: 1,
		startingPosition: 30
	}, {
		key: 'navaid_class_addinfo',
		type: 'string',
		length: 1,
		startingPosition: 31
	}, {
		key: 'navaid_class_colocation',
		type: 'string',
		length: 1,
		startingPosition: 32
	}, {
		key: 'vor_latitude',
		type: 'string',
		length: 9,
		startingPosition: 33
	}, {
		key: 'vor_longitude',
		type: 'string',
		length: 10,
		startingPosition: 42
	}, {
		key: 'dme_ident',
		type: 'string',
		length: 4,
		startingPosition: 52
	}, {
		key: 'dme_latitude',
		type: 'string',
		length: 9,
		startingPosition: 56
	}, {
		key: 'dme_longitude',
		type: 'string',
		length: 10,
		startingPosition: 65
	}, {
		key: 'station_declination',
		type: 'string',
		length: 5,
		startingPosition: 75
	}, {
		key: 'dme_elevation',
		type: 'integer',
		length: 5,
		startingPosition: 80
	}, {
		key: 'merit',
		type: 'integer',
		length: 1,
		startingPosition: 85
	}, {
		key: 'freq_protection',
		type: 'integer',
		length: 3,
		startingPosition: 88,
		defaultValue: 40
	}, {
		key: 'datum_code',
		type: 'string',
		length: 3,
		startingPosition: 91,
		defaultValue: 'WGE'
	}, {
		key: 'navaid_name',
		type: 'string',
		length: 30,
		startingPosition: 94
	}, {
		key: 'record_nr',
		type: 'integer',
		length: 5,
		startingPosition: 124
	}, {
		key: 'cycle',
		type: 'integer',
		length: 4,
		startingPosition: 129
	}, ]
};

var arinc_spec_ndb = {
	length: 132,
	fields: [{
		key: 'record_type',
		type: 'string',
		length: 1,
		startingPosition: 1,
		defaultValue: 'S'
	}, {
		key: 'area',
		type: 'string',
		length: 3,
		startingPosition: 2,
		defaultValue: 'EUR'
	}, {
		key: 'section',
		type: 'string',
		length: 1,
		startingPosition: 5
	}, {
		key: 'sub_section',
		type: 'string',
		length: 1,
		startingPosition: 6
	}, {
		key: 'arpt_ident',
		type: 'string',
		length: 4,
		startingPosition: 7
	}, {
		key: 'icao_code',
		type: 'string',
		length: 2,
		startingPosition: 11
	}, {
		key: 'ndb_ident',
		type: 'string',
		length: 4,
		startingPosition: 14
	}, {
		key: 'ndb_icao_code',
		type: 'string',
		length: 2,
		startingPosition: 20
	}, {
		key: 'cont_nr',
		type: 'integer',
		length: 1,
		startingPosition: 22
	}, {
		key: 'ndb_freq',
		type: 'integer',
		length: 5,
		startingPosition: 23
	}, {
		key: 'navaid_class_type1',
		type: 'string',
		length: 1,
		startingPosition: 28
	}, {
		key: 'navaid_class_type2',
		type: 'string',
		length: 1,
		startingPosition: 29
	}, {
		key: 'navaid_class_range',
		type: 'string',
		length: 1,
		startingPosition: 30
	}, {
		key: 'navaid_class_addinfo',
		type: 'string',
		length: 1,
		startingPosition: 31
	}, {
		key: 'navaid_class_colocation',
		type: 'string',
		length: 1,
		startingPosition: 32
	}, {
		key: 'ndb_latitude',
		type: 'string',
		length: 9,
		startingPosition: 33
	}, {
		key: 'ndb_longitude',
		type: 'string',
		length: 10,
		startingPosition: 42
	}, {
		key: 'mag_variation',
		type: 'string',
		length: 5,
		startingPosition: 75
	}, {
		key: 'datum_code',
		type: 'string',
		length: 3,
		startingPosition: 91,
		defaultValue: 'WGE'
	}, {
		key: 'navaid_name',
		type: 'string',
		length: 30,
		startingPosition: 94
	}, {
		key: 'record_nr',
		type: 'integer',
		length: 5,
		startingPosition: 124
	}, {
		key: 'cycle',
		type: 'integer',
		length: 4,
		startingPosition: 129
	}, ]
};

var arinc_spec_wp = {
	length: 132,
	fields: [{
		key: 'record_type',
		type: 'string',
		length: 1,
		startingPosition: 1,
		defaultValue: 'S'
	}, {
		key: 'area',
		type: 'string',
		length: 3,
		startingPosition: 2,
		defaultValue: 'EUR'
	}, {
		key: 'section',
		type: 'string',
		length: 1,
		startingPosition: 5
	}, {
		key: 'sub_section_6',
		type: 'string',
		length: 1,
		startingPosition: 6
	}, {
		key: 'aprt_ident',
		type: 'string',
		length: 4,
		startingPosition: 7
	}, {
		key: 'aprt_icao_code',
		type: 'string',
		length: 2,
		startingPosition: 11
	}, {
		key: 'sub_section_13',
		type: 'string',
		length: 1,
		startingPosition: 13
	}, {
		key: 'ident',
		type: 'string',
		length: 5,
		startingPosition: 14
	}, {
		key: 'icao_code',
		type: 'string',
		length: 2,
		startingPosition: 20
	}, {
		key: 'cont_nr',
		type: 'integer',
		length: 1,
		startingPosition: 22
	}, {
		key: 'wpt_type',
		type: 'string',
		length: 1,
		startingPosition: 27,
		defaultValue: 'V'
	}, {
		key: 'latitude',
		type: 'string',
		length: 9,
		startingPosition: 33
	}, {
		key: 'longitude',
		type: 'string',
		length: 10,
		startingPosition: 42
	}, {
		key: 'datum_code',
		type: 'string',
		length: 3,
		startingPosition: 91,
		defaultValue: 'WGE'
	}, {
		key: 'name',
		type: 'string',
		length: 30,
		startingPosition: 94
	}, {
		key: 'record_nr',
		type: 'integer',
		length: 5,
		startingPosition: 124
	}, {
		key: 'cycle',
		type: 'integer',
		length: 4,
		startingPosition: 129
	}, ]
};

var arinc_spec_aprt = {
	length: 132,
	fields: [{
			key: 'record_type',
			type: 'string',
			length: 1,
			startingPosition: 1,
			defaultValue: 'S'
		}, {
			key: 'area',
			type: 'string',
			length: 3,
			startingPosition: 2,
			defaultValue: 'EUR'
		}, {
			key: 'section',
			type: 'string',
			length: 1,
			startingPosition: 5
		}, {
			key: 'ident',
			type: 'string',
			length: 4,
			startingPosition: 7
		}, {
			key: 'icao_code',
			type: 'string',
			length: 2,
			startingPosition: 11
		}, {
			key: 'sub_section',
			type: 'string',
			length: 1,
			startingPosition: 13
		}, {
			key: 'iata',
			type: 'string',
			length: 3,
			startingPosition: 14
		}, {
			key: 'cont_nr',
			type: 'integer',
			length: 1,
			startingPosition: 22
		}, {
			key: 'speed_limit_alt',
			type: 'string',
			length: 5,
			startingPosition: 23,
			defaultValue: 'FL100'
		}, //TODO speed_limit, altitude
		{
			key: 'longest_rwy',
			type: 'string',
			length: 3,
			startingPosition: 28
		}, // length of longest RWY in 100s of ft
		{
			key: 'ifr',
			type: 'string',
			length: 1,
			startingPosition: 31
		}, {
			key: 'latitude',
			type: 'string',
			length: 9,
			startingPosition: 33
		}, {
			key: 'longitude',
			type: 'string',
			length: 10,
			startingPosition: 42
		}, {
			key: 'mag_variation',
			type: 'string',
			length: 5,
			startingPosition: 52
		}, {
			key: 'elevation',
			type: 'integer',
			length: 5,
			startingPosition: 57
		}, {
			key: 'speed_limit',
			type: 'string',
			length: 3,
			startingPosition: 62,
			defaultValue: '250'
		}, //TODO

		{
			key: 'pub_mil',
			type: 'string',
			length: 1,
			startingPosition: 81,
			defaultValue: 'C'
		}, //TODO PUBLIC
		{
			key: 'timezone',
			type: 'string',
			length: 3,
			startingPosition: 82,
			defaultValue: 'A00'
		}, //TODO GMT+1
		{
			key: 'daytime',
			type: 'string',
			length: 1,
			startingPosition: 85,
			defaultValue: 'Y'
		}, //TODO day light saving: y/n
		{
			key: 'mag_true',
			type: 'string',
			length: 1,
			startingPosition: 86,
			defaultValue: 'M'
		}, //TODO magentic
		//TODO...
		{
			key: 'datum_code',
			type: 'string',
			length: 3,
			startingPosition: 87,
			defaultValue: 'WGE'
		}, {
			key: 'name',
			type: 'string',
			length: 30,
			startingPosition: 94
		}, {
			key: 'record_nr',
			type: 'integer',
			length: 5,
			startingPosition: 124
		}, {
			key: 'cycle',
			type: 'integer',
			length: 4,
			startingPosition: 129
		},
	]
};

var arinc_spec_rwy = {
	length: 132,
	fields: [{
			key: 'record_type',
			type: 'string',
			length: 1,
			startingPosition: 1,
			defaultValue: 'S'
		}, {
			key: 'area',
			type: 'string',
			length: 3,
			startingPosition: 2,
			defaultValue: 'EUR'
		}, {
			key: 'section',
			type: 'string',
			length: 1,
			startingPosition: 5
		}, {
			key: 'aprt_ident',
			type: 'string',
			length: 4,
			startingPosition: 7
		}, {
			key: 'icao_code',
			type: 'string',
			length: 2,
			startingPosition: 11
		}, {
			key: 'sub_section',
			type: 'string',
			length: 1,
			startingPosition: 13
		}, {
			key: 'ident',
			type: 'string',
			length: 5,
			startingPosition: 14
		}, {
			key: 'cont_nr',
			type: 'integer',
			length: 1,
			startingPosition: 22
		}, {
			key: 'rwy_len',
			type: 'integer',
			length: 5,
			startingPosition: 23
		}, {
			key: 'rwy_brg',
			type: 'integer',
			length: 4,
			startingPosition: 28
		}, {
			key: 'latitude',
			type: 'string',
			length: 9,
			startingPosition: 33
		}, {
			key: 'longitude',
			type: 'string',
			length: 10,
			startingPosition: 42
		}, {
			key: 'elevation',
			type: 'integer',
			length: 5,
			startingPosition: 67
		}, {
			key: 'dsplcd_thr',
			type: 'integer',
			length: 4,
			startingPosition: 72
		}, {
			key: 'tch',
			type: 'integer',
			length: 2,
			startingPosition: 76,
			defaultValue: 50
		}, // threshold crossing height, default 50ft TODO
		{
			key: 'rwy_width',
			type: 'integer',
			length: 3,
			startingPosition: 78
		}, {
			key: 'stopway',
			type: 'integer',
			length: 4,
			startingPosition: 87
		}, {
			key: 'name',
			type: 'string',
			length: 30,
			startingPosition: 94
		}, {
			key: 'record_nr',
			type: 'integer',
			length: 5,
			startingPosition: 124
		}, {
			key: 'cycle',
			type: 'integer',
			length: 4,
			startingPosition: 129
		},
	]
};

var arinc_spec_as_ctl = {
	length: 132,
	fields: [ // controlled airspace
		{
			key: 'record_type',
			type: 'string',
			length: 1,
			startingPosition: 1,
			defaultValue: 'S'
		}, {
			key: 'area',
			type: 'string',
			length: 3,
			startingPosition: 2,
			defaultValue: 'EUR'
		}, {
			key: 'section',
			type: 'string',
			length: 1,
			startingPosition: 5,
			defaultValue: 'U'
		}, {
			key: 'sub_section',
			type: 'string',
			length: 1,
			startingPosition: 6,
			defaultValue: 'C'
		}, {
			key: 'icao_code',
			type: 'string',
			length: 2,
			startingPosition: 7
		}, {
			key: 'as_type',
			type: 'string',
			length: 1,
			startingPosition: 9
		}, {
			key: 'as_center',
			type: 'string',
			length: 5,
			startingPosition: 10
		}, {
			key: 'multi_cd',
			type: 'string',
			length: 1,
			startingPosition: 20
		}, {
			key: 'seq_nr',
			type: 'integer',
			length: 4,
			startingPosition: 21
		}, {
			key: 'cont_nr',
			type: 'integer',
			length: 1,
			startingPosition: 25
		}, {
			key: 'level',
			type: 'string',
			length: 1,
			startingPosition: 26,
			defaultValue: 'B'
		}, //TODO B=all altitudes
		{
			key: 'boundary_via',
			type: 'string',
			length: 2,
			startingPosition: 31,
			defaultValue: 'G '
		}, //TODO G=great circle
		{
			key: 'latitude',
			type: 'string',
			length: 9,
			startingPosition: 33
		}, {
			key: 'longitude',
			type: 'string',
			length: 10,
			startingPosition: 42
		}, {
			key: 'lower',
			type: 'integer',
			length: 5,
			startingPosition: 82
		}, {
			key: 'lower_unit',
			type: 'string',
			length: 1,
			startingPosition: 87
		}, // M = MSL, A = AGL
		{
			key: 'upper',
			type: 'integer',
			length: 5,
			startingPosition: 88
		}, {
			key: 'upper_unit',
			type: 'string',
			length: 1,
			startingPosition: 93
		}, // M = MSL, A = AGL
		{
			key: 'name',
			type: 'string',
			length: 30,
			startingPosition: 94
		}, {
			key: 'record_nr',
			type: 'integer',
			length: 5,
			startingPosition: 124
		}, {
			key: 'cycle',
			type: 'integer',
			length: 4,
			startingPosition: 129
		},
	]
};

var arinc_spec_as_res = {
	length: 132,
	fields: [ // restricted airspace
		{
			key: 'record_type',
			type: 'string',
			length: 1,
			startingPosition: 1,
			defaultValue: 'S'
		}, {
			key: 'area',
			type: 'string',
			length: 3,
			startingPosition: 2,
			defaultValue: 'EUR'
		}, {
			key: 'section',
			type: 'string',
			length: 1,
			startingPosition: 5,
			defaultValue: 'U'
		}, {
			key: 'sub_section',
			type: 'string',
			length: 1,
			startingPosition: 6,
			defaultValue: 'R'
		}, {
			key: 'icao_code',
			type: 'string',
			length: 2,
			startingPosition: 7
		}, {
			key: 'as_type',
			type: 'string',
			length: 1,
			startingPosition: 9
		}, {
			key: 'designator',
			type: 'string',
			length: 10,
			startingPosition: 10
		}, {
			key: 'multi_cd',
			type: 'string',
			length: 1,
			startingPosition: 20
		}, {
			key: 'seq_nr',
			type: 'integer',
			length: 4,
			startingPosition: 21
		}, {
			key: 'level',
			type: 'string',
			length: 1,
			startingPosition: 26,
			defaultValue: 'B'
		}, //TODO B=all altitudes
		{
			key: 'boundary_via',
			type: 'string',
			length: 2,
			startingPosition: 31,
			defaultValue: 'G '
		}, //TODO G=great circle
		{
			key: 'latitude',
			type: 'string',
			length: 9,
			startingPosition: 33
		}, {
			key: 'longitude',
			type: 'string',
			length: 10,
			startingPosition: 42
		}, {
			key: 'lower',
			type: 'integer',
			length: 5,
			startingPosition: 82
		}, {
			key: 'lower_unit',
			type: 'string',
			length: 1,
			startingPosition: 87
		}, // M = MSL, A = AGL
		{
			key: 'upper',
			type: 'integer',
			length: 5,
			startingPosition: 88
		}, {
			key: 'upper_unit',
			type: 'string',
			length: 1,
			startingPosition: 93
		}, // M = MSL, A = AGL
		{
			key: 'name',
			type: 'string',
			length: 30,
			startingPosition: 94
		}, {
			key: 'record_nr',
			type: 'integer',
			length: 5,
			startingPosition: 124
		}, {
			key: 'cycle',
			type: 'integer',
			length: 4,
			startingPosition: 129
		},
	]
};

var arinc_vordme = new fixed(arinc_spec_vordme);
var arinc_ndb = new fixed(arinc_spec_ndb);
var arinc_wp = new fixed(arinc_spec_wp);
var arinc_aprt = new fixed(arinc_spec_aprt);
var arinc_rwy = new fixed(arinc_spec_rwy);
var arinc_as_ctl = new fixed(arinc_spec_as_ctl);
var arinc_as_res = new fixed(arinc_spec_as_res);
var current_record_nr = 1;

function fwidth(v, width) {
	var x = v.toString();
	while (x.length < width) {
		x = '0' + x;
	}
	return x;
}

function lat2arinc(val) {
	var res = '';
	if (val.length > 0) {
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
	return res;
}

function long2arinc(val) {
	var res = '';
	if (val.length > 0) {
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
	return res;
}

function str2arinc(val) {
	var val = val == undefined ? '' : val;
	return unidecode(val).toUpperCase().substring(0, 30);
	// TODO remove special chars
}

function decl2arinc(val) {
	return (val < 0 ? 'W' : 'E') + fwidth(Math.round(val * 10), 4);
}

function convertUnit(val, fromUnit, toUnit) {
	var x = parseFloat(val);
	if (x == NaN || val == undefined)
		return undefined;
	if (fromUnit == toUnit)
		return x;
	if (fromUnit == 'M' && toUnit == 'FT') {
		return Math.round(x * 3.2808);
	}
	if (fromUnit == 'FL' && toUnit == 'FT') {
		return x * 100;
	}
	throw new Error("Invalid conversion from " + fromUnit + " to " + toUnit);
}


function writeRecord(line) {
	out_stream.write(line);
}

//// Waypoints
// VOR  
xml.on('updateElement: Vor', function(data) {
	var arinc_data = {
		section: 'D', // NAVAID
		vor_ident: data.VorUid.codeId, // VOR identifier
		vor_icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
		cont_nr: 0,
		vor_freq: data.valFreq * 100, // VOR frequency
		navaid_class_type1: 'V',
		navaid_class_range: 'U', // TODO: range undefined
		navaid_class_addinfo: 'W', // no voice on frequency
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
		arinc_data.dme_ident = data.VorUid.codeId; // DME identifier
		arinc_data.dme_latitude = lat2arinc(data.VorUid.geoLat);
		arinc_data.dme_longitude = long2arinc(data.VorUid.geoLong);
		arinc_data.dme_elevation = parseInt(data.valElev);
	}
	var line = arinc_vordme.generate(arinc_data);
	writeRecord(line);
});

// DME
xml.on('updateElement: Dme', function(data) {
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
	var line = arinc_vordme.generate(arinc_data);
	writeRecord(line);
});

// NDB
xml.on('updateElement: Ndb', function(data) {
	var arinc_data = {
		section: 'D', // NAVAID
		sub_section: 'B', // NDB
		ndb_ident: data.NdbUid.codeId, // NDB identifier
		ndb_icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
		cont_nr: 0,
		ndb_freq: data.valFreq * 100, // VOR frequency
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
	var line = arinc_ndb.generate(arinc_data);
	writeRecord(line);
});

// Designated Point / Reporting Points
xml.on('updateElement: Dpn', function(data) {
	// Enroute Waypoints (EA) / Terminal Waypoint (PC)
	var arinc_data = {
		icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
		ident: str2arinc(data.DpnUid.codeId).substring(0, 5),
		cont_nr: 0,
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
	}
	var line = arinc_wp.generate(arinc_data);
	writeRecord(line);
	//process.stdout.write(JSON.stringify(data) + "\n\n");
});

// Airport
xml.on('updateElement: Ahp', function(data) {
	return;
	// add to cache
	xml_cache[data.AhpUid.$.mid] = data;
	if (data.codeType != 'AD') {
		//	console.log("Skipping AD " + data.AhpUid.codeId + " type: " + data.codeType);
		return;
	}

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
	var line = arinc_aprt.generate(arinc_data);
	writeRecord(line);
});

// Runway
xml.on('updateElement: Rwy', function(data) {
	// add to cache
	xml_cache[data.RwyUid.$.mid] = data;
});

// Runway
xml.on('updateElement: Rdn', function(data) {
	return;
	var rwy = xml_cache[data.RdnUid.RwyUid.AhpUid.$.mid];
	if (rwy.codeType != 'AD') {
		//console.log("Skipping RWY of AD " + rwy.AhpUid.codeId + " type: " + rwy.codeType);
		return;
	}
	var arinc_data = {
		section: 'P', // Runway
		sub_section: 'G', // Runway
		//name: str2arinc(data.RdnUid.txtDesig),
		aprt_ident: data.RdnUid.RwyUid.AhpUid.codeId, // identifier
		ident: 'RW' + str2arinc(data.RdnUid.txtDesig).substring(0, 3), //name
		icao_code: data.RdnUid.RwyUid.AhpUid.codeId.substring(0, 2), // ICAO code
		rwy_len: convertUnit(xml_cache[data.RdnUid.RwyUid.$.mid].valLen, xml_cache[data.RdnUid.RwyUid.$.mid].uomDimRwy, 'FT'),
		rwy_brg: Math.round(parseFloat(data.valMagBrg) * 10),
		latitude: lat2arinc(data.geoLat),
		longitude: long2arinc(data.geoLon),
		elevation: convertUnit(xml_cache[data.RdnUid.RwyUid.AhpUid.$.mid].valElev, xml_cache[data.RdnUid.RwyUid.AhpUid.$.mid].uomElev, 'FT'),
		dsplcd_thr: convertUnit(data.xt_valDispTres, data.xt_uomDispTres, 'FT'),
		rwy_width: convertUnit(xml_cache[data.RdnUid.RwyUid.$.mid].valWid, xml_cache[data.RdnUid.RwyUid.$.mid].uomDimRwy, 'FT'),
		record_nr: current_record_nr++,
		cycle: 1, //TODO
	};
	var line = arinc_rwy.generate(arinc_data);
	writeRecord(line);
});

//// Other
// Airspace
xml.on('updateElement: Ase', function(data) {
	if (data.gmlPosList) {
		// gmlPosList record, add to cache
		xml_cache[data.$.mid] = data;
		return;
	}
	if (!data.$ || !data.$.xt_fir) { // no FIR
		//console.log("skipping AS, no FIR");
		return;
	}

	//process.stdout.write(JSON.stringify(data) + "\n\n");
	var arinc_data = {
		icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
		name: str2arinc(data.txtName),
		designator: str2arinc(data.txtName).substring(0, 10), //TODO, missing designator field
		lower: convertUnit(data.valDistVerLower, data.uomDistVerLower, 'FT'),
		lower_unit: 'M', // M = MSL, A = AGL
		upper: convertUnit(data.valDistVerUpper, data.uomDistVerUpper, 'FT'),
		upper_unit: 'M', // M = MSL, A = AGL
		//record_nr: current_record_nr++,
		seq_nr: 0,
		cycle: 1, //TODO
	};

	var arinc = arinc_as_ctl;
	if (data.AseUid.codeType == 'GLDR') { // restriced AS
		arinc = arinc_as_res;
		console.log("restriced AS");
		arinc_data.as_type = 'U'; //TODO: unknown
	}
	else {
		arinc_data.as_type = 'X'; //TODO: unknown
	}

	//console.log(data.RdnUid.RwyUid.AhpUid.codeId + " " + data.RdnUid.txtDesig + " " + data.xt_valDispTres + ":" + arinc_data.dsplcd_thr);

	var gmlPosList = xml_cache[data.AseUid.$.mid].gmlPosList.split(" ");
	for (var pos in gmlPosList) {
		var x = gmlPosList[pos].split(",");
		arinc_data.longitude = long2arinc(x[0]);
		arinc_data.latitude = lat2arinc(x[1]);
		arinc_data.seq_nr += 10;
		arinc_data.record_nr = current_record_nr++;
		var line = arinc.generate(arinc_data);
		writeRecord(line);
	}
});


xml.on('data', function(data) {
	//    process.stdout.write(data);
});
