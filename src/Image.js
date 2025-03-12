import { useState } from "react";

const Image = () => {
  let [imageURL, setImageURL] = useState();
  let callImage = () => {
    const apiUrl = "https://api.waifu.im/search"; // Replace with the actual API endpoint URL
    const params = {
      included_tags: ["waifu"],
      height: ">=2000",
    };

    const queryParams = new URLSearchParams();

    for (const key in params) {
      if (Array.isArray(params[key])) {
        params[key].forEach((value) => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.set(key, params[key]);
      }
    }
    const requestUrl = `${apiUrl}?${queryParams.toString()}`;

    fetch(requestUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Request failed with status code: " + response.status
          );
        }
      })
      .then((data) => {
        // Process the response data as needed
        console.log(data.images[0].url);
        setImageURL(data.images[0].url);
      })
      .catch((error) => {
        console.error("An error occurred:", error.message);
      });
  };
  return (
    <>
      <img style={
		{
			height:"90vh",
			margin:"20px",
			padding:"10px",
		}
	  } src={imageURL} alt="GG"></img>
	  <button style={{width:"50px",height:"50px"}}onClick={callImage}>Click me!</button>
    </>
  );
};

export default Image;
