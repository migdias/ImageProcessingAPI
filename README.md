# Image Processing API

This project is comprised of an api with one simple endpoint to resize the images
that are stored in a data/in folder. The desired resized image will be written to
data/out with the name of 'resized\_\*.jpg'.

## Get Started 🚀

To get started, simply run `node prod/index.js`. This will run the production code
and start up the server on the port 3000.

Once this is done you can visit `localhost:3000`. This will take you to the APIs
main page. To get to the convert endpoint visit `localhost:3000/convert`

You will have to add some parameters:

- _imgName_ (required): The name of the image (in the data/in folder).
- _width and height_ (optional): The width and the height of the desired image.
- _size_ (optional): the size in pixels of the image.

**Beware**: You cannot use width/height with size. Use either one of those.

**< Examples >**

- `localhost:3000/convert/?imgName=sample.jpg&width=500&height=400`
- `localhost:3000/convert/?imgName=leonard.jpg&width=700&height=400`
- `localhost:3000/convert/?imgName=group_photo.jpg&size=500`
