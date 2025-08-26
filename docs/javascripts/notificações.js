// notificações.js

document.addEventListener('DOMContentLoaded', function() {
    // Cria o container de notificações
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    notificationContainer.innerHTML = `
        <div class="notification-header">
            <h3>Notificações</h3>
            <button class="clear-all">Limpar tudo</button>
        </div>
        <div class="notification-list">
            <div class="notification-item">
                <div class="notification-icon"><i class="fas fa-seedling"></i></div>
                <div class="notification-content">
                    <p class="notification-title">Missão concluída</p>
                    <p class="notification-message">Você completou a missão "Adicionar uma nova planta"</p>
                    <p class="notification-time">Agora</p>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon"><i class="fas fa-trophy"></i></div>
                <div class="notification-content">
                    <p class="notification-title">Nova conquista</p>
                    <p class="notification-message">Você desbloqueou "Agricultor iniciante"</p>
                    <p class="notification-time">Agora</p>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon"><i class="fas fa-users"></i></div>
                <div class="notification-content">
                    <p class="notification-title">Acesse a tela de comunidade</p>
                    <p class="notification-message">Tire suas dúvidas agora!</p>
                    <p class="notification-time">Agora</p>
                </div>
            </div>
        </div>
    `;

    // Adiciona o CSS dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        .notification-container {
            position: absolute;
            top: 50px;
            right: 20px;
            width: 350px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            display: none;
            font-family: 'Poppins', sans-serif;
        }
        
        .notification-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .notification-header h3 {
            margin: 0;
            font-size: 16px;
            color: #333;
        }
        
        .clear-all {
            background: none;
            border: none;
            color: #4CAF50;
            cursor: pointer;
            font-size: 14px;
        }
        
        .notification-list {
            max-height: 400px;
            overflow-y: auto;
        }
        
        .notification-item {
            display: flex;
            padding: 15px;
            border-bottom: 1px solid #f5f5f5;
            transition: background 0.3s;
        }
        
        .notification-item:hover {
            background: #f9f9f9;
        }
        
        .notification-icon {
            margin-right: 15px;
            color: #4CAF50;
            font-size: 18px;
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-title {
            margin: 0 0 5px 0;
            font-weight: 600;
            color: #333;
        }
        
        .notification-message {
            margin: 0 0 5px 0;
            color: #666;
            font-size: 14px;
        }
        
        .notification-time {
            margin: 0;
            color: #999;
            font-size: 12px;
        }
        
        .notification-count {
           position: absolute;
            top: 0px;    // Ajuste principal aqui
            right: -5px; // Ajuste secundário
            color: #333;
            font-size: 12px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    // Adiciona o container ao body
    document.body.appendChild(notificationContainer);

    // Seleciona o elemento de notificações na barra superior
    const notificationBell = document.querySelector('.top-icons .fa-bell').parentElement;
    
    // Adiciona o contador de notificações (sem fundo vermelho)
    const count = document.createElement('span');
    count.className = 'notification-count';
    count.textContent = '3';
    notificationBell.appendChild(count);
    
    // Posiciona o container relativo ao sino de notificações
    notificationBell.style.position = 'relative';
    notificationBell.style.cursor = 'pointer';

    // Alterna a visibilidade das notificações
    notificationBell.addEventListener('click', function(e) {
        e.stopPropagation();
        const isVisible = notificationContainer.style.display === 'block';
        notificationContainer.style.display = isVisible ? 'none' : 'block';
    });

    // Fecha as notificações ao clicar fora
    document.addEventListener('click', function() {
        notificationContainer.style.display = 'none';
    });

    // Impede que o clique nas notificações feche o menu
    notificationContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Limpa todas as notificações
    const clearButton = notificationContainer.querySelector('.clear-all');
    clearButton.addEventListener('click', function() {
        const notificationList = notificationContainer.querySelector('.notification-list');
        notificationList.innerHTML = '<p class="no-notifications">Nenhuma notificação</p>';
        count.textContent = '0';
        
        // Adiciona estilo para mensagem de nenhuma notificação
        const noNotificationsStyle = document.createElement('style');
        noNotificationsStyle.textContent = `
            .no-notifications {
                text-align: center;
                padding: 20px;
                color: #999;
            }
        `;
        document.head.appendChild(noNotificationsStyle);
    });
});