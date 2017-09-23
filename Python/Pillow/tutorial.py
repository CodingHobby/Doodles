from PIL import Image
import os

size_300 = (300,300)

# Loop over the jpgs in the current directory
for f in os.listdir('.'):
	if f.endswith('.jpg'):
		i = Image.open(f)
		# Get the filename and extension
		fn, fext = os.path.splitext(f)
		i.thumbnail(size_300)
		# Save the file in the pngs folder as a png
		i.save('300x300/{}_300.png'.format(fn))
