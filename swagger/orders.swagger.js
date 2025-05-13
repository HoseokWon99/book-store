/**
 * @swagger
 * openapi: 3.0.0
 * paths:
 *   /api/orders:
 *     get:
 *       description: 유저 주문 이력 조회
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
 *           description: 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   results:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: 주문번호
 *                         orderedOn:
 *                           type: string
 *                           format: date
 *                           description: 주문일
 *                         address:
 *                           type: string
 *                           description: 배송주소
 *                         recipient:
 *                           type: string
 *                           description: 수령인
 *                         tel:
 *                           type: string
 *                           format: phone-number
 *                           description: 수령인 연락처
 *                         products:
 *                           type: array
 *                           items:
 *                             type: number
 *                           description: 주문한 도서들의 id 값의 배열
 *         '403':
 *           description: 로그인 필요
 *         '500':
 *           description: 서버 에러
 *     post:
 *       description: 주문 요청
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 *             example: Bearer {ACCESS_TOKEN}
 *           required: true
 *           description: 인증 헤더
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
 *                     type: number
 *                   description: 주문한 도서들의 id 값의 배열
 *                 address:
 *                   type: string
 *                   description: 배송주소
 *                 recipient:
 *                   type: string
 *                   description: 수령인
 *                 tel:
 *                   type: string
 *                   format: phone-number
 *                   description: 수령인 연락처
 *               required:
 *                 - products
 *                 - address
 *                 - recipient
 *                 - tel
 *       responses:
 *         '201':
 *           description: 주문 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: 주문번호
 *                   orderedAt:
 *                     type: string
 *                     format: date-time
 *                     description: 주문일시
 *         '403':
 *           description: 로그인 필요
 *         '500':
 *           description: 서버 에러
 */