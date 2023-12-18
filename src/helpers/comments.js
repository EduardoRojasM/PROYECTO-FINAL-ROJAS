const {Comment , Image } = require('../models')
module.exports = {
    newest() {
        return Comment.find()
            .limit(5)
            .sort({ timestamp: -1 })
            .then((comments) => {
                const imagePromises = comments.map((comment) =>
                    Image.findOne({ _id: comment.image_id })
                );

                return Promise.all(imagePromises).then((images) => {
                    comments.forEach((comment, index) => {
                        comment.image = images[index];
                    });

                    return comments;
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                return [];
            });
    },
};