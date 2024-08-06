const { MercadoPagoConfig, Payment } = require("mercadopago");

class PixPayment {
  async create(req, res) {
    const client = new MercadoPago({ accessToken: "<ACCESS_TOKEN>", options: { timeout: 5000 } });
    const payment = new Payment(client);

    payment
      .create({
        body: {
          transaction_amount: req.transaction_amount,
          description: req.description,
          payment_method_id: "PIX",
          payer: {
            email: req.email,
            identification: {
              type: "CPF",
              number: req.number,
            },
          },
        },
        requestOptions: { idempotencyKey: "<SOME_UNIQUE_VALUE>" },
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }
}

export default PixPayment;
