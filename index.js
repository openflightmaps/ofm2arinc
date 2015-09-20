var xmlStream = require('xml-stream');
var fs = require('fs');
var fixed = require('fixed');
var unidecode = require('unidecode');
var merge = require('object-mapper').merge;

var file_in = 'ofmdata/lsas.xml';
//var file_in = 'ofmdata/lovv.xml';
//var file_in = 'ofmdata/ed.xml';
var file_out = "out.txt";

var out_stream = fs.createWriteStream(file_out);
var in_stream = fs.createReadStream(file_in);

var arinc_spec_header = {
	1: {
		length: 132,
		fields: [{
			key: 'header_ident',
			type: 'string',
			length: 3,
			startingPosition: 1,
			defaultValue: 'HDR',
		}, {
			key: 'header_number',
			type: 'integer',
			length: 2,
			startingPosition: 4,
			defaultValue: 1,
		}, {
			key: 'filename',
			type: 'string',
			length: 15,
			startingPosition: 6,
			defaultValue: 'ofmtest.pc', //TODO filename
		}, {
			key: 'version_number',
			type: 'integer',
			length: 3,
			startingPosition: 21,
			defaultValue: 1,
		}, {
			key: 'prod_test',
			type: 'string',
			length: 1,
			startingPosition: 24,
			defaultValue: 'T', // TODO, this is test
		}, {
			key: 'record_length',
			type: 'integer',
			length: 4,
			startingPosition: 25,
			defaultValue: 132,
		}, {
			key: 'record_count', // TODO, count records
			type: 'integer',
			length: 7,
			startingPosition: 29,
		}, {
			key: 'cycle_date',
			type: 'string',
			length: 4,
			startingPosition: 36,
			defaultValue: '0001',
		}, {
			key: 'creation_date',
			type: 'string',
			length: 11,
			startingPosition: 42,
			defaultValue: '20-SEP-2015', //TODO
		}, {
			key: 'creation_time',
			type: 'string',
			length: 8,
			startingPosition: 53,
			defaultValue: '06:06:06',
		}, {
			key: 'data_supplier_ident',
			type: 'string',
			length: 16,
			startingPosition: 62,
			defaultValue: 'OFMTestExport01',
		}, {
			key: 'target_customer_ident',  // optional
			type: 'string',
			length: 16,
			startingPosition: 78,
			defaultValue: 'Test Customer',
		}, {
			key: 'database_part_no',  // optional
			type: 'string',
			length: 20,
			startingPosition: 94,

		}, {
			key: 'file_crc', // TODO, implement CRC
			type: 'string',
			length: 8,
			startingPosition: 125,
			defaultValue: '',
		} ],
	},
	2: {
		length: 132,
		fields: [{
			key: 'header_ident',
			type: 'string',
			length: 3,
			startingPosition: 1,
			defaultValue: 'HDR',
		}, {
			key: 'header_number',
			type: 'integer',
			length: 2,
			startingPosition: 4,
			defaultValue: 2,
		}, {
			key: 'effective_date', // optional
			type: 'string',
			length: 11,
			startingPosition: 6,
			defaultValue: '',
		}, {
			key: 'expiration_date', // optional
			type: 'string',
			length: 11,
			startingPosition: 17,
			defaultValue: '',
		}, {
			key: 'supplier_text_field',
			type: 'string',
			length: 30,
			startingPosition: 29,
			defaultValue: 'OFM Test, Work in Progress',
		}, {
			key: 'descriptive_text',
			type: 'string',
			length: 30,
			startingPosition: 59,
			defaultValue: 'TEST! NOT FOR OPERATION USE',
		}]
	}
}

var arinc_spec_vordme = {
	1: {
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
	}
};

var arinc_spec_ndb = {
	1: {
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
	}
};

