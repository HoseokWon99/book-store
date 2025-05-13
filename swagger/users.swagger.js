/**
 * @swagger
 * openapi: 3.0.0
 * paths:
 *   /api/users:
 *     post:
 *       description: 회원가입
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: 문자 특수문자 숫자를 각각 1개 이상 포함하고 길이가 8자리 이상인 문자열
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         '201':
 *           description: 성공
 *         '408':
 *           description: 이미 가입된 email
 *         '422':
 *           description: 유효하지 않은 양식
 */