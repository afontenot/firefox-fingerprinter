from PIL import Image

# parameters
colors_per_channel = 16
filepath = "palette.png"

# get a 2D square that contains the same number
# of (integer) points as the 3D RGB cube
image_size = colors_per_channel ** (3/2)
assert(image_size.is_integer())
image_size = int(image_size)

im = Image.new("RGB", (image_size, image_size))

mult = colors_per_channel + 1
offset = 0
for r in range(colors_per_channel):
    for g in range(colors_per_channel):
        for b in range(colors_per_channel):
            coords = (offset % image_size, offset // image_size)
            im.putpixel(coords, (r * mult, g * mult, b * mult))
            offset += 1

im.save(filepath)
