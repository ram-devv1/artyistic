# Shared imagery language

Treat editorial images as authored archival collages: compose verified public-domain museum objects with hard crops, limited palettes, print grain, and plate frames. Generative pixel synthesis is not `authored` for editorial use.

## Source and verify

1. Use only CC0 or public-domain object photography from a museum record.
2. Verify `isPublicDomain: true` on the object record; do not infer rights from age, search results, or a repost.
3. Record the object title, accession number, object date or period, culture, credit line, canonical record URL, source image URL, and license before downloading.
4. Download the highest available scan. Preserve the raw file outside the published asset tree.
5. Prefer close object details when they carry texture or gesture. Never crop a source to imply a false subject or omit it from provenance.
6. Build a labeled contact sheet, review candidates together, then perform a full-size review of every chosen source and final export.

## Compose the collage

Gather → verify → download → crop hard → convert to grayscale → level → duotone inside the product palette → composite with deliberate scale and text-safe space → add restrained print grain and plate rules → export sRGB WebP at a sane payload. Keep text in HTML, never in pixels.

Reject cutout halos, painterly blending, glossy AI gradients, synthetic heroic portraits, fake historical scenes, decorative artifact soup, random grain, film stills, actor likenesses, and copied production costumes or title treatments. Make the collage visibly editorial, not a claim that its objects occupied one historical scene.

## Manifest schema v3

Create one record per published asset:

```json
{
  "schemaVersion": 3,
  "provenance": {
    "mode": "curated public-domain collage",
    "thirdPartyVisualPixels": true,
    "filmAssets": false,
    "disclosure": "Modern editorial collages assembled from credited public-domain museum objects."
  },
  "assets": [{
    "asset": "/assets/example.webp",
    "storyBeat": "Narrative purpose",
    "compositionNote": "Crop, treatment, and source-boundary note",
    "objects": [{
      "title": "Museum object title",
      "accessionNumber": "00.0.0",
      "objectDate": "Museum-supplied date",
      "culture": "Museum-supplied culture",
      "creditLine": "Museum credit line",
      "sourceUrl": "https://museum.example/object",
      "license": "CC0"
    }],
    "output": { "width": 1600, "height": 1000, "format": "WebP", "colorSpace": "sRGB" }
  }]
}
```

## Alt text contract

Describe the final composition and its narrative beat, not its filename, visual style, or full credit ledger. Use empty alt text only for genuinely decorative plates; never place critical copy inside the image.

## Caption contract

Label the image as a modern editorial collage when that boundary is not obvious. Keep interpretation in the caption, object facts in the provenance manifest, and provide a nearby source link without turning alt text into attribution.

## Source boundary contract

Separate museum-record facts, historical context, later visual reception, and original modern composition. Attribute each object exactly as its record does. Never present a composite, crop, or modern art direction as documentary evidence or an archaeological reconstruction.

## Completion contract

Finish only when every object has verified rights and complete provenance; contact-sheet and full-size reviews pass; crops remain legible at mobile size; no halo, text, generative, film, or actor pixels remain; exports are sRGB WebP with dimensions and restrained payloads; and alt text, caption, source link, and manifest agree.