var arinc_spec_wp = {
	1: {
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
			key: 'elevation',
			type: 'string',
			length: 5,
			startingPosition: 80
		}, {
			key: 'datum_code',
			type: 'string',
			length: 3,
			startingPosition: 85,
			defaultValue: 'WGE'
		}, {
			key: 'name_ind',
			type: 'string',
			length: 3,
			startingPosition: 96
		}, {
			key: 'name',
			type: 'string',
			length: 25,
			startingPosition: 99
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
	}
};

var arinc_spec_aprt = {
	1: {
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
				defaultValue: ''
			}, //TODO speed_limit, altitude FL100/250
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
				defaultValue: ''
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
	}
};

var arinc_spec_aprt_com = {
	1: {
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
			key: 'comm_type',
			type: 'string',
			length: 3,
			startingPosition: 14
		}, {
			key: 'comm_freq',
			type: 'integer',
			length: 7,
			startingPosition: 17
		}, {
			key: 'gt',
			type: 'string',
			length: 1,
			startingPosition: 24
		}, {
			key: 'freq_unit',
			type: 'string',
			length: 1,
			startingPosition: 25
		}, {
			key: 'cont_nr',
			type: 'integer',
			length: 1,
			startingPosition: 26
		}, { // TODO
			key: 'service_ind',
			type: 'string',
			length: 3,
			startingPosition: 27
		}, { // TODO
			key: 'radar',
			type: 'string',
			length: 1,
			startingPosition: 30,
		}, { // TODO
			key: 'modulation',
			type: 'string',
			length: 1,
			startingPosition: 31
		}, { // TODO
			key: 'sig_em',
			type: 'string',
			length: 1,
			startingPosition: 32
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
		}, { // TODO
			key: 'h24_ind',
			type: 'string',
			length: 1,
			startingPosition: 62
		}, { // TODO
			key: 'sector',
			type: 'string',
			length: 6,
			startingPosition: 63
		}, { //TODO
			key: 'alt_desc',
			type: 'string',
			length: 1,
			startingPosition: 69
		}, { //TODO
			key: 'altitude1',
			type: 'string',
			length: 5,
			startingPosition: 70
		}, { //TODO
			key: 'altitude2',
			type: 'string',
			length: 5,
			startingPosition: 75
		}, { //TODO
			key: 'sector_fac',
			type: 'string',
			length: 4,
			startingPosition: 80
		}, { //TODO
			key: 'icao_code2',
			type: 'string',
			length: 2,
			startingPosition: 84
		}, { //TODO
			key: 'sec_code2',
			type: 'string',
			length: 1,
			startingPosition: 86
		}, { //TODO
			key: 'sub_code2',
			type: 'string',
			length: 1,
			startingPosition: 87
		}, { //TODO
			key: 'dist_desc',
			type: 'string',
			length: 1,
			startingPosition: 88
		}, { //TODO
			key: 'comm_dist',
			type: 'integer',
			length: 2,
			startingPosition: 89
		}, { //TODO
			key: 'remote_fac',
			type: 'string',
			length: 4,
			startingPosition: 91
		}, { //TODO
			key: 'icao_code3',
			type: 'string',
			length: 2,
			startingPosition: 95
		}, { //TODO
			key: 'sec_code3',
			type: 'string',
			length: 1,
			startingPosition: 97
		}, { //TODO
			key: 'sub_code3',
			type: 'string',
			length: 1,
			startingPosition: 98
		}, {
			key: 'callsign',
			type: 'string',
			length: 25,
			startingPosition: 99
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
	}
};


var arinc_spec_rwy = {
	1: {
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
		}, { // threshold crossing height, default 50ft TODO
			key: 'tch',
			type: 'integer',
			length: 2,
			startingPosition: 76,
			defaultValue: 50
		}, {
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
		}, ]
	}
};

