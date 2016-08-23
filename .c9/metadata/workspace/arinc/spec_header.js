{"filter":false,"title":"spec_header.js","tooltip":"/arinc/spec_header.js","undoManager":{"mark":9,"position":9,"stack":[[{"start":{"row":0,"column":0},"end":{"row":129,"column":0},"action":"insert","lines":["var arinc_spec_header = {","\t1: {","\t\tlength: 132,","\t\tfields: [{","\t\t\tkey: 'header_ident',","\t\t\ttype: 'string',","\t\t\tlength: 3,","\t\t\tstartingPosition: 1,","\t\t\tdefaultValue: 'HDR',","\t\t}, {","\t\t\tkey: 'header_number',","\t\t\ttype: 'integer',","\t\t\tlength: 2,","\t\t\tstartingPosition: 4,","\t\t\tdefaultValue: 1,","\t\t}, {","\t\t\tkey: 'filename',","\t\t\ttype: 'string',","\t\t\tlength: 15,","\t\t\tstartingPosition: 6,","\t\t\tdefaultValue: 'ofmtest.pc', //TODO filename","\t\t}, {","\t\t\tkey: 'version_number',","\t\t\ttype: 'integer',","\t\t\tlength: 3,","\t\t\tstartingPosition: 21,","\t\t\tdefaultValue: 1,","\t\t}, {","\t\t\tkey: 'prod_test',","\t\t\ttype: 'string',","\t\t\tlength: 1,","\t\t\tstartingPosition: 24,","\t\t\tdefaultValue: 'T', // TODO, this is test","\t\t}, {","\t\t\tkey: 'record_length',","\t\t\ttype: 'integer',","\t\t\tlength: 4,","\t\t\tstartingPosition: 25,","\t\t\tdefaultValue: 132,","\t\t}, {","\t\t\tkey: 'record_count', // TODO, count records","\t\t\ttype: 'integer',","\t\t\tlength: 7,","\t\t\tstartingPosition: 29,","\t\t}, {","\t\t\tkey: 'cycle_date',","\t\t\ttype: 'string',","\t\t\tlength: 4,","\t\t\tstartingPosition: 36,","\t\t\tdefaultValue: '0001',","\t\t}, {","\t\t\tkey: 'creation_date',","\t\t\ttype: 'string',","\t\t\tlength: 11,","\t\t\tstartingPosition: 42,","\t\t\tdefaultValue: '20-SEP-2015', //TODO","\t\t}, {","\t\t\tkey: 'creation_time',","\t\t\ttype: 'string',","\t\t\tlength: 8,","\t\t\tstartingPosition: 53,","\t\t\tdefaultValue: '06:06:06',","\t\t}, {","\t\t\tkey: 'data_supplier_ident',","\t\t\ttype: 'string',","\t\t\tlength: 16,","\t\t\tstartingPosition: 62,","\t\t\tdefaultValue: 'OFMTestExport01',","\t\t}, {","\t\t\tkey: 'target_customer_ident',  // optional","\t\t\ttype: 'string',","\t\t\tlength: 16,","\t\t\tstartingPosition: 78,","\t\t\tdefaultValue: 'Test Customer',","\t\t}, {","\t\t\tkey: 'database_part_no',  // optional","\t\t\ttype: 'string',","\t\t\tlength: 20,","\t\t\tstartingPosition: 94,","","\t\t}, {","\t\t\tkey: 'file_crc', // TODO, implement CRC","\t\t\ttype: 'string',","\t\t\tlength: 8,","\t\t\tstartingPosition: 125,","\t\t\tdefaultValue: '',","\t\t} ],","\t},","\t2: {","\t\tlength: 132,","\t\tfields: [{","\t\t\tkey: 'header_ident',","\t\t\ttype: 'string',","\t\t\tlength: 3,","\t\t\tstartingPosition: 1,","\t\t\tdefaultValue: 'HDR',","\t\t}, {","\t\t\tkey: 'header_number',","\t\t\ttype: 'integer',","\t\t\tlength: 2,","\t\t\tstartingPosition: 4,","\t\t\tdefaultValue: 2,","\t\t}, {","\t\t\tkey: 'effective_date', // optional","\t\t\ttype: 'string',","\t\t\tlength: 11,","\t\t\tstartingPosition: 6,","\t\t\tdefaultValue: '',","\t\t}, {","\t\t\tkey: 'expiration_date', // optional","\t\t\ttype: 'string',","\t\t\tlength: 11,","\t\t\tstartingPosition: 17,","\t\t\tdefaultValue: '',","\t\t}, {","\t\t\tkey: 'supplier_text_field',","\t\t\ttype: 'string',","\t\t\tlength: 30,","\t\t\tstartingPosition: 29,","\t\t\tdefaultValue: 'OFM Test, Work in Progress',","\t\t}, {","\t\t\tkey: 'descriptive_text',","\t\t\ttype: 'string',","\t\t\tlength: 30,","\t\t\tstartingPosition: 59,","\t\t\tdefaultValue: 'TEST! NOT FOR OPERATIONAL USE',","\t\t}]","\t}","}",""],"id":1}],[{"start":{"row":129,"column":0},"end":{"row":130,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":1},"action":"remove","lines":["\t"],"id":3},{"start":{"row":1,"column":0},"end":{"row":1,"column":4},"action":"insert","lines":["    "]},{"start":{"row":2,"column":0},"end":{"row":2,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":2,"column":0},"end":{"row":2,"column":8},"action":"insert","lines":["        "]},{"start":{"row":3,"column":0},"end":{"row":3,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":3,"column":0},"end":{"row":3,"column":8},"action":"insert","lines":["        "]},{"start":{"row":4,"column":0},"end":{"row":4,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":4,"column":0},"end":{"row":4,"column":12},"action":"insert","lines":["            "]},{"start":{"row":5,"column":0},"end":{"row":5,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":5,"column":0},"end":{"row":5,"column":12},"action":"insert","lines":["            "]},{"start":{"row":6,"column":0},"end":{"row":6,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":6,"column":0},"end":{"row":6,"column":12},"action":"insert","lines":["            "]},{"start":{"row":7,"column":0},"end":{"row":7,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":7,"column":0},"end":{"row":7,"column":12},"action":"insert","lines":["            "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":8,"column":0},"end":{"row":8,"column":12},"action":"insert","lines":["            "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":9,"column":0},"end":{"row":9,"column":8},"action":"insert","lines":["        "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":10,"column":0},"end":{"row":10,"column":12},"action":"insert","lines":["            "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":11,"column":0},"end":{"row":11,"column":12},"action":"insert","lines":["            "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":12,"column":0},"end":{"row":12,"column":12},"action":"insert","lines":["            "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":13,"column":0},"end":{"row":13,"column":12},"action":"insert","lines":["            "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":14,"column":0},"end":{"row":14,"column":12},"action":"insert","lines":["            "]},{"start":{"row":15,"column":0},"end":{"row":15,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":15,"column":0},"end":{"row":15,"column":8},"action":"insert","lines":["        "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":16,"column":0},"end":{"row":16,"column":12},"action":"insert","lines":["            "]},{"start":{"row":17,"column":0},"end":{"row":17,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":17,"column":0},"end":{"row":17,"column":12},"action":"insert","lines":["            "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":18,"column":0},"end":{"row":18,"column":12},"action":"insert","lines":["            "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":19,"column":0},"end":{"row":19,"column":12},"action":"insert","lines":["            "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":20,"column":0},"end":{"row":20,"column":12},"action":"insert","lines":["            "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":21,"column":0},"end":{"row":21,"column":8},"action":"insert","lines":["        "]},{"start":{"row":22,"column":0},"end":{"row":22,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":22,"column":0},"end":{"row":22,"column":12},"action":"insert","lines":["            "]},{"start":{"row":23,"column":0},"end":{"row":23,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":23,"column":0},"end":{"row":23,"column":12},"action":"insert","lines":["            "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":24,"column":0},"end":{"row":24,"column":12},"action":"insert","lines":["            "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":25,"column":0},"end":{"row":25,"column":12},"action":"insert","lines":["            "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":26,"column":0},"end":{"row":26,"column":12},"action":"insert","lines":["            "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":27,"column":0},"end":{"row":27,"column":8},"action":"insert","lines":["        "]},{"start":{"row":28,"column":0},"end":{"row":28,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":28,"column":0},"end":{"row":28,"column":12},"action":"insert","lines":["            "]},{"start":{"row":29,"column":0},"end":{"row":29,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":29,"column":0},"end":{"row":29,"column":12},"action":"insert","lines":["            "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":30,"column":0},"end":{"row":30,"column":12},"action":"insert","lines":["            "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":31,"column":0},"end":{"row":31,"column":12},"action":"insert","lines":["            "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":32,"column":0},"end":{"row":32,"column":12},"action":"insert","lines":["            "]},{"start":{"row":33,"column":0},"end":{"row":33,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":33,"column":0},"end":{"row":33,"column":8},"action":"insert","lines":["        "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":34,"column":0},"end":{"row":34,"column":12},"action":"insert","lines":["            "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":35,"column":0},"end":{"row":35,"column":12},"action":"insert","lines":["            "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":36,"column":0},"end":{"row":36,"column":12},"action":"insert","lines":["            "]},{"start":{"row":37,"column":0},"end":{"row":37,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":37,"column":0},"end":{"row":37,"column":12},"action":"insert","lines":["            "]},{"start":{"row":38,"column":0},"end":{"row":38,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":38,"column":0},"end":{"row":38,"column":12},"action":"insert","lines":["            "]},{"start":{"row":39,"column":0},"end":{"row":39,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":39,"column":0},"end":{"row":39,"column":8},"action":"insert","lines":["        "]},{"start":{"row":40,"column":0},"end":{"row":40,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":40,"column":0},"end":{"row":40,"column":12},"action":"insert","lines":["            "]},{"start":{"row":41,"column":0},"end":{"row":41,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":41,"column":0},"end":{"row":41,"column":12},"action":"insert","lines":["            "]},{"start":{"row":42,"column":0},"end":{"row":42,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":42,"column":0},"end":{"row":42,"column":12},"action":"insert","lines":["            "]},{"start":{"row":43,"column":0},"end":{"row":43,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":43,"column":0},"end":{"row":43,"column":12},"action":"insert","lines":["            "]},{"start":{"row":44,"column":0},"end":{"row":44,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":44,"column":0},"end":{"row":44,"column":8},"action":"insert","lines":["        "]},{"start":{"row":45,"column":0},"end":{"row":45,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":45,"column":0},"end":{"row":45,"column":12},"action":"insert","lines":["            "]},{"start":{"row":46,"column":0},"end":{"row":46,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":46,"column":0},"end":{"row":46,"column":12},"action":"insert","lines":["            "]},{"start":{"row":47,"column":0},"end":{"row":47,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":47,"column":0},"end":{"row":47,"column":12},"action":"insert","lines":["            "]},{"start":{"row":48,"column":0},"end":{"row":48,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":48,"column":0},"end":{"row":48,"column":12},"action":"insert","lines":["            "]},{"start":{"row":49,"column":0},"end":{"row":49,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":49,"column":0},"end":{"row":49,"column":12},"action":"insert","lines":["            "]},{"start":{"row":50,"column":0},"end":{"row":50,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":50,"column":0},"end":{"row":50,"column":8},"action":"insert","lines":["        "]},{"start":{"row":51,"column":0},"end":{"row":51,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":51,"column":0},"end":{"row":51,"column":12},"action":"insert","lines":["            "]},{"start":{"row":52,"column":0},"end":{"row":52,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":52,"column":0},"end":{"row":52,"column":12},"action":"insert","lines":["            "]},{"start":{"row":53,"column":0},"end":{"row":53,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":53,"column":0},"end":{"row":53,"column":12},"action":"insert","lines":["            "]},{"start":{"row":54,"column":0},"end":{"row":54,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":54,"column":0},"end":{"row":54,"column":12},"action":"insert","lines":["            "]},{"start":{"row":55,"column":0},"end":{"row":55,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":55,"column":0},"end":{"row":55,"column":12},"action":"insert","lines":["            "]},{"start":{"row":56,"column":0},"end":{"row":56,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":56,"column":0},"end":{"row":56,"column":8},"action":"insert","lines":["        "]},{"start":{"row":57,"column":0},"end":{"row":57,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":57,"column":0},"end":{"row":57,"column":12},"action":"insert","lines":["            "]},{"start":{"row":58,"column":0},"end":{"row":58,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":58,"column":0},"end":{"row":58,"column":12},"action":"insert","lines":["            "]},{"start":{"row":59,"column":0},"end":{"row":59,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":59,"column":0},"end":{"row":59,"column":12},"action":"insert","lines":["            "]},{"start":{"row":60,"column":0},"end":{"row":60,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":60,"column":0},"end":{"row":60,"column":12},"action":"insert","lines":["            "]},{"start":{"row":61,"column":0},"end":{"row":61,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":61,"column":0},"end":{"row":61,"column":12},"action":"insert","lines":["            "]},{"start":{"row":62,"column":0},"end":{"row":62,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":62,"column":0},"end":{"row":62,"column":8},"action":"insert","lines":["        "]},{"start":{"row":63,"column":0},"end":{"row":63,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":63,"column":0},"end":{"row":63,"column":12},"action":"insert","lines":["            "]},{"start":{"row":64,"column":0},"end":{"row":64,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":64,"column":0},"end":{"row":64,"column":12},"action":"insert","lines":["            "]},{"start":{"row":65,"column":0},"end":{"row":65,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":65,"column":0},"end":{"row":65,"column":12},"action":"insert","lines":["            "]},{"start":{"row":66,"column":0},"end":{"row":66,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":66,"column":0},"end":{"row":66,"column":12},"action":"insert","lines":["            "]},{"start":{"row":67,"column":0},"end":{"row":67,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":67,"column":0},"end":{"row":67,"column":12},"action":"insert","lines":["            "]},{"start":{"row":68,"column":0},"end":{"row":68,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":68,"column":0},"end":{"row":68,"column":8},"action":"insert","lines":["        "]},{"start":{"row":69,"column":0},"end":{"row":69,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":69,"column":0},"end":{"row":69,"column":12},"action":"insert","lines":["            "]},{"start":{"row":69,"column":42},"end":{"row":69,"column":43},"action":"remove","lines":[" "]},{"start":{"row":70,"column":0},"end":{"row":70,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":70,"column":0},"end":{"row":70,"column":12},"action":"insert","lines":["            "]},{"start":{"row":71,"column":0},"end":{"row":71,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":71,"column":0},"end":{"row":71,"column":12},"action":"insert","lines":["            "]},{"start":{"row":72,"column":0},"end":{"row":72,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":72,"column":0},"end":{"row":72,"column":12},"action":"insert","lines":["            "]},{"start":{"row":73,"column":0},"end":{"row":73,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":73,"column":0},"end":{"row":73,"column":12},"action":"insert","lines":["            "]},{"start":{"row":74,"column":0},"end":{"row":74,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":74,"column":0},"end":{"row":74,"column":8},"action":"insert","lines":["        "]},{"start":{"row":75,"column":0},"end":{"row":75,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":75,"column":0},"end":{"row":75,"column":12},"action":"insert","lines":["            "]},{"start":{"row":75,"column":37},"end":{"row":75,"column":38},"action":"remove","lines":[" "]},{"start":{"row":76,"column":0},"end":{"row":76,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":76,"column":0},"end":{"row":76,"column":12},"action":"insert","lines":["            "]},{"start":{"row":77,"column":0},"end":{"row":77,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":77,"column":0},"end":{"row":77,"column":12},"action":"insert","lines":["            "]},{"start":{"row":78,"column":0},"end":{"row":78,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":78,"column":0},"end":{"row":78,"column":12},"action":"insert","lines":["            "]},{"start":{"row":80,"column":0},"end":{"row":80,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":80,"column":0},"end":{"row":80,"column":8},"action":"insert","lines":["        "]},{"start":{"row":81,"column":0},"end":{"row":81,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":81,"column":0},"end":{"row":81,"column":12},"action":"insert","lines":["            "]},{"start":{"row":82,"column":0},"end":{"row":82,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":82,"column":0},"end":{"row":82,"column":12},"action":"insert","lines":["            "]},{"start":{"row":83,"column":0},"end":{"row":83,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":83,"column":0},"end":{"row":83,"column":12},"action":"insert","lines":["            "]},{"start":{"row":84,"column":0},"end":{"row":84,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":84,"column":0},"end":{"row":84,"column":12},"action":"insert","lines":["            "]},{"start":{"row":85,"column":0},"end":{"row":85,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":85,"column":0},"end":{"row":85,"column":12},"action":"insert","lines":["            "]},{"start":{"row":86,"column":0},"end":{"row":86,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":86,"column":0},"end":{"row":86,"column":8},"action":"insert","lines":["        "]},{"start":{"row":86,"column":9},"end":{"row":86,"column":10},"action":"remove","lines":[" "]},{"start":{"row":87,"column":0},"end":{"row":87,"column":1},"action":"remove","lines":["\t"]},{"start":{"row":87,"column":0},"end":{"row":87,"column":4},"action":"insert","lines":["    "]},{"start":{"row":88,"column":0},"end":{"row":88,"column":1},"action":"remove","lines":["\t"]},{"start":{"row":88,"column":0},"end":{"row":88,"column":4},"action":"insert","lines":["    "]},{"start":{"row":89,"column":0},"end":{"row":89,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":89,"column":0},"end":{"row":89,"column":8},"action":"insert","lines":["        "]},{"start":{"row":90,"column":0},"end":{"row":90,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":90,"column":0},"end":{"row":90,"column":8},"action":"insert","lines":["        "]},{"start":{"row":91,"column":0},"end":{"row":91,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":91,"column":0},"end":{"row":91,"column":12},"action":"insert","lines":["            "]},{"start":{"row":92,"column":0},"end":{"row":92,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":92,"column":0},"end":{"row":92,"column":12},"action":"insert","lines":["            "]},{"start":{"row":93,"column":0},"end":{"row":93,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":93,"column":0},"end":{"row":93,"column":12},"action":"insert","lines":["            "]},{"start":{"row":94,"column":0},"end":{"row":94,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":94,"column":0},"end":{"row":94,"column":12},"action":"insert","lines":["            "]},{"start":{"row":95,"column":0},"end":{"row":95,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":95,"column":0},"end":{"row":95,"column":12},"action":"insert","lines":["            "]},{"start":{"row":96,"column":0},"end":{"row":96,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":96,"column":0},"end":{"row":96,"column":8},"action":"insert","lines":["        "]},{"start":{"row":97,"column":0},"end":{"row":97,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":97,"column":0},"end":{"row":97,"column":12},"action":"insert","lines":["            "]},{"start":{"row":98,"column":0},"end":{"row":98,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":98,"column":0},"end":{"row":98,"column":12},"action":"insert","lines":["            "]},{"start":{"row":99,"column":0},"end":{"row":99,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":99,"column":0},"end":{"row":99,"column":12},"action":"insert","lines":["            "]},{"start":{"row":100,"column":0},"end":{"row":100,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":100,"column":0},"end":{"row":100,"column":12},"action":"insert","lines":["            "]},{"start":{"row":101,"column":0},"end":{"row":101,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":101,"column":0},"end":{"row":101,"column":12},"action":"insert","lines":["            "]},{"start":{"row":102,"column":0},"end":{"row":102,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":102,"column":0},"end":{"row":102,"column":8},"action":"insert","lines":["        "]},{"start":{"row":103,"column":0},"end":{"row":103,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":103,"column":0},"end":{"row":103,"column":12},"action":"insert","lines":["            "]},{"start":{"row":104,"column":0},"end":{"row":104,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":104,"column":0},"end":{"row":104,"column":12},"action":"insert","lines":["            "]},{"start":{"row":105,"column":0},"end":{"row":105,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":105,"column":0},"end":{"row":105,"column":12},"action":"insert","lines":["            "]},{"start":{"row":106,"column":0},"end":{"row":106,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":106,"column":0},"end":{"row":106,"column":12},"action":"insert","lines":["            "]},{"start":{"row":107,"column":0},"end":{"row":107,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":107,"column":0},"end":{"row":107,"column":12},"action":"insert","lines":["            "]},{"start":{"row":108,"column":0},"end":{"row":108,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":108,"column":0},"end":{"row":108,"column":8},"action":"insert","lines":["        "]},{"start":{"row":109,"column":0},"end":{"row":109,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":109,"column":0},"end":{"row":109,"column":12},"action":"insert","lines":["            "]},{"start":{"row":110,"column":0},"end":{"row":110,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":110,"column":0},"end":{"row":110,"column":12},"action":"insert","lines":["            "]},{"start":{"row":111,"column":0},"end":{"row":111,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":111,"column":0},"end":{"row":111,"column":12},"action":"insert","lines":["            "]},{"start":{"row":112,"column":0},"end":{"row":112,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":112,"column":0},"end":{"row":112,"column":12},"action":"insert","lines":["            "]},{"start":{"row":113,"column":0},"end":{"row":113,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":113,"column":0},"end":{"row":113,"column":12},"action":"insert","lines":["            "]},{"start":{"row":114,"column":0},"end":{"row":114,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":114,"column":0},"end":{"row":114,"column":8},"action":"insert","lines":["        "]},{"start":{"row":115,"column":0},"end":{"row":115,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":115,"column":0},"end":{"row":115,"column":12},"action":"insert","lines":["            "]},{"start":{"row":116,"column":0},"end":{"row":116,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":116,"column":0},"end":{"row":116,"column":12},"action":"insert","lines":["            "]},{"start":{"row":117,"column":0},"end":{"row":117,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":117,"column":0},"end":{"row":117,"column":12},"action":"insert","lines":["            "]},{"start":{"row":118,"column":0},"end":{"row":118,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":118,"column":0},"end":{"row":118,"column":12},"action":"insert","lines":["            "]},{"start":{"row":119,"column":0},"end":{"row":119,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":119,"column":0},"end":{"row":119,"column":12},"action":"insert","lines":["            "]},{"start":{"row":120,"column":0},"end":{"row":120,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":120,"column":0},"end":{"row":120,"column":8},"action":"insert","lines":["        "]},{"start":{"row":121,"column":0},"end":{"row":121,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":121,"column":0},"end":{"row":121,"column":12},"action":"insert","lines":["            "]},{"start":{"row":122,"column":0},"end":{"row":122,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":122,"column":0},"end":{"row":122,"column":12},"action":"insert","lines":["            "]},{"start":{"row":123,"column":0},"end":{"row":123,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":123,"column":0},"end":{"row":123,"column":12},"action":"insert","lines":["            "]},{"start":{"row":124,"column":0},"end":{"row":124,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":124,"column":0},"end":{"row":124,"column":12},"action":"insert","lines":["            "]},{"start":{"row":125,"column":0},"end":{"row":125,"column":3},"action":"remove","lines":["\t\t\t"]},{"start":{"row":125,"column":0},"end":{"row":125,"column":12},"action":"insert","lines":["            "]},{"start":{"row":126,"column":0},"end":{"row":126,"column":2},"action":"remove","lines":["\t\t"]},{"start":{"row":126,"column":0},"end":{"row":126,"column":8},"action":"insert","lines":["        "]},{"start":{"row":127,"column":0},"end":{"row":127,"column":1},"action":"remove","lines":["\t"]},{"start":{"row":127,"column":0},"end":{"row":127,"column":4},"action":"insert","lines":["    "]},{"start":{"row":129,"column":0},"end":{"row":130,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":129,"column":0},"end":{"row":130,"column":0},"action":"insert","lines":["",""],"id":4}],[{"start":{"row":130,"column":0},"end":{"row":130,"column":17},"action":"insert","lines":["module.exports = "],"id":5}],[{"start":{"row":130,"column":17},"end":{"row":130,"column":18},"action":"insert","lines":["a"],"id":6}],[{"start":{"row":130,"column":18},"end":{"row":130,"column":19},"action":"insert","lines":["r"],"id":7}],[{"start":{"row":130,"column":19},"end":{"row":130,"column":20},"action":"insert","lines":["i"],"id":8}],[{"start":{"row":130,"column":17},"end":{"row":130,"column":20},"action":"remove","lines":["ari"],"id":9},{"start":{"row":130,"column":17},"end":{"row":130,"column":34},"action":"insert","lines":["arinc_spec_header"]}],[{"start":{"row":130,"column":34},"end":{"row":130,"column":35},"action":"insert","lines":[";"],"id":10}]]},"ace":{"folds":[],"scrolltop":1548.5,"scrollleft":0,"selection":{"start":{"row":130,"column":17},"end":{"row":130,"column":34},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1442876870554,"hash":"799ce207a4e4311a6ded3b922f737d1c482ff5f0"}