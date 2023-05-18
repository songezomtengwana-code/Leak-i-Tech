import React, {useState} from 'react';

// export let name, tag, category, image, description, location, geolocation;
export const [catergory, setCategory] = useState(null)

export const requestConfig = {
    postedon: Date.now(),
    authorName: name,
    authorTag: tag,
    id: `${server.length}-ac6d-4fd9-81e0-f471dd6b0e02`,
    category: category,
    imagesrc: image,
    description: description,
    location: location,
    geolocation: geolocation,
    isTerminated: false,
    isApproved: true,
}

function handleConfigPush() {
    if (name === null && tag === null && category === null && location === null && geolocation === null) {
        console.log('some value is empty test failed')
    } else {
        server.push(requestConfig)
        console.log(server)
    }
}

export const server = [

]