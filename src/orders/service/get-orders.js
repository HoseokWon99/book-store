const { Product } = require("../../products/model");
const { Order } = require("../model/order");
const { Op } = require('sequelize');
const sequelize = require("../../config/sequelize");
const httpError = require("http-errors");

/**
 *
 * @typedef {{
 *     id: number;
 *     address: string;
 *     recipient: string;
 *     tel: string;
 *     totalPrice: number;
 *     orderedOn;
 *     description: string;
 * }}
 */

/**
 *
 * @param dto
 * @returns {Promise<void>}
 */
async function getOrders(dto) {}