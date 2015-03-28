# usage: gif2sheet mygif
# outputs png spritesheet for given gif
convert -layers dispose $1.gif temp.gif
montage temp.gif -tile x1 -geometry '1x1+0+0<' -alpha On -background "rgba(0, 0, 0, 0.0)" -quality 100 $1_sheet.png
rm temp.gif