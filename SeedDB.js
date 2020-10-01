const Post = require("./models/post");
const faker = require("faker");

async function seedPosts() {
    await Post.remove({});
    for (const i of new Array(10)) {
        let data = {
            image: faker.image.image(),
            description: faker.lorem.text(),
            author: {
                id: "5f2454cd88b82e00178f0d00",
                avatar: faker.internet.avatar(),
                username: faker.internet.userName(),
            },
        };

        let post = new Post(data);
        await post.save();
    }
    console.log("10 post created");
}

module.exports = seedPosts;
