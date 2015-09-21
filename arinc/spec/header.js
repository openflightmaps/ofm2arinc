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
            key: 'target_customer_ident', // optional
            type: 'string',
            length: 16,
            startingPosition: 78,
            defaultValue: 'Test Customer',
        }, {
            key: 'database_part_no', // optional
            type: 'string',
            length: 20,
            startingPosition: 94,

        }, {
            key: 'file_crc', // TODO, implement CRC
            type: 'string',
            length: 8,
            startingPosition: 125,
            defaultValue: '',
        }],
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
            defaultValue: 'TEST! NOT FOR OPERATIONAL USE',
        }]
    }
}

module.exports = arinc_spec_header;