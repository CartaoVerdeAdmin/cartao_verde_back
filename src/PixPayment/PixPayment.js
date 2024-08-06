import { MercadoPagoConfig, Payment } from "mercadopago";

class PixPayment {
  async create(req, res) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.ACESSTOKEN,
      options: { timeout: 5000 },
    });
    const payment = new Payment(client);

    const data = req.body;

    const teste = payment
      .create({
        body: {
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
        },
        requestOptions: { idempotencyKey: "<SOME_UNIQUE_VALUE>" },
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
    return res.status(200).json("link gerado com sucesso");
  }
}

export default new PixPayment();
