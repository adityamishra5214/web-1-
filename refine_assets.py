import os
from PIL import Image
import numpy as np

# 1. Clean Logo
logo_path = r"assets/logo/livy-logo.png"
logo = Image.open(logo_path).convert("RGBA")
# Crop border
cropped_logo = logo.crop((3, 3, logo.width, logo.height))
cropped_logo.save(r"assets/logo/livy-logo-clean.png")

# Transparent logo
logo_np = np.array(cropped_logo)
# Background color is around [246, 247, 241]
# Compute distance from cream background
bg_color = np.array([246, 247, 241])
rgb = logo_np[:, :, :3]
dist = np.linalg.norm(rgb - bg_color, axis=2)

# If dist is close to 0 -> transparent, if dark -> fully opaque
# Linear ramp between dist 5 and 45
alpha = np.clip((dist - 3) / 25.0 * 255.0, 0, 255).astype(np.uint8)

# Keep the line color intact (warm bronze/coffee #967C62 or similar)
logo_transparent = np.zeros_like(logo_np)
logo_transparent[:, :, :3] = logo_np[:, :, :3]
logo_transparent[:, :, 3] = alpha

Image.fromarray(logo_transparent).save(r"assets/logo/livy-logo-transparent.png")
print("Saved clean and transparent logo!")

# 2. Refine Product Folded Images
for i in range(1, 6):
    sku = f"sku-0{i}"
    folded_path = f"assets/products/{sku}-folded.png"
    im = Image.open(folded_path)
    
    # Crop 2 pixels from left, 1 from top/bottom/right if needed
    # Let's inspect left edge
    left_crop = 2
    top_crop = 1
    right_crop = 1
    bottom_crop = 1
    
    im_clean = im.crop((left_crop, top_crop, im.width - right_crop, im.height - bottom_crop))
    im_clean.save(f"assets/products/{sku}-folded-clean.png")
    
    # Do the same for HD version
    hd_path = f"assets/products/{sku}-folded-hd.png"
    if os.path.exists(hd_path):
        hd_im = Image.open(hd_path)
        # 4x zoom -> 8px left crop
        hd_clean = hd_im.crop((8, 4, hd_im.width - 4, hd_im.height - 4))
        hd_clean.save(f"assets/products/{sku}-folded-hd-clean.png")

    print(f"Refined {sku} folded image")

print("All product assets refined successfully!")
