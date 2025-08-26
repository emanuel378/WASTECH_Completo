document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const mainChatBtn = document.getElementById('mainChatBtn');
    const uploadButton = document.getElementById('uploadButton');
    const voiceButton = document.getElementById('voiceButton');

    // Estado do chat
    const chatState = {
        currentCategory: null,
        currentTopic: null,
        userName: null,
        isHumanRequested: false,
        conversationHistory: []
    };

    // Base de conhecimento completa
    const knowledgeBase = {
        // Configurações de conta
        "conta": {
            "foto_perfil": {
                response: `Para alterar sua foto de perfil:
1. Clique no seu ícone no canto superior direito
2. Selecione "Editar Perfil"
3. Clique em "Alterar Foto"
4. Escolha uma imagem do seu dispositivo
5. Ajuste o recorte e clique em "Salvar"

📌 Formatos aceitos: JPG, PNG (até 5MB)
⏱️ Tempo estimado: 1 minuto`,
                related: ["editar_perfil", "privacidade"]
            },
            
            "excluir_conta": {
                response: `⚠️ Para excluir sua conta permanentemente:
1. Acesse "Configurações" > "Minha Conta"
2. Role até a seção "Excluir Conta"
3. Digite sua senha para confirmar
4. Clique em "Excluir Permanentemente"

🔴 Atenção: Esta ação é irreversível e removerá:
- Todos os seus dados
- Histórico de atividades
- Configurações personalizadas
- Acesso a todos os sistemas WASTECH

💡 Alternativa: Considere desativar temporariamente em "Configurações > Status da Conta"`,
                related: ["desativar_conta", "backup"]
            },
            
            "notificacoes": {
                response: `🔔 Gerenciar notificações:
1. Vá para "Configurações" > "Notificações"
2. Ajuste as preferências:
   📧 Email: Ativar/desativar
   📱 Push: Alertas no celular
   💬 SMS: Alertas por mensagem
3. Personalize por tipo:
   🌦️ Alertas climáticos
   💧 Lembretes de irrigação
   ⚙️ Atualizações do sistema
   🔒 Alertas de segurança

⏰ Você pode definir horários específicos para não ser perturbado`,
                related: ["privacidade", "alertas"]
            },
            
            "senha": {
                response: `🔐 Para alterar sua senha:
1. Acesse "Configurações" > "Segurança"
2. Selecione "Alterar Senha"
3. Digite sua senha atual
4. Insira a nova senha (mínimo 8 caracteres)
5. Confirme a nova senha
6. Clique em "Salvar"

💡 Dicas para uma senha segura:
- Use pelo menos 12 caracteres
- Combine letras, números e símbolos
- Evite informações pessoais
- Não reuse senhas de outros sites

🔗 Precisa de ajuda? Acesse: wastech.com/seguranca`,
                related: ["seguranca", "login"]
            },
            
            "nome": {
                response: `📛 Para mudar seu nome cadastrado:
1. Vá para "Configurações" > "Perfil"
2. Clique em "Editar Informações"
3. Atualize os campos:
   - Primeiro nome
   - Sobrenome
   - Nome de exibição (opcional)
4. Clique em "Salvar"

ℹ️ Observações:
- Mudanças podem levar até 24h para refletir em todos os sistemas
- Para alterações em documentos oficiais, entre em contato com o suporte
- Nomes ofensivos serão removidos sem aviso prévio`,
                related: ["perfil", "documentos"]
            },
            
            "email": {
                response: `📧 Para alterar seu e-mail cadastrado:
1. Acesse "Configurações" > "Conta"
2. Selecione "Alterar E-mail"
3. Insira seu novo e-mail
4. Confirme digitando novamente
5. Digite sua senha atual
6. Clique em "Salvar"

📩 Você receberá:
1. E-mail de confirmação no novo endereço
2. E-mail de notificação no endereço antigo

⚠️ Importante:
- O e-mail é usado para recuperação de conta
- Notificações importantes serão enviadas para este endereço
- Atualize também em "Configurações > Notificações" se necessário`,
                related: ["conta", "notificacoes"]
            }
        },

        // Configurações do app
        "app": {
            "tema": {
                response: `🎨 Para mudar o tema do aplicativo:
1. Acesse "Configurações" > "Aparência"
2. Escolha entre:
   ☀️ Claro (padrão)
   🌙 Escuro
   🔄 Automático (ajusta conforme horário)
3. Toque em "Aplicar" para salvar

💡 Dicas:
- O modo escuro economiza bateria em dispositivos OLED
- Você pode personalizar cores em "Avançado"
- Configurações por dispositivo em "Sincronizar preferências"`,
                related: ["aparencia", "acessibilidade"]
            },
            
            "idioma": {
                response: `🌍 Alterar idioma do aplicativo:
1. Abra "Configurações" > "Geral"
2. Selecione "Idioma"
3. Escolha entre:
   🇧🇷 Português (Brasil)
   🇺🇸 Inglês
   🇪🇸 Espanhol
   🇫🇷 Francês
   🇩🇪 Alemão
4. O app reiniciará automaticamente

ℹ️ Observações:
- Alguns textos podem permanecer no idioma original até atualizações completas
- Relatórios técnicos permanecem em inglês
- Para sugerir novos idiomas: wastech.com/idiomas`,
                related: ["geral", "localizacao"]
            },
            
            "privacidade": {
                response: `🛡️ Configurações de privacidade:
1. Acesse "Configurações" > "Privacidade"
2. Ajuste:
   👤 Perfil (Público/Privado/Restrito)
   🤝 Compartilhamento de dados com parceiros
   📍 Histórico de localização
   🔍 Coleta de dados de uso
3. Revogue permissões de:
   📷 Câmera
   🖼️ Galeria
   🗺️ Localização
   🔔 Notificações

📊 Política completa: wastech.com/privacidade`,
                related: ["seguranca", "dados"]
            },
            
            "acessibilidade": {
                response: `♿ Configurações de acessibilidade:
1. Acesse "Configurações" > "Acessibilidade"
2. Ative/desative:
   👁️‍🗨️ Tamanho do texto
   🎨 Contraste aumentado
   🗣️ Leitor de tela
   🖐️ Gestos simplificados
   ⌨️ Atalhos de teclado

3. Personalize:
   ⏱️ Velocidade de animação
   🔊 Descrições de áudio
   🔍 Ampliação de tela

💡 Dica: Toque triplo na tela ativa o modo de acessibilidade rápido`,
                related: ["tema", "interface"]
            }
        },

        // Funcionalidades básicas
        "funcionalidades": {
            "relatorios": {
                response: `📊 Gerar relatórios:
1. Navegue até "Relatórios" no menu
2. Selecione o tipo:
   🌦️ Climático (últimos 30 dias)
   💧 Irrigação (consumo de água)
   📈 Produtividade (comparativo)
   💰 Custo-benefício
   🚨 Alertas e incidentes
3. Defina:
   📅 Período desejado
   🏞️ Áreas específicas
   🔢 Filtros avançados
4. Escolha o formato:
   📄 PDF (para impressão)
   📝 CSV (para análise)
   📊 Gráfico interativo
   🔗 Compartilhar diretamente

💡 Dica: Agende relatórios automáticos em "Configurações"`,
                related: ["analise", "exportar"]
            },
            
            "backup": {
                response: `💾 Fazer backup dos dados:
1. Acesse "Configurações" > "Backup"
2. Escolha:
   ⏱️ Backup automático (diário/semanal/mensal)
   ✋ Backup manual agora
3. Selecione os dados:
   ⚙️ Configurações do app
   📡 Dados de sensores
   🚨 Histórico de alertas
   📊 Relatórios personalizados
4. Escolha onde salvar:
   ☁️ Google Drive
   � iCloud
   💻 Dispositivo local
   🖥️ Computador via USB

⚠️ Recomendação: Mantenha pelo menos 2 cópias em locais diferentes`,
                related: ["restaurar", "seguranca"]
            },
            
            "compartilhar": {
                response: `🤝 Compartilhar dados:
1. Na tela do dado que deseja compartilhar
2. Toque no ícone "Compartilhar" (📤)
3. Escolha o método:
   📧 Email
   💬 Mensagem
   📱 Redes sociais
   👥 Colaboradores WASTECH
   🔗 Link público
4. Defina permissões:
   👀 Somente visualização
   ✏️ Edição limitada
   👥 Compartilhamento permitido
   ⏱️ Acesso temporário
5. Adicione uma mensagem (opcional)
6. Envie!

🔒 Controles adicionais em "Configurações > Compartilhamento"`,
                related: ["colaboracao", "permissoes"]
            },
            
            "monitoramento": {
                response: `👁️‍🗨️ Monitoramento em tempo real:
1. Acesse a seção "Monitoramento"
2. Visualize:
   🌡️ Sensores ativos
   💧 Nível de irrigação
   ⚡ Consumo energético
   🚨 Alertas ativos
3. Interaja:
   📊 Gráficos personalizáveis
   🔔 Configurar alertas
   📱 Notificações push
   📧 Relatórios por e-mail

🛠️ Ferramentas avançadas:
- Comparativo histórico
- Simulação de cenários
- Integração com outros sistemas
- API para desenvolvedores`,
                related: ["dashboard", "alertas"]
            }
        },

        // Problemas comuns
        "problemas": {
            "login": {
                response: `🔑 Problemas para fazer login:
1️⃣ Verifique:
   - Email digitado corretamente
   - Senha atual (lembre-se de caps lock)
   - Conexão com a internet
2️⃣ Tente:
   - "Esqueci minha senha"
   - Login alternativo (Google, Apple)
   - Modo visitante (recursos limitados)
3️⃣ Soluções técnicas:
   - Limpe o cache do aplicativo
   - Atualize o app para a versão mais recente
   - Reinicie seu dispositivo

🆘 Se persistir:
- Contate suporte@wastech.com
- Inclua prints e detalhes do erro
- Horário em que ocorreu o problema`,
                related: ["conta", "senha"]
            },
            
            "app_travando": {
                response: `🐌 App travando ou lento:
🔧 Soluções rápidas:
1. Feche e reabra o aplicativo
2. Verifique atualizações na loja
3. Reinicie seu dispositivo
4. Verifique espaço de armazenamento

🛠️ Soluções avançadas:
- Limpe o cache:
  Android: Configurações > Apps > WASTECH > Armazenamento > Limpar cache
  iOS: Reinstale o app
- Desative animações em "Acessibilidade"
- Reduza qualidade gráfica em "Desempenho"

📊 Informações úteis:
- Versão do app: Ver em "Sobre"
- Modelo do dispositivo: Ver em "Configurações"
- Data do último backup`,
                related: ["desempenho", "atualizacao"]
            },
            
            "sincronizacao": {
                response: `🔄 Problemas de sincronização:
1. Verifique:
   - Conexão com a internet
   - Status dos servidores: status.wastech.com
   - Espaço disponível em nuvem
2. Tente:
   - Sincronização manual (puxe para baixo)
   - Alternar entre WiFi/dados móveis
   - Forçar parada e reiniciar o app
3. Ajustes:
   - Frequência de sincronização em "Configurações"
   - Dados para sincronizar em "Preferências"
   - Modo offline temporário

⚠️ Dados não sincronizados são marcados com ⚠️ e tentados novamente automaticamente`,
                related: ["backup", "conexao"]
            },
            
            "erros": {
                response: `❌ Lidando com erros:
1. Anote:
   - Código do erro (ex: WASTECH-404)
   - O que estava fazendo quando ocorreu
   - Hora exata do ocorrido
2. Tente:
   - Tirar print da tela
   - Reproduzir o erro
   - Verificar atualizações
3. Soluções:
   - Reiniciar o aplicativo
   - Limpar cache (como mostrado acima)
   - Restaurar configurações padrão

📩 Envie relatório de erros em:
"Configurações" > "Ajuda" > "Relatar problema"

💡 Erros comuns:
- WASTECH-101: Problema de conexão
- WASTECH-202: Permissão necessária
- WASTECH-303: Dados corrompidos`,
                related: ["suporte", "diagnostico"]
            }
        },

        // Pagamentos e assinatura
        "pagamentos": {
            "plano": {
                response: `💰 Alterar plano de assinatura:
1. Acesse "Configurações" > "Assinatura"
2. Veja planos disponíveis:
   🆓 Básico (grátis)
     - Monitoramento básico
     - 1 relatório mensal
     - Suporte por e-mail
   💎 Pro (R$29,90/mês)
     - Todos recursos básicos +
     - Relatórios ilimitados
     - Alertas personalizados
     - Suporte prioritário
   � Empresarial (R$99,90/mês)
     - Todos recursos Pro +
     - Multi-usuários
     - API completa
     - Consultoria especializada
3. Toque em "Mudar Plano"
4. Confirme com senha ou biometria

💳 Métodos de pagamento aceitos:
- Cartões de crédito
- Pix
- Boleto bancário
- Transferência`,
                related: ["fatura", "cartao"]
            },
            
            "cartao": {
                response: `💳 Atualizar cartão de crédito:
1. Vá para "Configurações" > "Pagamentos"
2. Selecione "Métodos de Pagamento"
3. Toque em "Adicionar Cartão"
4. Opções:
   📷 Escanear cartão (câmera)
   ✍️ Digitar manualmente
   � Importar de outro serviço
5. Verifique:
   - Número do cartão
   - Nome como no cartão
   - Data de validade
   - Código de segurança
6. Salve como principal

🔒 Segurança:
- Dados criptografados
- Nenhuma informação é armazenada localmente
- Protegido por 3D Secure

🔄 Cartões aceitos:
- Visa, Mastercard, Elo, Hipercard, American Express`,
                related: ["pagamento", "seguranca"]
            },
            
            "fatura": {
                response: `🧾 Solicitar reembolso:
1. Acesse "Configurações" > "Pagamentos"
2. Selecione "Histórico de Faturas"
3. Encontre a cobrança em questão
4. Toque em "Solicitar Reembolso"
5. Preencha:
   - Motivo do reembolso
   - Valor desejado (parcial/total)
   - Método de retorno
6. Envie e aguarde análise

⏱️ Prazos:
- Reembolsos totais: até 5 dias úteis
- Reembolsos parciais: até 10 dias úteis
- Disputas: análise em até 30 dias

📌 Política completa: wastech.com/reembolsos`,
                related: ["cancelamento", "contato"]
            },
            
            "cancelamento": {
                response: `🚫 Cancelar assinatura:
1. Acesse "Configurações" > "Assinatura"
2. Selecione "Gerenciar Assinatura"
3. Escolha "Cancelar Plano"
4. Informe o motivo (opcional)
5. Confirme o cancelamento

ℹ️ Informações importantes:
- O acesso continua até o fim do período pago
- Dados são mantidos por 6 meses após cancelamento
- Você pode reativar a qualquer momento

💡 Alternativas:
- Mudar para plano mais barato
- Pausar assinatura temporariamente
- Solicitar desconto`,
                related: ["plano", "fatura"]
            }
        },

        // Integrações e API
        "integracao": {
            "api": {
                response: `🔌 API WASTECH para desenvolvedores:
1. Acesse painel.wastech.com/dev
2. Crie suas credenciais:
   - Chave de API
   - Tokens de acesso
   - Permissões específicas
3. Documentação completa:
   - Referência de endpoints
   - Exemplos em múltiplas linguagens
   - Limites de requisição
4. Ferramentas:
   - Sandbox para testes
   - Monitoramento de uso
   - Alertas de depreciação

📌 Planos de API:
- Free: 100 req/dia
- Pro: 10.000 req/mês (R$99)
- Enterprise: Personalizado

💡 Dica: Comece com nossa biblioteca SDK oficial`,
                related: ["webhooks", "autenticacao"]
            },
            
            "webhooks": {
                response: `🕸️ Configurar webhooks:
1. Acesse "Integrações" > "Webhooks"
2. Adicione novo webhook:
   - URL de destino
   - Eventos para disparar
   - Formato (JSON/XML)
   - Segurança (assinatura)
3. Teste sua configuração
4. Monitore entregas

📌 Eventos disponíveis:
- Novos dados de sensores
- Alertas disparados
- Atualizações de sistema
- Pagamentos processados
- Atividades do usuário

🔒 Segurança:
- Validação de IP
- Autenticação HMAC
- Limite de taxa
- Tentativas de reenvio`,
                related: ["api", "automacao"]
            },
            
            "terceiros": {
                response: `🤝 Integrações com terceiros:
Principais parceiros:
   🌦️ WeatherLink - Dados meteorológicos
   💧 HydraSmart - Controle de irrigação
   ⚡ PowerMonitor - Energia e utilidades
   📊 AgriAnalytics - BI agrícola
   🏭 FactoryOS - Sistemas industriais

Como integrar:
1. Acesse "Configurações" > "Integrações"
2. Selecione o serviço desejado
3. Siga o fluxo de autenticação
4. Configure os dados compartilhados
5. Defina frequência de atualização

⚠️ Requisitos:
- Plano Pro ou superior
- Permissões de conta
- Dependendo do serviço, pode haver custos adicionais`,
                related: ["api", "permissoes"]
            }
        },

        // Segurança e privacidade
        "seguranca": {
            "autenticacao": {
                response: `🔐 Autenticação avançada:
Opções disponíveis:
1. Senha tradicional
2. Autenticação de dois fatores (2FA):
   - SMS
   - Aplicativo (Google Authenticator)
   - Chaves de segurança física
3. Biometria:
   - Face ID
   - Touch ID
   - Reconhecimento de íris
4. Single Sign-On (SSO):
   - Google
   - Apple
   - Microsoft

Como configurar:
1. Acesse "Configurações" > "Segurança"
2. Selecione "Métodos de Login"
3. Siga as instruções para cada método

💡 Recomendamos fortemente habilitar 2FA!`,
                related: ["conta", "dispositivos"]
            },
            
            "dispositivos": {
                response: `📱 Gerenciar dispositivos conectados:
1. Acesse "Segurança" > "Dispositivos"
2. Veja todos dispositivos com acesso:
   - Nome e modelo
   - Localização aproximada
   - Última atividade
3. Ações disponíveis:
   - Renomear dispositivo
   - Revogar acesso
   - Marcar como confiável
   - Configurar notificações

⚠️ Alerta de segurança:
- Revogue dispositivos não reconhecidos
- Verifique logins suspeitos
- Ative notificações para novos logins`,
                related: ["autenticacao", "privacidade"]
            },
            
            "auditoria": {
                response: `📝 Logs de auditoria:
O que você pode monitorar:
- Todas atividades da conta
- Acessos e tentativas de login
- Alterações de configurações
- Exportações de dados
- Modificações em integrações

Como acessar:
1. "Configurações" > "Segurança"
2. Selecione "Logs de Auditoria"
3. Filtre por:
   - Data/hora
   - Tipo de evento
   - Dispositivo
   - Localização

📌 Logs são mantidos por:
- 30 dias (planos gratuitos)
- 1 ano (planos pagos)
- Personalizado (enterprise)`,
                related: ["backup", "monitoramento"]
            }
        }
    };

    // Respostas para saudações
    const greetings = {
        "oi": "Olá! 😊 Como posso te ajudar hoje?",
        "olá": "Olá! 😊 Como posso te ajudar hoje?",
        "ola": "Olá! 😊 Como posso te ajudar hoje?",
        "bom dia": "Bom dia! ☀️ Em que posso ajudar?",
        "boa tarde": "Boa tarde! 😊 Como posso te ajudar?",
        "boa noite": "Boa noite! 🌙 Em que posso ajudar?",
        "oi tudo bem": "Oi! Tudo ótimo, e com você? 😊 Como posso ajudar?",
        "tudo bem": "Estou ótimo, obrigado por perguntar! 😊 Como posso te ajudar hoje?",
        "e aí": "E aí! 😎 Como posso te ajudar hoje?",
        "saudações": "Saudações! 👋 No que posso ser útil?",
        "oi assistente": "Olá! 👋 Sou o assistente virtual da WASTECH. No que posso ajudar?",
        "quem é você": "Sou o assistente virtual da WASTECH! 🤖 Estou aqui para te ajudar com qualquer dúvida sobre nosso sistema.",
        "como você está": "Estou funcionando perfeitamente, obrigado por perguntar! 😊 Como posso te ajudar hoje?",
        "bom dia equipe wastech": "Bom dia! ☀️ Equipe WASTECH agradece seu contato. Como podemos ajudar?",
        "boa tarde wastech": "Boa tarde! 😊 Equipe WASTECH à disposição. Qual sua dúvida?",
        "boa noite wastech": "Boa noite! 🌙 Estamos aqui para ajudar. Qual o assunto?"
    };

    // Perguntas frequentes (agora com respostas diretas)
    const faq = {
        "como funciona": {
            response: "A WASTECH é uma plataforma completa para gestão de recursos hídricos e monitoramento ambiental. Nossos sistemas coletam dados de sensores, processam informações e fornecem insights para melhor tomada de decisão. Posso te explicar alguma funcionalidade específica?",
            action: () => {
                addMessage(faq["como funciona"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "preciso de ajuda": {
            response: "Claro, estou aqui para ajudar! Por favor, me diga qual o problema ou dúvida que você está enfrentando.",
            action: () => {
                addMessage(faq["preciso de ajuda"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "não consigo usar": {
            response: "Entendo que está com dificuldades. Vamos resolver juntos! Poderia me dizer qual parte do sistema está apresentando problemas?",
            action: () => {
                addMessage(faq["não consigo usar"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "quanto custa": {
            response: "A WASTECH oferece planos gratuitos e pagos. O plano básico é gratuito, o Pro custa R$29,90/mês e o Empresarial R$99,90/mês. Posso te mostrar mais detalhes sobre os planos?",
            action: () => {
                addMessage(faq["quanto custa"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "tem desconto": {
            response: "Oferecemos descontos para estudantes, instituições de pesquisa e clientes de longo prazo. Entre em contato com comercial@wastech.com para verificar sua elegibilidade.",
            action: () => {
                addMessage(faq["tem desconto"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "versão gratuita": {
            response: "Sim! Nosso plano gratuito inclui monitoramento básico e 1 relatório mensal. Para recursos avançados, considere nossos planos Pro ou Empresarial.",
            action: () => {
                addMessage(faq["versão gratuita"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "onde fica a empresa": {
            response: "Nossa sede fica em São Paulo - SP, mas atendemos clientes em todo o Brasil e América Latina. Trabalhamos 100% remotamente desde 2020.",
            action: () => {
                addMessage(faq["onde fica a empresa"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "horário de atendimento": {
            response: "Nosso atendimento humano funciona das 8h às 18h, de segunda a sexta. Mas eu, o assistente virtual, estou disponível 24/7 para te ajudar!",
            action: () => {
                addMessage(faq["horário de atendimento"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "fale com humano": {
            response: "Entendido. Estou transferindo você para um atendente humano. Por favor, aguarde... (tempo médio: 3 minutos)",
            action: () => {
                addMessage(faq["fale com humano"].response, 'bot');
                transferToHuman();
            }
        },
        "quero cancelar": {
            response: "Lamento ouvir isso. Antes de cancelar, gostaria de saber o motivo para podermos melhorar? Ou prefere que eu mostre diretamente as opções de cancelamento?",
            action: () => {
                addMessage(faq["quero cancelar"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "como cadastrar": {
            response: "Para se cadastrar na WASTECH: 1) Acesse nosso site 2) Clique em 'Cadastre-se' 3) Preencha seus dados 4) Confirme seu e-mail 5) Comece a usar! Posso te enviar o link direto?",
            action: () => {
                addMessage(faq["como cadastrar"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "onde baixar o app": {
            response: "Nosso app está disponível na Google Play e App Store. Posso te enviar o link direto para sua plataforma. Qual seu dispositivo? Android ou iOS?",
            action: () => {
                addMessage(faq["onde baixar o app"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "preciso de suporte técnico": {
            response: "Claro! Para nos ajudar a resolver mais rápido, por favor descreva: 1) O que estava tentando fazer 2) O que aconteceu 3) Mensagens de erro (se houver)",
            action: () => {
                addMessage(faq["preciso de suporte técnico"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "tem curso": {
            response: "Sim! Oferecemos cursos online gratuitos e certificados. Temos desde introdução até treinamentos avançados. Posso te enviar mais informações?",
            action: () => {
                addMessage(faq["tem curso"].response, 'bot');
                showFollowUpOptions();
            }
        },
        "como denunciar problema": {
            response: "Para relatar problemas técnicos ou de segurança: 1) Acesse Configurações > Ajuda 2) Selecione 'Relatar problema' 3) Descreva em detalhes 4) Anexe prints se possível. Ou posso iniciar esse processo para você agora.",
            action: () => {
                addMessage(faq["como denunciar problema"].response, 'bot');
                showFollowUpOptions();
            }
        }
    };

    // Comandos especiais
    const specialCommands = {
        "limpar": () => { chatMessages.innerHTML = ''; return "Chat limpo! Como posso ajudar agora?"; },
        "histórico": () => { return showHistory(); },
        "ajuda": () => { return showHelp(); },
        "contato": () => { return "Você pode entrar em contato com a WASTECH por:\n📞 Telefone: (11) 4002-8922\n📧 Email: contato@wastech.com\n💬 WhatsApp: (11) 98765-4321\n🏢 Endereço: Av. Paulista, 1000 - São Paulo/SP"; },
        "sair": () => { chatContainer.style.display = 'none'; return ""; },
        "resetar": () => { resetChat(); return "Chat reiniciado! Como posso te ajudar agora?"; },
        "tutorial": () => { return showTutorial(); }
    };

    // Mapeamento de tópicos para normalização
    const topicMappings = {
        'foto de perfil': 'foto_perfil',
        'excluir conta': 'excluir_conta',
        'notificações': 'notificacoes',
        'mudar senha': 'senha',
        'alterar nome': 'nome',
        'atualizar email': 'email',
        'mudar tema': 'tema',
        'alterar idioma': 'idioma',
        'privacidade': 'privacidade',
        'acessibilidade': 'acessibilidade',
        'gerar relatórios': 'relatorios',
        'fazer backup': 'backup',
        'compartilhar dados': 'compartilhar',
        'monitoramento': 'monitoramento',
        'problemas de login': 'login',
        'app travando': 'app_travando',
        'sincronização': 'sincronizacao',
        'erros': 'erros',
        'mudar plano': 'plano',
        'atualizar cartão': 'cartao',
        'reembolso': 'fatura',
        'cancelamento': 'cancelamento',
        'autenticação': 'autenticacao',
        'dispositivos': 'dispositivos',
        'auditoria': 'auditoria'
    };

    // Iniciar o chat
    function initChat() {
        addMessage("Olá! 👋 Sou o assistente virtual da WASTECH. Posso te ajudar com:", 'bot');
        
        const welcomeOptions = document.createElement('div');
        welcomeOptions.className = 'welcome-options';
        welcomeOptions.innerHTML = `
            <div class="welcome-option" data-action="account">
                <div class="icon">👤</div>
                <div class="text">Configurações da Conta</div>
            </div>
            <div class="welcome-option" data-action="app">
                <div class="icon">⚙️</div>
                <div class="text">Ajustes do Aplicativo</div>
            </div>
            <div class="welcome-option" data-action="features">
                <div class="icon">✨</div>
                <div class="text">Funcionalidades</div>
            </div>
            <div class="welcome-option" data-action="problems">
                <div class="icon">🛠️</div>
                <div class="text">Problemas Comuns</div>
            </div>
            <div class="welcome-option" data-action="payments">
                <div class="icon">💳</div>
                <div class="text">Pagamentos</div>
            </div>
            <div class="welcome-option" data-action="security">
                <div class="icon">🔒</div>
                <div class="text">Segurança</div>
            </div>
        `;
        
        chatMessages.appendChild(welcomeOptions);
        
        document.querySelectorAll('.welcome-option').forEach(option => {
            option.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                handleWelcomeAction(action);
            });
        });
    }

    // Mostrar opções principais
    function showMainOptions() {
        const quickReplies = document.createElement('div');
        quickReplies.className = 'quick-replies';
        quickReplies.innerHTML = `
            <button class="quick-reply" data-category="conta">👤 Conta</button>
            <button class="quick-reply" data-category="app">⚙️ App</button>
            <button class="quick-reply" data-category="funcionalidades">✨ Funcionalidades</button>
            <button class="quick-reply" data-category="problemas">🛠️ Problemas</button>
            <button class="quick-reply" data-category="pagamentos">💳 Pagamentos</button>
            <button class="quick-reply" data-category="seguranca">🔒 Segurança</button>
        `;
        
        chatMessages.appendChild(quickReplies);
        
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                showCategoryOptions(category);
            });
        });
    }

    // Mostrar opções de uma categoria
    function showCategoryOptions(category) {
        chatMessages.innerHTML = '';
        
        let options = [];
        let question = "";
        let icon = "";
        
        switch(category) {
            case 'conta':
                options = [
                    {text: "Foto de Perfil", icon: "📷"},
                    {text: "Excluir Conta", icon: "❌"},
                    {text: "Notificações", icon: "🔔"},
                    {text: "Mudar Senha", icon: "🔑"},
                    {text: "Alterar Nome", icon: "👤"},
                    {text: "Atualizar Email", icon: "📧"}
                ];
                question = "👤 Sobre sua conta, você quer:";
                break;
            case 'app':
                options = [
                    {text: "Mudar Tema", icon: "🎨"},
                    {text: "Alterar Idioma", icon: "🌐"},
                    {text: "Privacidade", icon: "🛡️"},
                    {text: "Acessibilidade", icon: "♿"}
                ];
                question = "⚙️ Ajustes do aplicativo:";
                break;
            case 'funcionalidades':
                options = [
                    {text: "Gerar Relatórios", icon: "📊"},
                    {text: "Fazer Backup", icon: "💾"},
                    {text: "Compartilhar Dados", icon: "🤝"},
                    {text: "Monitoramento", icon: "👁️‍🗨️"}
                ];
                question = "✨ Funcionalidades disponíveis:";
                break;
            case 'problemas':
                options = [
                    {text: "Problemas de Login", icon: "🔑"},
                    {text: "App Travando", icon: "🐌"},
                    {text: "Sincronização", icon: "🔄"},
                    {text: "Erros", icon: "❌"}
                ];
                question = "🛠️ Problemas comuns:";
                break;
            case 'pagamentos':
                options = [
                    {text: "Mudar Plano", icon: "💰"},
                    {text: "Atualizar Cartão", icon: "💳"},
                    {text: "Reembolso", icon: "🧾"},
                    {text: "Cancelamento", icon: "🚫"}
                ];
                question = "💳 Sobre pagamentos:";
                break;
            case 'seguranca':
                options = [
                    {text: "Autenticação", icon: "🔐"},
                    {text: "Dispositivos", icon: "📱"},
                    {text: "Auditoria", icon: "📝"}
                ];
                question = "🔒 Configurações de segurança:";
                break;
        }
        
        addMessage(question, 'bot');
        
        const quickReplies = document.createElement('div');
        quickReplies.className = 'quick-replies';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quick-reply';
            button.innerHTML = `${option.icon} ${option.text}`;
            button.style.backgroundColor = '#4CAF50';
            button.style.color = 'white';
            button.style.margin = '5px';
            button.style.padding = '8px 12px';
            button.style.borderRadius = '5px';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.gap = '8px';
            
            button.addEventListener('click', () => {
                const topicKey = option.text.toLowerCase();
                const topic = topicMappings[topicKey] || topicKey.replace(/ /g, '_');
                showAnswer(category, topic);
            });
            
            quickReplies.appendChild(button);
        });
        
        chatMessages.appendChild(quickReplies);
    }

    // Mostrar resposta para um tópico
    function showAnswer(category, topic) {
        chatState.currentCategory = category;
        chatState.currentTopic = topic;
        
        const typingIndicator = showTypingIndicator();
        
        setTimeout(() => {
            typingIndicator.remove();
            
            const responseObj = knowledgeBase[category]?.[topic] || null;
            
            if (responseObj) {
                // Adiciona a resposta principal
                addMessage(responseObj.response, 'bot');
                
                // Adiciona links relacionados se existirem
                if (responseObj.related && responseObj.related.length > 0) {
                    const relatedDiv = document.createElement('div');
                    relatedDiv.className = 'related-links';
                    relatedDiv.innerHTML = `<strong>🔗 Relacionado:</strong>`;
                    
                    const linksList = document.createElement('div');
                    linksList.className = 'related-links-list';
                    
                    responseObj.related.forEach(relatedTopic => {
                        const link = document.createElement('span');
                        link.className = 'related-link';
                        link.textContent = relatedTopic;
                        link.addEventListener('click', () => {
                            // Tenta encontrar o tópico relacionado na mesma categoria
                            if (knowledgeBase[category]?.[relatedTopic]) {
                                showAnswer(category, relatedTopic);
                            } else {
                                // Se não encontrar, faz uma busca geral
                                searchKnowledgeBase(relatedTopic);
                            }
                        });
                        linksList.appendChild(link);
                    });
                    
                    relatedDiv.appendChild(linksList);
                    chatMessages.appendChild(relatedDiv);
                }
            } else {
                addMessage("Desculpe, não encontrei informações sobre isso. Por favor, tente outra pergunta.", 'bot');
            }
            
            showFollowUpOptions();
        }, 1000);
    }

    // Buscar na base de conhecimento
    function searchKnowledgeBase(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        // Busca em todas as categorias
        for (const category in knowledgeBase) {
            for (const topic in knowledgeBase[category]) {
                const topicText = topic.replace(/_/g, ' ');
                
                // Verifica se o termo de busca está no tópico ou na resposta
                if (topicText.includes(lowerQuery)) {
                    results.push({ category, topic });
                } else {
                    const responseText = knowledgeBase[category][topic].response.toLowerCase();
                    if (responseText.includes(lowerQuery)) {
                        results.push({ category, topic });
                    }
                }
            }
        }
        
        if (results.length > 0) {
            // Mostra os resultados encontrados
            addMessage(`Encontrei ${results.length} resultado(s) para "${query}":`, 'bot');
            
            const resultsDiv = document.createElement('div');
            resultsDiv.className = 'search-results';
            
            results.slice(0, 5).forEach(result => {
                const resultButton = document.createElement('button');
                resultButton.className = 'search-result';
                resultButton.textContent = result.topic.replace(/_/g, ' ');
                resultButton.addEventListener('click', () => {
                    showAnswer(result.category, result.topic);
                });
                resultsDiv.appendChild(resultButton);
            });
            
            chatMessages.appendChild(resultsDiv);
            
            if (results.length > 5) {
                addMessage(`Mostrando 5 de ${results.length} resultados. Tente refinar sua busca para ver mais.`, 'bot');
            }
        } else {
            addMessage(`Não encontrei resultados para "${query}". Você pode tentar reformular sua pergunta ou escolher uma opção abaixo:`, 'bot');
            showMainOptions();
        }
    }

    // Mostrar opções de follow-up
    function showFollowUpOptions() {
        const quickReplies = document.createElement('div');
        quickReplies.className = 'quick-replies';
        quickReplies.innerHTML = `
            <button class="quick-reply" data-action="more">📚 Saber Mais</button>
            <button class="quick-reply" data-action="new">🆕 Nova Pergunta</button>
            <button class="quick-reply" data-action="human">👤 Atendente Humano</button>
            <button class="quick-reply" data-action="feedback">💬 Enviar Feedback</button>
        `;
        
        chatMessages.appendChild(quickReplies);
        
        document.querySelectorAll('.quick-reply[data-action]').forEach(button => {
            button.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                
                if (action === 'human') {
                    transferToHuman();
                } else if (action === 'new') {
                    chatMessages.innerHTML = '';
                    initChat();
                } else if (action === 'feedback') {
                    askForFeedback();
                } else {
                    if (chatState.currentCategory && chatState.currentTopic) {
                        showAnswer(chatState.currentCategory, chatState.currentTopic);
                    } else {
                        addMessage("O que mais você gostaria de saber sobre este assunto?", 'bot');
                    }
                }
            });
        });
    }

    // Transferir para atendente humano
    function transferToHuman() {
        chatState.isHumanRequested = true;
        addMessage("Estou transferindo você para um atendente humano. Por favor, aguarde...", 'bot');
        
        setTimeout(() => {
            addMessage("Você está na posição 2 na fila. Tempo estimado: 3 minutos.", 'bot');
            
            const waitingOptions = document.createElement('div');
            waitingOptions.className = 'waiting-options';
            waitingOptions.innerHTML = `
                <button class="waiting-option" data-action="cancel">❌ Cancelar transferência</button>
                <button class="waiting-option" data-action="continue">🕒 Continuar esperando</button>
                <button class="waiting-option" data-action="callback">📞 Receber ligação</button>
            `;
            
            chatMessages.appendChild(waitingOptions);
            
            document.querySelectorAll('.waiting-option').forEach(option => {
                option.addEventListener('click', function() {
                    const action = this.getAttribute('data-action');
                    
                    if (action === 'cancel') {
                        addMessage("Transferência cancelada. Como posso te ajudar?", 'bot');
                        chatState.isHumanRequested = false;
                    } else if (action === 'callback') {
                        addMessage("Um atendente te ligará no número cadastrado em breve. Enquanto isso, posso te ajudar com algo mais?", 'bot');
                        chatState.isHumanRequested = false;
                    }
                    
                    this.parentElement.remove();
                });
            });
        }, 2000);
    }

    // Pedir feedback
    function askForFeedback() {
        addMessage("Avalie minha resposta (de 1 a 5 estrelas):", 'bot');
        
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'rating';
        ratingDiv.innerHTML = `
            <span class="star" data-rating="1">☆</span>
            <span class="star" data-rating="2">☆</span>
            <span class="star" data-rating="3">☆</span>
            <span class="star" data-rating="4">☆</span>
            <span class="star" data-rating="5">☆</span>
        `;
        
        chatMessages.appendChild(ratingDiv);
        
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                
                // Atualiza a exibição das estrelas
                document.querySelectorAll('.star').forEach(s => {
                    s.textContent = s.getAttribute('data-rating') <= rating ? '★' : '☆';
                });
                
                // Mostra opção para comentário adicional
                setTimeout(() => {
                    addMessage(`Obrigado pela avaliação de ${rating} estrela(s)! Gostaria de adicionar algum comentário? (opcional)`, 'bot');
                    
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment-box';
                    commentDiv.innerHTML = `
                        <textarea id="feedbackComment" placeholder="Digite seu comentário aqui..."></textarea>
                        <button id="submitFeedback">Enviar</button>
                        <button id="skipFeedback">Pular</button>
                    `;
                    
                    chatMessages.appendChild(commentDiv);
                    
                    document.getElementById('submitFeedback').addEventListener('click', () => {
                        const comment = document.getElementById('feedbackComment').value;
                        saveFeedback(rating, comment);
                        commentDiv.remove();
                        addMessage("Feedback enviado com sucesso! Obrigado por nos ajudar a melhorar.", 'bot');
                    });
                    
                    document.getElementById('skipFeedback').addEventListener('click', () => {
                        saveFeedback(rating, "");
                        commentDiv.remove();
                        addMessage("Obrigado pelo seu feedback!", 'bot');
                    });
                }, 500);
            });
            
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                document.querySelectorAll('.star').forEach(s => {
                    s.textContent = s.getAttribute('data-rating') <= rating ? '★' : '☆';
                });
            });
            
            star.addEventListener('mouseout', function() {
                document.querySelectorAll('.star').forEach(s => {
                    s.textContent = '☆';
                });
            });
        });
    }

    // Salvar feedback (simulado)
    function saveFeedback(rating, comment) {
        console.log(`Feedback recebido: ${rating} estrelas, Comentário: ${comment}`);
        // Aqui você poderia implementar o envio real para um servidor
    }

    // Adicionar mensagem ao chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        if (sender === 'bot') {
            messageDiv.innerHTML = text; // Permite HTML
        } else {
            messageDiv.textContent = text;
        }
        
        // Adiciona timestamp
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        messageDiv.appendChild(timeDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Adiciona ao histórico
        chatState.conversationHistory.push({
            sender,
            text,
            time: new Date()
        });
    }

    // Mostrar indicador de digitação
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    // Processar mensagem do usuário
    function processUserMessage(message) {
        // Adiciona ao histórico
        chatState.conversationHistory.push({
            sender: 'user',
            text: message,
            time: new Date()
        });
        
        const typingIndicator = showTypingIndicator();
        
        setTimeout(() => {
            typingIndicator.remove();
            
            const lowerMsg = message.toLowerCase();
            
            // Verifica comandos especiais
            if (specialCommands[lowerMsg]) {
                const response = specialCommands[lowerMsg]();
                if (response) addMessage(response, 'bot');
                return;
            }
            
            // Verifica se é uma saudação
            if (greetings[lowerMsg]) {
                addMessage(greetings[lowerMsg], 'bot');
                showMainOptions();
                return;
            }
            
            // Verifica perguntas frequentes (agora com ação direta)
            if (faq[lowerMsg]) {
                faq[lowerMsg].action();
                return;
            }
            
            // Busca na base de conhecimento
            searchKnowledgeBase(message);
        }, 1500);
    }

    // Mostrar histórico
    function showHistory() {
        if (chatState.conversationHistory.length === 0) {
            return "Nenhuma conversa no histórico.";
        }
        
        let historyText = "📜 Histórico da conversa:\n\n";
        chatState.conversationHistory.forEach(msg => {
            const time = msg.time.toLocaleTimeString();
            historyText += `${time} ${msg.sender === 'user' ? 'Você' : 'Assistente'}: ${msg.text}\n`;
        });
        
        return historyText;
    }

    // Mostrar ajuda
    function showHelp() {
        return `🆘 Ajuda do Assistente Virtual

Comandos disponíveis:
- "limpar" - Limpa o chat
- "histórico" - Mostra o histórico da conversa
- "ajuda" - Mostra esta mensagem
- "contato" - Mostra informações de contato
- "sair" - Fecha o chat
- "resetar" - Reinicia a conversa
- "tutorial" - Mostra um tutorial rápido

Áreas que posso ajudar:
👤 Configurações da conta
⚙️ Ajustes do aplicativo
✨ Funcionalidades
🛠️ Problemas técnicos
💳 Pagamentos e assinaturas
🔒 Segurança e privacidade

Digite sua pergunta ou escolha uma opção acima!`;
    }

    // Mostrar tutorial
    function showTutorial() {
        return `🎬 Tutorial Rápido

1️⃣ COMO FAZER PERGUNTAS:
- Digite normalmente como "como mudar minha senha?"
- Ou clique nos botões de opções rápidas

2️⃣ MENU PRINCIPAL:
- Sempre que ver os botões coloridos, pode clicar
- Eles levam você para áreas específicas

3️⃣ NAVEGAÇÃO:
- Use "voltar" para retornar ao menu anterior
- "Nova pergunta" reinicia a conversa
- "Atendente humano" transfere para pessoa real

4️⃣ RECURSOS:
- Posso explicar qualquer funcionalidade
- Solucionar problemas técnicos
- Ajudar com configurações

Experimente agora! Qualquer dúvida, é só perguntar 😊`;
    }

    // Resetar chat
    function resetChat() {
        chatMessages.innerHTML = '';
        chatState.conversationHistory = [];
        chatState.currentCategory = null;
        chatState.currentTopic = null;
    }

    // Lidar com ações do menu de boas-vindas
    function handleWelcomeAction(action) {
        let category = '';
        
        switch(action) {
            case 'account': category = 'conta'; break;
            case 'app': category = 'app'; break;
            case 'features': category = 'funcionalidades'; break;
            case 'problems': category = 'problemas'; break;
            case 'payments': category = 'pagamentos'; break;
            case 'security': category = 'seguranca'; break;
        }
        
        if (category) {
            showCategoryOptions(category);
        }
    }

    // Enviar mensagem
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            processUserMessage(message);
        }
    }

    // Configurar event listeners
    chatToggle.addEventListener('click', function() {
        chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
        if (chatContainer.style.display === 'flex' && chatMessages.children.length === 0) {
            initChat();
        }
    });
    
    closeChat.addEventListener('click', function() {
        chatContainer.style.display = 'none';
    });
    
    mainChatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        chatContainer.style.display = 'flex';
        if (chatMessages.children.length === 0) {
            initChat();
        }
    });
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    sendButton.addEventListener('click', sendMessage);

    // Simular upload de arquivo
    uploadButton.addEventListener('click', function() {
        addMessage("Enviei um arquivo: relatorio.pdf (1.2MB)", 'user');
        addMessage("Recebi seu arquivo! É um relatório em PDF. Posso ajudar a interpretar esses dados?", 'bot');
    });

    // Simular entrada por voz
    voiceButton.addEventListener('click', function() {
        addMessage("Ativando o microfone... Fale agora", 'bot');
        
        setTimeout(() => {
            addMessage("Como alterar minha senha de acesso?", 'user');
            processUserMessage("Como alterar minha senha de acesso?");
        }, 2000);
    });

    // Inicializar chat fechado
    // Inicializar chat fechado
    chatContainer.style.display = 'none';

    // Função para lidar com perguntas frequentes
    function handleFAQQuestion(question) {
        // Abre o chat se estiver fechado
        if (chatContainer.style.display !== 'flex') {
            chatContainer.style.display = 'flex';
            
            // Inicia o chat se estiver vazio
            if (chatMessages.children.length === 0) {
                initChat();
            }
        }
        
        // Adiciona a pergunta do usuário ao chat
        addMessage(question, 'user');
        
        // Processa a pergunta
        processUserMessage(question);
        
        // Rola para mostrar a mensagem mais recente
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Adicionar event listeners para os botões de FAQ
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            handleFAQQuestion(question);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const chatMessages = document.getElementById('chatMessages');
    const faqButtons = document.querySelectorAll('.faq-question');
    
    // Respostas prontas para cada pergunta do FAQ
    const faqResponses = {
        "Como são coletados os dados meteorológicos?": `🌦️ <strong>Dados Meteorológicos:</strong><br><br>
Nossos dados são coletados através de:
1. Rede própria de estações meteorológicas
2. Parcerias com institutos de meteorologia
3. Satélites e sensores remotos
4. Dados de estações compartilhadas por usuários

Os dados incluem:
- Temperatura e umidade
- Precipitação e velocidade do vento
- Radiação solar e pressão atmosférica
- Previsões em tempo real

Atualizamos a cada 15 minutos para maior precisão.`,

        "Como a plataforma sugere as melhores épocas para plantar?": `🌱 <strong>Época de Plantio:</strong><br><br>
Nossa plataforma analisa:
1. Histórico climático da sua região
2. Tipo de cultura que deseja plantar
3. Umidade e temperatura do solo
4. Previsões meteorológicas para os próximos 3 meses

Sugerimos períodos ideais baseados em:
- Risco de geadas/chuvas intensas
- Umidade ideal para germinação
- Temperatura adequada para cada cultura
- Período de maturação esperado

Recomendamos sempre confirmar com um agrônomo local.`,

        "Como funciona o sistema de alerta de rega?": `💧 <strong>Alerta de Rega:</strong><br><br>
O sistema monitora:
1. Umidade do solo em tempo real
2. Evapotranspiração da cultura
3. Previsão de chuva para as próximas 48h
4. Estágio de crescimento das plantas

Você recebe alertas quando:
- A umidade está abaixo do ideal para sua cultura
- Há previsão de chuva (para evitar rega desnecessária)
- O sistema detecta possível estresse hídrico
- A temperatura exige ajuste no regime de irrigação

Configure os limiares em "Configurações > Alertas".`,

        "Como alterar minha foto de perfil?": `📷 <strong>Alterar Foto de Perfil:</strong><br><br>
1. Clique no seu ícone no canto superior direito
2. Selecione "Editar Perfil"
3. Clique em "Alterar Foto"
4. Escolha uma imagem do seu dispositivo (JPG ou PNG até 5MB)
5. Ajuste o recorte e clique em "Salvar"

Dica: Use fotos quadradas para melhor visualização.`,

        "Como atualizar meus dados de pagamento?": `💳 <strong>Atualizar Dados de Pagamento:</strong><br><br>
1. Acesse "Configurações" > "Assinatura"
2. Selecione "Métodos de Pagamento"
3. Escolha "Adicionar Novo Cartão"
4. Insira os dados do novo cartão
5. Clique em "Salvar como principal"

Métodos aceitos:
- Cartões de crédito (Visa, Mastercard, etc)
- Pix
- Boleto bancário

Para sua segurança, não armazenamos dados completos do cartão.`
    };

    // Adicionar eventos aos botões de FAQ
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const response = faqResponses[question];
            
            // Remove os botões de FAQ
            const faqContainer = document.querySelector('.faq-questions');
            if (faqContainer) {
                faqContainer.remove();
            }
            
            // Adiciona a pergunta do usuário
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.textContent = question;
            chatMessages.appendChild(userMessage);
            
            // Adiciona a resposta do bot
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerHTML = response;
            chatMessages.appendChild(botMessage);
            
            // Rola para a última mensagem
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Cria a mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Mensagem enviada com sucesso!</h3>
                <p>Entraremos em contato em breve.</p>
            </div>
        `;
        
        // Insere a mensagem antes do formulário
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Esconde o formulário
        contactForm.style.display = 'none';
        
        // Limpa o formulário
        contactForm.reset();
        
    });
});
