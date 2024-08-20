import { MercadoPagoConfig, Payment } from "mercadopago";
import { v4 as uuidv4, v4 } from "uuid";

class PixPayment {
  async create(req, res) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.ACESSTOKEN,
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

    const requestOptions = { idempotencyKey: uuidv4() };

    try {
      const result = await payment.create({ body, requestOptions });
      return res.status(200).json({
        link: result.point_of_interaction.transaction_data.ticket_url,
        status: result.status,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

export default new PixPayment();
