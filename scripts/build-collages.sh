#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RAW="$ROOT/.assetwork/raw"
BUILD="$ROOT/.assetwork/build"
OUT="$ROOT/public/assets"
MAGICK=/usr/bin/magick

command -v curl >/dev/null
command -v jq >/dev/null
[[ -x "$MAGICK" ]]
mkdir -p "$RAW" "$BUILD" "$OUT"

met_search() {
  curl -fsSLG --data-urlencode "q=$1" --data-urlencode hasImages=true \
    https://collectionapi.metmuseum.org/public/collection/v1/search
}

met_object() {
  local id="$1" record="$RAW/$1.json"
  [[ -s "$record" ]] || curl -fsSL --retry 3 \
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/$id" -o "$record"
  jq -e --argjson id "$id" \
    '.objectID == $id and .isPublicDomain == true and (.primaryImage | type == "string" and length > 0)' \
    "$record" >/dev/null
}

met_download() {
  local id="$1" record="$RAW/$1.json" image="$RAW/$1.jpg"
  met_object "$id"
  [[ -s "$image" ]] || curl -fsSL --retry 3 "$(jq -r .primaryImage "$record")" -o "$image"
  "$MAGICK" identify "$image" >/dev/null
}

for id in 254779 241307 247458 253053 251485 254272; do
  met_download "$id"
done

# Hero: text-safe darkness, a Mycenaean octopus plate, and a low Cypriot ship.
"$MAGICK" "$RAW/254779.jpg" -crop 2200x1800+780+1420 +repage \
  -resize '1050x650^' -gravity center -extent 1050x650 -colorspace gray \
  -level 8%,88% -fill '#24564e' -colorize 32 "$BUILD/hero-jar.png"
"$MAGICK" "$RAW/241307.jpg" -colorspace HSL -channel G -separate +channel \
  -threshold 4% -morphology Close Disk:2 "$BUILD/hero-ship-mask.png"
"$MAGICK" "$RAW/241307.jpg" "$BUILD/hero-ship-mask.png" -alpha off \
  -compose CopyOpacity -composite -trim +repage -resize '820x470>' -colorspace gray \
  -level 10%,91% -fill '#d8ccb4' -colorize 18 "$BUILD/hero-ship.png"
"$MAGICK" -size 1915x821 xc:'#0a0e10' \
  "$BUILD/hero-jar.png" -geometry +720+34 -compose over -composite \
  "$BUILD/hero-ship.png" -geometry +992+190 -compose over -composite \
  -fill none -stroke '#35464a' -strokewidth 2 -draw 'rectangle 712,28 1778,692' \
  -stroke '#963f35' -strokewidth 3 -draw 'polyline 742,615 920,586 1058,624 1248,576 1448,610 1605,565 1772,595' \
  -stroke '#526164' -strokewidth 2 -draw 'polyline 834,734 1048,721 1210,735 1456,715 1764,728' \
  -seed 12 -attenuate 0.012 +noise Gaussian -colorspace sRGB -strip -quality 80 \
  -define webp:method=6 "$OUT/odysseus-hero.webp"

# Underworld: the same funerary figure survives as three unequally remembered plates.
"$MAGICK" "$RAW/247458.jpg" -crop 930x1550+920+1370 +repage -colorspace gray \
  -negate -level 5%,78% -fill '#294f4a' -colorize 18 -resize 430x900! "$BUILD/underworld-center.png"
"$MAGICK" "$BUILD/underworld-center.png" -crop 340x790+0+70 +repage -resize 380x810! \
  -channel A -evaluate set 42% +channel "$BUILD/underworld-left.png"
"$MAGICK" "$BUILD/underworld-center.png" -crop 300x760+130+100 +repage -resize 300x760! \
  -channel A -evaluate set 38% +channel "$BUILD/underworld-right.png"
"$MAGICK" "$BUILD/underworld-center.png" -channel A -evaluate set 76% +channel \
  "$BUILD/underworld-main.png"
"$MAGICK" -size 1536x1024 xc:'#0a0e10' \
  "$BUILD/underworld-left.png" -geometry +264+108 -compose over -composite \
  "$BUILD/underworld-main.png" -geometry +552+52 -compose over -composite \
  "$BUILD/underworld-right.png" -geometry +982+154 -compose over -composite \
  -fill none -stroke '#273237' -strokewidth 2 \
  -draw 'rectangle 254,98 654,932 rectangle 542,42 992,966 rectangle 972,144 1292,938' \
  -stroke '#963f35' -strokewidth 3 -draw 'line 206,820 1330,820' \
  -seed 24 -attenuate 0.012 +noise Gaussian -colorspace sRGB -strip -quality 80 \
  -define webp:method=6 "$OUT/odysseus-underworld.webp"

# Homecoming: relief, archer, and owl arranged as one recognition register.
"$MAGICK" "$RAW/253053.jpg" -resize '1110x860^' -gravity center -extent 1110x860 \
  -colorspace gray -level 5%,92% -fill '#d8ccb4' -colorize 15 "$BUILD/home-relief.png"
"$MAGICK" "$RAW/251485.jpg" -crop 500x660+500+800 +repage -resize '300x360^' \
  -gravity center -extent 300x360 -colorspace gray -threshold 35% -transparent black \
  -fill '#a94f32' -colorize 100 "$BUILD/home-archer.png"
"$MAGICK" "$RAW/254272.jpg" -crop 800x850+1500+1050 +repage -resize '300x330^' \
  -gravity center -extent 300x330 -colorspace gray -threshold 48% -transparent black \
  -fill '#d8ccb4' -colorize 100 "$BUILD/home-owl.png"
"$MAGICK" -size 1536x1024 xc:'#0a0e10' \
  "$BUILD/home-relief.png" -geometry +0+82 -compose over -composite \
  "$BUILD/home-archer.png" -geometry +1190+132 -compose over -composite \
  "$BUILD/home-owl.png" -geometry +1182+616 -compose over -composite \
  -fill none -stroke '#293438' -strokewidth 2 \
  -draw 'rectangle 12,68 1124,956 line 1138,68 1138,956 line 1138,572 1510,572' \
  -seed 36 -attenuate 0.012 +noise Gaussian -colorspace sRGB -strip -quality 80 \
  -define webp:method=6 "$OUT/odysseus-homecoming.webp"

"$MAGICK" identify -format '%f %wx%h %[colorspace] %b\n' \
  "$OUT/odysseus-hero.webp" "$OUT/odysseus-underworld.webp" "$OUT/odysseus-homecoming.webp"
