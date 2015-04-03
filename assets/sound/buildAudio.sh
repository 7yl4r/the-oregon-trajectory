# packages up .wav file into directory of .ogg and .mp3 versions for web usage
# usage: ./buildAudio.sh ./fileName.wav
# you must be in the directory containing the .wav
# outputs directory of same name with .ogg & .mp3, also moves .wav into new directory

name="${1%.*}"
mkdir $name
echo "======================="
echo "=== making the .mp3 ==="
echo "======================="
lame $1 "$name/$name.mp3"

echo "======================="
echo "=== making the .ogg ==="
echo "======================="
lame $1 "$name/$name.ogg"
mv $1 "$name/$1"

