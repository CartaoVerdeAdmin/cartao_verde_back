export function TranslateCertificate({ globalLanguage }) {
    let CertificateTitle1;
    let CertificateTitle2;
  
    let ClientName;
    let CertificateNumber;
    let EmissionDate;
    let TreeLocation;
  
    let Text1Pt1;
    let Text1Pt2;
    let Text1Pt22;
    let Text1Pt3;
    let Text1Pt4;
    let Text2;
    let Concession;
    let ConcessionText;
  
    let Signature;
    let Representant;
    let Contact;
    let Email;
    let PhoneNumber;
    let Website;
  
    if (globalLanguage === "EN") {
      CertificateTitle1 = "Certificate of Temporary Tree Concession";
      CertificateTitle2 = "Standing Forest Green Card";
      ClientName = "Customer Name: ";
      CertificateNumber = "Certificate Number: ";
      EmissionDate = "Issue Date: ";
      TreeLocation = "Tree Location: ";
  
      Text1Pt1 = "We certify that ";
      Text1Pt2 = "is the holder of the temporary concession of ";
  
      Text1Pt22 = " tree(s) located in the environmental reserve area ";
      Text1Pt3 = ". It will remain under your protection for a period of  ";
      Text1Pt4 =
        " year(s). During this period, the tree will remain standing, contributing to the preservation of the local ecosystem.";
      Text2 =
        "This certificate is proof of the client's commitment to sustainability and biodiversity conservation.";
      Concession = "Concession Terms:";
      ConcessionText =
        "The concession is valid for the specified period, after which it may be renewed. The tree will remain in its natural location, with no possibility of removal or exploitation. The client has the right to visit the tree by prior appointment. Standing Forest Green Card guarantees the preservation and monitoring of the tree throughout the concession period. Thank you for supporting the preservation of our forest and contributing to a more sustainable future.";
  
      Signature = "Signature:";
      Representant = "[Representative's Name] Standing Forest Green Card";
      Contact = "Contact:";
      Email = "Email: cartaoverde7@gmail.com";
      PhoneNumber = "Phone: [Contact Phone Number]";
      Website = "Website: cartaoverdeflorestaempe.com.br";
    } else if (globalLanguage == "PT") {
      CertificateTitle1 = "Certificado de Concessão Temporária de Árvore";
      CertificateTitle2 = "Cartão Verde Floresta em Pé";
  
      ClientName = "Nome do Cliente: ";
      CertificateNumber = "Número do Certificado: ";
      EmissionDate = "Data de Emissão: ";
      TreeLocation = "Localização da Árvore: ";
  
      Text1Pt1 = "Certificamos que ";
      Text1Pt2 = " é o detentor da concessão temporária de ";
  
      Text1Pt22 = " árvore(s) localizada(s) na área de reserva ambiental ";
      Text1Pt3 = ". Ela estará sob sua proteção pelo período de  ";
      Text1Pt4 =
        " ano(s). Durante este período, a árvore permanecerá em pé, contribuindo para a preservação do ecossistema local.";
      Text2 =
        "Este certificado é uma prova do compromisso do cliente com a sustentabilidade e a conservação da biodiversidade.";
      Concession = "Termos da Concessão:";
      ConcessionText =
        "A concessão é válida pelo período especificado, após o qual poderá ser renovada. A árvore permanecerá em seu local natural, sem possibilidade de remoção ou exploração. O cliente tem o direito de visitar a árvore  mediante agendamento prévio. A Cartão Verde Floresta em Pé garante a preservação e o monitoramento da árvore durante todo o período de concessão. Agradecemos por apoiar a preservação da nossa floresta e contribuir para um futuro mais sustentável.";
  
      Signature = "Assinatura:";
      Representant = "[Nome do Representante] Cartão Verde Floresta em Pé";
      Contact = "Contato:";
      Email = "E-mail: cartaoverde7@gmail.com";
      PhoneNumber = "Telefone: [Telefone de Contato]";
      Website = "Website: cartaoverdeflorestaempe.com.br";
    } else if (globalLanguage == "ES") {
      CertificateTitle1 = "Certificado de Concesión Temporal de Árbol";
      CertificateTitle2 = "Tarjeta Verde Bosque en Pie";
  
      ClientName = "Nombre del Cliente: ";
      CertificateNumber = "Número del Certificado: ";
      EmissionDate = "Fecha de Emisión: ";
      TreeLocation = "Ubicación del Árbol: ";
  
      Text1Pt1 = "Certificamos que ";
      Text1Pt2 = " es el titular de la concesión temporal de ";
      Text1Pt22 = " árboles ubicado(s) en el área de reserva ambiental ";
      Text1Pt3 = ". Estará bajo su protección por un período de ";
      Text1Pt4 =
        " año(s). Durante este período, el árbol permanecerá en pie, contribuyendo a la preservación del ecosistema local.";
      Text2 =
        "Este certificado es una prueba del compromiso del cliente con la sostenibilidad y la conservación de la biodiversidad.";
      Concession = "Términos de la Concesión:";
      ConcessionText =
        "La concesión es válida por el período especificado, después del cual podrá ser renovada. El árbol permanecerá en su ubicación natural, sin posibilidad de remoción o explotación. El cliente tiene derecho a visitar el árbol previa cita. La Tarjeta Verde Bosque en Pie garantiza la preservación y el monitoreo del árbol durante todo el período de concesión. Gracias por apoyar la preservación de nuestro bosque y contribuir a un futuro más sostenible.";
  
      Signature = "Firma:";
      Representant = "[Nombre del Representante] Tarjeta Verde Bosque en Pie";
      Contact = "Contacto:";
      Email = "Correo electrónico: cartaoverde7@gmail.com";
      PhoneNumber = "Teléfono: [Número de Teléfono de Contacto]";
      Website = "Sitio web: cartaoverdeflorestaempe.com.br";
    }
    return {
      CertificateTitle1,
      CertificateTitle2,
  
      ClientName,
      CertificateNumber,
      EmissionDate,
      TreeLocation,
  
      Text1Pt1,
      Text1Pt2,
      Text1Pt22,
      Text1Pt3,
      Text1Pt4,
      Text2,
      Concession,
      ConcessionText,
  
      Signature,
      Representant,
      Contact,
      Email,
      PhoneNumber,
      Website,
    };
  }
  