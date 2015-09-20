#!/bin/sh
set -e
curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=lovv&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/lovv.xml

curl "http://oliver.vorderegger.org/wp-content/themes/bones/library/getOfmData.php?fir=lsas&accessHash=k9DFf4wD88hZmuf" -o tmp.xml
mv tmp.xml ofmdata/lsas.xml
