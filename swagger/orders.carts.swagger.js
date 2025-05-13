/**
 * @swagger
 * openapi: 3.0.0
 * paths:
 *   /api/orders/carts:
 *     get:
 *       description: 장바구니 목록 반환
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 *             example: Bearer {ACCESS_TOKEN}
 *           required: true
 *           description: 인증 헤더
 *       responses:
 *         '200':
 *           description: 장바구니 목록 반환
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         title:
 *                           type: string
 *                         price:
 *                           type: number
 *                         coverPath:
 *                           type: string
 *                           description: 표지 이미지 경로
 *         '403':
 *           description: 로그인 필요
 *         '500':
 *           description: 서버 에러
 *     post:
 *       description: 카트에 상품 추가
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 *             example: Bearer {ACCESS_TOKEN}
 *           required: true
 *           description: 인증 헤더
 *         - in: query
 *           name: targets
 *           schema:
 *             type: string
 *             pattern: '^\d+(,\d+)*$'
 *             example: 1,2,3,4
 *           description: 선택된 책들의 id 값들을 comma separated 형식으로 기재
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     description: 추가할 상품들의 id
 *               required:
 *                 - products
 *       responses:
 *         '201':
 *           description: 성공
 *         '403':
 *           description: 로그인 필요
 *     delete:
 *       description: 선택한 상품 제거
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 *             example: Bearer {ACCESS_TOKEN}
 *           required: true
 *           description: 인증 헤더
 *         - in: query
 *           name: targets
 *           schema:
 *             type: string
 *             pattern: '^\d+(,\d+)*$'
 *             example: 1,2,3,4
 *           description: 선택된 책들의 id 값들을 comma separated 형식으로 기재
 *       responses:
 *         '204':
 *           description: 성공
 *         '403':
 *           description: 로그인 필요
 */