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

module.exports = arinc_spec_ndb;