var arinc_spec_as_ctl = {
	1: {
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
				key: 'sec_code2',
				type: 'string',
				length: 1,
				startingPosition: 15
			}, {
				key: 'sub_code2',
				type: 'string',
				length: 1,
				startingPosition: 16
			}, {
				key: 'as_class',
				type: 'string',
				length: 1,
				startingPosition: 17
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
			}, { //TODO B=all altitudes
				key: 'level',
				type: 'string',
				length: 1,
				startingPosition: 26,
				defaultValue: 'B'
			}, {
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
			}, { // M = MSL, A = AGL
				key: 'upper_unit',
				type: 'string',
				length: 1,
				startingPosition: 93
			}, 
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
	},
	2: {
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
				key: 'sec_code2',
				type: 'string',
				length: 1,
				startingPosition: 15
			}, {
				key: 'sub_code2',
				type: 'string',
				length: 1,
				startingPosition: 16
			}, {
				key: 'as_class',
				type: 'string',
				length: 1,
				startingPosition: 17
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
				key: 'appl_type',
				type: 'string',
				length: 1,
				startingPosition: 26
			}, {
				key: 'ctrl_agency',
				type: 'string',
				length: 24,
				startingPosition: 100
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
	}
};

var arinc_spec_as_res = {
	1: {
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
				key: 'cont_nr',
				type: 'integer',
				length: 1,
				startingPosition: 25
			}, { //TODO B=all altitudes
				key: 'level',
				type: 'string',
				length: 1,
				startingPosition: 26,
				defaultValue: 'B'
			}, {
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
	},
	2: {
		length: 132,
		fields: [ // restricted airspace, continuation record 2
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
				key: 'cont_nr',
				type: 'integer',
				length: 1,
				startingPosition: 25
			}, {
				key: 'appl_type',
				type: 'string',
				length: 1,
				startingPosition: 26
			}, {
				key: 'ctrl_agency',
				type: 'string',
				length: 24,
				startingPosition: 100
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
	}
};



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
	} else {
		console.log ("WARNING: lat2arinc empty value");
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
	} else {
		console.log ("WARNING: long2arinc empty value");
	}
	return res;
}

function str2arinc(val, maxlen) {
	var val = val == undefined ? '' : val;
	return unidecode(val).toUpperCase().substring(0, maxlen ? maxlen : 30);
	// TODO remove special chars
}

function decl2arinc(val) {
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
	throw new Error("Invalid conversion from " + fromUnit + " to " + toUnit);
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
		'INFO': 'INF',  // AD Info frequency, UNI?, TODO
		'FIC' : 'INF',  // Flight *Information* Center
		'APP' : 'APP',
		'TWR' : 'TWR',
		'SMC' : 'GND',  // Surface movement control
	}
	var result = map[ofm];
	if (result)
		return result
	else
		console.log("unknown comm type: "+ofm);
}

function map_comm_service(ofm) {
	var map = {	
		//'ATIS': 'ATI',
		'INFO': 'S  ',  // AD Info frequency, unicom, some map this also to INF, TODO
		'FIC' : 'F  ',  // Flight *Information* Center
		//'APP' : '   ',
		//'TWR' : '   ',
		//'SMC' : '   ',  // Surface movement control
	}
	var result = map[ofm];
	if (result)
		return result
	else
		console.log("unknown comm service: "+ofm);
}


var current_record_nr = 1;

// write headers
generateAndWriteRecord(arinc_spec_header, {}, 1);
generateAndWriteRecord(arinc_spec_header, {}, 2);

// Cache Hack
var xml = new xmlStream(in_stream);
var xml_cache = [];


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
		//arinc_data.dme_ident = data.VorUid.codeId; // DME identifier
		arinc_data.dme_latitude = lat2arinc(data.VorUid.geoLat);
		arinc_data.dme_longitude = long2arinc(data.VorUid.geoLong);
		arinc_data.dme_elevation = parseInt(data.valElev);
	}
	generateAndWriteRecord(arinc_spec_vordme, arinc_data);
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
	generateAndWriteRecord(arinc_spec_vordme, arinc_data);
});

// NDB
xml.on('updateElement: Ndb', function(data) {
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
	generateAndWriteRecord(arinc_spec_ndb, arinc_data);
});

// Designated Point / Reporting Points
xml.on('updateElement: Dpn', function(data) {
	var ident = str2arinc(data.DpnUid.codeId, 5);
	if (ident == "") {
		console.log("WARNING: waypoint has no ident: "+data.txtName)
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
	generateAndWriteRecord(arinc_spec_wp, arinc_data);
	//console.log(JSON.stringify(data) + "\n\n");
});

// Airport
xml.on('updateElement: Ahp', function(data) {
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
	generateAndWriteRecord(arinc_spec_aprt, arinc_data);
});

// Unicast Frequency
xml.on('updateElement: Uni', function(data) {
	// add to cache
	xml_cache[data.UniUid.$.mid] = data;
});

// Frequency
xml.on('updateElement: Fqy', function(data) {
	var uni = xml_cache[data.FqyUid.SerUid.UniUid.$.mid];
	var apt = xml_cache[uni.AhpUid.$.mid];
	var freq = convertUnit(parseFloat(data.valFreqRec), data.uomFreq, "MHZ");
	if (freq < 30 || freq > 200) {
		console.log("WARNING: only VHF supported, ignoring.");
		return;
	}
	if (apt) {
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
		generateAndWriteRecord(arinc_spec_aprt_com, arinc_data);
	} else {
		console.log("WARNING: freqency has no APT, ignoring.");
	}
});


// Runway
xml.on('updateElement: Rwy', function(data) {
	// add to cache
	xml_cache[data.RwyUid.$.mid] = data;
});

// Runway
xml.on('updateElement: Rdn', function(data) {
	var rwy = xml_cache[data.RdnUid.RwyUid.AhpUid.$.mid];
	if (rwy.codeType != 'AD') {
		//console.log("Skipping RWY of AD " + rwy.AhpUid.codeId + " type: " + rwy.codeType);
		return;
	}
	
	if (lat2arinc(data.geoLat) == "" || long2arinc(data.geoLon) == "") {
		console.log("WARNING: missing threshold coordinates");
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
	generateAndWriteRecord(arinc_spec_rwy, arinc_data);
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

	//console.log(JSON.stringify(data) + "\n\n");
	var arinc_data = {
		icao_code: data.$.xt_fir.substring(0, 2), // ICAO code
		name: str2arinc(data.txtName),
		designator: str2arinc(data.txtName).substring(0, 10), //TODO, missing designator field
		as_class: data.codeClass,
		appl_type: "T", // T = opening times, TODO??
		lower: convertUnit(parseInt(data.valDistVerLower), data.uomDistVerLower, 'FT'),
		lower_unit: 'M', // M = MSL, A = AGL
		upper: convertUnit(parseInt(data.valDistVerUpper), data.uomDistVerUpper, 'FT'),
		upper_unit: 'M', // M = MSL, A = AGL
		ctrl_agency: "", // TODO
		record_nr: current_record_nr++,
		seq_nr: 0,
		cycle: 1, //TODO
	};

	// FIXUPs, TODO
	if (isNaN(arinc_data.upper)) {
		arinc_data.upper = 10000;
		console.log("WARNING: missing upper for " + data.txtName + ", setting to 10000ft");
	}

	if (isNaN(arinc_data.lower)) {
		arinc_data.lower = 0;
		console.log("WARNING: missing lower for " + data.txtName + ", setting to 0ft");
	}


	// record types:
	// FIR/UIR (UF)
	// Controlled airspace (UC) arinc_spec_as_ctl
	// *5.213 Controlled Airspace Type (ARSP TYPE)
	// *Field
	// A - Class C Airspace (Was ARSA within the USA).
	// C - Control Area, ICAO Designation (CTA).
	// M - Terminal Control Area, ICAO Designation (TMA or TCA).
	// R - Radar Zone or Radar Area (Was TRSA within the USA).
	// T - Class B Airspace (Was TCA with the USA).
	// Z - Class D Airspace within the USA, Control Zone, ICAO Designation (CTR).

	// Restrictive airspaces (UR) arinc_spec_as_res
	var as_types = {
		'FIR': {
			is_firuir: true,
			firuir_type: 'F',
		},
		'UIR': {
			is_firuir: true,
			firuir_type: 'U',
		},
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
			is_restricted: true,
			res_type: 'A',
		},
		'HPGLDR': {
			is_restricted: true,
			res_type: 'A',
		},
		'ACRO': {
			is_restricted: true,
			res_type: 'A',
		 },
		'CTR': {
			is_controlled: true,
			cas_type: 'Z',
		},
		'TMA': {
			is_controlled: true,
			cas_type: 'M',
		},
		'MTMA': {
			is_controlled: true,
			cas_type: 'M',
		},
		'CTA': {
			is_controlled: true,
			cas_type: 'C',
		},
		'UTA': {
			is_controlled: true,
			cas_type: 'C',
		},
		'TSA': {
			is_restricted: true,
			res_type: 'C',
 		},
		'TRA': {
			is_restricted: true,
			res_type: 'C',
		},
		'TMZ': {
			is_controlled: true,
			cas_type: 'Z',
		 },
		'RMZ': {
			is_controlled: true,
			cas_type: 'Z',
		 },
		'ATZ': {
			is_controlled: true,
			cas_type: 'Z',
		 },
		'MATZ': {
			is_controlled: true,
			cas_type: 'Z',
		},
		'NRA': {
			is_restricted: true,
			res_type: 'D',
		},
		'CBA': {
			is_restricted: true,
			res_type: 'A',
		},
		// non codetype airspace, e.g. Class E in Germany
		'': {	
			is_restricted: false,
	 		is_controlled: false,
		}
	}
	function get_as_field(astype, field) {
		var x = as_types[astype];
		if (x)
			return x[field]
		else {
			console.log("WARNING: get_as_field unknown airspace type: "+astype);
			return '';
		}	
	}

	var arinc_spec = arinc_spec_as_ctl;
	
	if (get_as_field(data.AseUid.codeType, "is_restricted")) {
		arinc_spec = arinc_spec_as_res;
		arinc_data.as_type = get_as_field(data.AseUid.codeType, "res_type");
	} else if (get_as_field(data.AseUid.codeType, "is_controlled")) {
		arinc_data.as_type = get_as_field(data.AseUid.codeType, "cas_type");
		arinc_data.as_center = "LSXX"; // TODO, get center
	} else if (get_as_field(data.AseUid.codeType, "is_firuir")) {
		arinc_data.as_type = get_as_field(data.AseUid.codeType, "firuir_type");
	} else
	{
		arinc_data.as_type = 'X'; //TODO: unknown
		console.log("WARNING: Unknown airspace type: " + data.txtName + ": " + data.AseUid.codeType + " ignoring.");
		return;
	}

	//console.log(data.RdnUid.RwyUid.AhpUid.codeId + " " + data.RdnUid.txtDesig + " " + data.xt_valDispTres + ":" + arinc_data.dsplcd_thr);
	var ase =  xml_cache[data.AseUid.$.mid];
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
				// first record needs additional info
				// add here, but only first
				if (first) {
					generateAndWriteRecord(arinc_spec, arinc_data, 1);
					generateAndWriteRecord(arinc_spec, arinc_data, 2);
				} else{
					generateAndWriteRecord(arinc_spec, arinc_data, 0);
				}
			}
			first = false;
		}
	} else {
		console.log("ASE gml polygons not found for:" + data.txtName)
	}
});

xml.on('end', function(data) {
	console.log("done");
});