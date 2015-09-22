var arinc_spec_aprt_com = {
	1: {
		length: 132,
		defaultRequired: false,
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

module.exports = arinc_spec_aprt_com;