/**
 * @swagger
 * /api/v1/auth/signup:
 *  post:
 *      tags: [Auth]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             name:
 *               type: string
 *             age:
 *               type: number
 *      responses:
 *          200:
 *              description: Success
 */

/**
 * @swagger
 * /api/v1/auth/signin:
 *  post:
 *      tags: [Auth]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/getAll:
 *  get:
 *      tags: [Comment]
 *      parameters:
 *      - in: query
 *        name: image_id
 *        type: number
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/insert:
 *  post:
 *      tags: [Comment]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             image_id:
 *               type: number
 *             content:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/update:
 *  put:
 *      tags: [Comment]
 *      parameters:
 *      - in: query
 *        name: comment_id
 *        type: number
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             content:
 *               type: string
 *             comment_star:
 *               type: number
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/delete:
 *  delete:
 *      tags: [Comment]
 *      parameters:
 *      - in: query
 *        name: comment_id
 *        type: number
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/images/:
 *  get:
 *      tags: [Image]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/images/getImageById:
 *  get:
 *      tags: [Image]
 *      parameters:
 *      - in: query
 *        name: image_id
 *        type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/images/search:
 *  get:
 *      tags: [Image]
 *      parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/images/delete:
 *  delete:
 *      tags: [Image]
 *      parameters:
 *      - in: query
 *        name: image_id
 *        type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/images/getImageById:
 *  get:
 *      tags: [Image]
 *      parameters:
 *       - in: query
 *         name: image_id
 *         type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/images/search:
 *  get:
 *      tags: [Image]
 *      parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/profile:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/getUserById:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: user_id
 *         type: string
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/search:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/follower:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/followee:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/forgot-password:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: email
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/update:
 *  put:
 *      tags: [User]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             name:
 *               type: string
 *             age:
 *               type: number
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/reset-password:
 *  put:
 *      tags: [User]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             password:
 *               type: string
 *             token:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/follow:
 *  post:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: user_id
 *         type: number
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/unfollow:
 *  post:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: user_id
 *         type: number
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/test-token:
 *  post:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */
