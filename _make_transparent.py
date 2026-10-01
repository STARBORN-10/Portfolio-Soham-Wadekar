"""Remove baked-in checkerboard from the hero portrait; keep person pixels unchanged."""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "Colored PNG Format.png"
OUT = ROOT / "profilepicture_cutout.png"
DEBUG = ROOT / "_matte_debug"

WHITE_REF = np.array([253.0, 253.0, 253.0], dtype=np.float32)
GRAY_REF = np.array([208.0, 208.0, 209.0], dtype=np.float32)
MID_REF = np.array([230.0, 230.0, 231.0], dtype=np.float32)


def composite(rgba: np.ndarray, bg_color: tuple[int, int, int], path: Path, scale: float = 0.42) -> None:
    h, w = rgba.shape[:2]
    a = rgba[:, :, 3:4].astype(np.float32) / 255.0
    bg = np.array(bg_color, dtype=np.float32)
    out = rgba[:, :, :3].astype(np.float32) * a + bg * (1.0 - a)
    im = Image.fromarray(out.astype(np.uint8), "RGB")
    im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS).save(path)


def main() -> None:
    rgb_u8 = np.array(Image.open(SRC).convert("RGB"))
    h, w = rgb_u8.shape[:2]
    rgb = rgb_u8.astype(np.float32)
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    luma = 0.299 * r + 0.587 * g + 0.114 * b
    chroma = np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)

    d_best = np.minimum(
        np.minimum(
            np.linalg.norm(rgb - WHITE_REF, axis=2),
            np.linalg.norm(rgb - GRAY_REF, axis=2),
        ),
        np.linalg.norm(rgb - MID_REF, axis=2),
    )
    checker_like = (chroma < 28) & (luma > 168) & (d_best < 55)
    near_checker = (chroma < 35) & (luma > 150) & (d_best < 80)

    skin = (
        (r > 90)
        & (g > 50)
        & (b > 30)
        & (r > g)
        & (r > b)
        & ((r - g) > 12)
        & (chroma > 18)
        & (luma > 50)
        & (luma < 230)
    )
    dark = luma < 100
    core = dark | skin
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (35, 35))
    closed = cv2.morphologyEx(core.astype(np.uint8) * 255, cv2.MORPH_CLOSE, kernel)
    person_filled = ndimage.binary_fill_holes(closed > 0)

    structure = np.ones((3, 3), dtype=bool)
    border = np.zeros((h, w), dtype=bool)
    border[0, :] = True
    border[-1, :] = True
    border[:, 0] = True
    border[:, -1] = True

    flood_mask = (checker_like | near_checker) & ~person_filled
    bg = ndimage.binary_propagation(border & flood_mask, mask=flood_mask, structure=structure)

    # Small checkerboard pockets in hair (not shirt, not eyes).
    interior = checker_like & person_filled & ~bg
    labeled, nlab = ndimage.label(interior)
    for i in range(1, nlab + 1):
        comp = labeled == i
        ys, xs = np.where(comp)
        area = int(comp.sum())
        if area < 500 and ys.max() < 360:
            bg[comp] = True

    # Flyaway hair still has baked checker specks; eat only light-neutral pixels.
    hair_zone = np.zeros((h, w), dtype=bool)
    hair_zone[:390, :] = True
    hair_speck = (
        hair_zone
        & ~skin
        & (luma > 158)
        & (chroma < 32)
        & (d_best < 90)
    )
    bg = ndimage.binary_propagation(bg, mask=bg | hair_speck, structure=structure)

    # Tiny silhouette specks just outside the filled person.
    dist_to_bg = ndimage.distance_transform_edt(~bg)
    specks = near_checker & ~bg & ~person_filled & (dist_to_bg <= 2)
    bg |= specks

    fg = ~bg
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[:, :, :3] = rgb_u8
    rgba[:, :, 3] = np.where(fg, 255, 0).astype(np.uint8)

    Image.fromarray(rgba, "RGBA").save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} size={w}x{h} transparent={(bg.mean() * 100):.2f}%")
    print("rgb identical on opaque", np.array_equal(rgba[:, :, :3][fg], rgb_u8[fg]))

    DEBUG.mkdir(exist_ok=True)
    composite(rgba, (246, 245, 240), DEBUG / "preview_offwhite.png")
    composite(rgba, (26, 86, 219), DEBUG / "preview_blue.png")
    composite(rgba, (255, 0, 255), DEBUG / "preview_magenta.png")
    composite(rgba[40:280, 430:860], (255, 0, 255), DEBUG / "hair_magenta.png", scale=1)
    composite(rgba[40:280, 430:860], (246, 245, 240), DEBUG / "hair_offwhite.png", scale=1)
    composite(rgba[620:1000, 320:820], (26, 86, 219), DEBUG / "chest_on_blue.png", scale=1)
    composite(rgba[620:1000, 320:820], (246, 245, 240), DEBUG / "chest_on_offwhite.png", scale=1)
    composite(rgba[330:470, 480:760], (26, 86, 219), DEBUG / "eyes_on_blue.png", scale=1)


if __name__ == "__main__":
    main()
