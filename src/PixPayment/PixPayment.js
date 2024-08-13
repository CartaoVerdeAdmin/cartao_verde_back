import { MercadoPagoConfig, Payment } from "mercadopago";
import { v4 as uuidv4 } from "uuid";

class PixPayment {
  async create(req, res) {
    const client = new MercadoPagoConfig({
      accessToken: "TEST-3618565473876869-080617-de83334492688097bbaeb92c9dcb79cf-494462802",
      options: { timeout: 5000, idempotencyKey: "abc" },
    });
    const payment = new Payment(client);

    const data = req.body;

    const body = {
      transaction_amount: data.transaction_amount,
      description: data.description,
      payment_method_id: "pix",
      payer: {
        email: data.email,
        identification: {
          type: "CPF",
          number: data.number,
        },
      },
    };

    const requestOptions = { idempotencyKey: data.payment_key };

    try {
      const result = await payment.create({ body, requestOptions });
      res.status(200).json(result.point_of_interaction.transaction_data.ticket_url);
      return result.point_of_interaction.transaction_data.ticket_url;
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
}

export default new PixPayment();
