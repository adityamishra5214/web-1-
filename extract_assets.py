import os
import pymupdf
from PIL import Image

pdf_path = r"C:\Users\adity\.gemini\antigravity-ide\brain\91768ec8-9db4-4204-8c68-d3224eaa1d0b\.user_uploaded\media_1793099769592.pdf"
logo_path = r"C:\Users\adity\.gemini\antigravity-ide\brain\91768ec8-9db4-4204-8c68-d3224eaa1d0b\.user_uploaded\media_1793099814626.png"

out_dir = r"c:\Users\adity\Desktop\website 2\assets\products"
os.makedirs(out_dir, exist_ok=True)
os.makedirs(r"c:\Users\adity\Desktop\website 2\assets\logo", exist_ok=True)

# Copy logo
logo_img = Image.open(logo_path)
logo_img.save(r"c:\Users\adity\Desktop\website 2\assets\logo\livy-logo.png")
print(f"Saved logo: size={logo_img.size}")

doc = pymupdf.open(pdf_path)

skus = [
    {"id": "sku-01", "name": "Floral Garden", "page": 1},      # 0-indexed: page 1 is page 2 of PDF
    {"id": "sku-02", "name": "Soft Blue Stripes", "page": 2},  # page 3
    {"id": "sku-03", "name": "Botanical Sprig", "page": 3},    # page 4
    {"id": "sku-04", "name": "Minimal Dash", "page": 4},       # page 5
    {"id": "sku-05", "name": "Indigo Geometry", "page": 5},    # page 6
]

for item in skus:
    page = doc[item["page"]]
    img_infos = page.get_image_info(xrefs=True)
    print(f"\nProcessing {item['id']} - {item['name']}: {len(img_infos)} images found")
    
    # Sort images by x coordinate: product view is on the left (x ~ 50-60), lifestyle is on the right (x ~ 300+)
    img_infos_sorted = sorted(img_infos, key=lambda x: x["bbox"][0])
    
    # Product folded image (left)
    prod_info = img_infos_sorted[0]
    # Lifestyle image (right)
    life_info = img_infos_sorted[1]
    
    # Extract raw images
    prod_pix = pymupdf.Pixmap(doc, prod_info["xref"])
    life_pix = pymupdf.Pixmap(doc, life_info["xref"])
    
    prod_out = os.path.join(out_dir, f"{item['id']}-folded.png")
    life_out = os.path.join(out_dir, f"{item['id']}-lifestyle.png")
    
    prod_pix.save(prod_out)
    life_pix.save(life_out)
    
    print(f"  Folded: {prod_info['bbox']}, size=({prod_pix.width}, {prod_pix.height}) -> {prod_out}")
    print(f"  Lifestyle: {life_info['bbox']}, size=({life_pix.width}, {life_pix.height}) -> {life_out}")

    # Also, let's render high-res crops from the PDF page at 4x zoom to compare quality or see borders!
    zoom = 4
    mat = pymupdf.Matrix(zoom, zoom)
    
    # Crop prod rect
    r_prod = pymupdf.Rect(prod_info["bbox"])
    pix_high_prod = page.get_pixmap(matrix=mat, clip=r_prod)
    pix_high_prod.save(os.path.join(out_dir, f"{item['id']}-folded-hd.png"))
    
    r_life = pymupdf.Rect(life_info["bbox"])
    pix_high_life = page.get_pixmap(matrix=mat, clip=r_life)
    pix_high_life.save(os.path.join(out_dir, f"{item['id']}-lifestyle-hd.png"))
    print(f"  Saved HD crops: prod=({pix_high_prod.width}, {pix_high_prod.height}), life=({pix_high_life.width}, {pix_high_life.height})")

print("\nAll assets extracted successfully!")
