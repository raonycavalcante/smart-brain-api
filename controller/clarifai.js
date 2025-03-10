const PAT = 'd7989fc4d0384856a876e29fff5112ca';
const USER_ID = 'howknee';
const APP_ID = 'smart-brain';
const MODEL_ID = 'face-detection';

const handleClarifai = (req, res) => {const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json("Image URL is required");
  }

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageUrl,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };

  fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => {
      console.error("Clarifai API error:", error);
      res.status(400).json("Unable to work with API");
    });}

    module.exports = {
        handleClarifai: handleClarifai,
    }