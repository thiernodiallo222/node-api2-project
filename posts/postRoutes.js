const express = require('express');  // imports express
const db = require('../data/db');
const router = express.Router();   // defines express

router.post("/", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		res.status(400).json({
			message: "Bad request"
		})
	} else {
		db.insert(req.body)
			.then((post) => {
				res.status(201).json(post)
			})
			.catch((error) => {
				console.log(error)
				res.status(500).json({
					message: "There was an error while saving the post to the database",
				})
			})
	}
});

router.post('/:id/comments', (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            message:"Please provide text for the comment.",
        })
    }
        const post = db.findById(req.params.id);
        post.insertComment(req.body)
            .then((comment) => {
                res.status(201).json(comment)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "Error adding the post",
                })
            })
});
    
router.get('/', (req, res) => {
	db.find()
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts",
            })
		})
})

router.get('/:id', (req, res) => {
    	db.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "Post is not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the post",
			})
		})
})

router.get('/:id/comments', (req, res) => {
	 db.findById(req.params.id)
		.then(post => {
			if (!post) {
				return res.status(404).json({ message: "That specific post was not found " })
			} else {
				db.findPostComments(req.params.id)
					.then(comments => {
						if (comments) {
							res.status(200).json(comments);
						} else {
							res.status(404).json({
								message: "comments not found !"
							})
						}
					})
			}
					})

		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the comments",
            })
		})
})

router.delete('/:id', (req, res) => {
    	db.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post has been removed",
				})
			} else {
				res.status(404).json({
					message: "The post could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the user",
			})
		})
})

router.put('/:id', (req, res) => {
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing user title or the content",
		})
	}

	db.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the user",
			})
		})
})

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(204).json({
            message:'make sure nothing is missing in the body of your post !'
        })
    } else {
        db.insert(req.body).status(200).json('req.body');
    }
})


module.exports = router;




    
    


