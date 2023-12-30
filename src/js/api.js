export function getPics() {
    return new Promise(resolve => {
        setTimeout(() => {
            const mockedResponse = [
                'images/random/1.jpg',
                'images/random/2.jpg',
                'images/random/3.jpg'
            ];
            resolve(mockedResponse);
        }, 700);
    })
}