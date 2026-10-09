# Portfolio asset provenance

All photographs and character imagery were supplied by the portfolio owner for this redesign. No stock photographs or generated substitutes were introduced.

| Shipping asset | Origin |
| --- | --- |
| `public/images/prabharsha-avatar.jpg` | User-supplied Desktop `3d-image-mine.jpg`, copied unchanged. |
| `public/videos/hero-coffee.jpg` | Existing local poster from the supplied coffee animation. |
| `public/videos/hero-coffee.webm`, `hero-coffee.mp4` | Existing optimized variants of the supplied coffee animation, reused unchanged. |
| `public/videos/coffe-drinking-animation.mp4` | Existing original matches the user-supplied Desktop video, SHA-256 `A0409911E95CAF00787531BDC9911C5D0A99289F7AFCEA2A8ACE7E39722B1AC6`. |

Images are served through Next.js Image with responsive sizes. The avatar loads eagerly; secondary photographs load lazily. The video uses a poster, muted inline playback while visible, a playback toggle, and reduced-motion preference handling.

The ClickSuite panel is editorial typography describing the existing project, not a product screenshot. No unverified product UI is depicted.

The real casual and professional photographs were removed from public assets at the owner’s request. Only the generated avatar and animation appear in the revised portfolio. Original user files outside the project were not changed.
