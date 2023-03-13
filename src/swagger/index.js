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
