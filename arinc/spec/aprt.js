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
		}, { // TODO speed_limit, altitude FL100/250
			key: 'speed_limit_alt',
			type: 'string',
			length: 5,
			startingPosition: 23,
			defaultValue: ''
		}, { // length of longest RWY in 100s of ft
			key: 'longest_rwy',
			type: 'string',
			length: 3,
			startingPosition: 28
		}, {
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
		}, { // TODO
			key: 'speed_limit',
			type: 'string',
			length: 3,
			startingPosition: 62,
			defaultValue: ''
		}, { // TODO PUBLIC
			key: 'pub_mil',
			type: 'string',
			length: 1,
			startingPosition: 81,
			defaultValue: 'C'
		}, { // TODO GMT+1
			key: 'timezone',
			type: 'string',
			length: 3,
			startingPosition: 82,
			defaultValue: 'A00'
		}, { // TODO day light saving: y/n
			key: 'daytime',
			type: 'string',
			length: 1,
			startingPosition: 85,
			defaultValue: 'Y'
		}, { // TODO magentic
			key: 'mag_true',
			type: 'string',
			length: 1,
			startingPosition: 86,
			defaultValue: 'M'
		}, { // TODO...
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
		}, ]
	}
};

module.exports = arinc_spec_aprt;