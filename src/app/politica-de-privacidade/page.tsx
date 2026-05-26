import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade e Termos de Uso | Grupo Contém",
  description:
    "Conheça a Política de Privacidade, os Termos de Uso e a Política de Cookies do Grupo Contém.",
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="container py-5" style={{ maxWidth: 860 }}>
      <h1 className="mb-2 fw-bold" style={{ color: "#ee3926" }}>
        Política de Privacidade e Termos de Uso
      </h1>
      <p className="text-muted mb-5" style={{ fontSize: 13 }}>
        Última atualização: 2025. Site:{" "}
        <a href="https://www.grupocontem.com.br" target="_blank" rel="noopener noreferrer">
          www.grupocontem.com.br
        </a>
      </p>

      {/* Introdução */}
      <section className="mb-5">
        <p>
          Este documento reúne as regras, condições e informações que devem ser observadas por todos
          que acessam ou utilizam o site{" "}
          <a href="https://www.grupocontem.com.br" target="_blank" rel="noopener noreferrer">
            https://www.grupocontem.com.br
          </a>
          , disponibilizado pela ADMINISTRADORA. Ao utilizar o site, o usuário declara que leu e
          concorda integralmente com estas condições. Usuários menores de idade ou incapazes
          precisam da permissão de seus responsáveis, que também devem concordar com estes termos.
          Caso não concorde, pedimos que não permaneça no site.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold">1. OBJETO</h2>
        <p>
          1.1. O site tem por objeto a troca de informações administrativas referentes ao seu plano
          de saúde, de forma rápida e fácil.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold">2. SERVIÇOS DISPONÍVEIS PELO SITE</h2>
        <p>
          2.1. Serviços destinados exclusivamente aos beneficiários dos planos privados de
          assistência médico-hospitalar e odontológica da ADMINISTRADORA.
          <br />
          2.2. Os serviços podem ser descontinuados, cancelados, interrompidos ou suspensos a
          qualquer tempo, a critério da ADMINISTRADORA, sem aviso prévio.
          <br />
          2.3. Os serviços devem ser interpretados como benefício, não obrigatoriedade.
          <br />
          2.4. Diversas funcionalidades podem ser disponibilizadas para consultas administrativas do
          plano.
        </p>
        <p className="mb-1">2.5. Exemplos de serviços (podem possuir Termos de Uso próprios):</p>
        <ul>
          <li>Rede credenciada</li>
          <li>Acesso a faturas vencidas e abertas</li>
          <li>2ª via de faturas</li>
          <li>Carteira provisória</li>
          <li>Demonstrativo de Imposto de Renda</li>
          <li>Declaração de pagamento e de Conformidade</li>
          <li>Solicitações de cancelamento</li>
          <li>Recuperação e alteração de senha</li>
          <li>Fale conosco</li>
        </ul>
        <p>
          2.5.1. A ADMINISTRADORA poderá incluir ou retirar serviços, ou disponibilizá-los a
          determinados usuários conforme a modalidade do plano.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold">3. OBRIGAÇÕES E RESPONSABILIDADES DA ADMINISTRADORA</h2>
        <p>3.1. O site é apresentado "no estado em que se encontra" e pode passar por atualizações. A ADMINISTRADORA compromete-se a:</p>
        <ul>
          <li>3.1.1. Assegurar bom funcionamento e um layout que respeite usabilidade e navegabilidade;</li>
          <li>3.1.2. Disponibilizar serviços de forma clara, completa e precisa;</li>
          <li>3.1.3. Tratar dados pessoais com segurança e boas práticas de proteção de dados.</li>
        </ul>
        <p className="mb-1">3.2. A ADMINISTRADORA não se responsabiliza por:</p>
        <ul>
          <li>3.2.1. Falhas de acesso por indisponibilidade da Internet, energia, hardware/software do usuário;</li>
          <li>3.2.2. Problemas/bugs/glitches nos recursos do usuário decorrentes do uso regular;</li>
          <li>3.2.3. Erros de sistemas que possam alterar dados do site;</li>
          <li>3.2.4. Danos causados por ataques de terceiros (vírus, malware, etc.);</li>
          <li>3.2.5. Dados cadastrais fornecidos pelos usuários;</li>
          <li>3.2.6. Comunicações eletrônicas fraudulentas (phishing) feitas por terceiros;</li>
          <li>3.2.7. Publicação de conteúdos que infrinjam direitos de terceiros ou tenham natureza ilícita/ofensiva.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold">4. OBRIGAÇÕES E RESPONSABILIDADES DO USUÁRIO</h2>
        <p className="mb-1">4.1. O usuário compromete-se, entre outros, a:</p>
        <ul>
          <li>4.1.1. Utilizar o site de forma ética e conforme sua finalidade;</li>
          <li>4.1.2. Responder pelas atividades sob sua conta (login/senha de uso exclusivo);</li>
          <li>4.1.3. Guardar sigilo de suas credenciais;</li>
          <li>4.1.4. Usar senha forte e não reutilizá-la em outros serviços;</li>
          <li>4.1.5. Evitar senhas de fácil acerto;</li>
          <li>4.1.6. Fornecer dados cadastrais corretos e atualizados;</li>
          <li>4.1.7. Manter antivírus/firewall atualizados e conexão compatível;</li>
          <li>4.1.8. Respeitar direitos de propriedade intelectual;</li>
          <li>4.1.9–4.1.14. Não acessar áreas restritas, não realizar engenharia reversa, mineração automatizada, transmitir malware ou explorar a segurança do site;</li>
          <li>4.1.15. Providenciar os meios necessários para acesso ao site.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold">5. PROPRIEDADE INTELECTUAL</h2>
        <p>
          5.1. Concessão de licença limitada, não transferível, não exclusiva e revogável para uso
          das facilidades do site — sem transferência de titularidade.
          <br />
          5.2. É proibida a venda, transferência, modificação, engenharia reversa, distribuição ou
          cópia de textos/imagens/partes do site.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold">6. FALHAS TÉCNICAS, ALTERAÇÕES E RESCISÃO</h2>
        <p>
          6.1. A ADMINISTRADORA pode realizar manutenções programadas e atualizar
          termos/funcionalidades.
          <br />
          6.2. Em caso de manutenção emergencial, pode haver indisponibilidade sem aviso prévio.
          <br />
          6.3. Alterações têm efeito imediato; o uso contínuo implica concordância.
          <br />
          6.4–6.8. A ADMINISTRADORA pode alterar/suspender o site, sem obrigação de suporte, e não
          responde por perdas/danos decorrentes de indisponibilidade. Pode restringir acesso em
          casos de fraude ou prejuízo ao site.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold">7. PROTEÇÃO DE DADOS</h2>
        <p>
          7.1. Podem ser coletados dados técnicos do dispositivo (ex.: SO, conexão).
          <br />
          7.2. Dados de contas/usuários não são compartilhados sem consentimento, salvo exigência
          legal/ordem judicial.
          <br />
          7.3. Além dos dados de cadastro/adesão, informações podem ser obtidas automaticamente
          durante a navegação.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold">8. ISENÇÃO DE GARANTIAS E LIMITAÇÕES DE RESPONSABILIDADE</h2>
        <p>
          8.1. O site está em contínuo desenvolvimento e pode conter erros; é fornecido "no estado
          em que se encontra", sob risco do usuário.
          <br />
          8.2. Não há outras garantias além das previstas. A ADMINISTRADORA não garante
          funcionamento ininterrupto, nem ausência de perdas/ataques/vírus; não se responsabiliza
          por danos relacionados ao uso do site.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="h5 fw-bold">9. LEI APLICÁVEL E JURISDIÇÃO</h2>
        <p>
          9.1. Termos interpretados segundo a legislação brasileira (português), eleito o foro do
          domicílio do usuário, salvo competência diversa prevista em lei.
        </p>
      </section>

      {/* Política de Cookies */}
      <hr className="my-5" />

      <section className="mb-4">
        <h2 className="h4 fw-bold" style={{ color: "#ee3926" }}>
          Política de Cookies
        </h2>
        <p>
          Usamos cookies para melhorar sua experiência, analisar tráfego e personalizar conteúdo.
          Esta política explica o que são cookies, quais utilizamos e como você pode controlá-los.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="h5 fw-bold">O que são cookies?</h3>
        <p>
          Cookies são pequenos arquivos de texto armazenados no seu navegador quando você acessa um
          site. Eles permitem que o site reconheça seu dispositivo em visitas futuras e ofereça uma
          experiência mais personalizada.
        </p>
      </section>

      <section className="mb-4">
        <h3 className="h5 fw-bold">Quais cookies utilizamos?</h3>
        <ul>
          <li>
            <strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site,
            como manutenção de sessão e preferências de privacidade.
          </li>
          <li>
            <strong>Cookies analíticos:</strong> coletam informações sobre como os visitantes usam
            o site (páginas visitadas, tempo de permanência, erros encontrados) para nos ajudar a
            melhorá-lo.
          </li>
          <li>
            <strong>Cookies de personalização:</strong> lembram suas preferências para oferecer uma
            experiência mais relevante nas próximas visitas.
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="h5 fw-bold">Como controlar os cookies?</h3>
        <p>
          Você pode aceitar ou recusar o uso de cookies não essenciais pelo banner exibido na sua
          primeira visita ao site. Para alterar sua escolha, limpe os dados de navegação do seu
          navegador — o banner será exibido novamente na próxima visita.
        </p>
        <p>
          A maioria dos navegadores também permite gerenciar cookies diretamente nas configurações.
          Consulte a documentação do seu navegador para mais informações.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="h5 fw-bold">Contato</h3>
        <p>
          Dúvidas sobre esta política? Entre em contato:{" "}
          <a href="mailto:relacionamentocomocliente@grupocontem.com.br">
            relacionamentocomocliente@grupocontem.com.br
          </a>
        </p>
      </section>
    </main>
  );
}
