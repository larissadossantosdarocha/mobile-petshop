# Pet Gato

Aplicativo de Pet Shop desenvolvido em Expo + React Native. Para aulas de React Native.

## Instalação
1. Clone o repositório:
```bash
 git clone <URL_DO_REPOSITORIO>
```
2. Navegue até o diretório do projeto:
```bash
cd tcc
```
3. Instale as dependências:
```bash
npm install
```
4. Execute o aplicativo:
```bash
npm start

- Pressione "w" para rodar no navegador (modo web).
- Pressione "a" para rodar no Android.
```
 
O app oferece uma experiência completa para tutores e amantes de animais, com funcionalidades de **cadastro, login, agendamento de consultas, doações e muito mais.**

---

## **Funcionalidades Principais**

###  **Página Inicial**
- Exibe **banners promocionais** automáticos (frete fixo, brindes, etc).
- Possui um **carrossel de imagens** animado com produtos e serviços.
- Inclui **atalhos rápidos** no cabeçalho:
  - Consulta Veterinária  
  - Adoção  
  - Doação  
  - Cadastro  
- Apresenta **cards de vantagens**, como:
  - Receba em algumas horas  
  - Parcele em 3x sem juros  
  - Frete grátis  
  - Retire e troque na loja  
- Seções adicionais:
  - Produtos recomendados com botão **"Ver Detalhes"**  
  - Categorias: Cachorros, Gatos, Outros Pets, Higiene, Farmácia etc.  
  - Cuidados básicos: “Banho & Tosa” e “Veterinário”

---

### **Login**
- Tela de autenticação com campos de **e-mail e senha**.
- Integração com **backend via API REST**
- **Validação de e-mail** e campos obrigatórios.
- Exibe **carregamento (ActivityIndicator)** durante o login.
- Ações disponíveis:
  - Entrar  
  - Voltar à tela inicial  
  - Acessar tela de cadastro  

---

### **Cadastro de Usuário**
- Permite o **registro de novos usuários** com e-mail e senha.
- Comunicação com o backend via **endpoint**.
- Mensagens de sucesso e erro.
- Acesso rápido para:
  - Fazer login  
  - Retornar à tela inicial  

---

###  **Consulta Veterinária**
- Formulário completo para **agendamento de consultas de pets**, incluindo:
  - Nome, espécie, raça, nome do tutor, data de nascimento e e-mail.  
  - Informações adicionais sobre saúde ou alergias.
- Validação de:
  - Campos obrigatórios  
  - E-mail válido  
  - Data de nascimento
- Envio de dados para o backend 
- Mensagem de sucesso e redirecionamento automático.
- Botão flutuante para contato via **WhatsApp**. 

---

###  **Página de Doação**
- Mostra pets que **necessitam de ajuda**, com fotos e descrições.
- Explica a **importância das doações** e como elas são utilizadas:
  - Alimentação, saúde, bem-estar e acolhimento.
- Área de **doação via PIX**, com:
  - Chave: `evelynluiz.fernandes@gmail.com`
  - QR Code para escanear.
- Interface amigável e visualmente atrativa.

---

### **Página de Adoção**
- Apresenta opções de adoção para diferentes espécies:
  - Cachorros  
  - Gatos  
  - Peixes  
  - Pássaros  
- Cada botão redireciona para páginas específicas de adoção.
- Design moderno, colorido e intuitivo.
- Botão “Voltar” para retornar à página inicial.

---

### **Página de Regras e Vantagens**
- Explica detalhadamente as **regras das promoções**:
  - Receba em poucas horas  
  - Parcelamento em até 3x sem juros  
  - Frete grátis  
  - Retirada e troca na loja  
- Inclui botão para **agendar consulta veterinária**.
- Layout limpo e organizado com **imagens e textos explicativos**.

---

## **Tecnologias Utilizadas**
-  **React Native + Expo Router**
-  **TypeScript**
-  **Fetch API** para integração com o backend
-  **React Hooks** (`useState`, `useEffect`)
-  **React Navigation / Expo Router**
-  **Componentização e estilização com `StyleSheet`**
-  **Backend hospedado em:**  
  `https://back-end-tcc-gamma.vercel.app`

---


## 🐾 **Autores e Créditos**
Desenvolvido com carinho por **Evelyn Fernandes, Larissa dos santos da Rocha** e equipe.  
Projeto acadêmico voltado ao **cuidado, amor e bem-estar dos pets.** ❤️