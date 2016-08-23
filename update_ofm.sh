#!/bin/sh
set -e
curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=lovv&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/lovv.xml

curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=lsas&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/lsas.xml

curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=ed&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/ed.xml

curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=limm&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/limm.xml 

curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=ljla&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/ljla.xml 

curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=lhcc&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/lhcc.xml 

curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=lzbb&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/lzbb.xml 

curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=lkaa&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/lkaa.xml 