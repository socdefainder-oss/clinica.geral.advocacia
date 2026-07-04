// ============================================================
//  RESPONSÁVEIS JURÍDICOS — dados mockados
//
//  COMO TROCAR AS FOTOS:
//  1. Coloque as fotos na pasta  public/assets/
//  2. Atualize o campo "photo" abaixo com o caminho, ex: "/assets/responsavel-1.jpg"
//
//  A imagem enviada (casal) já está referenciada em "/assets/responsaveis-juridicos.jpg".
//  >>> Salve a foto anexada nesse caminho: public/assets/responsaveis-juridicos.jpg <<<
//
//  Caso a imagem não exista, o componente mostra automaticamente um
//  placeholder elegante com as iniciais do responsável.
// ============================================================

export const legalTeam = [
  {
    id: 1,
    name: 'Dr. Responsável Jurídico',
    role: 'Responsável Jurídico',
    oab: 'OAB/UF 000.000',
    // Substitua pela foto real do responsável jurídico.
    photo: '/assets/responsaveis-juridicos.jpg',
    // Posição da imagem para enquadrar bem o rosto neste card (foto em dupla).
    objectPosition: 'left center',
    description:
      'Atuação em consultoria jurídica, contratos, demandas empresariais e acompanhamento processual.',
  },
  {
    id: 2,
    name: 'Dra. Responsável Jurídica',
    role: 'Responsável Jurídica',
    oab: 'OAB/UF 000.000',
    // Substitua pela foto real da responsável jurídica.
    photo: '/assets/responsaveis-juridicos.jpg',
    objectPosition: 'right center',
    description:
      'Atuação em direito preventivo, revisão contratual, atendimento humanizado e orientação a pessoas e empresas.',
  },
]
