git clone https://github.com/MakerAsia/kbide-esp-idf-platfrom-linuxx64 /tmp/esp-idf-linuxx64
rm -rf ../platforms/esp-idf/tools
cp -r /tmp/esp-idf-linuxx64/tools ../platforms/esp-idf/tools
rm -rf /tmp/esp-idf-linuxx64
git clone https://github.com/MakerAsia/kbide-arduino-avr-platfrom-linuxx64 /tmp/arduino-avr-linuxx64
rm -rf ../platforms/arduino-avr/tools
cp -r /tmp/arduino-avr-linuxx64/tools ../platforms/arduino-avr/tools
rm -rf /tmp/arduino-avr-linuxx64

#clean all build folder
bdirs=$(find ../boards -maxdepth 2 -name "build" -type d)
for bdir in $bdirs; do
  echo "delete $bdir"
  rm -rf $bdir
done
chmod +x ../packages/kbide-package-clang-format/bin/linux_x64/clang-format
